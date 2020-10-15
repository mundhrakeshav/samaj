# Samaj

---

**Samaj** is a **decenteralised** social network built on **Ethereum** and **IPFS**. It's an attempt (currently-not Complete) to make social network's **censorless** and **free of any influence**. Apart from that it there has been a huge focus on **UX**, as blockchain based DApps have a huge UX barrier of getting a wallet and getting ether (Ethereum's native currency) from some exchange or some other place and then using the app.

## Idea

The idea is to let people interact with the **dapp** using any **ERC20** token as **gasFee** instead of Ether and cutting a lot of trouble. We've used unleashed the supremacy of meta-transactions to do this.

Thanks, to [Biconomy's](https://github.com/bcnmy) API used to relay meta-transactions to network and [Tellor's](https://github.com/tellor-io) Price-feed API to get on contract value for various ERC20 tokens and charge gas fee accordingly.
Basically letting users pay gas fee in any erc20 tokens also by card payments. By allowing contract to transfer on user's behalf and using decentralised oracles to get on chain price feed to charge them in erc20.
Also, we've a pay via card option such that whatever amount user deposits is mapped to their address on a contract and we use price feed API from Tellor to get exact value for USDtoETH, for each transaction they can be charged the same amount in USD instead of ETH or WEI.

### Code sample to charge gasFee in ERC20

```jsx
function someFunction() {
	uint initialGas = gasleft();
	uint gasPrice = tx.gasprice;
	uint gasUsed = initialGas - gasleft();
	uint txCost = gasUsed * gasPrice;
	chargeGasFeeInERC20(txCost, msg.sender);
}

function chargeGasFeeInERC20(uint _amountInWei, address _userAddress) public returns(uint){
  uint latestPriceEthToUsd = getLatestPrice(1);
  uint latestPriceDaiToUsd = getLatestPrice(39);
  uint ethToDai = latestPriceDaiToUsd * latestPriceEthToUsd;
  uint amount = ethToDai * _amountInWei;
  erc20Contract.transferFrom(_userAddress, address(this), amount);
}

function getLatestPrice(uint _dataId) view public  returns(uint value) {
   return tellorContract.readTellorValue(_dataId)/1e6;
}
```

## Business Model

Some of the functions like registering to the app and Allowance is free of cost but other functions that include posting stuff and supporting a user can be paid in ERC20 and we can charge them a fraction more to use that way.

## Getting Started

**Build the application. To build checkout [frontend](https://github.com/mundhrakeshav/samaj/tree/master/frontend/samaj) and [backend](https://github.com/mundhrakeshav/samaj/tree/master/frontend/samaj) directories.**

After Building:

1. You have to register with a username, a bio and a profile image.

   ![Samaj%206100ad238dcd4420aca9e833bd8758f0/Screenshot_from_2020-10-13_22-21-51.png](Samaj%206100ad238dcd4420aca9e833bd8758f0/Screenshot_from_2020-10-13_22-21-51.png)

2. After registering you get taken to home page[which isn't ready] so navigate to profile page and you can check out your profile and summary of all your uploads.

   ![Samaj%206100ad238dcd4420aca9e833bd8758f0/Screenshot_from_2020-10-13_22-29-44.png](Samaj%206100ad238dcd4420aca9e833bd8758f0/Screenshot_from_2020-10-13_22-29-44.png)

3. The column on right has details of various ERC20 tokens you can pay with, it has details like balance and allowanace to our contract, Also you can allow us to handle 100 Tokens on your account. Also, We've a option for Pay with card.

   ![Samaj%206100ad238dcd4420aca9e833bd8758f0/Screenshot_from_2020-10-13_22-34-31.png](Samaj%206100ad238dcd4420aca9e833bd8758f0/Screenshot_from_2020-10-13_22-34-31.png)

4. Clicking on View Blog button or View Post button you can view detailed posts.
5. Also we have a search option where you can search a user with their address and on search page you can support the user.
