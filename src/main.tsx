import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PolyverseProvider } from "./context";
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

interface Context {
  runtimeConnector: RuntimeConnector;
}

export const Context = createContext<Context>({} as Context);
const runtimeConnector = new RuntimeConnector(Extension);

const client = createReactClient({
  provider: studioProvider({ apiKey: "yourStudioApiKey" }),
});

const livepeerTheme: ThemeConfig = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LivepeerConfig client={client} theme={livepeerTheme}>
    <App />
  </LivepeerConfig>
);
