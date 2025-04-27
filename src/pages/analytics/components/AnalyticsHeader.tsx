
import React from 'react';
import { Filter, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

interface AnalyticsHeaderProps {
  dateRange: string;
  setDateRange: (range: string) => void;
}

export function AnalyticsHeader({ dateRange, setDateRange }: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered insights and metrics to track business performance
        </p>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px] bg-aximo-dark border-aximo-border">
            <Calendar className="h-4 w-4 mr-2 text-aximo-primary" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-aximo-darker border-aximo-border">
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last quarter</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
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
      </motion.div>
    </div>
  );
}
