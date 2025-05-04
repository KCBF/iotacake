import React from "react";
import CustomButton from "./ui/custom-button";
import { cn } from "@/lib/utils";
const MarketplaceSection: React.FC = () => {
  return <section className="w-full flex justify-center rounded-none py-0">
      <div className="w-full max-w-[1440px] px-1 sm:px-8 md:px-12 lg:px-20">
        <div className="bg-black/90 rounded-3xl p-2 sm:p-12 md:p-16">
          <div className="flex flex-col md:flex-row gap-6 relative px-1.5 sm:px-8 md:px-0">
            {/* Left Card with Content */}
            <div style={{
            backgroundColor: "#000000",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }} className="w-full md:w-1/2 rounded-3xl p-3 sm:p-10 text-white flex flex-col relative overflow-hidden py-0">
              {/* Content wrapper to ensure everything stays inside the card */}
              <div className="z-10 flex flex-col h-full">
                {/* Button at the top */}
                <div className="inline-block mb-5">
                  <CustomButton 
                    className="text-blue-300 border border-blue-500 bg-[rgba(0,0,0,0.5)] rounded-full py-2 px-6 text-sm"
                    href="https://codexchain.xyz/dapp/ai-agent-builder"
                  >
                    Unlock the Power of AI Agents
                  </CustomButton>
                </div>

                {/* Main content */}
                <div className="mb-6">
                  <p className="text-white mb-4 text-sm md:text-base font-['Darker_Grotesque']">
                    Discover a world of ready-to-use AI-powered tools in the O.L.L.I.E
                    Marketplace. Whether you're an investor, trader, or project owner,
                    you'll find pre-built AI agents to enhance your Web3 experience.
                  </p>

                  {/* For now, placeholder for the marketplace image */}
                  <div className="w-full h-80 mt-4 rounded-xl overflow-hidden">
                    <img alt="O.L.L.I.E Marketplace Preview" className="w-full h-full object-cover" src="/lovable-uploads/ffa23b77-ee88-43b2-9eb0-f5dea383a74a.png" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card with What Can You Do */}
            <div className="w-full md:w-1/2 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-center relative overflow-hidden" style={{
              backgroundImage: "url('/footerbg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              <div className="relative z-10">
                <h2 className="text-[32px] md:text-[42px] font-bold mb-6 font-['Darker_Grotesque']">
                  What Can You Do with <span className="text-blue-500">AI Agents?</span>
                </h2>

                <ul className="list-none space-y-4 text-[17px] md:text-[19px] font-['Darker_Grotesque'] mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Automate Your Crypto Portfolio - AI-powered trading bots for real-time decision-making</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Generate Smart Contracts Instantly - Deploy secure, verified contracts with one click</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>AI-Powered NFT Analysis - Get insights on rarity, pricing, and trends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Optimize DeFi Strategies - Automate lending, staking, and yield farming</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Streamline DAO Governance - AI-driven voting and proposal management</span>
                  </li>
                </ul>

                <p className="text-[17px] md:text-[19px] font-['Darker_Grotesque'] mb-6">
                  Explore the AI Agents Marketplace & find the perfect solution for you!
                </p>

                <div className="mt-auto">
                  <CustomButton 
                    className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-full py-3 px-8 text-white font-medium"
                    href="https://codexchain.xyz/dapp/ai-agent-builder/marketplace"
                  >
                    Visit O.L.L.I.E Marketplace
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MarketplaceSection;