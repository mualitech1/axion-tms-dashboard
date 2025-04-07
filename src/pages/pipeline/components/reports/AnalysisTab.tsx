
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LostOpportunityAnalysis from './LostOpportunityAnalysis';
import { Lead } from '../../data/pipelineTypes';

interface AnalysisTabProps {
  data: Lead[];
}

export default function AnalysisTab({ data }: AnalysisTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lost Opportunity Analysis</CardTitle>
        <CardDescription>Understanding why opportunities are lost</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <LostOpportunityAnalysis data={data} />
      </CardContent>
    </Card>
  );
}
