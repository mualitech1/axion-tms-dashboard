
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PipelineMetrics from './PipelineMetrics';
import SalesFunnelChart from './SalesFunnelChart';
import RevenueForecasting from './RevenueForecasting';
import { Lead, PipelineStage } from '../../data/pipelineTypes';

interface OverviewTabProps {
  data: Lead[];
  stages: PipelineStage[];
}

export default function OverviewTab({ data, stages }: OverviewTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PipelineMetrics data={data} />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel Overview</CardTitle>
            <CardDescription>Conversion rates across pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesFunnelChart data={data} stages={stages} simplified={true} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Forecast (30 Days)</CardTitle>
            <CardDescription>Projected revenue based on pipeline probability</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueForecasting data={data} simplified={true} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
