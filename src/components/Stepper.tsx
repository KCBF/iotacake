
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: Array<{
    label: string;
    description?: string;
  }>;
  activeStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ 
  steps, 
  activeStep, 
  className 
}) => {
  return (
    <div className={cn("w-full", className)}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          
          return (
            <li
              key={step.label}
              className={cn(
                "flex items-center",
                index < steps.length - 1 ? "w-full" : ""
              )}
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm transition-all duration-200",
                    isActive 
                      ? "bg-blue-500 text-white shadow-md" 
                      : isCompleted 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1 font-medium",
                    isActive 
                      ? "text-blue-500" 
                      : isCompleted 
                        ? "text-green-500" 
                        : "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs mt-0.5 text-gray-400">
                    {step.description}
                  </span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-full h-0.5 mx-2 transition-colors duration-300",
                    index < activeStep 
                      ? "bg-green-500" 
                      : "bg-gray-200"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
