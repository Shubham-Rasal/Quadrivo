import { useContractRead } from "wagmi";

const vaultABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
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
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundingGoal",
        type: "uint256",
      },
    ],
    name: "ProjectRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "delegationAgreements",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
      {
        internalType: "address",
        name: "tokenToOwn",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftToOwn",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_projectId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "fundProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDelegationAgreements",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "delegator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "start",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "end",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "active",
            type: "bool",
          },
          {
            internalType: "address",
            name: "tokenToOwn",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftToOwn",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Vault.DelegationAgreement[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProjects",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "fundingGoal",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "fundingRecipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountRaised",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "fundingGoalReached",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "fundingClosed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "matchingPoolAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFunders",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "contributions",
            type: "uint256[]",
          },
        ],
        internalType: "struct Vault.Project[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "fundingGoal",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "fundingRecipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountRaised",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fundingGoalReached",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "fundingClosed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "matchingPoolAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalFunders",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tokenToOwn",
        type: "address",
      },
      {
        internalType: "address",
        name: "_nftToOwn",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "registerDelegationAggrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_fundingGoal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_matchingPoolAmount",
        type: "uint256",
      },
    ],
    name: "registerProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getAllDelegationAgreement() {
  const { data, error, isLoading } = useContractRead({
    abi: vaultABI,
    address: "0xa9023fedF58dcf60f94c73C150D4454eDD62bA23",
    functionName: "getDelegationAgreements",
  });

  return { data, error, isLoading };
}

export function getProjects() {
  const { data, error, isLoading } = useContractRead({
    abi: vaultABI,
    address: "0xa9023fedF58dcf60f94c73C150D4454eDD62bA23",
    functionName: "getProjects",
  });

  return { data, error, isLoading };
}
