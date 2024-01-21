"use client";
import React, {useState} from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormMessage, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import vaultAbi from "@/abi/Vault.json";
import { useContractWrite } from "wagmi";

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

const FundProject: React.FC<FundProps> = ({project}) => {
  const [funding,setFunding] = useState<number>(0)
  const [open, setOpen] = React.useState(false);
  const textEncoder = new TextEncoder();
   const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_projectId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "fundProject",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_duration",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_tokenToOwn",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_nftToOwn",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "registerDelegationAggrement",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_fundingGoal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_matchingPoolAmount",
          "type": "uint256"
        }
      ],
      "name": "registerProject",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fundingGoal",
          "type": "uint256"
        }
      ],
      "name": "ProjectRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "delegationAgreements",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "tokenToOwn",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "nftToOwn",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "data",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDelegationAgreements",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "delegator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "start",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "tokenToOwn",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "nftToOwn",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "data",
              "type": "string"
            }
          ],
          "internalType": "struct Vault.DelegationAgreement[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getProjects",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "fundingGoal",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "fundingRecipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amountRaised",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "fundingGoalReached",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "fundingClosed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "matchingPoolAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalFunders",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "contributions",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct Vault.Project[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "projects",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "fundingGoal",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "fundingRecipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountRaised",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "fundingGoalReached",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "fundingClosed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "matchingPoolAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalFunders",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const;

  const fundSchema = z.object({
    name: z.string(),
    amount: z.number(),
    duration: z.number(),
    tokenToOwn: z.string(),
    nftToOwn: z.string(),
    data: z.string(),
    fund: z.number()
  });

  const form = useForm<z.infer<typeof fundSchema>>({
    defaultValues: {
      name: project.name,
      amount: project.amountRaised,
      duration: 100000,
      tokenToOwn: "0x6503C123e956BDFB8a8575Ec899463422665136b",
      nftToOwn: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
      data: "github: 10",
      fund: 0
    },
  });

  const {
    data: agreementWriteResult,
    write: writeAgreement,
    isLoading: isAgreementWriteLoading,
    error: agreementWriteError,
  } = useContractWrite({
    abi: abi,
    address: "0xa9023fedF58dcf60f94c73C150D4454eDD62bA23",
    functionName: "fundProject",
    args: [
      BigInt(10),
      BigInt(10),
    ],
  });

  const onSubmit = async (values: z.infer<typeof fundSchema>) => {
    console.log(values);
    try {
      const agreement = fundSchema.parse(values);
      console.log(agreement);
      writeAgreement();

      console.log(agreementWriteResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Fund Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fund Project</DialogTitle>
          <DialogDescription>
            Fund the project with GHO tokens
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full h-fit"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-1">
                    <Label>Project Name</Label>
                    <FormControl>
                      <Input placeholder="Agreement Name" {...field} disabled={true}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="mt-1">
                      <Label>Amount (in GHO)</Label>
                      <FormControl>
                        <Input placeholder="Amount" {...field} disabled={true}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="mt-1">
                      <Label>Duration (in days)</Label>
                      <FormControl>
                        <Input placeholder="Duration" {...field} disabled={true}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tokenToOwn"
                render={({ field }) => (
                  <FormItem className="mt-1">
                    <Label>Token To Own</Label>
                    <FormControl>
                      <Input placeholder="Token To Own" {...field} disabled={true}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nftToOwn"
                render={({ field }) => (
                  <FormItem className="mt-1">
                    <Label>NFT To Own</Label>
                    <FormControl>
                      <Input placeholder="NFT To Own" {...field} disabled={true}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="mt-1">
                    <Label>
                      Arbitrary Data
                      <div className="">
                        <span className="text-xs text-gray-500">
                          (Optional - Eg. Github: 10, Twitter: 10)
                        </span>
                      </div>
                    </Label>
                    <FormControl>
                      <Textarea placeholder="Data" {...field} disabled={true}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                <FormField
                control={form.control}
                name="fund"
                render={({ field }) => (  
                  <FormItem className="mt-1">
                    <Label>
                      Funding Amount (GHO)<Label className="text-red-500">*</Label>
                    </Label>
                    <Input
                    type="number"
                    id="email"
                    name="email"
                    required={true}
                    value={funding}
                      onChange={(e) => setFunding(Number(e.target.value))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between mt-4">
                {/* <Button type="button">Permit</Button> */}
                <Button type="submit">Fund</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundProject;
