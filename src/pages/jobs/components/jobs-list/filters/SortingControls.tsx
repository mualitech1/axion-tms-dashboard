
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortingControlsProps {
  sortBy: string;
  sortDirection: "asc" | "desc";
  onSortByChange: (value: string) => void;
  onSortDirectionChange: (direction: "asc" | "desc") => void;
}

export function SortingControls({ 
  sortBy, 
  sortDirection, 
  onSortByChange, 
  onSortDirectionChange 
}: SortingControlsProps) {
  return (
    <div>
      <label className="text-sm font-medium block mb-2">Sort</label>
      <div className="grid grid-cols-2 gap-2">
        <Select
          value={sortBy}
          onValueChange={onSortByChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")}
          className="bg-gray-50/60"
        >
          {sortDirection === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
