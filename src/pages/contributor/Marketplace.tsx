import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIotaWallet } from '@/context/IotaWalletContext';
import { useToast } from "@/hooks/use-toast";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import AppLayout from "@/components/AppLayout";
import CustomButton from "@/components/ui/custom-button";

const Marketplace: React.FC = () => {
  const { isConnected } = useIotaWallet();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [processingNftId, setProcessingNftId] = useState<number | null>(null);

  const latestPackages = [
    {
      id: 1,
      title: "100 Essential Spanish Nouns",
      language: "Spanish",
      content: "A1 Level",
      price: 0.1,
      creator: "@LinguaLuna"
    },
    {
      id: 2,
      title: "Business English Phrases",
      language: "English",
      content: "B2 Level",
      price: 0.1,
      creator: "@EnglishPro"
    },
    {
      id: 3,
      title: "Japanese Kanji Basics",
      language: "Japanese",
      content: "N5 Level",
      price: 0.1,
      creator: "@NihongoMaster"
    },
    {
      id: 4,
      title: "French Conversation Starters",
      language: "French",
      content: "A2 Level",
      price: 0.1,
      creator: "@ParisianTalks"
    },
    {
      id: 5,
      title: "German Grammar Essentials",
      language: "German",
      content: "B1 Level",
      price: 0.1,
      creator: "@DeutschGrammar"
    },
    {
      id: 6,
      title: "Italian Food Vocabulary",
      language: "Italian",
      content: "A1 Level",
      price: 0.1,
      creator: "@CiaoItalia"
    }
  ];

  const handlePurchase = async (nftId: number) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase this NFT",
        variant: "destructive",
      });
      return;
    }

    setProcessingNftId(nftId);
    
    try {
      // Simulate purchase process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Purchase Successful",
        description: "Your NFT has been added to your library",
      });
      
      // Navigate to NFT library
      navigate("/contributor/nft-library");
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase",
        variant: "destructive",
      });
    } finally {
      setProcessingNftId(null);
    }
  };

  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800">NFT Marketplace</h1>
          <p className="text-gray-600 mt-2">Discover and purchase language learning NFTs</p>
        </div>

        {!isConnected ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              You need to connect your wallet to purchase NFTs
            </p>
            <div className="flex justify-center">
              <WalletConnectButton />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-2">{pkg.language} • {pkg.content}</p>
                <p className="text-sm text-gray-500 mb-4">by {pkg.creator}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-medium">{pkg.price} COTI</span>
                  <CustomButton
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={processingNftId === pkg.id}
                  >
                    {processingNftId === pkg.id ? "Processing..." : "Purchase"}
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Marketplace;
