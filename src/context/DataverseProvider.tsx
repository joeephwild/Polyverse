import { useState, createContext, useContext, useEffect } from "react";
import {
  Extension,
  Mode,
  RuntimeConnector,
  WALLET,
} from "@dataverse/runtime-connector";
import { ethers } from "ethers";
import Polyverse from "./Polyverse.json";
import SubscriptionContractABI from "./SubscriptionContract.json";
import React from "react";
import { Ticket } from "../components";

interface DataverseChildren {
  children: React.ReactNode;
}

interface DataverseContextTypes {
  runtimeConnector: RuntimeConnector | undefined;
  address: string;
  setAddress: any;
  contractCall: (
    name: string,
    imagepath: string,
    category: string,
    bio: string,
    subscriptionFee: ethers.BigNumber
  ) => Promise<void>;
  createAPlan: (name: string, amount: ethers.BigNumber) => Promise<void>;
  uploadVideo: (_title: string, _description: string, _videoFile: string, _image: string, _category: string) => Promise<void>
  uploadMusic: (_title: string, _musicFile: string, _image: string, _category: string, _features: string) => Promise<void>
}

const DataverseContext = createContext<DataverseContextTypes | null>(null);

export const DataverseProvider = ({ children }: DataverseChildren) => {
  const [address, setAddress] = useState("");
  const runtimeConnector = new RuntimeConnector(Extension);
  const polyverseContract = "0x06Eed8DFeF03dBB02bd5B8C76E8d0a1B976CBB0A";
  const subscriptionContract = "0xc0ea179a9fC607a83E50a56d134cc58474918AAC";

  useEffect(() => {
    const createCapability = async () => {
      const pkh = await runtimeConnector?.createCapability({
        app: "PolyverseTest",
        wallet: WALLET.METAMASK, // optional, if not connected
      });
      console.log(pkh);
      return pkh;
    };

    const connectWallet = async () => {
      try {
        const wallet = await runtimeConnector?.connectWallet(WALLET.METAMASK);
        await runtimeConnector?.switchNetwork(314159);
        createCapability();
        console.log(wallet);
        setAddress(wallet?.address);
      } catch (error) {
        console.error(error);
      }
    };

    connectWallet();
  }, []);

  const contractCall = async (
    name: string,
    imagepath: string,
    category: string,
    bio: string,
    subscriptionFee: ethers.BigNumber
  ) => {
    await runtimeConnector?.connectWallet(WALLET.METAMASK);
    const res = await runtimeConnector?.contractCall({
      contractAddress: polyverseContract,
      abi: Polyverse.abi,
      method: "addCreator",
      params: [name, imagepath, category, bio, subscriptionFee],
      mode: Mode.Write,
    });
    console.log({ res });
  };

  const listEvent = async (
    name: string,
    cost: number,
    maxTickets: number,
    date: string,
    time: string,
    location: string
  ) => {
    await runtimeConnector?.connectWallet(WALLET.METAMASK);
    const res = await runtimeConnector?.contractCall({
      contractAddress: polyverseContract,
      abi: Polyverse.abi,
      method: "listEvent",
      params: [name, cost, maxTickets, date, time, location],
      mode: Mode.Write,
    });
    console.log({ res });
  };

  const createAPlan = async (name: string, amount: ethers.BigNumber) => {
    await runtimeConnector?.connectWallet(WALLET.METAMASK);
    const res = await runtimeConnector?.contractCall({
      contractAddress: subscriptionContract,
      abi: SubscriptionContractABI.abi,
      method: "createPlan",
      params: [name, amount],
      mode: Mode.Write,
    });
    console.log({ res });
  };

  const uploadVideo = async (
    _title: string,
    _description: string,
    _videoFile: string,
    _image: string,
    _category: string
  ) => {
    await runtimeConnector?.connectWallet(WALLET.METAMASK);
    const res = await runtimeConnector?.contractCall({
      contractAddress: polyverseContract,
      abi: Polyverse.abi,
      method: "uploadAMusic",
      params: [_title, _description, _videoFile, _image, _category],
      mode: Mode.Write,
    });
    console.log({ res });
  };

  const uploadMusic = async (
    _title: string,
    _musicFile: string,
    _image: string,
    _category: string,
    _features: string
  ) => {
    await runtimeConnector?.connectWallet(WALLET.METAMASK);
    const res = await runtimeConnector?.contractCall({
      contractAddress: polyverseContract,
      abi: Polyverse.abi,
      method: "uploadAVideo",
      params: [_title, _musicFile, _image, _category, _features],
      mode: Mode.Write,
    });
    console.log({ res });
  };

  // Function to fetch all events from the contract
  const fetchAllEvents = async () => {
    try {
      await runtimeConnector?.connectWallet(WALLET.METAMASK);
      const res = await runtimeConnector?.contractCall({
        contractAddress: polyverseContract,
        abi: Polyverse.abi,
        method: "getAllEvents",
        params: [],
        mode: Mode.Read,
      });
      console.log({ res });
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  // Function to fetch all tickets from the contract
  const fetchAllTickets = async () => {
    try {
      await runtimeConnector?.connectWallet(WALLET.METAMASK);
      const res = await runtimeConnector?.contractCall({
        contractAddress: polyverseContract,
        abi: Polyverse.abi,
        method: "getAllTickets",
        params: [],
        mode: Mode.Read,
      });
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
    fetchAllTickets();
  }, [address]);

  const value = {
    address,
    runtimeConnector,
    setAddress,
    contractCall,
    createAPlan,
    uploadMusic,
    uploadVideo
  };
  return (
    <DataverseContext.Provider value={value}>
      {children}
    </DataverseContext.Provider>
  );
};

// Custom hook to access the context
export const useDataverse = (): DataverseContextTypes => {
  const contextValue = useContext(DataverseContext);
  if (contextValue === null) {
    throw new Error("useErrandContext must be used within a PolyverseProvider");
  }
  return contextValue;
};
