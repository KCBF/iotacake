import React from "react";
import CustomButton from "./ui/custom-button";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`relative w-full max-w-[1260px] mt-16 max-md:mb-2.5`}>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[69%]">
          <div className="relative max-md:mt-2.5">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-6/12">
                {/* AI Leopard image - visible on mobile, moved above the text */}
                <div className="md:hidden flex justify-center items-center mb-8">
                  <img 
                    src="/lovable-uploads/a72515f4-5f19-4fa4-afcb-049c2a1d4d40.png" 
                    alt="AI Leopard" 
                    className="w-[280px] h-auto" 
                  />
                </div>
                <div className="relative z-10 md:mr-[-102px] w-full mt-[26px]">
                  <div className="font-bold">
                    <h2 className="text-2xl text-white leading-none font-['Darker_Grotesque']">
                      Build, Automate & Monetize with O.L.L.I.E
                    </h2>
                    <h1 className="text-4xl md:text-5xl lg:text-[64px] text-gray-200 leading-[1.2] md:leading-[51px] mt-2 font-['Darker_Grotesque']">
                      Share your idea, and let our AI Agents bring it to life!
                    </h1>
                  </div>
                  <div className="flex flex-wrap w-full sm:w-[339px] items-stretch gap-2 text-base text-white font-medium mt-[26px]">
                    <CustomButton 
                      variant="primary" 
                      className="flex-1 min-w-[150px] shrink basis-[0%]"
                      onClick={() => window.location.href = 'https://launch.agentollie.ai'}
                    >
                      Create AI Agent
                    </CustomButton>
                    <CustomButton 
                      variant="secondary" 
                      className="flex-1 min-w-[150px] shrink basis-4 whitespace-nowrap"
                      href="https://codexchain.xyz/dapp/ai-agent-builder/marketplace"
                    >
                      Marketplace
                    </CustomButton>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-6/12 mt-6 sm:mt-0 relative">
                {/* Empty section preserved */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[31%] mt-8 md:mt-0">
          <aside className="bg-[rgba(0,0,0,0.8)] flex flex-col items-stretch text-base sm:text-lg text-white font-semibold leading-normal sm:leading-6 justify-center w-full mt-[37px] p-4 sm:p-6 rounded-2xl max-md:mt-4">
            <p className="w-full">
              No coding? No problem! O.L.L.I.E empowers you to build, deploy,
              and monetize AI-powered Web3 solutions—effortlessly. Whether
              you're creating smart contracts, launching dApps, or automating
              workflows, our AI Agents handle the heavy lifting.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
