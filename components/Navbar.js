/* eslint-disable import/no-cycle */
import React from "react";
import { Button } from ".";

const Navbar = () => (
  <div className="flex justify-around bg-white border-b p-4 w-screen">
    <div className="text-green-500">
      <h1 className="font-bold">Micro CryptoWork</h1>
    </div>
    <div className="flex flex-initial flex-row justify-end" />
    <Button />
  </div>
);

export default Navbar;
