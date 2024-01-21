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
    <Card className=" w-full h-full">
      <CardHeader
        className="
   
      flex flex-row items-center justify-between pb-1"
      >
        <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {
            //   375.96807364903063
            result.data?.formatted.toString().split(".")[0] +
              "." +
              result.data?.formatted.toString().split(".")[1].slice(0, 1)
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default Token;
