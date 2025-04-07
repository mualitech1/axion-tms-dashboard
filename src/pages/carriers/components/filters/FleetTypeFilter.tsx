
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FleetTypeFilterProps {
  selectedFleetType: string | null;
  onChange: (fleetType: string | null) => void;
}

const fleetOptions = ["LGV", "HGV", "Mixed Fleet", "Multimodal", "All Types"];

export function FleetTypeFilter({ selectedFleetType, onChange }: FleetTypeFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Fleet Type</Label>
      <Select
        value={selectedFleetType || "any-fleet"}
        onValueChange={(value) => onChange(value === "any-fleet" ? null : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any fleet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any-fleet">Any fleet</SelectItem>
          {fleetOptions.map((fleet) => (
            <SelectItem key={fleet} value={fleet}>{fleet}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
