
import React, { createContext, useContext, useState } from 'react';
import { useWallets, useConnectWallet, useDisconnectWallet, useCurrentAccount, type WalletWithRequiredFeatures } from '@iota/dapp-kit';
import { networks, defaultNetwork } from '@/config/networks';
import type { Wallet } from '@iota/sdk';

interface IotaWalletContextType {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  currentNetwork: string;
  switchNetwork: (network: string) => void;
  address: string | null;
  balance: string;
  wallet?: WalletWithRequiredFeatures;
}

const IotaWalletContext = createContext<IotaWalletContextType | undefined>(undefined);

export const IotaWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallets = useWallets();
  const { mutateAsync: connectWallet } = useConnectWallet();
  const { mutateAsync: disconnectWallet } = useDisconnectWallet();
  const currentAccount = useCurrentAccount();
  
  const [currentNetwork, setCurrentNetwork] = useState<string>(defaultNetwork);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    try {
      if (wallets.length === 0) {
        throw new Error('No wallets available');
      }
      
      await connectWallet({ wallet: wallets[0] });
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnect = async () => {
    try {
      if (wallets.length === 0) {
        throw new Error('No wallets available');
      }
      
      await disconnectWallet({ wallet: wallets[0] });
      setIsConnected(false);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    }
  };

  const switchNetwork = (network: string) => {
    if (networks[network as keyof typeof networks]) {
      setCurrentNetwork(network);
    }
  };

  const value: IotaWalletContextType = {
    isConnected,
    connect,
    disconnect,
    currentNetwork,
    switchNetwork,
    address: currentAccount?.address || null,
    balance: '0', // We'll need to implement a proper balance fetching mechanism
    wallet: wallets[0],
  };

  return (
    <IotaWalletContext.Provider value={value}>
      {children}
    </IotaWalletContext.Provider>
  );
};

export const useIotaWallet = () => {
  const context = useContext(IotaWalletContext);
  if (context === undefined) {
    throw new Error('useIotaWallet must be used within an IotaWalletProvider');
  }
  return context;
};
