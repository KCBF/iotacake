import React from "react";
import CustomButton from "./ui/custom-button";
import { cn } from "@/lib/utils";
const WhyCreateSection: React.FC = () => {
  return <section className="w-full flex justify-center px-0 py-[80px]">
      <div className="w-full max-w-[1440px] px-1 sm:px-8 md:px-12 lg:px-20">
        <div className="bg-black/90 rounded-3xl p-2 sm:p-12 md:p-16">
          <div className="flex flex-col md:flex-row gap-6 relative px-1.5 sm:px-8 md:px-0">
            {/* Cat icon in the middle */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 hidden md:flex items-center justify-center">
              <img src="/lovable-uploads/a72515f4-5f19-4fa4-afcb-049c2a1d4d40.png" alt="Cat icon" className="w-full h-full object-contain" />
            </div>

            {/* Left Card with Background Image */}
            <div className="w-full md:w-1/2 rounded-3xl p-3 sm:p-10 text-white flex flex-col relative overflow-hidden" style={{
            backgroundImage: "url('/footerbg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
              {/* Content wrapper to ensure everything stays inside the card */}
              <div className="z-10 flex flex-col h-full">
                {/* Button at the top */}
                <div className="inline-block mb-5">
                  <CustomButton 
                    className="text-blue-300 border border-blue-500 bg-[rgba(0,0,0,0.5)] rounded-full py-2 px-6 text-sm"
                    onClick={() => window.location.href = 'https://launch.agentollie.ai/'}
                  >
                    Build & Monetize AI Agents
                  </CustomButton>
                </div>

                {/* Main content - reduced size */}
                <div className="mb-6">
                  <p className="text-white mb-4 text-sm md:text-base">
                    O.L.L.I.E empowers developers, entrepreneurs, and innovators to
                    create AI-driven Web3 solutions with zero coding skills. Whether
                    you're an expert or just starting out, you can build, deploy, and
                    even sell AI Agents in our marketplace.
                  </p>

                  <h2 className="text-[25px] md:text-[36px] font-bold mb-4 font-['Darker_Grotesque']">
                    Why Create with{" "}
                    <span className="text-blue-500">O.L.L.I.E?</span>
                  </h2>

                  <ul className="list-none space-y-2 text-[17px] md:text-[19px] font-['Darker_Grotesque']">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>No-Code AI Builder - Turn your ideas into reality without coding</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Pre-Built Templates - Launch AI-powered smart contracts, DeFi tools, and more in minutes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Automate Web3 Workflows - AI handles complex processes for you</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Monetize Your AI Agents - List, trade, and earn from your AI creations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Seamless Deployment - Instantly integrate with blockchain networks</span>
                    </li>
                  </ul>
                </div>

                {/* Button at the bottom */}
                <div className="mt-auto">
                  <CustomButton 
                    className="bg-gradient-to-r from-blue-600 to-black rounded-full py-2 px-6 text-white font-medium text-sm"
                    onClick={() => window.location.href = 'https://launch.agentollie.ai/'}
                  >
                    Create your own AI Agent
                  </CustomButton>
                </div>
              </div>
            </div>

            {/* Right Card - Updated with the image */}
            <div className="w-full md:w-1/2 bg-black rounded-3xl p-4 text-white flex items-center justify-center">
              <img src="/lovable-uploads/be78411c-3f75-4af6-a29f-63077eee976f.png" alt="O.L.L.I.E AI Agent Interface" className="w-full h-auto rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default WhyCreateSection;