import { Progress } from "@/components/ui/progress";

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  formProgress: number;
}

export function StepIndicator({ currentStep, totalSteps, formProgress }: StepIndicatorProps) {
  const steps = [
    { id: 1, name: "Basic Information" },
    { id: 2, name: "Addresses" },
    { id: 3, name: "Documents & Submit" }
  ];
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-[#0adeee] to-[#0a9bdb] bg-clip-text text-transparent">
          Job Creation Progress
        </h2>
        <div className="ml-2 bg-[#0a9bdb]/10 text-[#0adeee] text-xs px-2 py-1 rounded-full">
          {formProgress}% Complete
        </div>
      </div>
      
      <Progress 
        value={formProgress} 
        className="h-2 mb-6 bg-[#162233]" 
        indicatorClassName="bg-gradient-to-r from-[#0a9bdb] to-[#0adeee]"
      />
      
      <div className="flex justify-between mb-2">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`flex flex-col items-center ${
              step.id === currentStep 
                ? "opacity-100" 
                : step.id < currentStep 
                  ? "opacity-70" 
                  : "opacity-50"
            }`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                step.id === currentStep
                  ? "bg-[#0adeee] text-[#051b2a]"
                  : step.id < currentStep
                    ? "bg-[#0a9bdb]/20 text-[#0adeee] border border-[#0adeee]"
                    : "bg-[#162233] text-[#6b82a6] border border-[#1a3246]"
              }`}
            >
              {step.id}
            </div>
            <span 
              className={`text-xs ${
                step.id === currentStep 
                  ? "text-[#0adeee]" 
                  : "text-[#6b82a6]"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="relative flex mt-2">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`h-0.5 flex-1 ${
              index === steps.length - 1 
                ? "hidden" 
                : index < currentStep - 1
                  ? "bg-[#0adeee]"
                  : "bg-[#162233]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
