
import { Dialog, DialogContent } from "@/components/ui/dialog";
import JobCreationForm from "./job-creation/JobCreationForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreation({ onComplete }: JobCreationProps) {
  const isMobile = useIsMobile();
  
  return isMobile ? (
    // For mobile, use a sheet that slides up from bottom
    <Sheet open={true} onOpenChange={onComplete}>
      <SheetContent 
        side="bottom" 
        className="h-[95vh] p-0 bg-[#030619] border-t border-[#1a3246] rounded-t-xl overflow-hidden"
      >
        <JobCreationForm onComplete={onComplete} />
      </SheetContent>
    </Sheet>
  ) : (
    // For desktop, use a centered dialog
    <Dialog open={true} onOpenChange={onComplete}>
      <DialogContent 
        className="w-full max-w-4xl p-0 bg-[#030619] border-[#1a3246] max-h-[90vh] overflow-hidden rounded-xl"
      >
        <JobCreationForm onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
}
