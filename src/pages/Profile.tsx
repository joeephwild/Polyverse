import React from "react";
import { DNavbar, ProfileDetail, Sidebar, UserTicket } from "../components";
import { page1 } from "../assets";

const Profile = () => {
  return (
    <div>
      <DNavbar />
      <div className="flex items-start">
        <Sidebar />
        <ProfileDetail />
        <UserTicket />
      </div>
    </div>
  );
};

export default Profile;
