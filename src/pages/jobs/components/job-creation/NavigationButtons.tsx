
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
    <div className="flex justify-between items-center w-full mt-6 pt-4 border-t border-[#1a3246]">
      <div>
        {currentStep > 1 ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ x: -3 }}
          >
            <Button 
              variant="outline" 
              type="button" 
              onClick={prevStep}
              className="flex items-center gap-2 text-sm hover:bg-[#162233] border-[#1a3246] text-[#6b82a6] px-4 h-10 group rounded-md"
            >
              <ArrowLeft className="h-4 w-4 group-hover:text-[#0adeee] transition-colors" />
              <span className="group-hover:text-white transition-colors">Back</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <Button 
              variant="ghost" 
              type="button" 
              onClick={onCancel}
              className="text-[#6b82a6] hover:text-white hover:bg-[#330c0c] hover:border-[#661a1a] text-sm px-4 h-10 group border border-transparent hover:border-opacity-50 rounded-md"
            >
              <X className="h-4 w-4 mr-2 group-hover:text-red-500" />
              <span>Cancel</span>
            </Button>
          </motion.div>
        )}
      </div>
      
      <div>
        {currentStep < totalSteps ? (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ x: 3 }}
            className="shadow-lg"
          >
            <Button 
              type="button" 
              onClick={nextStep}
              className="bg-gradient-to-r from-[#0a9bdb] to-[#0adeee] hover:from-[#0a9bdb]/90 hover:to-[#0adeee]/90 text-[#030619] font-medium text-sm px-5 h-10 rounded-md shadow-[0_0_15px_rgba(10,222,238,0.3)]"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4 ml-2" />
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
              className="bg-gradient-to-r from-[#0a9bdb] to-[#0adeee] hover:from-[#0a9bdb]/90 hover:to-[#0adeee]/90 text-[#030619] font-bold min-w-[120px] text-sm px-5 h-10 relative overflow-hidden rounded-md shadow-[0_0_15px_rgba(10,222,238,0.3)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
    </div>
  );
}
