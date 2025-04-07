
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LeadSourceAnalysis from './LeadSourceAnalysis';
import { Lead } from '../../data/pipelineTypes';

interface SourcesTabProps {
  data: Lead[];
}

export default function SourcesTab({ data }: SourcesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Source Analysis</CardTitle>
        <CardDescription>Performance metrics by lead source</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <LeadSourceAnalysis data={data} />
      </CardContent>
    </Card>
  );
}
