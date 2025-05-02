
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronsRight, Save } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setActiveTab(prevStep)}
            className="flex items-center gap-2 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-700 dark:hover:bg-indigo-900/50 dark:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4" />
            {activeTab === "contacts" ? "Back to Company Info" : "Back to Contacts"}
          </Button>
        </motion.div>
      ) : <div></div>}
      
      {nextStep && !isLastStep && (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            type="button" 
            onClick={() => setActiveTab(nextStep)}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all duration-200 flex items-center gap-2 shadow-md"
          >
            {activeTab === "general" ? "Continue to Contacts" : "Continue to Terms"}
            <ChevronsRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      )}
      
      {isLastStep && (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all duration-200 flex items-center gap-2 shadow-md"
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
        </motion.div>
      )}
    </div>
  );
};
