
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import JobCreationForm from "./job-creation/JobCreationForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreation({ onComplete }: JobCreationProps) {
  const isMobile = useIsMobile();
  
  return (
    <Dialog open={true} onOpenChange={onComplete}>
      <DialogContent 
        className={`w-full ${isMobile ? 'max-w-[95%]' : 'max-w-3xl'} p-0 bg-aximo-dark border-aximo-border max-h-[95vh] overflow-hidden rounded-lg`}
      >
        <VisuallyHidden>
          <DialogTitle>Create New Job</DialogTitle>
        </VisuallyHidden>
        <JobCreationForm onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
}
