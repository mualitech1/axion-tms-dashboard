
import { Button } from "@/components/ui/button";
import { FormNavButtons } from "@/components/customers/add-customer-form/FormNavButtons";

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
    <div className="flex justify-between pt-4 border-t mt-6">
      {currentStep > 1 ? (
        <Button 
          variant="outline" 
          type="button" 
          onClick={prevStep}
          className="flex items-center gap-2"
        >
          Back
        </Button>
      ) : (
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
      )}
      
      {currentStep < totalSteps ? (
        <Button 
          type="button" 
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-200"
        >
          Continue
        </Button>
      ) : (
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-200"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Job...
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
