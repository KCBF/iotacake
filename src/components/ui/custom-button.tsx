
import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gradient-blue" | "gradient-dark";
  className?: string;
  href?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  href,
  onClick,
  ...props
}) => {
  const baseStyles = "text-white font-medium leading-loose rounded transition-all duration-200 hover:scale-105 active:scale-95";

  const variantStyles = {
    primary:
      "bg-[linear-gradient(45deg,#6A3DE8_0%,#9E76FF_100%)] px-4 py-1 rounded-md text-center hover:shadow-lg hover:shadow-purple-500/30",
    secondary:
      "bg-[rgba(31,93,244,0.3)] border border-white border-solid p-2 rounded-lg hover:bg-[rgba(31,93,244,0.4)] hover:shadow-lg hover:shadow-blue-500/20",
    "gradient-blue":
      "bg-[linear-gradient(45deg,#FF7A00_0%,#FFB800_100%)] px-6 py-2 rounded-full text-center hover:shadow-lg hover:shadow-orange-500/30",
    "gradient-dark":
      "bg-[linear-gradient(90deg,#0061FF_0%,#000000_100%)] px-6 py-2 rounded-full text-center hover:shadow-lg hover:shadow-blue-500/30",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      window.location.href = href;
    }
    onClick?.(e);
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
