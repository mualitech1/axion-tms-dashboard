
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="mt-2 sm:mt-4">
      <div className={`relative flex items-center ${isMobile ? 'justify-around' : 'justify-between max-w-[400px]'}`}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: index + 1 === currentStep ? 1 : 0.9,
                opacity: index + 1 <= currentStep ? 1 : 0.6 
              }}
              transition={{ duration: 0.3 }}
              className={`
                flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 text-sm sm:text-base relative
                ${index + 1 < currentStep
                  ? 'bg-[#0adeee] text-[#030619] font-bold'
                  : index + 1 === currentStep
                    ? 'bg-[#0a9bdb] text-white font-bold ring-2 ring-[#0adeee] ring-opacity-50'
                    : 'bg-[#162233] text-[#6b82a6]'
                }
                transition-all duration-300
              `}
            >
              {index + 1}
              {index + 1 === currentStep && (
                <motion.div 
                  className="absolute -inset-1 rounded-full bg-[#0a9bdb]/20"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            {index < totalSteps - 1 && (
              <div className="relative h-0.5 w-full min-w-[1rem] mx-1 md:mx-2 bg-[#162233]">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0adeee] to-[#0a9bdb]"
                  initial={{ width: "0%" }}
                  animate={{ width: index + 1 < currentStep ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs sm:text-sm text-center font-mono text-[#6b82a6]">
        <span className="text-[#0adeee]">Step {currentStep}</span> of {totalSteps}
      </div>
    </div>
  );
}
