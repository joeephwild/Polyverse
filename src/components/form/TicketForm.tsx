import React, { useState } from "react";
import FormField from "../FormField";
import { sendFileToIPFS } from "../../constant/pinata";
import { toast } from "react-toastify";
import { useDataverse } from "../../context/DataverseProvider";

interface SongData {
  name: string;
  audioFile: File | null;
  details: string;
}

const TicketForm = () => {
    const { uploadMusic } = useDataverse();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [musicFile, setMusicFile] = useState("");
    const [category, setCategory] = useState("");
    const [feature, setFeature] = useState("");
    const [isLoading, setIsloading] = useState(false);
  
    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files && event.target.files[0];
      const cid = await sendFileToIPFS(file);
      const ipfsPath = "https://ipfs.thirdwebcdn.com/ipfs/" + cid;
      toast.success("upload sucessfull");
      console.log(ipfsPath);
      setImage(ipfsPath);
    };
  
    const handleMusicFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files && event.target.files[0];
      const cid = await sendFileToIPFS(file);
      const ipfsPath = "https://ipfs.thirdwebcdn.com/ipfs/" + cid;
      toast.success("upload sucessfull");
      console.log(ipfsPath);
      setMusicFile(ipfsPath);
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        setIsloading(true);
        const tx = await uploadMusic(
          title, musicFile, image, category, feature
        );
        toast.success("Music upload Successfull");
        setIsloading(false);
      } catch (error) {
        toast.error("Transaction failed pls try again later");
        setIsloading(false);
      }
    };
  
    const categories = [
      {
        value: "Gospel",
        title: "Gospel",
      },
      {
        value: "Afrobeat",
        title: "Afrobeat",
      },
      {
        value: "Hip Hop",
        title: "Hip Hop",
      },
    ];

  return (
    <form className=" bg-gradient-to-b from-[#362239]  to-[#3F3A3A] max-w-7xl h-screen mx-9 w-full flex items-center justify-center">
      <div className="min-w-[300px] min-h-[340px] bg-[#000] border-2 border-blue-600 flex flex-col px-[40px] py-[24.33px] mb-[10%] rounded-[40px] space-y-[16px]">
        <FormField title="Title" isInput isDark />
        <FormField title="cost" isInput isDark />
        <FormField title="Number of Seats" type="number" isFile isDark />
        <FormField title="Event Image" isFile isDark />

        <button className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] px-6 py-2.5 rounded-[40px]">
          Submit
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
