
import React, { ReactNode, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BackgroundProps {
  imageUrl: string;
  children?: ReactNode;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({
  imageUrl,
  children,
  className = "",
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Remove the effect that sets background to black
  
  // Handle video loaded state
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div className={`fixed inset-0 w-full h-full ${className}`}>
      {/* Background image - shows before video loads and as fallback */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imageUrl}
            alt="Background"
            className="absolute h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* Video background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoaded}
            onEnded={(e) => {
              // Force video to restart when it ends
              const video = e.target as HTMLVideoElement;
              video.currentTime = 0;
              video.play();
            }}
            className={`absolute h-full w-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/Line.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      
      {/* Centered AI Leopard Head Image - Only visible on desktop */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center z-10">
        <img 
          src="/lovable-uploads/a72515f4-5f19-4fa4-afcb-049c2a1d4d40.png" 
          alt="AI Leopard" 
          className="w-[360px] h-auto"
        />
      </div>
      
      {children && <div className="relative z-20">{children}</div>}
    </div>
  );
};

export default Background;
