import React, { useState } from "react";
import { useIotaWallet } from '@/context/IotaWalletContext';
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import CustomButton from "@/components/ui/custom-button";
import { WalletConnectButton } from "@/components/WalletConnectButton";

const Dashboard: React.FC = () => {
  const { isConnected } = useIotaWallet();
  const { toast } = useToast();
  const [processingTaskId, setProcessingTaskId] = useState<string | null>(null);

  const tasks = [
    { id: "refine-study", title: "Refine Study Plans", description: "Create efficient learning paths", price: 0.1, status: "pending" },
    { id: "study-tip", title: "Giving Study Tip", description: "Share your learning insights", price: 0.1, status: "done" },
    { id: "assess-level", title: "Assess Level", description: "Help evaluate learner progress", price: 0.1, status: "pending" },
  ];

  const handleStartTask = async (taskId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to start this task",
        variant: "destructive",
      });
      return;
    }

    setProcessingTaskId(taskId);
    
    try {
      // Simulate transaction process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success notification
      toast({
        title: "Task started successfully",
        description: "0.1 COTI will be rewarded upon completion",
      });
    } catch (error) {
      toast({
        title: "Transaction failed",
        description: "Could not process your request",
        variant: "destructive",
      });
    } finally {
      setProcessingTaskId(null);
    }
  };

  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Contributor Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your tasks and earnings</p>
        </div>

        {!isConnected ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              You need to connect your wallet to access the dashboard
            </p>
            <div className="flex justify-center">
              <WalletConnectButton />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-medium">{task.price} COTI</span>
                  <CustomButton
                    onClick={() => handleStartTask(task.id)}
                    disabled={task.status === "done" || processingTaskId === task.id}
                  >
                    {task.status === "done" ? "Completed" : processingTaskId === task.id ? "Processing..." : "Start Task"}
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

export default Dashboard;
