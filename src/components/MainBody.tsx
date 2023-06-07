import React, { useState } from "react";
import { Section } from "../constant";
import MusicTab from "./dashboard/MusicTab";

const MainBody = () => {
  const [active, setActive] = useState("music");

  const handleItemClick = (itemActive: string) => {
    setActive(itemActive);
  };

  type songProps = {
    id: number;
    title: string;
    artist: string;
    duration: string;
    album: string;
  };

  const songs: songProps[] = [
    { id: 1, title: "I can’t work it out", artist: "Kaysong", duration: "3:45", album:"The other halves" },
    { id: 2, title: "Song 2", artist: "Artist 2", duration: "4:20", album:"The other halves" },
    { id: 3, title: "Song 3", artist: "Artist 3", duration: "2:57", album:"The other halves" },
  ];
  return (
    <div className="flex-1 w-full h-screen">
      {/**categories */}
      <div className="flex items-center ml-4 space-x-12">
        {Section.map((item, i) => (
          <div
            onClick={() => handleItemClick(item.active)}
            key={i}
            className={`${
              active === item.active
                ? "border-[#D9D9D9] border-4"
                : "border-none"
            } ${
              item.style
            } max-w-[260px] mt-[20px] cursor-pointer flex items-center justify-center space-x-3 py-4 px-8 h-[103px] rounded-[10px]`}
          >
            <img src={item.image} alt="" />
            <p className="font-medium w-full text-[#121212] text-sm">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center ">
        {/** music components */}
        <div className="flex-1 w-full h-full border-r mt-[30px] border-[#D9D9D9]">
          <div className="flex items-start border-y border-r border-[#D9D9D9] border-spacing-y-12 py-4 mt-[30px]">
            <div className="flex items-center space-x-6 px-4">
              <span>Music</span>
            </div>
          </div>
          <MusicTab songs={songs} />
        </div>
        <div className="w-1/4 h-ful">ticket</div>
      </div>
    </div>
  );
};

export default MainBody;
