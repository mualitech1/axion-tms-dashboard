
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Lead, PipelineStage } from '../../data/pipelineTypes';
import { formatCurrency } from '@/lib/utils';

interface SalesFunnelChartProps {
  data: Lead[];
  stages: PipelineStage[];
  simplified?: boolean;
}

export default function SalesFunnelChart({ data, stages, simplified = false }: SalesFunnelChartProps) {
  // Filter out "Lost" stage for the funnel visualization
  const activeStages = stages.filter(stage => stage.name !== "Lost");
  
  // Prepare data for funnel chart
  const chartData = activeStages.map(stage => {
    const stageLeads = data.filter(lead => lead.stage === stage.id);
    return {
      name: stage.name,
      count: stageLeads.length,
      value: stageLeads.reduce((sum, lead) => sum + lead.value, 0)
    };
  });
  
  // Calculate conversion rates between stages
  const conversionRates = chartData.map((item, index, array) => {
    if (index === 0) return { ...item, conversionRate: 100 };
    
    const prevCount = array[index - 1].count;
    const conversionRate = prevCount === 0 ? 0 : (item.count / prevCount) * 100;
    return { ...item, conversionRate };
  });

  // Custom Tooltip for the funnel chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded p-3 shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">Leads: {data.count}</p>
          <p className="text-sm text-muted-foreground">Value: {formatCurrency(data.value)}</p>
          {index => index > 0 ? (
            <p className="text-sm text-muted-foreground">
              Conversion: {data.conversionRate.toFixed(1)}%
            </p>
          ) : null}
        </div>
      );
    }
    return null;
  };

  // Color gradient for the bars
  const gradientColors = ['#3b82f6', '#4f86f7', '#638bf8', '#7790f9', '#8b95fa', '#9f9afb', '#b39efc'];
  
  return (
    <div className={simplified ? 'h-72' : 'h-96'}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={conversionRates}
          margin={{
            top: 10,
            right: 50, // More space for value labels
            left: simplified ? 80 : 100,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={!simplified} />
          <XAxis type="number" hide={simplified} />
          <YAxis
            type="category"
            dataKey="name"
            width={simplified ? 80 : 100}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          {!simplified && <Tooltip content={<CustomTooltip />} />}
          <Bar
            dataKey="count"
            fill="#3b82f6"
            radius={[0, 4, 4, 0]}
            barSize={simplified ? 20 : 30}
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
      {!simplified && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Avg. Conversion Rate</div>
            <div className="text-2xl font-bold">
              {(
                conversionRates
                  .filter((_, i) => i > 0)
                  .reduce((sum, item) => sum + item.conversionRate, 0) / 
                (conversionRates.length - 1)
              ).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Total Value</div>
            <div className="text-2xl font-bold">
              {formatCurrency(data.reduce((sum, lead) => sum + lead.value, 0))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Lead to Win</div>
            <div className="text-2xl font-bold">
              {Math.round((conversionRates[conversionRates.length - 1].count / conversionRates[0].count) * 100)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
