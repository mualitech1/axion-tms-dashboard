
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { ForecastDataItem } from './forecastUtils';

interface ForecastMetricsProps {
  data: ForecastDataItem[];
  timeframe: string;
}

export default function ForecastMetrics({ data, timeframe }: ForecastMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <div className="text-sm font-medium text-muted-foreground">Current Revenue</div>
        <div className="text-2xl font-bold">
          {formatCurrency(data[0].revenue)}
        </div>
      </div>
      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <div className="text-sm font-medium text-muted-foreground">{timeframe}-Month Forecast</div>
        <div className="text-2xl font-bold">
          {formatCurrency(data[data.length - 1].revenue)}
        </div>
      </div>
      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <div className="text-sm font-medium text-muted-foreground">Growth</div>
        <div className="text-2xl font-bold text-green-500">
          {((data[data.length - 1].revenue / data[0].revenue - 1) * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
