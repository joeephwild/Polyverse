import React, { useEffect, useState } from "react";
import { page1 } from "../assets";
import { useParams } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import Content from "./Content";
import { useAddress } from "@thirdweb-dev/react";
import { usePolyverseContext } from "../context/Auth";

interface UserProfileParams {
  state: any;
}

interface Creator {
  name: string;
  image: string;
  category: string;
  bio: string;
  owner: string;
  cost: string;
}

const ProfileDetail = ({ state }: UserProfileParams) => {
  const { subscribeToArtist } = usePolyverseContext();
  console.log(state);

  const handleSubscription = async () => {
    try {
      alert("ongoing")
      const tx = await subscribeToArtist(state.pid, state.cost);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex-1 px-6 py-2.5">
      <p>Profile</p>
      <div className="flex mt-6 space-x-9 items-center justify-evenly w-full">
        <div className="flex space-x-9 items-center w-full">
          <img
            src={state?.image}
            alt=""
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div className="flex space-y-3 flex-col items-start">
            <div className="flex space-x-4 items-center">
              <span className="text-[18px] font-bold">{state?.name}</span>
              <button
                onClick={() => handleSubscription()}
                className="bg-[#695AF5] px-4 py-2 text-white rounded-full"
              >
                Subscribe
              </button>
            </div>
            <span className="text-[16px] font-bold">{state?.owner}...</span>
            <span className="flex space-x-2 items-center">
              <FaRegMoneyBillAlt size={25} />
              <p className="text-[#35F415] font-bold text-[14px]">${state.cost}</p>
              <TbEdit size={25} />
            </span>
          </div>
        </div>

        <div className="w-[568px] h-[104px] rounded-[5px]">{state?.bio}</div>
      </div>

      <Content />
    </div>
  );
};

export default ProfileDetail;
