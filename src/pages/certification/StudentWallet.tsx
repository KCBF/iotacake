import React, { useState } from "react";
import { useCertification, useCertificationStore } from "@/context/CertificationContext";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRCode from '@/components/QRCode';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const StudentWallet: React.FC = () => {
  const { studentDID } = useCertification();
  const { credentials, proofs, addProof } = useCertificationStore();
  const { toast } = useToast();
  
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null);
  const [proofDialogOpen, setProofDialogOpen] = useState(false);
  const [currentProof, setCurrentProof] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateProof = async (credentialId: string) => {
    setSelectedCredential(credentialId);
    setIsLoading(true);
    
    try {
      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const credential = credentials.find(c => c.id === credentialId);
      if (!credential) {
        toast({
          title: "Error",
          description: "Credential not found",
          variant: "destructive",
        });
        return;
      }
      
      // Generate a mock proof
      const proof = `proof-${Math.random().toString(36).substring(2, 10)}`;
      
      const newProof = {
        studentDID,
        credentialId,
        proof
      };
      
      addProof(newProof);
      setCurrentProof(proof);
      setProofDialogOpen(true);
      
      toast({
        title: "Proof Generated",
        description: "Your credential proof has been generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate proof",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: message,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Wallet</CardTitle>
          <CardDescription>
            Manage your credentials and generate proofs for verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Your DID</h3>
            <div className="flex items-center gap-2">
              <code className="text-sm bg-gray-100 p-2 rounded">{studentDID}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(studentDID, "DID copied to clipboard")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {credentials.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No credentials in your wallet yet
            </div>
          ) : (
            <div className="space-y-4">
              {credentials.map((cred) => (
                <Card key={cred.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{cred.title}</h3>
                        <p className="text-sm text-gray-600">{cred.courseCode}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {cred.skillTag}
                          </span>
                          <span className="text-xs text-gray-500">
                            Issued: {new Date(cred.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleGenerateProof(cred.id)}
                        disabled={isLoading}
                      >
                        {isLoading && selectedCredential === cred.id ? "Generating..." : "Generate Proof"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={proofDialogOpen} onOpenChange={setProofDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Credential Proof</DialogTitle>
            <DialogDescription>
              Share this proof with employers for verification
            </DialogDescription>
          </DialogHeader>
          {currentProof && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <QRCode value={currentProof} />
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-gray-100 p-2 rounded flex-1">
                  {currentProof}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(currentProof, "Proof copied to clipboard")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
