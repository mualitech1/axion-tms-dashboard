
import { Button } from "@/components/ui/button";

interface StatusFilterProps {
  selectedStatus: string | null;
  onChange: (status: string | null) => void;
}

const statusOptions = ["Active", "Inactive", "Issue"];

export function StatusFilter({ selectedStatus, onChange }: StatusFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Status</h3>
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(selectedStatus === status ? null : status)}
          >
            {status}
          </Button>
        ))}
      </div>
    </div>
  );
}
