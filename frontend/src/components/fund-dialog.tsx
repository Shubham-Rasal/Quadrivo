"use client";
/* tslint:disable */
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAccount, useContractWrite } from "wagmi";
const FundProject = ({
  projectId,
  onClose,
}: {
  projectId: number;
  onClose: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
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
  ] as const;

  const [amt, setAmt] = React.useState(0);

  const account = useAccount();
  const {
    write: fundWrite,
    isLoading: fundLoading,
    error: fundError,
  } = useContractWrite({
    abi,
    address: "0xa9023fedF58dcf60f94c73C150D4454eDD62bA23",
    functionName: "fundProject",
    args: [BigInt(projectId), BigInt(amt) * BigInt(10 ** 18)],
  });

  const submitFund = () => {
    console.log(amt);
    fundWrite();
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
            Fund a project by entering the amount of GHO you want to fund the
            project with.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Label>Project ID : {projectId}</Label>

          <Label>Amount (in GHO)</Label>
          <Input
            placeholder="Amount"
            type="number"
            onChange={(event) => setAmt(Number(event.target.value))}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submitFund} disabled={fundLoading}>
            {fundLoading ? "Funding..." : "Fund"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundProject;
