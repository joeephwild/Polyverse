import React, { useState } from "react";
import { logo } from "../assets";
import {
  RuntimeConnector,
  Extension,
  CRYPTO_WALLET,
} from "@dataverse/runtime-connector";
import { useWallet } from "../hooks/useWallet";
import { useStream } from "../hooks/useStream";
import app from "../../output/app.json";
import { Link } from "react-router-dom";
import { PARTICLE } from "@dataverse/runtime-connector";

const runtimeConnector = new RuntimeConnector(Extension);

const Navbar = () => {
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

      <button
        className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]"
      >
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;
