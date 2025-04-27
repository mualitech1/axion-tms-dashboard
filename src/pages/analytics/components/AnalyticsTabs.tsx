
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, TrendingUp, LineChart, Users, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsTabsProps {
  defaultValue: string;
  className?: string;
}

export function AnalyticsTabs({ defaultValue, className }: AnalyticsTabsProps) {
  const tabs = [
    { value: "overview", icon: BarChart2, label: "Overview" },
    { value: "sales", icon: TrendingUp, label: "Sales" },
    { value: "invoices", icon: LineChart, label: "Invoices" },
    { value: "customers", icon: Users, label: "Customers" },
    { value: "logistics", icon: Truck, label: "Logistics" }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Tabs defaultValue={defaultValue} className={className}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px] p-1 bg-aximo-dark border border-aximo-border">
          {tabs.map((tab, index) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-aximo-primary/20 data-[state=active]:to-aximo-light/20 data-[state=active]:text-aximo-primary"
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
