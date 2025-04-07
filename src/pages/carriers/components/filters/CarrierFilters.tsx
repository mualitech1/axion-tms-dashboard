import { useState } from "react";
import { Search, Filter, X, MapPin, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CapabilityFilter, CarrierCapability } from "./CapabilityFilter";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface CarrierFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFiltersCount: number;
  onFilterChange: (filters: CarrierFilterOptions) => void;
  className?: string;
  regionOptions?: Array<{ id: string; label: string; description?: string }>;
}

export interface CarrierFilterOptions {
  status: string | null;
  region: string | null;
  fleetType: string | null;
  complianceStatus: string | null;
  favorites: boolean;
  capabilities: CarrierCapability[];
  regions?: string[];
}

const statusOptions = ["Active", "Inactive", "Issue"];
const regionOptionsLegacy = ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool", "Belfast", "All Regions"];
const fleetOptions = ["LGV", "HGV", "Mixed Fleet", "Multimodal", "All Types"];
const complianceOptions = ["Compliant", "Non-Compliant", "Action Required"];

export function CarrierFilters({
  searchTerm,
  onSearchChange,
  activeFiltersCount,
  onFilterChange,
  className,
  regionOptions = []
}: CarrierFiltersProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<CarrierFilterOptions>({
    status: null,
    region: null,
    fleetType: null,
    complianceStatus: null,
    favorites: false,
    capabilities: [],
    regions: []
  });

  const handleFilterChange = <K extends keyof CarrierFilterOptions>(
    key: K,
    value: CarrierFilterOptions[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: CarrierFilterOptions = {
      status: null,
      region: null,
      fleetType: null,
      complianceStatus: null,
      favorites: false,
      capabilities: [],
      regions: []
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const toggleRegion = (regionId: string) => {
    const currentRegions = filters.regions || [];
    const newRegions = currentRegions.includes(regionId)
      ? currentRegions.filter(id => id !== regionId)
      : [...currentRegions, regionId];
    handleFilterChange('regions', newRegions);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search carriers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full aspect-square rounded-l-none"
              onClick={() => onSearchChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 h-9 relative whitespace-nowrap"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="flex h-5 w-5 items-center justify-center p-0 text-xs absolute -top-2 -right-2"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] md:w-[400px] p-4" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <Button
                      key={status}
                      variant={filters.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFilterChange("status", filters.status === status ? null : status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select
                    value={filters.region || "any-region"}
                    onValueChange={(value) => handleFilterChange("region", value === "any-region" ? null : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-region">Any region</SelectItem>
                      {regionOptionsLegacy.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Fleet Type</Label>
                  <Select
                    value={filters.fleetType || "any-fleet"}
                    onValueChange={(value) => handleFilterChange("fleetType", value === "any-fleet" ? null : value)}
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
              </div>
              
              {regionOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Regional Coverage</Label>
                    {filters.regions && filters.regions.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-xs"
                        onClick={() => handleFilterChange('regions', [])}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-muted/20">
                    {filters.regions && filters.regions.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {filters.regions.map(regionId => {
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
                          checked={filters.regions?.includes(region.id)}
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
              )}
              
              <div className="space-y-2">
                <Label>Compliance Status</Label>
                <Select
                  value={filters.complianceStatus || "any-status"}
                  onValueChange={(value) => handleFilterChange("complianceStatus", value === "any-status" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any compliance status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-status">Any status</SelectItem>
                    {complianceOptions.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="favorites" 
                  checked={filters.favorites}
                  onCheckedChange={(checked) => handleFilterChange("favorites", checked)}
                />
                <Label htmlFor="favorites">Show favorites only</Label>
              </div>
              
              <CapabilityFilter
                selectedCapabilities={filters.capabilities}
                onChange={(capabilities) => handleFilterChange("capabilities", capabilities)}
              />
              
              <div className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetFilters}
                >
                  Reset all
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setOpen(false)}
                >
                  Apply filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {activeFiltersCount > 0 && (
        <div className="text-xs text-muted-foreground px-2">
          {activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} applied
          {filters.regions && filters.regions.length > 0 && (
            <span className="ml-1">
              (including {filters.regions.length} {filters.regions.length === 1 ? 'region' : 'regions'})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
