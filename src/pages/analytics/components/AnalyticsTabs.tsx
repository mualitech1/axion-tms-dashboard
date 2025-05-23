import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Zap, Activity, Network, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsTabsProps {
  defaultValue: string;
  className?: string;
}

export function AnalyticsTabs({ defaultValue, className }: AnalyticsTabsProps) {
  const tabs = [
    { value: "overview", icon: Sparkles, label: "Quantum Matrix" },
    { value: "sales", icon: Zap, label: "Energy Flux" },
    { value: "invoices", icon: Activity, label: "Transactions" },
    { value: "customers", icon: Network, label: "Entities" },
    { value: "logistics", icon: Atom, label: "Spatial Dynamics" }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Tabs defaultValue={defaultValue} className={className}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px] p-1 bg-aximo-darker border border-aximo-border">
          {tabs.map((tab, index) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="flex items-center gap-2 text-aximo-text-secondary data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
}
