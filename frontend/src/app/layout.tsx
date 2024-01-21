"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { polygonMumbai, sepolia } from "viem/chains";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

const chains = [sepolia];

const config = createConfig(
  getDefaultConfig({
    appName: "Quadrivo",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains,
    walletConnectProjectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={config}>
          <ConnectKitProvider
            options={{
              hideBalance: false,
              ethereumOnboardingUrl: "true",
            }}
          >
            <Navbar />
            {children}
          </ConnectKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
