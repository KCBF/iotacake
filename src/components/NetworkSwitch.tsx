import React from 'react';
import { useCertificationStore } from '@/context/CertificationContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useIotaWallet } from '@/context/IotaWalletContext';

const NetworkSwitch: React.FC = () => {
  const { networkMode, setNetworkMode } = useCertificationStore();
  const { switchNetwork, disconnect, isConnected } = useIotaWallet();
  const { toast } = useToast();

  const handleNetworkChange = async (checked: boolean) => {
    const newMode = checked ? 'mainnet' : 'testnet';
    setNetworkMode(newMode);
    
    try {
      if (isConnected) {
        // Disconnect current wallet
        await disconnect();
      }
      
      // Switch network in wallet context
      switchNetwork(newMode);
      
      toast({
        title: `Network Changed: ${newMode === 'mainnet' ? 'IOTA Mainnet' : 'IOTA Testnet'}`,
        description: isConnected ? "Please reconnect your wallet to the new network." : "Network changed successfully.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Failed to switch network:', error);
      toast({
        title: "Network Switch Failed",
        description: "There was an error switching networks. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="network-switch" className={`text-sm ${networkMode === 'testnet' ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
        Testnet
      </Label>
      <Switch 
        id="network-switch" 
        checked={networkMode === 'mainnet'} 
        onCheckedChange={handleNetworkChange} 
      />
      <Label htmlFor="network-switch" className={`text-sm ${networkMode === 'mainnet' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
        Mainnet
      </Label>
    </div>
  );
};

export default NetworkSwitch;
