
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Lead, PipelineStage } from '../../../data/pipelineTypes';
import { prepareFunnelChartData, calculateConversionRates, calculateAverageConversionRate, calculateLeadToWinRate, calculateTotalValue } from './funnelUtils';
import FunnelChartTooltip from './FunnelChartTooltip';
import { formatCurrency } from '@/lib/utils';

interface DetailedFunnelChartProps {
  data: Lead[];
  stages: PipelineStage[];
}

export default function DetailedFunnelChart({ data, stages }: DetailedFunnelChartProps) {
  const chartData = prepareFunnelChartData(data, stages);
  const conversionRates = calculateConversionRates(chartData);
  
  // Color gradient for the bars
  const gradientColors = ['#3b82f6', '#4f86f7', '#638bf8', '#7790f9', '#8b95fa', '#9f9afb', '#b39efc'];
  
  const avgConversionRate = calculateAverageConversionRate(conversionRates);
  const leadToWinRate = calculateLeadToWinRate(conversionRates);
  const totalValue = calculateTotalValue(data);
  
  return (
    <>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={conversionRates}
            margin={{
              top: 10,
              right: 50, // More space for value labels
              left: 100,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<FunnelChartTooltip />} />
            <Bar
              dataKey="count"
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
              barSize={30}
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
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">Avg. Conversion Rate</div>
          <div className="text-2xl font-bold">
            {avgConversionRate.toFixed(1)}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">Total Value</div>
          <div className="text-2xl font-bold">
            {formatCurrency(totalValue)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">Lead to Win</div>
          <div className="text-2xl font-bold">
            {leadToWinRate}%
          </div>
        </div>
      </div>
    </>
  );
}
