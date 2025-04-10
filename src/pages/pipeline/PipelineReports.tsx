
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <div className="space-y-6">
        {/* Back button header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="mb-2 flex items-center"
            >
              <Link to="/pipeline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Pipeline
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Pipeline Reports</h1>
            <p className="text-muted-foreground mt-1">
              Analytics and performance data for your sales pipeline
            </p>
          </div>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

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
      </div>
    </MainLayout>
  );
}
