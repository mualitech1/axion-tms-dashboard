
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs } from '@/components/ui/tabs';
import { AnalyticsHeader } from './components/AnalyticsHeader';
import { AnalyticsTabs } from './components/AnalyticsTabs';
import { AnalyticsTabContent } from './components/AnalyticsTabContent';
import { mockInvoices } from './data/mockInvoices';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30days');
  
  return (
    <MainLayout title="Analytics">
      <div className="animate-fade-in space-y-6">
        {/* Header with date range selector */}
        <AnalyticsHeader dateRange={dateRange} setDateRange={setDateRange} />
        
        {/* Main analytics tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <AnalyticsTabs defaultValue="overview" />
          <AnalyticsTabContent invoices={mockInvoices} />
        </Tabs>
      </div>
    </MainLayout>
  );
}
