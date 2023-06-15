import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { WALLET } from "@dataverse/runtime-connector";

type PolyverseProviderProps = {
  children: React.ReactNode;
};

interface PolyverseContextType {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const PolyverseContext =
  React.createContext<PolyverseContextType | null>(null);

export const PolyverseProvider = ({ children }: PolyverseProviderProps) => {
  const [address, setAddress] = useState("");
  const runtimeConnector = new RuntimeConnector(Extension);

  useEffect(() => {
    const getAddres = async () => {
      const wallet = await runtimeConnector.connectWallet(WALLET.PARTICLE);
      setAddress(wallet.address);
      await runtimeConnector.createCapability({
        app: "Polyverse",
        wallet: WALLET.PARTICLE, // optional, if not connected
      });
    };
    getAddres();
  }, []);

  const value = {
    address,
    setAddress,
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
