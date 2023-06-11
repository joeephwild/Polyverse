import React from "react";
import { home, mail } from "../assets";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[4%] h-screen border-r border-[#C4C4C4]">
      <div className="flex flex-col items-center mt-[30px] space-y-6">
        <Link to="/dashboard">
          <img src={home} alt="home" />
        </Link>

        <img src={mail} alt="" />
      </div>
    </div>
  );
};

export default Sidebar;
