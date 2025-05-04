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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, ExternalLink, Scan, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIotaWallet } from "@/context/IotaWalletContext";
import { networks } from "@/config/networks";
import { sendIOTA, getBalance } from "@/utils/iotaTransactions";

export const Employer: React.FC = () => {
  const { employerDID, studentDID } = useCertification();
  const { credentials, proofs, verifyCredential } = useCertificationStore();
  const { toast } = useToast();
  const { address, currentNetwork, wallet } = useIotaWallet();
  
  const [applicantDID, setApplicantDID] = useState(studentDID);
  const [proofText, setProofText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: "idle" | "success" | "error";
    credential?: typeof credentials[0];
    transactionHash?: string;
  }>({ status: "idle" });
  const [mintBounty, setMintBounty] = useState(false);

  const handleVerify = async () => {
    if (!applicantDID || !proofText) {
      toast({
        title: "Missing Information",
        description: "Please enter both the applicant DID and proof text",
        variant: "destructive",
      });
      return;
    }

    if (!address || !wallet) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your IOTA wallet first",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Find the proof in the proofs array
      const proof = proofs.find(p => p.proof === proofText.trim());
      
      if (!proof) {
        throw new Error("Invalid proof");
      }
      
      // Find the corresponding credential
      const credential = credentials.find(c => c.id === proof.credentialId);
      
      if (!credential) {
        throw new Error("Credential not found");
      }
      
      // Verify that the proof belongs to the applicant
      if (proof.studentDID !== applicantDID) {
        throw new Error("Proof does not match applicant DID");
      }

      // Check wallet balance
      const balance = await getBalance(wallet, currentNetwork as keyof typeof networks);
      const verificationFee = 0.15; // 0.15 IOTA for verification
      const issuerFee = 0.1; // 0.1 IOTA for issuer
      const totalFee = verificationFee + issuerFee;

      if (balance < totalFee) {
        throw new Error(`Insufficient balance. Required: ${totalFee} IOTA, Available: ${balance} IOTA`);
      }

      // Send verification fee to system
      const verificationTxHash = await sendIOTA(
        wallet,
        "0xef63d9b7c6fd0be5af6b4a7c2d88331bbd096a302b1f0fecce8d0fb5a56d1b9b", // Replace with actual system address
        verificationFee,
        currentNetwork as keyof typeof networks
      );

      // Send issuer fee
      const issuerTxHash = await sendIOTA(
        wallet,
        credential.issuerDID, // Send to issuer's address
        issuerFee,
        currentNetwork as keyof typeof networks
      );
      
      // Mark the credential as verified
      verifyCredential(credential.id);
      
      setVerificationResult({ 
        status: "success",
        credential,
        transactionHash: verificationTxHash
      });
      
      toast({
        title: "Verification Successful",
        description: `The credential has been verified. ${verificationFee} IOTA deducted for verification and ${issuerFee} IOTA sent to issuer.`,
      });
      
    } catch (error) {
      setVerificationResult({ 
        status: "error"
      });
      
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Failed to verify the credential",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getExplorerUrl = (hash: string) => {
    const network = networks[currentNetwork as keyof typeof networks];
    return `${network.blockExplorer}/transaction/${hash}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Verify Credentials</CardTitle>
          <CardDescription>
            Enter applicant information and proof to verify credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Applicant DID</Label>
            <Input
              value={applicantDID}
              onChange={(e) => setApplicantDID(e.target.value)}
              placeholder="Enter applicant DID"
            />
          </div>

          <div className="space-y-2">
            <Label>Credential Proof</Label>
            <Textarea
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
              placeholder="Paste the credential proof here"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="mint-bounty"
              checked={mintBounty}
              onCheckedChange={setMintBounty}
            />
            <Label htmlFor="mint-bounty">Mint Job Offer NFT</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleVerify}
            disabled={!applicantDID || !proofText || isLoading || !address}
            className="w-full"
          >
            {isLoading ? "Verifying..." : "Verify Credential"}
          </Button>
        </CardFooter>
      </Card>

      {verificationResult.status !== "idle" && (
        <Alert variant={verificationResult.status === "success" ? "default" : "destructive"}>
          {verificationResult.status === "success" ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Verification Successful</AlertTitle>
              <AlertDescription>
                {verificationResult.credential && (
                  <div className="mt-2 space-y-2">
                    <p>Course: {verificationResult.credential.title}</p>
                    <p>Skill: {verificationResult.credential.skillTag}</p>
                    <p>Issued: {new Date(verificationResult.credential.date).toLocaleDateString()}</p>
                    {verificationResult.transactionHash && (
                      <div className="flex items-center space-x-2">
                        <span>Transaction:</span>
                        <a 
                          href={getExplorerUrl(verificationResult.transactionHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-500 hover:underline"
                        >
                          View on Explorer
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </AlertDescription>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>
                The credential could not be verified. Please check the proof and try again.
              </AlertDescription>
            </>
          )}
        </Alert>
      )}
    </div>
  );
};
