
import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface ForecastTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  simplified?: boolean;
}

export default function ForecastTooltip({ active, payload, label, simplified = false }: ForecastTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded p-3 shadow-md">
        <p className="font-medium">{label}</p>
        {payload[0].payload.projected && (
          <p className="text-sm text-muted-foreground">
            Projected: {formatCurrency(payload[0].payload.projected)}
          </p>
        )}
        {payload[0].payload.additional > 0 && (
          <p className="text-sm text-muted-foreground">
            New Revenue: {formatCurrency(payload[0].payload.additional)}
          </p>
        )}
        {!simplified && (
          <>
            <p className="text-xs text-muted-foreground mt-1 pt-1 border-t">
              Upper Bound: {formatCurrency(payload[0].payload.upper)}
            </p>
            <p className="text-xs text-muted-foreground">
              Lower Bound: {formatCurrency(payload[0].payload.lower)}
            </p>
          </>
        )}
      </div>
    );
  }
  return null;
}
