
import React from 'react';
import { Line, Area, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ForecastTooltip from './ForecastTooltip';
import { ForecastDataItem } from './forecastUtils';

interface DetailedForecastChartProps {
  data: ForecastDataItem[];
}

export default function DetailedForecastChart({ data }: DetailedForecastChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
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
        <Tooltip content={<ForecastTooltip />} />
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
    </ResponsiveContainer>
  );
}
