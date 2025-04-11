
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardMetrics from '../../../pipeline/components/dashboard/DashboardMetrics';
import SalesFunnelChart from '../../../pipeline/components/reports/SalesFunnelChart';
import RevenueForecasting from '../../../pipeline/components/reports/RevenueForecasting';
import { initialLeadsData, pipelineStages } from '../../../pipeline/data/pipelineData';

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>Distribution by stage</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SalesFunnelChart data={initialLeadsData} stages={pipelineStages} simplified={true} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Revenue Forecast</CardTitle>
              <CardDescription>Projected revenue for next 3 months</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueForecasting data={initialLeadsData} simplified={true} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
