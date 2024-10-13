import { createConfig } from "@privy-io/wagmi";
import { base, optimism } from "viem/chains";
import { http } from "viem";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("WalletConnect Project ID is not defined");
}

export const networks = [base, optimism];

// Create Privy-compatible Wagmi config
export const config = createConfig({
  chains: [base, optimism],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
  },
});

// Privy App ID
export const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

if (!privyAppId) {
  throw new Error("Privy App ID is not defined");
}

// Privy configuration
export const privyConfig = {
  loginMethods: ["email", "farcaster", "wallet"],
  appearance: {
    walletList: ["detected_wallets", "rabby_wallet", "coinbase_wallet", "rainbow"],
    theme: "light",
    accentColor: "#676FFF",
    logo: "https://github.com/314yush/this-damn-game/blob/main/public/Frame%201321315999.png?raw=true",
  },
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
  },
};
