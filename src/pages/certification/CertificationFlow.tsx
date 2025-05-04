import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConnectButton } from "@iota/dapp-kit";
import { Issuer } from "./Issuer";
import { StudentWallet } from "./StudentWallet";
import { Employer } from "./Employer";
import { useCertificationStore } from "@/context/CertificationContext";
import { Stepper } from "@/components/Stepper";
import NetworkSwitch from "@/components/NetworkSwitch";
import { useCurrentAccount } from "@iota/dapp-kit";
import { Badge } from "@/components/ui/badge";

const CertificationFlow: React.FC = () => {
  const { selectedTab, setSelectedTab, networkMode } = useCertificationStore();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const currentAccount = useCurrentAccount();
  
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    
    // Auto-adjust drawer based on selected tab
    if (value === "issue") {
      setDrawerOpen(true);
    } else if (value === "hold") {
      setDrawerOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#f8f9fa] to-[#e6f7ff]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/f7516383-5f4c-4523-9056-d37c79fcc8be.png" 
              alt="IOTA Certification" 
              className="w-8 h-8 object-contain" 
            />
            <div>
              <h1 className="text-xl font-bold text-blue-800">IOTA Certification Platform</h1>
              <Badge variant={networkMode === 'testnet' ? 'outline' : 'default'} className="mt-1">
                {networkMode === 'testnet' ? 'TESTNET MODE' : 'MAINNET'}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NetworkSwitch />
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {!currentAccount ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-8">Please connect your wallet to access the certification platform</p>
            <ConnectButton />
          </div>
        ) : (
          <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="issue">Issuer</TabsTrigger>
              <TabsTrigger value="hold">Student Wallet</TabsTrigger>
              <TabsTrigger value="verify">Employer</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="issue">
                  <Issuer />
                </TabsContent>
                <TabsContent value="hold">
                  <StudentWallet />
                </TabsContent>
                <TabsContent value="verify">
                  <Employer />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default CertificationFlow;
