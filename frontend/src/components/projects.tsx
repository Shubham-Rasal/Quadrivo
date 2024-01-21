"use client";
import { useContractRead } from "wagmi";
import React from "react";
import FundProject from "./fund-project-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { motion } from 'framer-motion'

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

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  type Project = {
    name: string;
    description: string;
    fundingGoal: number;
    fundingRecipient: string;
    amountRaised: number;
    totalFunders: number;
    contributions: number[];
  };

  type FundProps = {
    project: Project;
  };

  const Fund: React.FC<FundProps> = ({ project }) => {
    const handleFundProject = () => {
      // Implement your fund project logic here
      console.log(`Funding project: ${project.name}`);
    };

    return (
      <div>
        <button onClick={handleFundProject}>Fund Project</button>
      </div>
    );
  };


  const mockProjects: Project[] = [
    {
      name: "Project 1",
      description: "Project 1 description",
      fundingGoal: 1000,
      fundingRecipient: "0x123",
      amountRaised: 100,
      totalFunders: 1,
      contributions: [100],
    },
    {
      name: "Project 2",
      description: "Project 2 description",
      fundingGoal: 2000,
      fundingRecipient: "0x456",
      amountRaised: 200,
      totalFunders: 2,
      contributions: [100, 100],
    },
    {
      name: "Project 3",
      description: "Project 3 description",
      fundingGoal: 3000,
      fundingRecipient: "0x789",
      amountRaised: 300,
      totalFunders: 3,
      contributions: [100, 100, 100],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg className="blur-3xl absolute opacity-80 right-0 -z-30" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" height="100%" width="50%">
        <g clipPath="url(#clip0_17_60)">
          <g filter="url(#filter0_f_17_60)">
            <path d="M128.6 0H0V322.2L332.5 211.5L128.6 0Z" fill="rgba(117, 83, 212, 0.5)"></path>
            <path d="M400 0H128.6L332.5 211.5L400 78.75V0Z" fill="rgba(117, 83, 172, 0.6)"></path>
            <path d="M200 0H256.6L332.5 211.5L400 200.75V0Z" fill="rgba(255, 0, 255, 0.6)"></path>
          </g></g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="719.867" id="filter0_f_17_60" width="719.867" x="-159.933" y="-159.933"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend in2="BackgroundImageFix" result="shape" in="SourceGraphic" mode="normal"></feBlend><feGaussianBlur stdDeviation="79.9667" result="effect1_foregroundBlur_17_60"></feGaussianBlur>
          </filter>
        </defs>
      </svg>


      <div>
        <h1 className="font-medium mt-8 p-3 text-[80px] leading-[74px] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-900 via-violet-900 to-black">Explore Projects</h1>
      </div>
      <div className="grid grid-cols-3">
        {mockProjects.map((project: Project, index) => {
          return (
            <div key={index} className="">
              <Card className="m-4 pb-2 border-2 border-purple-800 bg-transparent">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.fundingGoal}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 ">
                  <div className="flex items-center space-x-4 p-4">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Funding Goal:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.fundingGoal}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Funding Recipient:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.fundingRecipient}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Amount Raised:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.amountRaised}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Total Funders:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.totalFunders}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Contributors:</p>
                      <p className="text-sm text-muted-foreground">
                        {project.contributions.join(', ')}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <div className="flex justifu-center items-center">
                  <div className="w-full flex justify-center">
                    <FundProject project={project} />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Projects;
