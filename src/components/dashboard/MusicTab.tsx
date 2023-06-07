import React from "react";
import { page1, time } from "../../assets";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

interface TableProps {
  songs: Song[];
}

const MusicTab: React.FC<TableProps> = ({ songs }: any) => {
  return (
    <>
      <div className="mt-[20px] bg-gradient-to-b from-[#362239] to-[#3F3A3A] max-w-6xl h-[510px] mx-auto">
        <table className="table-auto cursor-pointer w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 flex items-start">Title</th>
              <th  className="px-4 py-2 flex items-start">
                <img src={time} alt="" />
              </th>
              <th  className="px-4 py-2 flex items-start">Album</th>
              <th  className="px-4 py-2 flex items-start">Date</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song: any) => (
              <tr key={song.id}>
                <td className="px-4 py-2 flex space-x-3 text-start">
                  <img
                    src={page1}
                    alt=""
                    className="rounded-full h-[45px] w-[45px]"
                  />
                  <div className="flex flex-col items-start text-start">
                    <span className="text-[18px] font-bold">{song.title}</span>
                    <span className="text-[#C4C4C4] text-[16px] font-medium leading-[19.32px]">{song.artist}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-start">{song.duration}</td>
                <td className="px-4 py-2 text-start">{song.album}</td>
                <td className="px-4 py-2 text-start">{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MusicTab;
