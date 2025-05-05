
import React from 'react';
import { Search, FilterX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MobileOperationsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

export function MobileOperationsFilters({ 
  searchQuery, 
  onSearchChange, 
  onClearFilters 
}: MobileOperationsFiltersProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search records..." 
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select defaultValue="7days">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="7days">Last 7 days</SelectItem>
          <SelectItem value="30days">Last 30 days</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="ghost" size="sm" onClick={onClearFilters}>
        <FilterX className="h-4 w-4 mr-1" /> Clear
      </Button>
    </div>
  );
}
