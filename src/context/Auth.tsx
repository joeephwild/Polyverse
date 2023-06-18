import React, { useContext, createContext, useState, useEffect } from "react";
import {
  RuntimeConnector,
  Extension,
  WALLET,
} from "@dataverse/runtime-connector";
import {
  Polyverse,
  PolyverseABI,
  PolyverseToken,
  SubscriptionContract,
} from "../constant/Filecoin";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { returnContract } from "../hooks";
import { ethers } from "ethers";
import { CIDString } from "web3.storage";
import { toast } from "react-toastify";

interface TradeVerseNode {
  children: React.ReactNode;
}

interface Creator {
  name: string;
  image: string;
  category: string;
  bio: string;
  owner: string;
  cost: string;
}

interface PolyverseContextType {
  addCreator: (
    _name: string,
    _imagepath: string,
    _category: string,
    _bio: string,
    _subscriptionFee: ethers.BigNumber
  ) => Promise<void>;
  createPlan: (_name: string, amount: ethers.BigNumber) => Promise<void>;
  mint: (amount: number) => Promise<void>;
  userBalance: string;
  allCreator: Creator[]
  subscribeToArtist: (planId: any, price: any) => Promise<void>
}

const PolyverseContext = createContext<PolyverseContextType | null>(null);

export const PolyverseProvider = ({ children }: TradeVerseNode) => {
  const address = useAddress();
  const [userBalance, setUserBalance] = useState("");
  const [allCreator, setAllCreator] = useState([]);

  //const { contract } = useContract();
  const polyverse = returnContract(
    "0xBB66D901D27520563D7E6729C360087b93911506"
  );
  const PolyverseSubscription = returnContract(
    "0x5d9A44DF62d97Fa999EcC1754d70ED6a7E57fB37"
  );
  const Token = returnContract("0xAd12633ce674e9825cf8a7eE2Fe5D7D9C82685E9");

  const { mutateAsync: addCreator } = useContractWrite(polyverse, "addCreator");

  const createCreator = async (
    _name: string,
    _imagepath: string,
    _category: string,
    _bio: string,
    _subscriptionFee: ethers.BigNumber
  ) => {
    try {
      const data = await addCreator({
        args: [_name, _imagepath, _category, _bio, _subscriptionFee],
      });
      console.info("contract call successs", data);
    } catch (error) {
      alert(error);
    }
  };

  const { mutateAsync: createPlan } = useContractWrite(
    PolyverseSubscription,
    "createPlan"
  );

  const createAPlan = async (_name: string, amount: ethers.BigNumber) => {
    try {
      const data = await createPlan({ args: [_name, amount] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
  
  const mintPVToken = async (amount: number) => {
    try {
      const price = amount * 0.09
      const data = await Token?.call(
        "mint", // Name of your function as it is on the smart contract
        [amount],
        {
          value: ethers.utils.parseEther(price.toString()), // send 0.1 ether with the contract call
        }
      );
      toast.success("PVT token minted sucessfully");
      console.info("contract call successs", data);
    } catch (err) {
      toast.error("Pvt mint failed");
      console.error("contract call failure", err);
    }
  };

  const getUserBalance = async () => {
    try {
      const data = await Token?.call(
        "balanceOf", // Name of your function as it is on the smart contract
        [address]
      );
      console.info("contract call successs", data);
      setUserBalance(data);
    } catch (err) {
      alert(err);
      console.error("contract call failure", err);
    }
  };

  const fetchData = async (url: string) => {
    const fixedUrl = "https://gateway.ipfscdn.io/ipfs/" + url;
    const res = await fetch(fixedUrl);
    const data = await res;
    return data;
  };

  const fetchCreators = async () => {
    try {
      const tx = await polyverse?.call("getAllCreators", []);
      const parsedCreator = tx?.map((item: any, i: number) => ({
        name: item.name,
        image: item.imageIpfs,
        category: item.category,
        bio: item.bio,
        owner: item.owner,
        cost: ethers.utils.formatEther(item?.subscriptionFee?.toString()),
        pid: i + 1
      }));
      console.log(parsedCreator);
      setAllCreator(parsedCreator);
    } catch (error) {
      console.log(error);
    }
  };

  const subscribeToArtist = async (planId: any, price: any) => {
    try {
      const data = await PolyverseSubscription?.call(
        "subscribe",
        [planId],
        {
          value: ethers.utils.parseEther(price.toString()), 
        }
      );
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  useEffect(() => {
    if (Token) {
      getUserBalance();
    }
  }, [Token, address]);

  useEffect(() => {
    if (polyverse) {
      fetchCreators();
    }
  }, [polyverse, address]);

  return (
    <PolyverseContext.Provider
      value={{
        addCreator: createCreator,
        createPlan: createAPlan,
        mint: mintPVToken,
        userBalance,
        allCreator,
        subscribeToArtist
      }}
    >
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
