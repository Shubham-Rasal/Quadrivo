"use client";

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
