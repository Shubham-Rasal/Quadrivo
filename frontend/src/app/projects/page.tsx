"use client";
import { useContractRead } from "wagmi";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import FundProject from "@/components/fund-dialog";
const Projects = () => {
  const abi = [
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
          internalType: "string",
          name: "_data",
          type: "string",
        },
      ],
      name: "registerDelegationAggrement",
      outputs: [],
      stateMutability: "payable",
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
          internalType: "string",
          name: "data",
          type: "string",
        },
      ],
      stateMutability: "view",
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
              internalType: "string",
              name: "data",
              type: "string",
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
  const { data, error, isLoading } = useContractRead({
    abi: abi,
    address: "0xa9023fedF58dcf60f94c73C150D4454eDD62bA23",
    functionName: "getProjects",
  });
  //   name: string;
  //   description: string;
  //   fundingGoal: bigint;
  //   fundingRecipient: `0x${string}`;
  //   amountRaised: bigint;
  //   fundingGoalReached: boolean;
  //   fundingClosed: boolean;
  //   matchingPoolAmount: bigint;
  //   totalFunders: bigint;
  //   contributions: readonly bigint[];
  type Project = {
    name: string;
    description: string;
    fundingGoal: bigint;
    fundingRecipient: `0x${string}`;
    amountRaised: bigint;
    fundingGoalReached: boolean;
    fundingClosed: boolean;
    matchingPoolAmount: bigint;
    totalFunders: bigint;
    contributions: readonly bigint[];
  };

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      {data.map((project: Project, index) => {
        return (
          <Card key={index}>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
              <div className="space-y-1">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-500">
                    Funding Goal
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {project.fundingGoal.toString()}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-500">
                    Amount Raised
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {Number(ethers.formatEther(project.amountRaised))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-500">
                    Funding Goal Reached
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {project.fundingGoalReached === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-500">
                    Funding Closed
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {project.fundingClosed === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-500">
                    Matching Pool Amount
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {Number(ethers.formatEther(project.matchingPoolAmount))}
                    {/* Number(ethers.formatEther(totalAmount)) */}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-500">
                    Total Funders
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {project.totalFunders.toString()}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-500">
                    Contributions Count
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {project.contributions.length}
                  </div>
                </div>

                <FundProject projectId={index} onClose={() => {}} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Projects;
