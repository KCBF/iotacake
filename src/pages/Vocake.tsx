import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useIotaWallet } from '@/context/IotaWalletContext';
import { WalletConnectButton } from "@/components/WalletConnectButton";
import CakeCharacter from "@/components/CakeCharacter";
import SelectOptions from "@/components/SelectOptions";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/context/RoleContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

const Vocake: React.FC = () => {
  const { isConnected } = useIotaWallet();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setRole } = useRole();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<{ 
    language: string; 
    position: { x: number; y: number } 
  } | null>(null);

  // Initialize user as a learner when landing on this page
  React.useEffect(() => {
    setRole('learner');
  }, [setRole]);

  const handleTopicClick = (language: string) => {
    navigate(`/topics/${language}`);
  };

  const handleBuddyClick = (language: string) => {
    navigate(`/cakebuddy/${language}`);
  };

  const characters = [
    {
      color: "bg-orange-400",
      language: "English",
      position: { x: "20%", y: "30%" },
      imageUrl: "/lovable-uploads/174a1f8c-d372-42d0-8a3e-f6c18723ef37.png"
    },
    {
      color: "bg-blue-400",
      language: "Spanish",
      position: { x: "40%", y: "50%" },
      imageUrl: "/lovable-uploads/ebe05ffb-1528-4ddb-a509-34b434ea9fb5.png"
    },
    {
      color: "bg-green-400",
      language: "French",
      position: { x: "60%", y: "40%" },
      imageUrl: "/lovable-uploads/d0501b14-3245-4018-88b5-fe1723f3804d.png"
    },
    {
      color: "bg-purple-400",
      language: "German",
      position: { x: "80%", y: "60%" },
      imageUrl: "/lovable-uploads/174a1f8c-d372-42d0-8a3e-f6c18723ef37.png"
    },
    {
      color: "bg-pink-400",
      language: "Japanese",
      position: { x: "30%", y: "70%" },
      imageUrl: "/lovable-uploads/ebe05ffb-1528-4ddb-a509-34b434ea9fb5.png"
    },
    {
      color: "bg-yellow-400",
      language: "Chinese",
      position: { x: "70%", y: "20%" },
      imageUrl: "/lovable-uploads/d0501b14-3245-4018-88b5-fe1723f3804d.png"
    }
  ];

  const handleCharacterClick = (language: string, position: { x: string; y: string }, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedCharacter({ 
      language, 
      position: { 
        x: rect.left,
        y: window.innerHeight - rect.bottom
      } 
    });
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-white"
      style={{
        backgroundImage: "url('/lovable-uploads/cbaa66f1-4fbd-4402-b26a-25004604a0f6.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Header/Navigation */}
      <header className="w-full max-w-[1440px] mx-auto flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 py-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/41eabf16-1325-4f4a-95ab-5d4c4f39e2e9.png" 
              alt="Cake Slice Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-800">VOCAKE</h1>
          </Link>
        </div>
        <WalletConnectButton />
      </header>

      {isConnected ? (
        <main ref={containerRef} className="relative w-full h-[calc(100vh-88px)]">
          <ScrollArea className="w-full h-full">
            <div className="relative w-full h-full">
              {characters.map((char) => (
                <CakeCharacter
                  key={char.language}
                  color={char.color}
                  language={char.language}
                  position={char.position}
                  imageUrl={char.imageUrl}
                  onClick={(e) => handleCharacterClick(char.language, char.position, e)}
                />
              ))}
            </div>
          </ScrollArea>

          {selectedCharacter && (
            <>
              <div 
                className="fixed inset-0 bg-black bg-opacity-5 z-40"
                onClick={() => setSelectedCharacter(null)}
              />
              <SelectOptions 
                language={selectedCharacter.language}
                position={selectedCharacter.position}
                onClose={() => setSelectedCharacter(null)}
                onTopicClick={() => handleTopicClick(selectedCharacter.language)}
                onBuddyClick={() => handleBuddyClick(selectedCharacter.language)}
              />
            </>
          )}
        </main>
      ) : (
        <main className="w-full h-[calc(100vh-88px)] flex items-center justify-center">
          <div className="text-center bg-white bg-opacity-80 p-8 rounded-xl">
            <img 
              src="/lovable-uploads/41eabf16-1325-4f4a-95ab-5d4c4f39e2e9.png" 
              alt="Cake Slice" 
              className="w-32 h-32 mx-auto mb-8 object-contain"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">Welcome to Vocake</h1>
            <p className="text-xl text-gray-700 mb-8">Connect your wallet to start learning languages</p>
            <div className="flex justify-center">
              <WalletConnectButton />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Vocake;
