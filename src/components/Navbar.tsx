import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddress, useMetamask, useSigner } from "@thirdweb-dev/react";

import "react-responsive-modal/styles.css";
import { FaBell } from "react-icons/fa";
import { Extension, RuntimeConnector, WALLET } from "@dataverse/runtime-connector";
import { FilecoinCalibrationTestnet } from "@thirdweb-dev/chains";

import { logo } from "../assets";
import { useProtocolContext } from "../context";
import Fund from "./Fund";

const Navbar: React.FC = () => {
  const connect = useMetamask();
  const address = useAddress();
  const { subscribeToNotification, subscribed } = useProtocolContext();

  const [modalOpen, setModalOpen] = useState(false);
  const route = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

      <div className=" flex items-center space-x-4">
        <button
          onClick={subscribeToNotification}
          className={`${subscribed ? "text-blue-700" : "text-white"} text-xl `}
        >
          <FaBell />
        </button>
        <button
          onClick={openModal}
          className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]"
        >
          Add Funds
        </button>
        <button
          onClick={() => {
            connect({
              chainId: FilecoinCalibrationTestnet.chainId
            })
            if (address) {
              route("/dashboard");
            }
          }}
          className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]"
        >
          {!address ? "Connect Wallet" : `Dashboard`}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
