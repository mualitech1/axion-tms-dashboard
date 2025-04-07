
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initialLeadsData, pipelineStages } from './data/pipelineData';

import ReportsHeader from './components/reports/ReportsHeader';
import OverviewTab from './components/reports/OverviewTab';
import FunnelTab from './components/reports/FunnelTab';
import ForecastingTab from './components/reports/ForecastingTab';
import AnalysisTab from './components/reports/AnalysisTab';
import SourcesTab from './components/reports/SourcesTab';

export default function PipelineReports() {
  return (
    <MainLayout title="Pipeline Reports">
      <ReportsHeader />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funnel">Sales Funnel</TabsTrigger>
          <TabsTrigger value="forecasting">Revenue Forecasting</TabsTrigger>
          <TabsTrigger value="analysis">Lost Opportunity Analysis</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab data={initialLeadsData} stages={pipelineStages} />
        </TabsContent>
        
        <TabsContent value="funnel" className="space-y-4">
          <FunnelTab data={initialLeadsData} stages={pipelineStages} />
        </TabsContent>
        
        <TabsContent value="forecasting" className="space-y-4">
          <ForecastingTab data={initialLeadsData} />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4">
          <AnalysisTab data={initialLeadsData} />
        </TabsContent>
        
        <TabsContent value="sources" className="space-y-4">
          <SourcesTab data={initialLeadsData} />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
