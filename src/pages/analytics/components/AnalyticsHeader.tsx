
import React from 'react';
import { Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalyticsHeaderProps {
  dateRange: string;
  setDateRange: (range: string) => void;
}

export function AnalyticsHeader({ dateRange, setDateRange }: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Insights and metrics to track business performance
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last quarter</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}
