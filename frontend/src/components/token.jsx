"use client";

import { useAccount, useBalance } from "wagmi";
import { sepolia } from "wagmi/chains";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Token = () => {
  const usersAccount = useAccount();

  const result = useBalance({
    address: usersAccount.address,
    token: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    chainId: sepolia.chainId,
  });

  if (result.isLoading) return <div>loading...</div>;
  if (result.isError) return <div>{result.error.message}</div>;

  console.log(result.data);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-center pb-1">
        <CardTitle className="text-sm font-medium text-center">Token Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {
            (result.data?.formatted.toString !== undefined) &&
            //   375.96807364903063
            result.data?.formatted.toString().split(".")[0] +
            "." +
            result.data?.formatted.toString().split(".")[1].slice(0, 1)
          }
          {
            (result.data?.formatted.toString === undefined) &&
            //   375.96807364903063
            <p className="text-sm font-thin	">Connect Wallet to get balance</p>
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default Token;
