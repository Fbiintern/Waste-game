"use client";

import { wagmiAdapter, projectId } from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { optimism, base } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "How Wasted Are You?",
  description: "A fun game to learn how to segregate waste",
  url: "https://appkitexampleapp.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [base, optimism],
  defaultNetwork: base,
  metadata: metadata,
  features: {
    email: true,
    socials: ["farcaster", "x"],
    analytics: true,
  },
  themeMode: "light",
  

});


function ContextProvider({
  children,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}


export default ContextProvider;
