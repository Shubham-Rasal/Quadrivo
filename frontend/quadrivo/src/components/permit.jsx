"use client";
import React from "react";
import { Button } from "./ui/button";
import { signERC2612Permit } from "eth-permit";
import ethers from 'ethers'

import abi from "./../abi/GHOabi.json";
const Permit = () => {
  const handlePermit = async () => {
    // Sign message using injected provider (ie Metamask).
    // You can replace window.ethereum with any other web3 provider.
    const value = 10;
    const tokenAddress = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";
    const senderAddress = "0x7319EC9dFbE3f9e2fd42694156312DF3a525730f";
    const spender = "0x0a41943b8B43cefd30eeEFeDe8A7e2CF6a182245";

    // const result = await signERC2612Permit(
    //   window.ethereum,
    //   tokenAddress,
    //   senderAddress,
    //   spender,
    //   value
    // );


    // console.log(result);

    const token = new ethers.Contract(tokenAddress, abi, window.ethereum);
    // await token.methods.permit(senderAddress, spender, value, result.deadline, result.v, result.r, result.s).send({
    //   from: senderAddress,
    // });

    console.log(token);
  };

  return <Button onClick={handlePermit}>Button</Button>;
};

export default Permit;
