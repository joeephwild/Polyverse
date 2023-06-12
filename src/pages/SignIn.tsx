import React, { useState } from "react";
import { Navbar } from "../components";
import { pen, upload } from "../assets";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { usePolyverseContext } from "../context/Auth";

const SignIn = () => {
  const [active, setActive] = useState(false);
  const { address } = usePolyverseContext();
  return (
    <>
      <Navbar />
      <div className="min-h-[800px] w-full flex items-center justify-center">
        {!address && (
          <button
            onClick={() => setActive(true)}
            className="gradient-border-button border-4 w-[300px] rounded-full relative  py-4 text-lg font-medium text-white"
          >
            Connect Wallet
          </button>
        )}

        {address && (
          <div className="max-w-[458px] rounded-[10px] items-center justify-center flex flex-col px-6 py-[30px] bg-[#fff]">
            {/** image upload */}
            <form action="" className="w-full">
              <div className="flex flex-col mt-[50px] space-y-4 items-center">
                <div className="relative cursor-pointer">
                  <img src={upload} alt="upload" />
                  <input type="file" className="hidden" />
                  <AiOutlineCamera
                    size={25}
                    className="absolute inset-9 text-white"
                  />
                </div>

                <div className="flex cursor-pointer items-center space-x-[30px] ">
                  <span className="text-[#3A3A3A] text-[18px] font-bold">
                   {address.slice(0,9)}...
                  </span>
                  <img src={pen} alt="pen" />
                </div>
              </div>

              {/** form section */}
              <div className="flex  w-full  flex-wrap mt-[60px] item-center space-y-5">
                <label htmlFor="" className="min-w-full text-[#3A3A3A] ">
                  <span className="font-medium">Name</span>
                  <input
                    type="text"
                    className="w-full border-2 rounded-[10px] border-[#C4C4C4] outline-none focus:outline-none px-4 py-2.5"
                  />
                </label>
                <label htmlFor="" className="min-w-full text-[#3A3A3A]">
                  <span className="font-medium">Name</span>
                  <textarea
                    rows={5}
                    className="w-full border-2 rounded-[10px] border-[#C4C4C4] outline-none focus:outline-none px-4 py-2.5"
                  />
                </label>
                <label htmlFor="" className="min-w-full text-[#3A3A3A]">
                  <span className="font-medium">Name</span>
                  <input
                    type="text"
                    className="w-full border-2 rounded-[10px] border-[#C4C4C4] outline-none focus:outline-none px-4 py-2.5"
                  />
                </label>
                <div className="flex items-center justify-center w-full">
                    <Link to="/dashboard">
                  <button className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] px-8 py-2.5 rounded-full border border-black">
                    Save
                  </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default SignIn;
