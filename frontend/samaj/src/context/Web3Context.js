import React, { createContext, useState } from "react";
import Web3 from "web3";
import Biconomy from "@biconomy/mexa";
import { toBuffer } from "ethereumjs-util";
import { config } from "./config";
import ContractsMetaData from "./ContractsMetaData";

var abi = require("ethereumjs-abi");
export const Web3Context = createContext();

let _web3 = new Web3();

const Web3ContextProvider = (props) => {
  const [userAddress, setAddress] = useState(null);
  const [samajContract, setSamajContract] = useState();
  const [web3, setWeb3] = useState(_web3);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});

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
            const samajContract = new web3.eth.Contract(
              ContractsMetaData.contractABI.samaj,
              ContractsMetaData.contractAddress.samaj
            );
            samajContract.setProvider(biconomy);

            setSamajContract(samajContract);
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

  //functionDataExample = contract.methods.setQuote("New Quote via meat TX")

  const sendTransaction = async (functionData) => {
    if (samajContract) {
      let nonce = await samajContract.methods.getNonce(userAddress).call();
      let functionSignature = functionData.encodeABI();
      let messageToSign = constructMetaTransactionMessage(
        nonce,
        4,
        functionSignature,
        ContractsMetaData.contractAddress.samaj
      );
      const signature = await web3.eth.personal.sign(
        "0x" + messageToSign.toString("hex"),
        userAddress
      );
      console.info(`User signature is ${signature}`);
      let { r, s, v } = getSignatureParameters(signature);
      relayTransaction(userAddress, functionSignature, r, s, v);
    }
  };

  const relayTransaction = async (userAddress, functionData, r, s, v) => {
    if (web3 && samajContract) {
      try {
        let gasLimit = await samajContract.methods
          .executeMetaTransaction(userAddress, functionData, r, s, v)
          .estimateGas();
        let gasPrice = await web3.eth.getGasPrice();
        console.log(gasLimit);
        console.log(gasPrice);
        let tx = samajContract.methods
          .executeMetaTransaction(userAddress, functionData, r, s, v)
          .send({
            from: userAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
          });

        tx.on("transactionHash", function (hash) {
          console.log(`Transaction hash is ${hash}`);
          alert(`Transaction sent by relayer with hash ${hash}`);
        }).once("confirmation", function (confirmationNumber, receipt) {
          console.log(receipt);
          alert("Transaction confirmed on chain");
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const constructMetaTransactionMessage = (
    nonce,
    chainId,
    functionSignature,
    contractAddress
  ) => {
    return abi.soliditySHA3(
      ["uint256", "address", "uint256", "bytes"],
      [nonce, contractAddress, chainId, toBuffer(functionSignature)]
    );
  };

  const getSignatureParameters = (signature) => {
    if (!web3.utils.isHexStrict(signature)) {
      throw new Error(
        'Given value "'.concat(signature, '" is not a valid hex string.')
      );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = web3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
      r: r,
      s: s,
      v: v,
    };
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        init,
        userAddress,
        samajContract,
        isLoading,
        sendTransaction,
      }}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
