import React from "react";

interface SocialIconProps {
  imageUrl: string;
  alt?: string;
  href: string;
  hasBlackBg?: boolean;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  imageUrl,
  alt = "Social media icon",
  href,
  hasBlackBg = false
}) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="relative block w-10 h-10 transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%]">
        {hasBlackBg && (
          <div className="absolute inset-0 bg-white rounded-full opacity-[0.07]" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={imageUrl} alt={alt} className="w-[60%] h-[60%] object-contain relative z-10" />
        </div>
      </div>
    </a>
  );
};

export default SocialIcon;
