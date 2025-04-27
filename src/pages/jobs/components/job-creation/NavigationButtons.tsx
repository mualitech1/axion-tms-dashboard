
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, X } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  prevStep: () => void;
  nextStep: () => void;
  onCancel: () => void;
}

export function NavigationButtons({ 
  currentStep, 
  totalSteps, 
  isSubmitting, 
  prevStep, 
  nextStep, 
  onCancel 
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between pt-4 mt-2">
      {currentStep > 1 ? (
        <Button 
          variant="outline" 
          type="button" 
          onClick={prevStep}
          className="flex items-center gap-2 hover:bg-aximo-card"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      ) : (
        <Button 
          variant="ghost" 
          type="button" 
          onClick={onCancel}
          className="text-gray-400 hover:text-white hover:bg-red-500/10"
        >
          <X className="h-4 w-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Cancel</span>
        </Button>
      )}
      
      {currentStep < totalSteps ? (
        <Button 
          type="button" 
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
        >
          <span className="hidden sm:inline">Continue</span>
          <ArrowRight className="h-4 w-4 ml-0 sm:ml-2" />
        </Button>
      ) : (
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white min-w-[90px] sm:min-w-[120px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <span className="hidden sm:inline">Creating...</span>
              <span className="sm:hidden">...</span>
            </>
          ) : (
            <>
              Create Job
            </>
          )}
        </Button>
      )}
    </div>
  );
}
