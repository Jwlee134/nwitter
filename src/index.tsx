import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { NweetContextProvider } from "./context/Nweet";
import { UserContextProvider } from "./context/User";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <NweetContextProvider>
        <App />
      </NweetContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
