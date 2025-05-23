import { Button } from '@/components/ui/button';
import { ChevronsRight, ArrowRight, ChevronRight, BrainCircuit, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormNavButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  nextStep: string;
  isSubmitting?: boolean;
}

export const FormNavButtons = ({ 
  activeTab, 
  setActiveTab, 
  nextStep,
  isSubmitting = false
}: FormNavButtonsProps) => {
  return (
    <div className="flex justify-end pt-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="button"
          className="group relative overflow-hidden bg-gradient-to-r from-indigo-600/80 to-blue-600/80 hover:from-indigo-700/90 hover:to-blue-700/90 text-white border border-indigo-500/40 shadow-[0_0_15px_-3px] shadow-indigo-500/30"
          onClick={() => setActiveTab(nextStep)}
          disabled={isSubmitting}
        >
          {/* Neural circuit animation in button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Atom className="w-20 h-20 text-white animate-pulse" />
          </div>
          
          {/* Glow effect overlay */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-20 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          
          <div className="relative z-10 flex items-center">
            <span className="mr-2">Advance Quantum Waveform</span>
            <div className="bg-indigo-500/30 p-1 rounded-md">
              <BrainCircuit className="h-4 w-4" />
            </div>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};
