import React, { useState } from "react";
import FormField from "../FormField";

interface SongData {
  name: string;
  audioFile: File | null;
  details: string;
}

const TicketForm = () => {
  const [songData, setSongData] = useState<SongData>({
    name: "",
    audioFile: null,
    details: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setSongData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    setSongData((prevData) => ({
      ...prevData,
      audioFile: file || null,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Perform any necessary actions with the songData, such as uploading the file

    // Reset the form
    setSongData({
      name: "",
      audioFile: null,
      details: "",
    });
  };

  return (
    <form className=" bg-gradient-to-b from-[#362239]  to-[#3F3A3A] max-w-7xl h-screen mx-9 w-full flex items-center justify-center">
      <div className="min-w-[300px] min-h-[340px] bg-[#000] border-2 border-blue-600 flex flex-col px-[40px] py-[24.33px] mb-[10%] rounded-[40px] space-y-[16px]">
        <FormField title="Title" isInput isDark />
        <FormField title="Features" isInput isDark />
        <FormField title="Music File" isFile isDark />
        <FormField title="Music Image" isFile isDark />

        <button className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] px-6 py-2.5 rounded-[40px]">
          Submit
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
