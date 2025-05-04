import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IotaClientProvider, WalletProvider } from '@iota/dapp-kit';
import { getFullnodeUrl } from '@iota/iota-sdk/client';
import '@iota/dapp-kit/dist/index.css';
import Vocake from '@/pages/Vocake';
import TopicsPage from '@/pages/TopicsPage';
import CakeBuddyPage from '@/pages/CakeBuddyPage';
import PaymentScene from '@/pages/PaymentScene';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/contributor/Dashboard';
import NFTLibrary from '@/pages/contributor/NFTLibrary';
import Marketplace from '@/pages/contributor/Marketplace';
import CreateNFT from '@/pages/contributor/CreateNFT';
import Settings from '@/pages/Settings';
import { RoleProvider } from '@/context/RoleContext';
import CertificationFlow from '@/pages/certification/CertificationFlow';
import { Issuer } from '@/pages/certification/Issuer';
import { StudentWallet } from '@/pages/certification/StudentWallet';
import { Employer } from '@/pages/certification/Employer';
import { CertificationProvider, useCertificationStore } from '@/context/CertificationContext';
import { IotaWalletProvider } from '@/context/IotaWalletContext';

const queryClient = new QueryClient();
const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider>
          <RoleProvider>
            <CertificationProvider>
              <IotaWalletProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<CertificationFlow />} />
                    <Route path="/vocake" element={<Vocake />} />
                    <Route path="/topics/:language" element={<TopicsPage />} />
                    <Route path="/cakebuddy/:language" element={<CakeBuddyPage />} />
                    <Route path="/issuer" element={<Issuer />} />
                    <Route path="/wallet" element={<StudentWallet />} />
                    <Route path="/employer" element={<Employer />} />
                    <Route path="/payment" element={<PaymentScene />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/contributor/dashboard" element={<Dashboard />} />
                    <Route path="/contributor/nft-library" element={<NFTLibrary />} />
                    <Route path="/contributor/marketplace" element={<Marketplace />} />
                    <Route path="/contributor/create-nft" element={<CreateNFT />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </BrowserRouter>
              </IotaWalletProvider>
            </CertificationProvider>
          </RoleProvider>
        </WalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  );
};

export default App;
