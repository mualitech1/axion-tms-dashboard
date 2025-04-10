
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface EmptyJobsStateProps {
  selectedDate: Date;
  openJobCreation: () => void;
}

export function EmptyJobsState({ selectedDate, openJobCreation }: EmptyJobsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-3">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-lg mb-1">No jobs found</h3>
      <p className="text-muted-foreground mb-4">
        No jobs scheduled for {format(selectedDate, "MMMM d, yyyy")}
      </p>
      <Button onClick={openJobCreation}>
        Create New Job
      </Button>
    </div>
  );
}
