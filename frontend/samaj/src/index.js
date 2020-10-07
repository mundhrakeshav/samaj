import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3ContextProvider from "./context/Web3Context";

import App from "./App";

ReactDOM.render(
  <Web3ContextProvider>
    <App />
  </Web3ContextProvider>,
  document.getElementById("root")
);
