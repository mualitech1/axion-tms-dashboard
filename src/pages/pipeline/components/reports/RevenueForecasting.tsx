
import React, { useState } from 'react';
import { Lead } from '../../data/pipelineTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SimpleForecastChart from './forecasting/SimpleForecastChart';
import DetailedForecastChart from './forecasting/DetailedForecastChart';
import ForecastMetrics from './forecasting/ForecastMetrics';
import { generateForecastData, calculateConfidenceBands } from './forecasting/forecastUtils';

interface RevenueForecastingProps {
  data: Lead[];
  simplified?: boolean;
}

export default function RevenueForecasting({ data, simplified = false }: RevenueForecastingProps) {
  const [timeframe, setTimeframe] = useState(simplified ? '3' : '6');
  
  // Generate forecast data
  const forecastData = generateForecastData(data, parseInt(timeframe));
  
  // Calculate confidence bands (simplified model)
  const confidenceData = calculateConfidenceBands(forecastData);
  
  return (
    <div>
      {!simplified && (
        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Forecast based on current pipeline value and probability
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Next 3 months</SelectItem>
              <SelectItem value="6">Next 6 months</SelectItem>
              <SelectItem value="12">Next 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className={simplified ? "h-64" : "h-80"}>
        {simplified ? (
          <SimpleForecastChart data={forecastData} />
        ) : (
          <DetailedForecastChart data={confidenceData} />
        )}
      </div>
      
      {!simplified && (
        <ForecastMetrics data={forecastData} timeframe={timeframe} />
      )}
    </div>
  );
}
