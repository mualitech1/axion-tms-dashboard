import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LeadSourceAnalysis from '../../../pipeline/components/reports/LeadSourceAnalysis';
import { initialLeadsData } from '../../../pipeline/data/pipelineData';

export function CustomersTab() {
  return (
    <div className="grid gap-4">
      <Card className="bg-aximo-darker border-aximo-border">
        <CardHeader>
          <CardTitle className="text-aximo-text">Quantum Entity Origin Analysis</CardTitle>
          <CardDescription className="text-aximo-text-secondary">Understanding dimensional access channels</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadSourceAnalysis data={initialLeadsData} />
        </CardContent>
      </Card>
    </div>
  );
}
