import React, { createContext, useState } from "react";
import Web3 from "web3";
import Biconomy from "@biconomy/mexa";
import { config } from "./config";
import ContractsMetaData from "./ContractsMetaData";
export const Web3Context = createContext();

let _web3 = new Web3();

const Web3ContextProvider = (props) => {
  const [userAddress, setAddress] = useState(null);
  const [samajContract, setSamajContract] = useState();
  const [web3, setWeb3] = useState(_web3);
  const [isLoading, setLoading] = useState(true);

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
          .onEvent(biconomy.READY, async () => {
            console.log(ContractsMetaData);
            const samajContract = new web3.eth.Contract(
              ContractsMetaData.contractABI.samaj,
              ContractsMetaData.contractAddress.samaj
            );
            samajContract.setProvider(biconomy);

            setSamajContract(samajContract);
            console.log("Keshab");
            setLoading(false);
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
    <Web3Context.Provider
      value={{ web3, init, userAddress, samajContract, isLoading }}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
