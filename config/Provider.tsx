"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { base } from "viem/chains";
import { http } from "viem";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const config = createConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
  });

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ["email", "farcaster", "wallet"],
        appearance: {
          walletList: ["detected_wallets", "rabby_wallet","coinbase_wallet", "rainbow"],
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://github.com/314yush/this-damn-game/blob/main/public/Frame%201321315999.png?raw=true",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
