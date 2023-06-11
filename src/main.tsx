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

import { ModalProvider,  } from '@particle-network/connect-react-ui';
import { WalletEntryPosition,   } from '@particle-network/auth';
import { Ethereum, EthereumGoerli } from '@particle-network/common';

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
  <ModalProvider
  options={{
      projectId: 'a581fe1b-809a-40f9-a9e5-6ac8683695fc',
      clientKey: 'ccyYA3EfVgH6LjvwxCbdi4E3qdkzjRmZR3t4c0Ot',
      appId: 'c859c0a7-fedf-48d1-844f-5813a3c228ca',
      chains: [
          Ethereum,
          EthereumGoerli
      ],
      particleWalletEntry: {    //optional: particle wallet config
          displayWalletEntry: true, //display wallet button when connect particle success.
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains:[
              Ethereum,
              EthereumGoerli
          ],
          customStyle: {}, //optional: custom wallet style
      },
     // wallets: evmWallets({ qrcode: false }),
  }}
  theme={'auto'}
  language={'en'}   //optional：localize, default en
  walletSort={['Particle Auth', 'Wallet']} //optional：walelt order
  particleAuthSort={[    //optional：display particle auth items and order
      'email',
      'phone',
      'google',
      'apple',
      'facebook'
  ]}
>
  <LivepeerConfig client={client} theme={livepeerTheme}>
    <App />
  </LivepeerConfig>
  </ModalProvider>
);
