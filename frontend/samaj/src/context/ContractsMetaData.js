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
    samaj: "0x262279099aeAa6FDD7CFFFC9050adcc6873aeA44",
  },
  contractABI: {
    samaj: [
      {
        constant: false,
        inputs: [
          {
            internalType: "string",
            name: "_title",
            type: "string",
          },
          {
            internalType: "string",
            name: "_ipfsHash",
            type: "string",
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
            name: "_title",
            type: "string",
          },
          {
            internalType: "string",
            name: "_ipfsHash",
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
            name: "_title",
            type: "string",
          },
          {
            internalType: "string",
            name: "_ipfsHash",
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
            name: "_title",
            type: "string",
          },
          {
            internalType: "string",
            name: "_ipfsHash",
            type: "string",
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
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "ipfsHash",
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
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "ipfsHash",
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
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "ipfsHash",
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
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "ipfsHash",
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
  },
};
