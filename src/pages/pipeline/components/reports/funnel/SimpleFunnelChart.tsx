
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Lead, PipelineStage } from '../../../data/pipelineTypes';
import { prepareFunnelChartData, calculateConversionRates } from './funnelUtils';

interface SimpleFunnelChartProps {
  data: Lead[];
  stages: PipelineStage[];
}

export default function SimpleFunnelChart({ data, stages }: SimpleFunnelChartProps) {
  const chartData = prepareFunnelChartData(data, stages);
  const conversionRates = calculateConversionRates(chartData);
  
  // Color gradient for the bars
  const gradientColors = ['#3b82f6', '#4f86f7', '#638bf8', '#7790f9', '#8b95fa', '#9f9afb', '#b39efc'];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={conversionRates}
        margin={{
          top: 10,
          right: 50, // More space for value labels
          left: 80,
          bottom: 20,
        }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={80}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Bar
          dataKey="count"
          fill="#3b82f6"
          radius={[0, 4, 4, 0]}
          barSize={20}
        >
          {conversionRates.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={gradientColors[index % gradientColors.length]} />
          ))}
          <LabelList
            dataKey="count"
            position="right"
            formatter={(value: number) => `${value} leads`}
            style={{ fill: "#000", fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
