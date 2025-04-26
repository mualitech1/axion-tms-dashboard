
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { OverviewTab } from './tabs/OverviewTab';
import { SalesTab } from './tabs/SalesTab';
import { InvoicesTab } from './tabs/InvoicesTab';
import { CustomersTab } from './tabs/CustomersTab';
import { LogisticsTab } from './tabs/LogisticsTab';
import { InvoiceData } from '@/components/invoices/create-invoice-dialog/types';
import { MetricCardSkeleton } from '@/components/skeletons/MetricCardSkeleton';
import { ChartSkeleton } from '@/components/skeletons/ChartSkeleton';

interface AnalyticsTabContentProps {
  invoices: InvoiceData[];
  isLoading?: boolean;
}

export function AnalyticsTabContent({ invoices, isLoading = false }: AnalyticsTabContentProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <ChartSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>
      
      <TabsContent value="sales">
        <SalesTab />
      </TabsContent>
      
      <TabsContent value="invoices">
        <InvoicesTab invoices={invoices} />
      </TabsContent>
      
      <TabsContent value="customers">
        <CustomersTab />
      </TabsContent>
      
      <TabsContent value="logistics">
        <LogisticsTab />
      </TabsContent>
    </>
  );
}
