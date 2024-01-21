"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import {
  readContracts,
  useNetwork,
  useContractRead,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { fetchBalance } from "@wagmi/core";
import { ethers, parseEther } from "ethers";
import { set } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { GitBranch } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
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

  const { chain } = useNetwork();
  const { address } = useAccount();

  const [name, setName] = useState<string>("Deano");
  const [description, setDescription] = useState<string>(
    "Testing the limits of decentralised annotation"
  );
  const [github, setGithub] = useState<string>(
    "https://github.com/dmihal/eth-permit/blob/master/README.md"
  );
  const [fundingGoal, setFundingGoal] = useState<number>(0);
  const [githubStars, setGithubStars] = useState<number>(0);
  const [relatedContract, setRelatedContract] = useState<[string]>();
  const [totalAmount, setTotalAmount] = useState<bigint>(BigInt(0));
  const [verification, setVerification] = useState<boolean>(false);
  const [agreement, setAgreement] = useState<string[]>([]);

  const { data, error, isLoading } = useContractRead({
    abi: vaultABI,
    address: "0xa9023fedF58dcf60f94c73C150D4454eDD62bA23",
    functionName: "getDelegationAgreements",
  });
  console.log(data);

  // async function checkOwnership() {
  //   // Replace these values with your actual contract address, contract ABI, and the user's address
  //   const contractAddress = 'YOUR_NFT_CONTRACT_ADDRESS';
  //   const userAddress = 'USER_ADDRESS_TO_CHECK';

  //   const provider = ethers.getDefaultProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`);

  //   // Connect to the contract using the contract address and ABI
  //   const contract = new ethers.Contract(contractAddress, vaultABI, provider);

  //   try {
  //     // Call the balanceOf function to get the number of NFTs owned by the user
  //     const balance = await contract.balanceOf(userAddress);

  //     if (balance.gt(0)) {
  //       console.log(`The user with address ${userAddress} owns ${balance} NFT(s) from the contract`);
  //     } else {
  //       console.log(`The user with address ${userAddress} does not own any NFT from the contract`);
  //     }
  //   } catch (error:any) {
  //     console.error('Error:', error.message);
  //   }
  // }

  const projectData = `{
    description: ${description},
    github_url: ${github},
    github_stars: ${githubStars},
  }`;

  console.log(projectData);

  const {} = useContractWrite({
    abi: vaultABI,
    address: "0xa9023fedF58dcf60f94c73C150D4454eDD62bA23",
    functionName: "registerProject",
    args: [name, description, BigInt(fundingGoal), BigInt(Number(ethers.formatEther(totalAmount)))],
    onSettled: () => {
      console.log("agreement settled");
    },
  });

  const verifyData = async (e: any) => {
    e.preventDefault();
    if (data) {
      try {
        await Promise.all(
          data.map(async (item, index) => {
            const result = await fetchBalance({
              address: "0x7319EC9dFbE3f9e2fd42694156312DF3a525730f",
              token: item.tokenToOwn,
            });
            if (result) {
              setTotalAmount((prev = BigInt(0)) => prev + item.amount);
              setAgreement((prevAgreement) => [...prevAgreement, item.name]);
            }
            console.log(result);
          })
        );
        setVerification(true);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  console.log(agreement);
  console.log(verification);
  const {
    data: registerData,
    error: projectError,
    isLoading: projectLoading,
    write: registerProjectWrite,
  } = useContractWrite({
    abi: vaultABI,
    address: "0xa9023fedF58dcf60f94c73C150D4454eDD62bA23",
    functionName: "registerProject",
    args: [name, description, BigInt(fundingGoal), BigInt(totalAmount)],
    onSettled: () => {
      console.log("agreement settled");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitting");
    registerProjectWrite();

    if (registerData) {
      console.log(registerData);
    }

    if (projectError) {
      console.log(projectError);
    }



  };

  return (
    <form className="p-20 pt-4 flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">Register Your Project</h1>
      <div>
        <Label htmlFor="Project Name">Name:</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="email">Funding Goal</Label>
        <Input
          type="number"
          id="email"
          name="email"
          value={fundingGoal}
          onChange={(e) => setFundingGoal(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="password">
          Github Repo Link{" "}
          <Label className="text-red-500">
            * (Make sure that the repo is public)
          </Label>
        </Label>
        <Input
          type="text"
          id="password"
          name="password"
          value={github || ""}
          onChange={(e) => setGithub(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Description</Label>
        <Textarea
          id="password"
          name="password"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          onClick={(e) => verifyData(e)}
          disabled={verification ? true : false}
        >
          Verify
        </Button>
        {verification && <Button>Register</Button>}
      </div>
      {agreement && totalAmount?.toString() && (
        <div>
          <div>
            <span>Fund that you can get</span>
            <strong className="mx-2">
              $ {Number(ethers.formatEther(totalAmount))}
            </strong>
          </div>
          <div>
            <span>Agreement for which you project is eligible</span>
            {agreement?.map((value, idx) => (
              <strong key={idx} className="mx-2">
                {value}
              </strong>
            ))}
          </div>
        </div>
      )}
      <Button type="button" onClick={handleSubmit}>
        Register Project
      </Button>
    </form>
  );
};

export default RegisterForm;
