
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import JobCreationForm from "./job-creation/JobCreationForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreation({ onComplete }: JobCreationProps) {
  const isMobile = useIsMobile();
  
  const ExitButton = () => (
    <motion.button
      onClick={onComplete}
      className="absolute right-4 top-4 z-50 p-2 rounded-full bg-[#162233] border border-[#1a3246] text-[#6b82a6] hover:text-white hover:bg-[#330c0c] hover:border-[#661a1a] transition-all duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <X className="h-5 w-5" />
    </motion.button>
  );
  
  return isMobile ? (
    <Sheet open={true} onOpenChange={onComplete}>
      <SheetContent 
        side="bottom" 
        className="h-[95vh] p-0 bg-[#030619] border-t border-[#1a3246] rounded-t-xl overflow-hidden"
      >
        <ExitButton />
        <JobCreationForm onComplete={onComplete} />
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={true} onOpenChange={onComplete}>
      <DialogContent 
        className="w-full max-w-4xl p-0 bg-[#030619] border-[#1a3246] max-h-[90vh] overflow-hidden rounded-xl flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
        aria-describedby="job-creation-description"
      >
        <VisuallyHidden>
          <DialogTitle>Create New Job</DialogTitle>
          <p id="job-creation-description">Form to create a new transportation job</p>
        </VisuallyHidden>
        <ExitButton />
        <JobCreationForm onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
}
