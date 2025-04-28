
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Calendar, Filter, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportingHeaderProps {
  title: string;
  description: string;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

export function ReportingHeader({ title, description, dateRange, onDateRangeChange }: ReportingHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-muted-foreground mt-1">
          {description}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Select defaultValue={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-[180px] bg-aximo-dark border-aximo-border">
            <Calendar className="h-4 w-4 mr-2 text-aximo-primary" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-aximo-darker border-aximo-border">
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last quarter</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon"
          className="border-aximo-border bg-aximo-dark hover:bg-aximo-border"
        >
          <Filter className="h-4 w-4 text-aximo-primary" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-aximo-border bg-aximo-dark hover:bg-aximo-border"
        >
          <Download className="h-4 w-4 mr-2 text-aximo-primary" />
          Export
        </Button>
      </div>
    </div>
  );
}
