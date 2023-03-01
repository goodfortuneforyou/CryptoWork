import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import WorkerCard from "../components/WorkerCard";
import { Web3Context } from "../context/contextProvider";

const Home = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [workers, setWorkers] = useState([]);

  // eslint-disable-next-line operator-linebreak
  const { register, updateInformation, changeAvailability, fetchWorkers } =
    useContext(Web3Context);
  const getWorker = async () => {
    const wor = await fetchWorkers();
    setWorkers(wor);
  };
  useEffect(() => {
    getWorker();
  }, [name]);
  return (
    <>
      <Head>
        <title>CryptoWork</title>
        <meta name="description" content="Crypto Work User Interface" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-screen">
        <div className="flex flex-col sm:flex-row justify-center lg:justify-around items-center sm:pt-3 sm:space-x-5 md:space-x-12">
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg lg:text-xl pb-2">
              Start Working as a Crypto Worker!
            </p>
            <input
              className="border-2 w-60 lg:w-80 border-blue-200 rounded-lg text-center mb-1 md:mb-2"
              type="text"
              placeholder="Please Enter Your Name"
              value={name}
              onChange={({ target }) => setName(target?.value)}
            />
            <input
              className="border-2 w-60 lg:w-80 border-blue-200 rounded-lg text-center"
              type="text"
              placeholder="Please Enter Your Image URL"
              value={image}
              onChange={({ target }) => {
                setImage(target?.value);
              }}
            />
            <button
              className="bg-green-500 hover:bg-green-600 w-20 md:w-24 lg:w-28 font-semibold lg:text-lg text-white rounded-full mt-2 md:mt-3 "
              type="button"
              onClick={() => register(name, image)}
            >
              Register
            </button>
            <div className="flex flex-row">
              <p className="text-sm lg:text-lg  ">
                Already registered? update profile
              </p>
              <button
                className="border w-14 lg:w-20  text-sm lg:text-lg font-semibold bg-green-400 hover:bg-green-500 text-red-700 rounded-full"
                type="button"
                onClick={() => updateInformation(name, image)}
              >
                Update
              </button>
            </div>
          </div>

          <div className="flex-col flex ">
            <p className="text-lg mb-2 lg:text-xl">
              You can change your availability <br /> at CryptoWork any time you
              want!
            </p>

            <div className="sm:flex sm:flex-col items-center">
              <input
                className="border-2 w-40 md:w-48 sm:w-44 lg:w-52 border-green-400 rounded-lg text-center mr-4"
                type="text"
                placeholder="Change Availibity"
              />
              <button
                className="border w-14 sm:w-16 text-md font-semibold bg-green-400 hover:bg-red-400 text-white rounded-lg mt-2 sm:mb-6"
                type="button"
                onClick={() => changeAvailability(true)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-3">
          <p className="text-md sm:text-lg mb-6 text-center text-pink-700 font-bold">
            Want to hire someone? <br /> check available Crypto Workers
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-evenly sm:gap-10 sm:flex-wrap  w-max justify-center items-center">
            {workers ? (
              workers.map((worker) => (
                <WorkerCard key={worker[2]} workers={worker} />
              ))
            ) : (
              <div className="font-semibold text-center font-serif">
                Oops! No CryptoWorkers currently Available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
