const cors = require("cors");
const express = require("express");
const { v4: uuid } = require("uuid");

const config = require("./config");
const Stripe = require("stripe");
const Biconomy = require("@biconomy/mexa");
const Web3 = require("web3");
const stripe = Stripe(config.secretKey);
const web3Provider =
  "https://rinkeby.infura.io/v3/df7a863a2cac4eaba753dffecbe71f84";

const biconomy = new Biconomy(web3Provider, {
  apiKey: "l2fZwq-MV.0e8cda7f-36bd-4272-b6a2-2bc7e7e92e37",
});
web3 = new Web3(biconomy);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/payviacard", async (req, res) => {
  console.log("Request:", req.body);

  const userAddress = req.body.address;

  console.log(userAddress);
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

  res.json({ error, status });
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
