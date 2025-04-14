
import { Button } from "@/components/ui/button";

interface JobsTableActionsProps {
  onView: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
}

export function JobsTableActions({ onView, onEdit }: JobsTableActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onView}
      >
        View
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onEdit}
      >
        Edit
      </Button>
    </div>
  );
}
