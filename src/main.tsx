import {
  Extension,
  RuntimeConnector,
  DatatokenClient,
} from "@dataverse/runtime-connector";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

interface Context {
  runtimeConnector: RuntimeConnector;
  datatokenClient: DatatokenClient;
}

export const Context = createContext<Context>({} as Context);
const runtimeConnector = new RuntimeConnector(Extension);
export const datatokenClient = DatatokenClient.Lens;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context.Provider value={{ runtimeConnector, datatokenClient }}>
    <App></App>
  </Context.Provider>
);
