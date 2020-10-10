//All contracts correspond to rinkeby network

module.exports = {
  tellorDataIDs: {
    dai: 39,
    usd: 1,
    bnb: 3,
    trx: 12,
  },

  contractAddress: {
    tellorGetLatestPrice: "0x1913713d479259580Be39969C89f4d162dA3b2d3",
    erc20NonApproveWithSignature: "0xA5D71ce2297Ff3c025Ece1F1Ea7975a76E0a1aD2",
    erc20ApproveWithSignature: "0x31DA332A7274B4E3E1d7456050Cd02B65B5dC9f0",
    samaj: "0x1608c137c39d9bfDfdfa5A889A6dE5d86435a260",
  },
  contractABI: {
    samaj: [
      {
        constant: false,
        inputs: [
          {
            internalType: "string",
            name: "_ipfsImageHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "_ipfsDetailsHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_payToken",
            type: "uint256",
          },
        ],
        name: "addBlog",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "string",
            name: "_ipfsImageHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "_ipfsDetailsHash",
            type: "string",
          },
        ],
        name: "addMiscPost",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "string",
            name: "_ipfsImageHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "_ipfsDetailsHash",
            type: "string",
          },
        ],
        name: "addPatents",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "string",
            name: "_ipfsImageHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "_ipfsDetailsHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_payToken",
            type: "uint256",
          },
        ],
        name: "addResearchPaper",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "uint256",
            name: "_amountInWei",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_userAddress",
            type: "address",
          },
        ],
        name: "chargeGasFeeInERC20ApproveWithSign",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "uint256",
            name: "_amountInWei",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_userAddress",
            type: "address",
          },
        ],
        name: "chargeGasFeeInErc20NonApproveWithSIgn",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "string",
            name: "_profileImageIPFShash",
            type: "string",
          },
          {
            internalType: "string",
            name: "_profileDetailsIPFSHash",
            type: "string",
          },
        ],
        name: "createUser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "functionSignature",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "sigR",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "sigS",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "sigV",
            type: "uint8",
          },
        ],
        name: "executeMetaTransaction",
        outputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address payable",
            name: "relayerAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "functionSignature",
            type: "bytes",
          },
        ],
        name: "MetaTransactionExecuted",
        type: "event",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "_userAccount",
            type: "address",
          },
        ],
        name: "getBlogs",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "ipfsDetailsHash",
                type: "string",
              },
              {
                internalType: "string",
                name: "ipfsImageHash",
                type: "string",
              },
            ],
            internalType: "struct Samaj.Blog[]",
            name: "_blogs",
            type: "tuple[]",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getChainID",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "pure",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "uint256",
            name: "_dataId",
            type: "uint256",
          },
        ],
        name: "getLatestPrice",
        outputs: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "_userAccount",
            type: "address",
          },
        ],
        name: "getMiscPosts",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "ipfsDetailsHash",
                type: "string",
              },
              {
                internalType: "string",
                name: "ipfsImageHash",
                type: "string",
              },
            ],
            internalType: "struct Samaj.MiscPost[]",
            name: "_miscPosts",
            type: "tuple[]",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getNonce",
        outputs: [
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "_userAccount",
            type: "address",
          },
        ],
        name: "getPatents",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "ipfsDetailsHash",
                type: "string",
              },
              {
                internalType: "string",
                name: "ipfsImageHash",
                type: "string",
              },
            ],
            internalType: "struct Samaj.Patent[]",
            name: "_patents",
            type: "tuple[]",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "_userAccount",
            type: "address",
          },
        ],
        name: "getResearchPapers",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "ipfsDetailsHash",
                type: "string",
              },
              {
                internalType: "string",
                name: "ipfsImageHash",
                type: "string",
              },
            ],
            internalType: "struct Samaj.ResearchPaper[]",
            name: "_researchPapers",
            type: "tuple[]",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "users",
        outputs: [
          {
            internalType: "bool",
            name: "isRegistered",
            type: "bool",
          },
          {
            internalType: "string",
            name: "profileImageIPFShash",
            type: "string",
          },
          {
            internalType: "string",
            name: "profileDetailsIPFSHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "numberOfBlogs",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "numberOfResearchPapers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "numberOfPatents",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "numberOfMiscPosts",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "chainID",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "functionSignature",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "sigR",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "sigS",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "sigV",
            type: "uint8",
          },
        ],
        name: "verify",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    erc20ApproveWithSignature: [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address payable",
            name: "relayerAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "functionSignature",
            type: "bytes",
          },
        ],
        name: "MetaTransactionExecuted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approveViaSignature",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "functionSignature",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "sigR",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "sigS",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "sigV",
            type: "uint8",
          },
        ],
        name: "executeMetaTransaction",
        outputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getChainID",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "pure",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getNonce",
        outputs: [
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "chainID",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "functionSignature",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "sigR",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "sigS",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "sigV",
            type: "uint8",
          },
        ],
        name: "verify",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],

    erc20NonApproveWithSignature: [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
};
// a316bef07e0d702dd155fc11c242a84383190b769472c023d17d9ad54c93d7aa;
