import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ContextProvider } from "../context/contextProvider";
import { Navbar } from "../components";

const getLibrary = (provider) => new Web3Provider(provider);

const App = ({ Component, pageProps }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <ContextProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ContextProvider>
  </Web3ReactProvider>
);
export default App;
