import React from 'react';
import { Filter, Download, Calendar, Sparkles, Network } from 'lucide-react';
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
        <h1 className="text-2xl font-bold tracking-tight text-aximo-text">
          Quantum Intelligence Matrix
        </h1>
        <p className="text-aximo-text-secondary mt-1">
          Neural-quantum insights and multidimensional metrics to monitor spatio-temporal patterns
        </p>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px] bg-aximo-darker border-aximo-border text-aximo-text">
            <Calendar className="h-4 w-4 mr-2 text-aximo-primary" />
            <SelectValue placeholder="Select temporal range" />
          </SelectTrigger>
          <SelectContent className="bg-aximo-darker border-aximo-border">
            <SelectItem value="7days" className="text-aximo-text">Last 7 quantum cycles</SelectItem>
            <SelectItem value="30days" className="text-aximo-text">Last 30 quantum cycles</SelectItem>
            <SelectItem value="90days" className="text-aximo-text">Last quantum phase</SelectItem>
            <SelectItem value="12months" className="text-aximo-text">Full quantum oscillation</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon"
          className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10 text-aximo-text"
        >
          <Network className="h-4 w-4 text-aximo-primary" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10 text-aximo-text"
        >
          <Sparkles className="h-4 w-4 mr-2 text-aximo-primary" />
          Extract Data
        </Button>
      </motion.div>
    </div>
  );
}
