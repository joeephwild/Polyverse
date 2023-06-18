import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

// Import the ABI and contract address
import SubscriptionContractABI from "./SubscriptionContract.json";
import { sendNotification } from "@pushprotocol/restapi/src/lib/payloads";
import { useAddress } from "@thirdweb-dev/react";

interface PolyverseChildrenNode {
  children: React.ReactNode;
}

// Create a context for the subscription contract
export const SubscriptionContext = createContext<any>(null);

// Provider component to wrap your app and provide access to the contract functions
export const SubscriptionProvider: React.FC<PolyverseChildrenNode> = ({
  children,
}) => {
  const [subscriptionContract, setSubscriptionContract] =
    useState<ethers.Contract>();
  const [allPlans, setAllPlans] = useState<any[]>([]);
  const [userPlans, setUserPlans] = useState<any>({})
  const [allSubscriptions, setAllSubscriptions] = useState<any[]>([]);

  // Initialize the subscription contract
  useEffect(() => {
    const initializeContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const contractAddress = "0xc166789539A1c5309a9f413E829A629071361214";
        const contract = new ethers.Contract(
          contractAddress,
          SubscriptionContractABI.abi,
          signer
        );
        setSubscriptionContract(contract);
      } catch (error) {
        console.error("Failed to initialize contract:", error);
      }
    };

    initializeContract();
  }, []);

 async function getPlan(address: any) {
    const userPlan =allPlans.filter((item) => item.artist === address);
    setUserPlans(userPlan)
    return userPlan
  }

  const formatDate = (date: any) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const startDate = new Date(date).toLocaleDateString("en-US", options);
    return startDate;
  };

  // Function to fetch all plans
  const fetchAllPlans = async () => {
    try {
      const totalPlans = await subscriptionContract?.getAllPlan();
      const parsedPlans = await totalPlans.map((item: any, i: any) => ({
        amount: ethers.utils.formatEther(item.amount),
        artist: item.artist,
        month: formatDate(item.frequency.toNumber()),
        name: item.name,
        nftAddress: item.nftAddress,
        pid: i,
      }));
      setAllPlans(parsedPlans);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  const address = useAddress();

  useEffect(() => {
    fetchAllPlans();
    //fetchAllSubscriptions()
  }, [address]);

  // Function to check if a subscriber is subscribed to a plan
  const isSubscriber = async (artistAddress: string, planId: number) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const subscriberAddress = accounts[0];
      const isSubscribed = await subscriptionContract?.isSubscriber(
        artistAddress,
        subscriberAddress,
        planId
      );
      return isSubscribed;
    } catch (error) {
      console.error("Failed to check subscription:", error);
      return false;
    }
  };

  // Function to make a payment for a subscription plan
  const pay = async (planId: number) => {
    try {
      await subscriptionContract?.pay(planId);
      // Perform any additional actions after payment
    } catch (error) {
      console.error("Failed to make payment:", error);
    }
  };

  // Function to cancel a subscription plan
  const cancel = async (planId: number) => {
    try {
      await subscriptionContract?.cancel(planId);
      // Perform any additional actions after cancellation
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    }
  };

  const subscribe = async (planId: number, cost: any) => {
    try {
      // Estimate the gas limit
      const gasLimit = await subscriptionContract?.estimateGas.subscribe(
        planId,
        {
          value: ethers.utils.parseEther(cost),
        }
      );

      // Subscribe to the plan
      await subscriptionContract?.subscribe(planId, {
        value: ethers.utils.parseEther(cost),
        gasLimit: gasLimit,
      });
      // Perform any additional actions after subscription
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  };

  // Function to create a new plan
  const createPlan = async (name: string, amount: number) => {
    try {
      await subscriptionContract?.createPlan(name, amount);
      // Perform any additional actions after plan creation
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  // Define the contract functions you want to expose in the context
  const contextValue = {
    subscriptionContract,
    allPlans,
    allSubscriptions,
    fetchAllPlans,
    isSubscriber,
    pay,
    cancel,
    subscribe,
    createPlan,
    userPlans,
    getPlan,
    setAllPlans
  };

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to easily access the subscription context
export const useSubscription = () => useContext(SubscriptionContext);
