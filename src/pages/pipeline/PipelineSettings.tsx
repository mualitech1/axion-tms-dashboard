
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PipelineSettings() {
  return (
    <MainLayout title="Pipeline Settings">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Settings</h1>
          <p className="text-muted-foreground">
            Configure your sales pipeline stages and preferences
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Pipeline settings and configurations will be displayed here.</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
