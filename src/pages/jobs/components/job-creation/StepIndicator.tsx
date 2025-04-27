
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between max-w-[400px]">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full
              ${index + 1 <= currentStep
                ? 'bg-white text-blue-600'
                : 'bg-blue-800/30 text-blue-100'
              } transition-colors duration-200
            `}>
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className={`
                h-0.5 w-full min-w-[2rem] mx-2
                ${index + 1 < currentStep ? 'bg-white' : 'bg-blue-800/30'}
                transition-colors duration-200
              `} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 text-sm text-blue-100">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
