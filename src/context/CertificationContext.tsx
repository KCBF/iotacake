import React, { createContext, useContext, useState } from 'react';
import { create } from 'zustand';

// Define the types for our schema
export interface Course {
  courseCode: string;
  title: string;
  skillTag: string;
  credits: number;
  description?: string;
}

export interface Credential {
  id: string;
  courseCode: string;
  title: string;
  skillTag: string;
  date: string;
  studentDID: string;
  issuerDID: string;
  verified?: boolean;
}

export interface Proof {
  studentDID: string;
  credentialId: string;
  proof: string;
}

// Create the Zustand store
interface CertificationStore {
  courses: Course[];
  credentials: Credential[];
  proofs: Proof[];
  currentStep: number;
  selectedTab: string;
  networkMode: 'testnet' | 'mainnet';
  addCredential: (credential: Credential) => void;
  addProof: (proof: Proof) => void;
  setCurrentStep: (step: number) => void;
  setSelectedTab: (tab: string) => void;
  verifyCredential: (credentialId: string) => void;
  setNetworkMode: (mode: 'testnet' | 'mainnet') => void;
}

export const useCertificationStore = create<CertificationStore>((set) => ({
  courses: [
    {
      courseCode: 'BC101',
      title: 'Blockchain Fundamentals',
      skillTag: 'Blockchain',
      credits: 3,
      description: 'Introduction to blockchain technology and its applications'
    },
    {
      courseCode: 'BC102',
      title: 'Smart Contracts',
      skillTag: 'Smart Contracts',
      credits: 3,
      description: 'Learn to develop and deploy smart contracts'
    }
  ],
  credentials: [],
  proofs: [],
  currentStep: 0,
  selectedTab: 'issue',
  networkMode: 'testnet',
  addCredential: (credential) => set((state) => ({ credentials: [...state.credentials, credential] })),
  addProof: (proof) => set((state) => ({ proofs: [...state.proofs, proof] })),
  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  verifyCredential: (credentialId) => set((state) => ({
    credentials: state.credentials.map(cred => 
      cred.id === credentialId ? { ...cred, verified: true } : cred
    )
  })),
  setNetworkMode: (mode) => set({ networkMode: mode })
}));

type CertificationContextType = {
  issuerDID: string;
  studentDID: string;
  employerDID: string;
};

const CertificationContext = createContext<CertificationContextType | undefined>(undefined);

export const CertificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issuerDID] = useState('did:iota:issuer:123');
  const [studentDID] = useState('did:iota:student:456');
  const [employerDID] = useState('did:iota:employer:789');

  return (
    <CertificationContext.Provider value={{ issuerDID, studentDID, employerDID }}>
      {children}
    </CertificationContext.Provider>
  );
};

export const useCertification = () => {
  const context = useContext(CertificationContext);
  if (context === undefined) {
    throw new Error('useCertification must be used within a CertificationProvider');
  }
  return context;
};
