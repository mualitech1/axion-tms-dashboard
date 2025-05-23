import { Button } from "@/components/ui/button";
import { SaveAll, ChevronLeft, ChevronRight, X, Save } from "lucide-react";

export interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitEnabled: boolean;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onCancel,
  onSubmit,
  submitEnabled
}: NavigationButtonsProps) {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center mt-8">
      <div>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="text-[#6b82a6] hover:text-white hover:bg-[#0a253a]"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
      
      <div className="flex space-x-3">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="bg-[#0a253a] border-[#1a3246] text-white hover:bg-[#0f3151]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        )}
        
        {!isLastStep ? (
          <Button
            type="button"
            onClick={onNext}
            className="bg-[#0adeee] hover:bg-[#0adeee]/90 text-[#051b2a]"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!submitEnabled}
            className={`${
              submitEnabled
                ? "bg-[#0adeee] hover:bg-[#0adeee]/90 text-[#051b2a]"
                : "bg-[#0adeee]/50 text-[#051b2a] cursor-not-allowed"
            }`}
          >
            <SaveAll className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        )}
      </div>
    </div>
  );
}
