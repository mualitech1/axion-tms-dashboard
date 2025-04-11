
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, TrendingUp, LineChart, Users, Truck } from 'lucide-react';

interface AnalyticsTabsProps {
  defaultValue: string;
  className?: string;
}

export function AnalyticsTabs({ defaultValue, className }: AnalyticsTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          <span className="hidden md:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="sales" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span className="hidden md:inline">Sales</span>
        </TabsTrigger>
        <TabsTrigger value="invoices" className="flex items-center gap-2">
          <LineChart className="h-4 w-4" />
          <span className="hidden md:inline">Invoices</span>
        </TabsTrigger>
        <TabsTrigger value="customers" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Customers</span>
        </TabsTrigger>
        <TabsTrigger value="logistics" className="flex items-center gap-2">
          <Truck className="h-4 w-4" />
          <span className="hidden md:inline">Logistics</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
