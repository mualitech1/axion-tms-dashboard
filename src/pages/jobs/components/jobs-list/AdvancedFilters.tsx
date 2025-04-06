
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { StatusFilter } from "./filters/StatusFilter";
import { PriorityFilter } from "./filters/PriorityFilter";
import { DateRangeFilter } from "./filters/DateRangeFilter";
import { SortingControls } from "./filters/SortingControls";
import { FilterOptions } from "./filters/types";

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  activeFiltersCount: number;
}

export function AdvancedFilters({ onFilterChange, activeFiltersCount }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: null,
    priority: null,
    startDate: null,
    endDate: null,
    sortBy: "date",
    sortDirection: "desc",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    if (key === "sortDirection") {
      const typedValue = value as "asc" | "desc";
      const updatedFilters = { ...filters, [key]: typedValue };
      setFilters(updatedFilters);
      onFilterChange(updatedFilters);
    } else {
      const updatedFilters = { ...filters, [key]: value };
      setFilters(updatedFilters);
      onFilterChange(updatedFilters);
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      status: null,
      priority: null,
      startDate: null,
      endDate: null,
      sortBy: "date",
      sortDirection: "desc" as const,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 gap-1 px-3 border-border/40"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge 
              variant="secondary" 
              className="h-5 w-5 p-0 flex items-center justify-center rounded-full ml-1"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="end">
        <div className="p-4 border-b border-border/40">
          <h4 className="font-medium">Filter Jobs</h4>
        </div>
        
        <div className="p-4 space-y-4">
          <StatusFilter 
            value={filters.status} 
            onChange={(value) => handleFilterChange("status", value)} 
          />

          <PriorityFilter 
            value={filters.priority} 
            onChange={(value) => handleFilterChange("priority", value)} 
          />

          <DateRangeFilter 
            startDate={filters.startDate}
            endDate={filters.endDate}
            onStartDateChange={(date) => handleFilterChange("startDate", date)}
            onEndDateChange={(date) => handleFilterChange("endDate", date)}
          />
          
          <SortingControls 
            sortBy={filters.sortBy}
            sortDirection={filters.sortDirection}
            onSortByChange={(value) => handleFilterChange("sortBy", value)}
            onSortDirectionChange={(direction) => handleFilterChange("sortDirection", direction)}
          />
        </div>
        
        <div className="flex justify-between p-4 pt-2 border-t border-border/40 bg-muted/10">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
          <Button size="sm" onClick={() => setIsOpen(false)}>
            Apply filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { type FilterOptions } from "./filters/types";
