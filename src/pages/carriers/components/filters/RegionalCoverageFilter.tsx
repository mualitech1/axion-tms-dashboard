
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, X } from "lucide-react";
import { RegionOption } from "./types";

interface RegionalCoverageFilterProps {
  selectedRegions: string[];
  onChange: (regions: string[]) => void;
  regionOptions: RegionOption[];
}

export function RegionalCoverageFilter({ selectedRegions, onChange, regionOptions }: RegionalCoverageFilterProps) {
  const toggleRegion = (regionId: string) => {
    const newRegions = selectedRegions.includes(regionId)
      ? selectedRegions.filter(id => id !== regionId)
      : [...selectedRegions, regionId];
    onChange(newRegions);
  };

  const clearRegions = () => {
    onChange([]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Regional Coverage</Label>
        {selectedRegions.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs"
            onClick={clearRegions}
          >
            Clear
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-muted/20">
        {selectedRegions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedRegions.map(regionId => {
              const region = regionOptions.find(r => r.id === regionId);
              return (
                <Badge 
                  key={regionId} 
                  className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
                  onClick={() => toggleRegion(regionId)}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {region?.label || regionId}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground py-1">
            <Globe className="h-3 w-3 inline mr-1" />
            No regions selected
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded p-2">
        {regionOptions.map((region) => (
          <div key={region.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`region-${region.id}`}
              checked={selectedRegions.includes(region.id)}
              onCheckedChange={() => toggleRegion(region.id)}
            />
            <label 
              htmlFor={`region-${region.id}`}
              className="text-sm cursor-pointer"
            >
              {region.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
