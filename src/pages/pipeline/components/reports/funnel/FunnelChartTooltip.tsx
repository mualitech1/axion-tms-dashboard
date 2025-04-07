
import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface FunnelChartTooltipProps {
  active?: boolean;
  payload?: any[];
}

export default function FunnelChartTooltip({ active, payload }: FunnelChartTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded p-3 shadow-md">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">Leads: {data.count}</p>
        <p className="text-sm text-muted-foreground">Value: {formatCurrency(data.value)}</p>
        {data.conversionRate !== undefined && data.name !== payload[0].dataKey && (
          <p className="text-sm text-muted-foreground">
            Conversion: {data.conversionRate.toFixed(1)}%
          </p>
        )}
      </div>
    );
  }
  return null;
}
