import React, { createContext, useState } from "react";
import Web3 from "web3";
import { config } from "./config";
import Biconomy from "@biconomy/mexa";
export const Web3Context = createContext();

let _web3 = new Web3();

const Web3ContextProvider = (props) => {
  const [web3, setWeb3] = useState(_web3);
  const [userAddress, setAddress] = useState(null);

  const init = async () => {
    if (window.ethereum) {
      try {
        const provider = window.ethereum;
        const biconomy = new Biconomy(provider, {
          apiKey: config.biconomyApiKey,
          debug: true,
        });
        await window.ethereum.enable();
        setWeb3(new Web3(biconomy));
        setAddress(provider.selectedAddress);

        biconomy
          .onEvent(biconomy.READY, () => {
            // contract = new web3.eth.Contract(
            //   config.contract.abi,
            //   config.contract.address
            // );
            // setSelectedAddress(provider.selectedAddress);
            // getQuoteFromNetwork();

            provider.on("accountsChanged", function (accounts) {
              setAddress(accounts[0]);
            });
          })
          .onEvent(biconomy.ERROR, (err, message) => {
            alert(message);
            console.log(err, message);
          });
      } catch (error) {
        console.log("Please allow access to connect to web3 ");
      }
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  return (
    <Web3Context.Provider value={{ web3, init, userAddress }}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
