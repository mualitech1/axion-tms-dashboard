
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CarrierFilterOptions, RegionOption } from "./types";
import { CapabilityFilter } from "./CapabilityFilter";
import { StatusFilter } from "./StatusFilter";
import { RegionFilter } from "./RegionFilter";
import { FleetTypeFilter } from "./FleetTypeFilter";
import { ComplianceStatusFilter } from "./ComplianceStatusFilter";
import { FavoritesFilter } from "./FavoritesFilter";
import { RegionalCoverageFilter } from "./RegionalCoverageFilter";
import { SearchInput } from "./SearchInput";

export interface CarrierFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFiltersCount: number;
  onFilterChange: (filters: CarrierFilterOptions) => void;
  className?: string;
  regionOptions?: RegionOption[];
}

export { type CarrierFilterOptions } from "./types";

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

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-col sm:flex-row gap-2">
        <SearchInput value={searchTerm} onChange={onSearchChange} />
        
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
              <StatusFilter 
                selectedStatus={filters.status} 
                onChange={(status) => handleFilterChange("status", status)} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RegionFilter 
                  selectedRegion={filters.region}
                  onChange={(region) => handleFilterChange("region", region)}
                />
                
                <FleetTypeFilter 
                  selectedFleetType={filters.fleetType}
                  onChange={(fleetType) => handleFilterChange("fleetType", fleetType)}
                />
              </div>
              
              {regionOptions.length > 0 && (
                <RegionalCoverageFilter
                  selectedRegions={filters.regions || []}
                  onChange={(regions) => handleFilterChange("regions", regions)}
                  regionOptions={regionOptions}
                />
              )}
              
              <ComplianceStatusFilter
                selectedStatus={filters.complianceStatus}
                onChange={(status) => handleFilterChange("complianceStatus", status)}
              />
              
              <FavoritesFilter
                checked={filters.favorites}
                onChange={(checked) => handleFilterChange("favorites", checked)}
              />
              
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
