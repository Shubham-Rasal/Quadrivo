"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { baseSepolia } from "viem/chains";

const inter = Inter({ subsets: ["latin"] });

const chains = [baseSepolia];

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
            {children}
          </ConnectKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
