import React from "react";
import { logo, profile } from "../../assets";
import { Link } from "react-router-dom";

const DNavbar = () => {
  return (
    <nav className="w-full flex items-center h-16 justify-between px-12 py-6.5 border-b border-[#ffffff]">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <div className="border-2 w-[339px] border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]">
         search
        </div>

      <div className="flex items-center space-x-5">
        <img src={profile} alt="profile" />
        <button className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]">
          0x0000...
        </button>
      </div>
    </nav>
  );
};

export default DNavbar;
