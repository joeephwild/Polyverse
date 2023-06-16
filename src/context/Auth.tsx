import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { WALLET } from "@dataverse/runtime-connector";
import {
  Polyverse,
  PolyverseABI,
  PolyverseToken,
  TokenAbi,
} from "../constant/Filecoin";

type PolyverseProviderProps = {
  children: React.ReactNode;
};

interface PolyverseContextType {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  createCreator: (data: string, amount: number) => Promise<void>;
}

export const PolyverseContext =
  React.createContext<PolyverseContextType | null>(null);

export const PolyverseProvider = ({ children }: PolyverseProviderProps) => {
  const [address, setAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [allCreator, setAllCreator] = useState([]);
  const [allTicket, setAllTicket] = useState([]);
  const [allEvent, setAllEvent] = useState([]);
  const runtimeConnector = new RuntimeConnector(Extension);

  useEffect(() => {
    const getAddress = async () => {
      const wallet = await runtimeConnector.connectWallet(WALLET.METAMASK);
      setAddress(wallet.address);
      await runtimeConnector.switchNetwork(314159);
      await runtimeConnector.checkCapability();
    };
    getAddress();
  }, []);

  const createCreator = async (data: string, amount: number) => {
    try {
      await runtimeConnector.connectWallet(WALLET.METAMASK);
      await runtimeConnector.contractCall({
        contractAddress: Polyverse,
        abi: PolyverseABI,
        method: "addCreator",
        params: [data, amount],
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const setBalance = async () => {
      try {
        await runtimeConnector.connectWallet(WALLET.METAMASK);
        const tx = await runtimeConnector.contractCall({
          contractAddress: PolyverseToken,
          abi: TokenAbi,
          method: "getUserBalance",
          params: [address],
        });
        setUserBalance(tx.toString());
      } catch (error) {
        alert(error);
      }
    };

    setBalance();
  }, [address]);

  const listAnEvent = async (
    seatno: number,
    eventData: string,
    price: number,
    deadline: number,
    eventName: string
  ) => {
    try {
      await runtimeConnector.connectWallet(WALLET.METAMASK);
      await runtimeConnector.contractCall({
        contractAddress: Polyverse,
        abi: PolyverseABI,
        method: "listEvent",
        params: [seatno, eventData, price, deadline, eventName],
      });
    } catch (error) {
      alert(error);
    }
  };

  const getAllCreators = async () => {
    try {
      await runtimeConnector.connectWallet(WALLET.METAMASK);
      const tx = await runtimeConnector.contractCall({
        contractAddress: Polyverse,
        abi: PolyverseABI,
        method: "getAllCreator",
        params: [],
      });
      setAllCreator(tx);
    } catch (error) {
      alert(error);
    }
  };

  const getAllTickets = async () => {
    try {
      await runtimeConnector.connectWallet(WALLET.METAMASK);
      const tx = await runtimeConnector.contractCall({
        contractAddress: Polyverse,
        abi: PolyverseABI,
        method: "getAllTicket",
        params: [],
      });
      setAllTicket(tx);
    } catch (error) {
      alert(error);
    }
  };

  const getAllEvents = async () => {
    try {
      await runtimeConnector.connectWallet(WALLET.METAMASK);
      const tx = await runtimeConnector.contractCall({
        contractAddress: Polyverse,
        abi: PolyverseABI,
        method: "getAllEvent",
        params: [],
      });
      setAllTicket(tx);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllCreators();
    getAllEvents();
    getAllTickets();
  }, [address]);

  const value = {
    address,
    setAddress,
    createCreator,
  };
  return (
    <PolyverseContext.Provider value={value}>
      {children}
    </PolyverseContext.Provider>
  );
};

export const usePolyverseContext = (): PolyverseContextType => {
  const contextValue = useContext(PolyverseContext);
  if (contextValue === null) {
    throw new Error("useErrandContext must be used within a PolyverseProvider");
  }
  return contextValue;
};
