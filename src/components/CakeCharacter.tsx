
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SelectOptions from './SelectOptions';

interface CakeCharacterProps {
  color: string;
  language: string;
  position: { x: string; y: string };
  imageUrl: string;
  onClick?: (event: React.MouseEvent) => void;
}

const CakeCharacter: React.FC<CakeCharacterProps> = ({ color, language, position, imageUrl, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="absolute cursor-pointer"
      style={{ left: position.x, bottom: position.y }}
    >
      <div className="relative">
        {/* Show language tooltip on hover */}
        {isHovered && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm z-50">
            {language}
          </div>
        )}
        
        {/* Cake Character */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
        >
          {/* Use the custom cake character image */}
          <div className="w-24 h-24 flex items-center justify-center drop-shadow-lg">
            <img 
              src={imageUrl} 
              alt={`${language} Character`} 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CakeCharacter;
