"use client";
import React from "react";
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
const CreateAgreement = () => {
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
    }
  ] as const;

  const agreementSchema = z.object({
    name: z.string(),
    amount: z.number(),
    duration: z.number(),
    tokenToOwn: z.string(),
    nftToOwn: z.string(),
    data: z.string(),
  });

  const form = useForm<z.infer<typeof agreementSchema>>({
    defaultValues: {
      name: "Test Agreement",
      amount: 10,
      duration: 100000,
      tokenToOwn: "0x6503C123e956BDFB8a8575Ec899463422665136b",
      nftToOwn: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
      data: "github: 10",
    },
  });

  const {
    data: agreementWriteResult,
    write: writeAgreement,
    isLoading: isAgreementWriteLoading,
    error: agreementWriteError,
  } = useContractWrite({
    abi: abi,
    address: "0x2e95D733152424216BbdB04A8FDdc579776f6fBc",
    functionName: "registerDelegationAggrement",
    args: [
      "Test Agreement",
      BigInt(10),
      BigInt(10),
      "0x6503C123e956BDFB8a8575Ec899463422665136b",
      "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
      `github:10`,
    ],
  });

  const onSubmit = async (values: z.infer<typeof agreementSchema>) => {
    console.log(values);
    try {
      const agreement = agreementSchema.parse(values);
      console.log(agreement);
      writeAgreement();

      console.log(agreementWriteResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} className="h-full">
      <DialogTrigger asChild>
        <Button>Create Agreement</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Agreement</DialogTitle>
          <DialogDescription>
            Create an agreement to customise the donation.
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
                    <Label>Agreement Name</Label>
                    <FormControl>
                      <Input placeholder="Agreement Name" {...field} />
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
                        <Input placeholder="Amount" {...field} />
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
                        <Input placeholder="Duration" {...field} />
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
                      <Input placeholder="Token To Own" {...field} />
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
                      <Input placeholder="NFT To Own" {...field} />
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
                      <Textarea placeholder="Data" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between mt-4">
                <Button type="button">Permit</Button>
                <Button type="submit">Create Agreement</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgreement;
