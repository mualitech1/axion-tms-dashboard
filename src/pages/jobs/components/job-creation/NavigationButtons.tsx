
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
    <div className="flex justify-between pt-2 sm:pt-4 mt-2">
      {currentStep > 1 ? (
        <Button 
          variant="outline" 
          type="button" 
          onClick={prevStep}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:bg-aximo-card px-2 sm:px-4 h-8 sm:h-10"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      ) : (
        <Button 
          variant="ghost" 
          type="button" 
          onClick={onCancel}
          className="text-gray-400 hover:text-white hover:bg-red-500/10 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Cancel</span>
        </Button>
      )}
      
      {currentStep < totalSteps ? (
        <Button 
          type="button" 
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
        >
          <span className="hidden sm:inline">Continue</span>
          <span className="sm:hidden">Next</span>
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
        </Button>
      ) : (
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white min-w-[70px] sm:min-w-[120px] text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
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
