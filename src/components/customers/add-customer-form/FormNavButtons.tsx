
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronsRight, Save } from 'lucide-react';

interface FormNavButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSubmitting?: boolean;
  isLastStep?: boolean;
  prevStep?: string;
  nextStep?: string;
}

export const FormNavButtons = ({ 
  activeTab, 
  setActiveTab,
  isSubmitting = false,
  isLastStep = false,
  prevStep,
  nextStep
}: FormNavButtonsProps) => {
  return (
    <div className="mt-4 flex justify-between">
      {prevStep ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setActiveTab(prevStep)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {activeTab === "contacts" ? "Back to Company Info" : "Back to Contacts"}
        </Button>
      ) : <div></div>}
      
      {nextStep && !isLastStep && (
        <Button 
          type="button" 
          onClick={() => setActiveTab(nextStep)}
          className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center gap-2"
        >
          {activeTab === "general" ? "Continue to Contacts" : "Continue to Terms"}
          <ChevronsRight className="h-4 w-4 ml-1" />
        </Button>
      )}
      
      {isLastStep && (
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Customer...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Customer
            </>
          )}
        </Button>
      )}
    </div>
  );
};
