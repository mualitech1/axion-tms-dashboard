
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Download, FileDown, Filter } from 'lucide-react';
import SalesFunnelChart from './components/reports/SalesFunnelChart';
import RevenueForecasting from './components/reports/RevenueForecasting';
import LostOpportunityAnalysis from './components/reports/LostOpportunityAnalysis';
import PipelineMetrics from './components/reports/PipelineMetrics';
import LeadSourceAnalysis from './components/reports/LeadSourceAnalysis';
import { initialLeadsData, pipelineStages } from './data/pipelineData';

export default function PipelineReports() {
  const [dateRange, setDateRange] = useState('last30days');

  return (
    <MainLayout title="Pipeline Reports">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Reports</h1>
          <p className="text-muted-foreground">
            Analytics and reports for your sales pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funnel">Sales Funnel</TabsTrigger>
          <TabsTrigger value="forecasting">Revenue Forecasting</TabsTrigger>
          <TabsTrigger value="analysis">Lost Opportunity Analysis</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PipelineMetrics data={initialLeadsData} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Funnel Overview</CardTitle>
                <CardDescription>Conversion rates across pipeline stages</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesFunnelChart data={initialLeadsData} stages={pipelineStages} simplified={true} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast (30 Days)</CardTitle>
                <CardDescription>Projected revenue based on pipeline probability</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueForecasting data={initialLeadsData} simplified={true} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Sales Funnel Tab */}
        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Funnel Analysis</CardTitle>
              <CardDescription>Detailed visualization of leads through pipeline stages</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <SalesFunnelChart data={initialLeadsData} stages={pipelineStages} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Revenue Forecasting Tab */}
        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecasting</CardTitle>
              <CardDescription>Projected revenue based on pipeline probability and timelines</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <RevenueForecasting data={initialLeadsData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Lost Opportunity Analysis Tab */}
        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lost Opportunity Analysis</CardTitle>
              <CardDescription>Understanding why opportunities are lost</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <LostOpportunityAnalysis data={initialLeadsData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Lead Sources Tab */}
        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Source Analysis</CardTitle>
              <CardDescription>Performance metrics by lead source</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <LeadSourceAnalysis data={initialLeadsData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
