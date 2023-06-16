import React, { useState } from "react";
import FormField from "./FormField";
import { usePolyverseContext } from "../context/Auth";
import { pen, upload } from "../assets";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProfileForm = () => {
  const { address, createCreator } = usePolyverseContext();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const category = [
    {
      title: "",
      value: "",
    },
    {
      title: "Creator",
      value: "Creator",
    },
    {
      title: "Follower",
      value: "Follower",
    },
  ];

  const handleImageUpload = async(e: any) => {
    e.preventDefault()
    // Perform the image upload logic here
    // You can use the selectedImage state variable to access the uploaded image file
    // For example, you can use the Fetch API or an external library to upload the image to a server.
    // After the upload is complete, you can handle the response or perform any necessary actions.
   await createCreator("jfjjfjffk", 6)
  };

  return (
    <div className="max-w-[458px] rounded-[10px] items-center justify-center flex flex-col px-6 py-[10px] bg-[#fff]">
      {/* image upload */}
      <form action="" className="w-full">
        <div className="flex flex-col mt-[50px] space-y-4 items-center">
          <div className="relative cursor-pointer">
            <span>
              <input
                type="file"
                name="file_upload"
                className="appearance-none hidden"
              />
            </span>
            <img src={upload} alt="upload" />

            <AiOutlineCamera
              size={25}
              className="absolute inset-9 text-white"
            />
          </div>

          <div className="flex cursor-pointer items-center space-x-[30px] ">
            <span className="text-[#3A3A3A] text-[18px] font-bold">
              {address.slice(0, 9)}...
            </span>
            <img src={pen} alt="pen" />
          </div>
        </div>

        {/* form section */}
        <div className="flex  w-full  flex-wrap mt-[30px] item-center space-y-5">
          <FormField title="Name" isInput />
          <FormField title="Category" item={category} isCategory />
          <FormField title="Subscription Fee" type="number" isInput />
          <FormField title="Bio" isTextArea />
          <div className="flex items-center justify-center w-full">
            <button
              onClick={handleImageUpload}
              className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] px-8 py-2.5 rounded-full border border-black"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
