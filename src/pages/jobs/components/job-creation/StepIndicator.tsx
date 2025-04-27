
import { useIsMobile } from "@/hooks/use-mobile";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="mt-3 sm:mt-4">
      <div className={`flex items-center ${isMobile ? 'justify-around' : 'justify-between max-w-[400px]'}`}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className={`
              flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0 text-xs sm:text-sm
              ${index + 1 <= currentStep
                ? 'bg-white text-blue-600'
                : 'bg-blue-800/30 text-blue-100'
              } transition-colors duration-200
            `}>
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className={`
                h-0.5 w-full min-w-[0.5rem] mx-1 md:mx-2
                ${index + 1 < currentStep ? 'bg-white' : 'bg-blue-800/30'}
                transition-colors duration-200
              `} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-100">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
