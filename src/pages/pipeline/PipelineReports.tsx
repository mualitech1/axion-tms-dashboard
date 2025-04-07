
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PipelineReports() {
  return (
    <MainLayout title="Pipeline Reports">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Reports</h1>
          <p className="text-muted-foreground">
            Analytics and reports for your sales pipeline
          </p>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Pipeline reports and analytics will be displayed here.</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
