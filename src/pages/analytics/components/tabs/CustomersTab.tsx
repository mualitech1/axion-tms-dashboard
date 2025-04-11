
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LeadSourceAnalysis from '../../../pipeline/components/reports/LeadSourceAnalysis';
import { initialLeadsData } from '../../../pipeline/data/pipelineData';

export function CustomersTab() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Lead Source Analysis</CardTitle>
          <CardDescription>Understanding customer acquisition channels</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadSourceAnalysis data={initialLeadsData} />
        </CardContent>
      </Card>
    </div>
  );
}
