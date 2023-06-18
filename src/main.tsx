import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { PolyverseProvider } from "./context/Auth";
import { FilecoinCalibrationTestnet } from'@thirdweb-dev/chains'
import { ProtocolProvider } from "./context";
import { ToastContainer } from "react-toastify";

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
  <ThirdwebProvider activeChain={FilecoinCalibrationTestnet}>
    <LivepeerConfig client={client} theme={livepeerTheme}>
      <PolyverseProvider>
        <ProtocolProvider>
          <App />
          <ToastContainer />
        </ProtocolProvider>
      </PolyverseProvider>
    </LivepeerConfig>
  </ThirdwebProvider>
);
