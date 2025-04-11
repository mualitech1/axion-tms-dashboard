
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { OverviewTab } from './tabs/OverviewTab';
import { SalesTab } from './tabs/SalesTab';
import { InvoicesTab } from './tabs/InvoicesTab';
import { CustomersTab } from './tabs/CustomersTab';
import { LogisticsTab } from './tabs/LogisticsTab';
import { InvoiceData } from '@/components/invoices/create-invoice-dialog/types';

interface AnalyticsTabContentProps {
  invoices: InvoiceData[];
}

export function AnalyticsTabContent({ invoices }: AnalyticsTabContentProps) {
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
