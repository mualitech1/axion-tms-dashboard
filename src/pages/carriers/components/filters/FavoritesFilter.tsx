
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FavoritesFilterProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function FavoritesFilter({ checked, onChange }: FavoritesFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id="favorites" 
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label htmlFor="favorites">Show favorites only</Label>
    </div>
  );
}
