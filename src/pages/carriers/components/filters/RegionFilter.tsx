
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegionFilterProps {
  selectedRegion: string | null;
  onChange: (region: string | null) => void;
}

const regionOptions = ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool", "Belfast", "All Regions"];

export function RegionFilter({ selectedRegion, onChange }: RegionFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Region</Label>
      <Select
        value={selectedRegion || "any-region"}
        onValueChange={(value) => onChange(value === "any-region" ? null : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any-region">Any region</SelectItem>
          {regionOptions.map((region) => (
            <SelectItem key={region} value={region}>{region}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
