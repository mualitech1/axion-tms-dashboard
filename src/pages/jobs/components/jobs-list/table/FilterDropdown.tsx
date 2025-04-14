
import React, { useState } from "react";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  options: FilterOption[];
  selectedValues: string[];
  onFilterChange: (values: string[]) => void;
  label: string;
}

export function FilterDropdown({ 
  options, 
  selectedValues, 
  onFilterChange,
  label
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggleOption = (value: string) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
      
    onFilterChange(updatedValues);
  };
  
  const clearFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFilterChange([]);
  };
  
  const activeFilterCount = selectedValues.length;
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 px-2 gap-1 -ml-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Filter className="h-3.5 w-3.5" />
          {activeFilterCount > 0 && (
            <Badge 
              variant="secondary" 
              className="h-5 min-w-5 p-0 flex items-center justify-center rounded-full text-[10px]"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-48 p-2" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2 pb-1 border-b">
          <p className="text-xs font-medium">{label}</p>
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs" 
              onClick={clearFilters}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="max-h-60 overflow-auto">
          {options.map((option) => (
            <DropdownMenuItem 
              key={option.value} 
              className="flex items-center space-x-2 py-1.5 px-2"
              onSelect={(e) => {
                e.preventDefault();
                handleToggleOption(option.value);
              }}
            >
              <Checkbox 
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => handleToggleOption(option.value)} 
                id={`filter-${option.value}`}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor={`filter-${option.value}`}
                className="flex-1 text-sm cursor-pointer"
              >
                {option.label}
              </label>
              {option.count !== undefined && (
                <span className="text-xs text-muted-foreground">{option.count}</span>
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
