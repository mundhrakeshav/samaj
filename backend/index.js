const cors = require("cors");
const express = require("express");
const { v4: uuid } = require("uuid");
const Wallet = require("ethereumjs-wallet");
const EthereumTx = require("ethereumjs-tx").Transaction;
const config = require("./config");
const Stripe = require("stripe");
const contractsMetaData = require("./contractMetaData");
const Biconomy = require("@biconomy/mexa");
const Web3 = require("web3");
const stripe = Stripe(config.secretKey);
const web3Provider =
  "https://rinkeby.infura.io/v3/df7a863a2cac4eaba753dffecbe71f84";

const biconomy = new Biconomy(web3Provider, {
  apiKey: "l2fZwq-MV.0e8cda7f-36bd-4272-b6a2-2bc7e7e92e37",
});
web3 = new Web3(biconomy);
const wallet = web3.eth.accounts.wallet.add(
  "0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318"
);

const app = express();

app.use(express.json());
app.use(cors());

const usdTokenContract = new web3.eth.Contract(
  contractsMetaData.contractABI.usdToken,
  contractsMetaData.contractAddress.usdToken
);

const samajContract = new web3.eth.Contract(
  contractsMetaData.contractABI.samaj,
  contractsMetaData.contractAddress.samaj
);

usdTokenContract.setProvider(biconomy);

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/payviacard", async (req, res) => {
  // console.log("Request:", req.body);

  const userAddress = req.body.address;
  const amount = parseInt(req.body.product.price);
  console.log(userAddress);
  console.log(amount);
  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
  sendTransaction();
  res.json({ error, status });
});

const sendTransaction = async (userAddress, amount) => {
  if (usdTokenContract) {
    let nonce = await samajContract.methods.getNonce(userAddress).call();
    let functionSignature = usdTokenContract
      .mint(userAddress, amount)
      .encodeABI();
    let messageToSign = constructMetaTransactionMessage(
      nonce,
      4,
      functionSignature,
      contractsMetaData.contractAddress.usdToken
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
  if (web3 && usdTokenContract) {
    try {
      let gasLimit = await usdTokenContract.methods
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
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
