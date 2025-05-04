import { getFullnodeUrl } from '@iota/iota-sdk/client';

export const networks = {
  devnet: { 
    url: getFullnodeUrl('devnet'),
    blockExplorer: 'https://explorer.evm.iota.org'
  },
  testnet: { 
    url: getFullnodeUrl('testnet'),
    blockExplorer: 'https://explorer.evm.iota.org'
  },
};

export const defaultNetwork = 'testnet';

// Helper function to get network by name
export const getNetworkByName = (name: string) => {
  return networks[name as keyof typeof networks] || networks[defaultNetwork];
};

export const isTestnet = (networkName: string) => {
  return networkName === 'testnet';
};
