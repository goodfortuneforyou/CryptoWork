import React, { useEffect, useState } from "react";
import Image from "next/image";

const WorkerCard = ({ workers }) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 128,
    height: 112,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setImageDimensions({
        width: window.innerWidth > 630 ? 176 : 128,
        height: window.innerWidth > 630 ? 160 : 112,
      });
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  return (
    <div className="flex flex-col m- items-center justify-center w-40 sm:w-48 sm:h-52 h-40 bg-gray-300 rounded-lg shadow-2xl">
      <div className="w-32 sm:w-44 overflow-hidden h-28 sm:h-40 mt-2 bg-gray-200 rounded-xl shadow-lg">
        <Image
          className="rounded-xl"
          src={workers[3]}
          width={imageDimensions.width}
          height={imageDimensions.height}
          style={{
            width: imageDimensions.width,
            height: imageDimensions.height,
            objectFit: "cover",
          }}
          alt="worker"
        />
      </div>

      <span className="font-serif sm:text-lg font-bold">{workers[0]}</span>
      <div className="flex w-full sm:text-lg justify-around font-serif">
        <span>Rank: {workers[2].toNumber() + 1}</span>
        <span>
          {`${workers[1].slice(0, 4)}...${workers[1].slice(
            // eslint-disable-next-line comma-dangle
            workers[1].length - 3
          )}`}
        </span>
      </div>
      <button
        className="bg-blue-500 w-full font-bold rounded-b-lg"
        type="button"
      >
        Hire Now
      </button>
    </div>
  );
};

export default WorkerCard;
