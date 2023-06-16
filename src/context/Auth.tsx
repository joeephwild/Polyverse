import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { WALLET } from "@dataverse/runtime-connector";
import { Polyverse, PolyverseABI } from "../constant/Filecoin";

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
  const runtimeConnector = new RuntimeConnector(Extension);

  useEffect(() => {
    const getAddres = async () => {
      const wallet = await runtimeConnector.connectWallet(WALLET.METAMASK);
      setAddress(wallet.address);
      await runtimeConnector.switchNetwork(314159);
      await runtimeConnector.checkCapability()
    };
    getAddres();
  }, []);

  const createCreator = async (data: string, amount: number) => {
    try {
      await runtimeConnector.contractCall({
        contractAddress: Polyverse,
        abi:PolyverseABI,
        method: "addCreator",
        params: [data, amount],
      });
    } catch (error) {
      alert(error);
    }
  };

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
