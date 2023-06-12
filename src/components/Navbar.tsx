import React, { useState } from "react";
import { logo } from "../assets";
import { RuntimeConnector, Extension } from "@dataverse/runtime-connector";
import { Link } from "react-router-dom";
import { usePolyverseContext } from "../context/Auth";
import { WALLET } from "@dataverse/runtime-connector";
import { ethers } from "ethers";

const runtimeConnector = new RuntimeConnector(Extension);
const app = "Polyverse";

const Navbar = () => {
  const { address, setAddress } = usePolyverseContext();

  const createCapability = async () => {
    const pkh = await runtimeConnector.createCapability({
      app: "Polyverse",
      wallet: WALLET.METAMASK, // optional, if not connected
    });
    console.log(pkh);
    return pkh;
  };

  const connectWallet = async () => {
    try {
      const wallet = await runtimeConnector.connectWallet(WALLET.METAMASK);
      await runtimeConnector.switchNetwork(3141);
      createCapability();
      setAddress(wallet.address);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="w-full flex items-center h-16 justify-between px-12 py-6.5 border-b border-[#ffffff]">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <ul className="flex items-center cursor-pointer space-x-[170px] font-medium text-[14px]">
        <li>Pictures</li>
        <li>Videos</li>
        <li>Files</li>
      </ul>

      {!address && (
        <button
          onClick={connectWallet}
          className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]"
        >
          Connect Wallet
        </button>
      )}

      {address && (
        <button className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]">
          {address.slice(0, 9)}...
        </button>
      )}
    </nav>
  );
};

export default Navbar;
