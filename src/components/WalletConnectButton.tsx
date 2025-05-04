import React from 'react';
import { Button } from '@/components/ui/button';

interface WalletConnectButtonProps {
  isConnected: boolean;
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
}) => {
  const handleClick = async () => {
    try {
      if (isConnected) {
        await onDisconnect();
      } else {
        await onConnect();
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={isConnected ? 'destructive' : 'default'}
    >
      {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </Button>
  );
}; 