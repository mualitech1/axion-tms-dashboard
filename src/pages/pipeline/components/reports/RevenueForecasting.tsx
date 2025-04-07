
import React, { useState } from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart, Bar } from 'recharts';
import { Lead } from '../../data/pipelineTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface RevenueForecastingProps {
  data: Lead[];
  simplified?: boolean;
}

// Generate forecast data based on current pipeline
const generateForecastData = (leads: Lead[], periods = 6) => {
  // Current month's total
  const baseRevenue = leads
    .filter(lead => lead.stage === 'won')
    .reduce((sum, lead) => sum + lead.value, 0);
  
  // Potential revenue (weighted by probability)
  const potentialRevenue = leads
    .filter(lead => lead.stage !== 'won' && lead.stage !== 'lost')
    .reduce((sum, lead) => sum + (lead.value * lead.probability / 100), 0);
  
  // Distribution over the next periods
  const monthlyDistribution = [0.4, 0.3, 0.15, 0.08, 0.05, 0.02]; // How the potential revenue distributes over time
  
  // Generate forecast data
  const forecastData = [];
  const currentDate = new Date();
  let cumulativeRevenue = baseRevenue;
  
  for (let i = 0; i < periods; i++) {
    const monthDate = new Date(currentDate);
    monthDate.setMonth(currentDate.getMonth() + i);
    const monthName = monthDate.toLocaleString('default', { month: 'short' });
    const year = monthDate.getFullYear();
    const formattedMonth = `${monthName} ${year}`;
    
    // Calculate predicted revenue for this month
    const additionalRevenue = i < monthlyDistribution.length 
      ? potentialRevenue * monthlyDistribution[i] 
      : 0;
    
    cumulativeRevenue += additionalRevenue;
    
    forecastData.push({
      month: formattedMonth,
      revenue: Math.round(cumulativeRevenue),
      projected: i > 0 ? Math.round(cumulativeRevenue) : null, // Only show projections for future months
      additional: Math.round(additionalRevenue)
    });
  }
  
  return forecastData;
};

export default function RevenueForecasting({ data, simplified = false }: RevenueForecastingProps) {
  const [timeframe, setTimeframe] = useState(simplified ? '3' : '6');
  
  // Generate forecast data
  const forecastData = generateForecastData(data, parseInt(timeframe));
  
  // Calculate confidence bands (simplified model)
  const confidenceData = forecastData.map(item => {
    const upper = item.revenue * 1.15; // 15% higher than expected
    const lower = item.revenue * 0.85; // 15% lower than expected
    return {
      ...item,
      upper,
      lower
    };
  });
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
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
  };

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
        <ResponsiveContainer width="100%" height="100%">
          {simplified ? (
            <LineChart
              data={forecastData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(value) => `£${value / 1000}k`}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <ComposedChart
              data={confidenceData}
              margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(value) => `£${value / 1000}k`}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="upper"
                stroke="transparent"
                fill="#3b82f6"
                fillOpacity={0.1}
                name="Upper Bound"
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="transparent"
                fill="#3b82f6"
                fillOpacity={0.1}
                name="Lower Bound"
              />
              <Bar dataKey="additional" fill="#10b981" name="Additional Revenue" barSize={20} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
                name="Projected Revenue"
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
      
      {!simplified && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">Current Revenue</div>
            <div className="text-2xl font-bold">
              {formatCurrency(forecastData[0].revenue)}
            </div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">{timeframe}-Month Forecast</div>
            <div className="text-2xl font-bold">
              {formatCurrency(forecastData[forecastData.length - 1].revenue)}
            </div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">Growth</div>
            <div className="text-2xl font-bold text-green-500">
              {((forecastData[forecastData.length - 1].revenue / forecastData[0].revenue - 1) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
