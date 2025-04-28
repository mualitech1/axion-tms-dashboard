
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="flex justify-between pt-2 sm:pt-4 mt-2 px-1">
      {currentStep > 1 ? (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="outline" 
            type="button" 
            onClick={prevStep}
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:bg-[#162233] border-[#1a3246] text-[#6b82a6] px-3 sm:px-4 h-9 sm:h-10 group"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 group-hover:text-[#0adeee] transition-colors" />
            <span className="group-hover:text-white transition-colors">Back</span>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="ghost" 
            type="button" 
            onClick={onCancel}
            className="text-[#6b82a6] hover:text-white hover:bg-[#330c0c] hover:border-[#661a1a] text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10 group border border-transparent hover:border-opacity-50"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover:text-red-500" />
            <span>Cancel</span>
          </Button>
        </motion.div>
      )}
      
      {currentStep < totalSteps ? (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            type="button" 
            onClick={nextStep}
            className="bg-gradient-to-r from-[#0a9bdb] to-[#0adeee] hover:from-[#0a9bdb]/90 hover:to-[#0adeee]/90 text-[#030619] font-medium text-xs sm:text-sm px-3 sm:px-5 h-9 sm:h-10"
          >
            <span>Continue</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="relative"
          whileHover={{ scale: 1.03 }}
        >
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#0a9bdb] to-[#0adeee] hover:from-[#0a9bdb]/90 hover:to-[#0adeee]/90 text-[#030619] font-bold min-w-[90px] sm:min-w-[120px] text-xs sm:text-sm px-3 sm:px-5 h-9 sm:h-10 relative overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Create Job</span>
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.1, 0], 
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
