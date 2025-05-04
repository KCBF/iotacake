
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_ISSUER_KEY?: string;
    readonly VITE_STUDENT_KEY?: string;
    readonly VITE_EMPLOYER_KEY?: string;
    readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
    readonly [key: string]: string | undefined;
  };
}

// Add type definition for Wallet from IOTA SDK
declare module '@iota/sdk' {
  export interface Wallet {
    // Basic wallet interface - expand as needed
    address?: string;
    balance?: string;
    // Add other wallet properties/methods as needed
  }
}

// Add additional types from dapp-kit
declare module '@iota/dapp-kit' {
  export interface WalletWithRequiredFeatures {
    [key: string]: any;
  }
}
