
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterOptions } from "./filters/types";
import { StatusFilter } from "./filters/StatusFilter";
import { PriorityFilter } from "./filters/PriorityFilter";
import { DateRangeFilter } from "./filters/DateRangeFilter";
import { SortingControls } from "./filters/SortingControls";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  activeFiltersCount: number;
  className?: string;
}

export function AdvancedFilters({ 
  onFilterChange, 
  activeFiltersCount,
  className
}: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: null,
    priority: null,
    startDate: null,
    endDate: null,
    sortBy: "date",
    sortDirection: "desc",
  });

  const handleChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      status: null,
      priority: null,
      startDate: null,
      endDate: null,
      sortBy: "date",
      sortDirection: "desc",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn("gap-2 h-9 relative", className)}
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
      <PopoverContent className="w-[300px] md:w-[400px] p-4" align="end">
        <div className="grid gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusFilter
              value={filters.status}
              onChange={(value) => handleChange("status", value)}
            />
            
            <PriorityFilter
              value={filters.priority}
              onChange={(value) => handleChange("priority", value)}
            />
          </div>
          
          <DateRangeFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            onStartDateChange={(date) => handleChange("startDate", date)}
            onEndDateChange={(date) => handleChange("endDate", date)}
          />
          
          <SortingControls
            sortBy={filters.sortBy}
            sortDirection={filters.sortDirection}
            onSortByChange={(value) => handleChange("sortBy", value)}
            onSortDirectionChange={(direction) => handleChange("sortDirection", direction)}
          />
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
              className="w-auto"
            >
              Reset filters
            </Button>
            <Button 
              size="sm" 
              onClick={() => setOpen(false)}
              className="w-auto"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
