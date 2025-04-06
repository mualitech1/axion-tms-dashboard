
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PriorityFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function PriorityFilter({ value, onChange }: PriorityFilterProps) {
  return (
    <div>
      <label className="text-sm font-medium block mb-2">Priority</label>
      <Select
        value={value || ""}
        onValueChange={(value) => onChange(value === "" ? null : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any priority</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
