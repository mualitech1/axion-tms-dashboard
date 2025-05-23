import React, { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { AnalyticsHeader } from './components/AnalyticsHeader';
import { AnalyticsTabs } from './components/AnalyticsTabs';
import { AnalyticsTabContent } from './components/AnalyticsTabContent';
import { mockInvoices } from './data/mockInvoices';
import { motion } from 'framer-motion';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30days');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading for demo purposes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const breadcrumbItems = [
    { label: "Quantum Hub", path: "/" },
    { label: "Quantum Intelligence", path: "/analytics" }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border"
      >
        <Breadcrumb items={breadcrumbItems} />
        <AnalyticsHeader dateRange={dateRange} setDateRange={setDateRange} />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-6"
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <AnalyticsTabs defaultValue="overview" />
          <AnalyticsTabContent invoices={mockInvoices} isLoading={isLoading} />
        </Tabs>
      </motion.div>
    </div>
  );
}
