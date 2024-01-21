"use client";

import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";
import Permit from "@/components/permit";
import Token from "@/components/token";
import Hero from "@/components/hero";
import Features from "@/components/features";
export default function Home() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-between p-16">
      <Hero />
      <Features />
    </main>
  );
}
