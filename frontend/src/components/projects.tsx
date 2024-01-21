"use client";
import { useContractRead } from "wagmi";
import React from "react";
import { buttonVariants } from "./ui/button";
import FundProject from "./fund-project-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { motion } from 'framer-motion'
import { Link } from "lucide-react";

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
      initial={{opacity: 0, x: -100}}
      whileInView={{opacity: 1, x: 0}}
      transition={{duration: 0.5}}
    >
      <div>
        <h1 className="font-medium mt-8 p-8 text-[80px] leading-[74px] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-900 via-violet-900 to-black">Explore Projects</h1>
      </div>
      <div className="grid grid-cols-3">
        {mockProjects.map((project: Project, index) => {
          return (
            <div key={index} className="">
              <Card className="m-4 pb-2">
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
                      <p className="text-sm font-medium leading-none">
                        Contributors:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.contributions}
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
