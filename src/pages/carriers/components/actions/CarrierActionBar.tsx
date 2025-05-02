
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, FileText, Download, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CarrierActionBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function CarrierActionBar({ searchQuery, onSearchChange }: CarrierActionBarProps) {
  const { toast } = useToast();

  const handleAddCarrier = () => {
    toast({
      title: "Coming Soon",
      description: "Add carrier functionality will be available soon",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-aximo-card rounded-lg p-4 shadow-sm border border-aximo-border"
    >
      <div className="relative flex-1 max-w-md">
        <Search className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search carriers by name, region or fleet type..."
          className="pl-10 px-4 py-2 border rounded-md w-full bg-aximo-darker border-aximo-border text-aximo-text focus:ring-1 focus:ring-aximo-primary focus:border-aximo-primary"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <Button variant="outline" size="sm" className="bg-aximo-dark border-aximo-border text-aximo-text">
          <Filter className="h-4 w-4 mr-1" />
          <span>Filter</span>
        </Button>
        <Button variant="outline" size="sm" className="bg-aximo-dark border-aximo-border text-aximo-text">
          <FileText className="h-4 w-4 mr-1" />
          <span>Reports</span>
        </Button>
        <Button variant="outline" size="sm" className="bg-aximo-dark border-aximo-border text-aximo-text">
          <Download className="h-4 w-4 mr-1" />
          <span>Export</span>
        </Button>
        <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-md" onClick={handleAddCarrier}>
          <PlusCircle className="h-4 w-4 mr-1" />
          <span>Add Carrier</span>
        </Button>
      </div>
    </motion.div>
  );
}
