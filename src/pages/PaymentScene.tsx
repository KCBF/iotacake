import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIotaWallet } from '@/context/IotaWalletContext';
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { useToast } from "@/hooks/use-toast";
import CustomButton from "@/components/ui/custom-button";

const PaymentScene: React.FC = () => {
  const { isConnected } = useIotaWallet();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to make a payment",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate transaction process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase!",
      });
      
      // Navigate back to topics or another appropriate page
      setTimeout(() => {
        navigate('/topics/English');
      }, 1500);
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "We couldn't process your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="text-purple-600 hover:text-purple-800">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Complete Your Purchase</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">English Course</span>
                    <span className="font-medium">0.1 COTI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">0.01 COTI</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-purple-600">0.11 COTI</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="flex flex-col gap-4">
                  {isConnected ? (
                    <CustomButton
                      variant="gradient-blue"
                      className="w-full py-3 text-lg"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Pay with IOTA"}
                    </CustomButton>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-center text-gray-600 mb-2">
                        Connect your wallet to pay with IOTA
                      </p>
                      <WalletConnectButton />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScene;
