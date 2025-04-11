
import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const formCompletion = currentStep * (100 / totalSteps);
  
  return (
    <Progress 
      value={formCompletion} 
      className="h-2 mt-2" 
      indicatorClassName="bg-white/90" 
    />
  );
}
