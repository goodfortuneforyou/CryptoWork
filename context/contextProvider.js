import { createContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { contractAddress, abi } from "constants";

export const Web3Context = createContext();
const injected = new InjectedConnector();
export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const {
    account,
    activate,
    active,
    library: provider,
    deactivate,
  } = useWeb3React();

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) alert("Please install MetaMask!");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      activate(injected);
    } else {
      console.log("No Accounts Found!");
    }
  };
  const connect = async () => {
    if (!window.ethereum) alert("Please install MetaMask!");
    if (active) {
      deactivate();
      setCurrentAccount("");
    } else {
      await activate(injected);
      await checkIfWalletIsConnected().then(window.location.reload());
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  const Contract = async () => {
    if (!window.ethereum) alert("Please Install MetaMask");
    let contract;
    if (active) {
      const signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress[0], abi, signer);
      return contract;
    }
    const providers = new Web3Provider(window.ethereum);
    contract = new ethers.Contract(contractAddress[0], abi, providers);
    return contract;
  };
  const fetchWorkers = async () => {
    try {
      const contract = await Contract();
      const workerList = await contract.getWorker();
      const workers = await Promise.all(
        workerList.map(
          async ({ Name, Address, Rank, Image, Status }) =>
            // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
            Object.values({ Name, Address, Rank, Image, Status })
          // eslint-disable-next-line function-paren-newline, comma-dangle
        )
      );
      return workers;
    } catch (error) {
      console.log(error);
    }
  };
  const register = async (name, image) => {
    try {
      const contract = await Contract();
      await contract.register(name, image);
      console.log("registered");
    } catch (error) {
      console.log(error);
    }
  };
  const updateInformation = async (name, image) => {
    try {
      const contract = await Contract();
      await contract.updateInformation(name, image);
    } catch (error) {
      console.log(error);
    }
  };
  const changeAvailability = async (status) => {
    try {
      const contract = await Contract();
      await contract.changeStatus(status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        connect,
        fetchWorkers,
        currentAccount,
        Contract,
        register,
        updateInformation,
        changeAvailability,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
