
import { Dialog, DialogContent } from "@/components/ui/dialog";
import JobCreationForm from "./job-creation/JobCreationForm";

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreation({ onComplete }: JobCreationProps) {
  return (
    <Dialog open={true} onOpenChange={onComplete}>
      <DialogContent className="w-full max-w-3xl p-0 bg-aximo-dark border-aximo-border">
        <JobCreationForm onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
}
