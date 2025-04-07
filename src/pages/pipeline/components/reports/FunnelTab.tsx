
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SalesFunnelChart from './SalesFunnelChart';
import { Lead, PipelineStage } from '../../data/pipelineTypes';

interface FunnelTabProps {
  data: Lead[];
  stages: PipelineStage[];
}

export default function FunnelTab({ data, stages }: FunnelTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Funnel Analysis</CardTitle>
        <CardDescription>Detailed visualization of leads through pipeline stages</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <SalesFunnelChart data={data} stages={stages} />
      </CardContent>
    </Card>
  );
}
