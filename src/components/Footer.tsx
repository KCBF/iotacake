
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-12 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Black backdrop with transparency */}
      <div className="absolute inset-0 bg-black opacity-90 rounded-[32px]"></div>
      
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {/* Middle Column - Our Products */}
        <div className="flex flex-col gap-6 relative z-10">
          <h2 className="text-white text-2xl mb-2 font-stentiga">Our products</h2>
          <div className="flex flex-col gap-6">
            <div>
              <a href="https://codexchain.xyz/dapp/ai-agent-builder" className="text-[#737373] text-lg font-space-grotesk hover:text-white transition-colors">
                AI Agent Dashboard
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://codexchain.xyz/dapp/ai-agent-builder/marketplace" className="flex items-center gap-2 text-[#737373] hover:text-white transition-colors font-space-grotesk text-lg">
                Marketplace
              </a>
              <img src="/lovable-uploads/b57cca77-c98e-46b8-90ee-80fdf566c949.png" alt="CodeX" className="w-[58px] h-[28px] object-contain" />
            </div>
          </div>
        </div>
        
        {/* Right Column - About Us */}
        <div className="flex flex-col gap-6 relative z-10">
          <h2 className="text-white text-2xl mb-2 font-stentiga">About us</h2>
          <div className="flex flex-col gap-6">
            <div>
              <a href="https://foundation.codexchain.xyz/" className="text-[#737373] text-lg hover:text-white transition-colors font-space-grotesk">
                CodeX Foundation
              </a>
            </div>
            <div>
              <a href="https://codexchain.xyz" className="text-[#737373] text-lg hover:text-white transition-colors font-space-grotesk">
                CodeXchain
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
