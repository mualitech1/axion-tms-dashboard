import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PipelineMetrics from '../../../pipeline/components/reports/PipelineMetrics';
import SalesFunnelChart from '../../../pipeline/components/reports/SalesFunnelChart';
import LeadsSummary from '../../../pipeline/components/dashboard/LeadsSummary';
import { initialLeadsData, pipelineStages } from '../../../pipeline/data/pipelineData';

export function SalesTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PipelineMetrics data={initialLeadsData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-aximo-darker border-aximo-border">
          <CardHeader>
            <CardTitle className="text-aximo-text">Quantum Entanglement Matrix</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Energy flux distribution analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <SalesFunnelChart data={initialLeadsData} stages={pipelineStages} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-aximo-darker border-aximo-border">
          <CardHeader>
            <CardTitle className="text-aximo-text">Source Field Distribution</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Quantum origins breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <LeadsSummary />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
