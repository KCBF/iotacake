import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
const CodeXSection: React.FC = () => {
  const isMobile = useIsMobile();
  return <section className="w-full flex justify-center py-[20px]">
      <div className="w-full max-w-[1440px] px-1 sm:px-8 md:px-12 lg:px-20">
        <div className="bg-black/90 rounded-3xl p-2 sm:p-12 md:p-16">
          <a href="https://codexchain.xyz" target="_blank" rel="noopener noreferrer" className="block w-full relative overflow-hidden rounded-3xl cursor-pointer">
            <div className={`w-full relative ${isMobile ? 'flex justify-center overflow-hidden' : ''}`}>
              <img src="/lovable-uploads/d683a899-72bf-4244-a6e9-103421c0c003.png" alt="CodeXChain Banner" className={`w-full h-auto rounded-3xl ${isMobile ? 'min-w-[calc(100%+400px)]' : ''}`} />
            </div>
          </a>
        </div>
      </div>
    </section>;
};
export default CodeXSection;