import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Currency,
  Extension,
  FileType,
  MirrorFile,
  RuntimeConnector,
} from "@dataverse/runtime-connector";
import app from "../../output/app.json";
import { useWallet, useStream } from "../hooks";
import { Model } from "../types";

type PolyverseProviderProps = {
  children: React.ReactNode;
};

interface PolyverseState {
  currentStreamId: string;
  publicPost: string;
}

interface PolyverseContextType {
  createPublicPost: () => Promise<void>;
  createEncryptedPost: () => Promise<void>;
  createPayablePost: () => Promise<void>;
  loadPosts: () => Promise<void>;
  updatePost: () => Promise<void>;
  monetizePost: () => Promise<void>;
  unlockPost: () => Promise<void>;
  connect: () => Promise<string>;
  postModel: Model;
  currentStreamId: string | undefined;
  publicPost: MirrorFile | undefined;
  encryptedPost: MirrorFile | undefined;
  payablePost: MirrorFile | undefined;
  posts: MirrorFile[] | undefined;
  updatedPost: MirrorFile | undefined;
  monetizedPost: MirrorFile | undefined;
  unlockedPost: MirrorFile | undefined;
  runtimeConnector: RuntimeConnector;
}

export const PolyverseContext =
  React.createContext<PolyverseContextType | null>(null);

export const PolyverseProvider = ({ children }: PolyverseProviderProps) => {
  const runtimeConnector = new RuntimeConnector(Extension);
  const postVersion = "0.0.1";
  const [postModel, setPostModel] = useState<Model>({
    name: "",
    stream_id: "",
    isPublicDomain: false,
  });
  const [currentStreamId, setCurrentStreamId] = useState<string>();
  const [publicPost, setPublicPost] = useState<MirrorFile>();
  const [encryptedPost, setEncryptedPost] = useState<MirrorFile>();
  const [payablePost, setPayablePost] = useState<MirrorFile>();
  const [posts, setPosts] = useState<MirrorFile[]>(); // All posts
  const [updatedPost, setUpdatedPost] = useState<MirrorFile>();
  const [monetizedPost, setMonetizedPost] = useState<MirrorFile>();
  const [unlockedPost, setUnlockedPost] = useState<MirrorFile>();
  const { wallet, connectWallet, switchNetwork } = useWallet();
  const {
    pkh,
    streamRecord,
    createCapability,
    loadStream,
    createPublicStream,
    createEncryptedStream,
    createPayableStream,
    monetizeStream,
    unlockStream,
    updateStream,
  } = useStream(app.createDapp.name, wallet);

  useEffect(() => {
    setPostModel(
      app.createDapp.streamIDs.find(
        (model: any) => model.name === `${app.createDapp.slug}_post`
      ) as Model
    );
  }, []);



  const connect = async () => {
    await connectWallet();
    await switchNetwork(3141);
    const pkh = await createCapability();
    console.log("pkh:", pkh);
    return pkh;
  };

  const createPublicPost = async () => {
    const date = new Date().toISOString();
    const res = await createPublicStream({
      pkh,
      model: postModel,
      stream: {
        appVersion: postVersion,
        text: "hello",
        images: [
          "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        ],
        videos: [],
        createdAt: date,
        updatedAt: date,
      },
    });

    console.log("createPublicStream res:", res);
    setCurrentStreamId(res.streamId);
    setPublicPost(res.stream);
  };

  const createEncryptedPost = async () => {
    const date = new Date().toISOString();
    const res = await createEncryptedStream({
      model: postModel,
      stream: {
        appVersion: postVersion,
        text: "hello",
        images: [
          "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        ],
        videos: [],
        createdAt: date,
        updatedAt: date,
      },
      encrypted: {
        text: true,
        images: true,
        videos: false,
      },
    });
    console.log("createEncryptedStream res:", res);
    setCurrentStreamId(res.streamId);
    setEncryptedPost(res.stream);
  };

  const createPayablePost = async () => {
    const date = new Date().toISOString();
    const res = await createPayableStream({
      pkh,
      model: postModel,
      stream: {
        appVersion: postVersion,
        text: "metaverse",
        images: [
          "https://bafkreidhjbco3nh4uc7wwt5c7auirotd76ch6hlzpps7bwdvgckflp7zmi.ipfs.w3s.link/",
        ],
        videos: [],
        createdAt: date,
        updatedAt: date,
      },
      lensNickName: "luketheskywalker1", //Only supports lower case characters, numbers, must be minimum of 5 length and maximum of 26 length
      currency: Currency.WMATIC,
      amount: 0.0001,
      collectLimit: 1000,
      encrypted: {
        text: true,
        images: true,
        videos: false,
      },
    });
    console.log("createPayableStream res:", res);
    setCurrentStreamId(res.streamId);
    setPayablePost(res.content);
  };

  const loadPosts = async () => {
    const postRecord = await loadStream({
      pkh,
      modelId: postModel.stream_id,
    });
    console.log("loadPosts postRecord:", postRecord);
    setPosts(Object.values(postRecord));
  };

  const updatePost = async () => {
    if (!currentStreamId) {
      return;
    }
    const stream = streamRecord[currentStreamId];

    const res = await updateStream({
      pkh,
      model: postModel,
      streamId: currentStreamId,
      stream: {
        text: "update my post -- " + new Date().toISOString(),
        images: [
          "https://bafkreidhjbco3nh4uc7wwt5c7auirotd76ch6hlzpps7bwdvgckflp7zmi.ipfs.w3s.link",
        ],
      },
      encrypted: { text: true, images: true, videos: false },
    });
    console.log("updateStream res:", res);
    setUpdatedPost(res.stream);
  };

  const monetizePost = async () => {
    if (!currentStreamId) {
      return;
    }
    const res = await monetizeStream({
      pkh,
      model: postModel,
      streamId: currentStreamId,
      lensNickName: "jackieth", //Only supports lower case characters, numbers, must be minimum of 5 length and maximum of 26 length
      currency: Currency.WMATIC,
      amount: 0.0001,
      collectLimit: 1000,
      encrypted: {
        text: true,
        images: true,
        videos: false,
      },
    });
    console.log("monetizeStream res:", res);
    setMonetizedPost(res.content);
  };

  const unlockPost = async () => {
    if (!currentStreamId) {
      return;
    }
    const res = await unlockStream(currentStreamId);
    console.log("unlockStream res:", res);
    setUnlockedPost(res.stream);
  };

  const value: PolyverseContextType = {
    createPublicPost,
    createEncryptedPost,
    createPayablePost,
    loadPosts,
    updatePost,
    monetizePost,
    unlockPost,
    postModel,
    currentStreamId,
    publicPost,
    encryptedPost,
    payablePost,
    posts,
    updatedPost,
    monetizedPost,
    unlockedPost,
    connect,
    runtimeConnector
  };
  return <PolyverseContext.Provider value={value}>
    {children}
  </PolyverseContext.Provider>;
};

export const usePolyverseContext = (): PolyverseContextType => {
  const contextValue = useContext(PolyverseContext);
  if (contextValue === null) {
    throw new Error("useErrandContext must be used within a PolyverseProvider");
  }
  return contextValue;
};
