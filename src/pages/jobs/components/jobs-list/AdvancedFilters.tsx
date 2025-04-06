
import { useState } from "react";
import { Filter, Calendar, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  activeFiltersCount: number;
}

export interface FilterOptions {
  status: string | null;
  priority: string | null;
  startDate: Date | null;
  endDate: Date | null;
  sortBy: string;
  sortDirection: "asc" | "desc";
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

  const [dateView, setDateView] = useState<"start" | "end">("start");
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
          <div>
            <label className="text-sm font-medium block mb-2">Status</label>
            <Select
              value={filters.status || ""}
              onValueChange={(value) => handleFilterChange("status", value === "" ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Priority</label>
            <Select
              value={filters.priority || ""}
              onValueChange={(value) => handleFilterChange("priority", value === "" ? null : value)}
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

          <div>
            <label className="text-sm font-medium block mb-2">Date Range</label>
            <div className="flex gap-2 mb-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDateView("start")}
                className={cn(
                  "flex-1",
                  dateView === "start" ? "border-primary/50 bg-primary/5" : ""
                )}
              >
                Start Date
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDateView("end")}
                className={cn(
                  "flex-1",
                  dateView === "end" ? "border-primary/50 bg-primary/5" : ""
                )}
              >
                End Date
              </Button>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs">
                {filters.startDate ? format(filters.startDate, "MMM dd, yyyy") : "No start date"}
              </div>
              <div className="text-xs">
                {filters.endDate ? format(filters.endDate, "MMM dd, yyyy") : "No end date"}
              </div>
            </div>

            <CalendarComponent
              mode="single"
              selected={dateView === "start" ? filters.startDate || undefined : filters.endDate || undefined}
              onSelect={(date) => {
                if (dateView === "start") {
                  handleFilterChange("startDate", date);
                  setDateView("end");
                } else {
                  handleFilterChange("endDate", date);
                }
              }}
              className="rounded border p-3"
              initialFocus
            />
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-2">Sort</label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange("sortBy", value)}
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
                onClick={() => handleFilterChange("sortDirection", filters.sortDirection === "asc" ? "desc" : "asc")}
                className="bg-gray-50/60"
              >
                {filters.sortDirection === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
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
