
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIotaWallet } from '@/context/IotaWalletContext';

interface WalletConnectButtonProps {
  isConnected: boolean;
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps | Record<string, never>> = (props) => {
  const iotaWallet = useIotaWallet();
  
  // Use passed props if available, otherwise use the context
  const isConnected = 'isConnected' in props ? props.isConnected : iotaWallet.isConnected;
  const onConnect = 'onConnect' in props ? props.onConnect : iotaWallet.connect;
  const onDisconnect = 'onDisconnect' in props ? props.onDisconnect : iotaWallet.disconnect;

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
