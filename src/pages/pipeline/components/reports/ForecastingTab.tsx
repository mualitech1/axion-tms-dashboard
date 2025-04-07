
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RevenueForecasting from './RevenueForecasting';
import { Lead } from '../../data/pipelineTypes';

interface ForecastingTabProps {
  data: Lead[];
}

export default function ForecastingTab({ data }: ForecastingTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Forecasting</CardTitle>
        <CardDescription>Projected revenue based on pipeline probability and timelines</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <RevenueForecasting data={data} />
      </CardContent>
    </Card>
  );
}
