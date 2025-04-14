
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "../../../types/jobTypes";

interface StatusFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div>
      <label className="text-sm font-medium block mb-2">Status</label>
      <Select
        value={value || ""}
        onValueChange={(value) => onChange(value === "" ? null : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any status</SelectItem>
          <SelectItem value="booked">Booked</SelectItem>
          <SelectItem value="allocated">Allocated</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="finished">Finished (Needs POD)</SelectItem>
          <SelectItem value="invoiced">Invoiced</SelectItem>
          <SelectItem value="cleared">Cleared</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
          <SelectItem value="issues">Issues</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
