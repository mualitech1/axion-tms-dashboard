
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrendAnalysisProps {
  title: string;
  description: string;
  data: Array<{
    name: string;
    [key: string]: any;
  }>;
  metrics: Array<{
    id: string;
    label: string;
    color: string;
  }>;
}

export function TrendAnalysis({ title, description, data, metrics }: TrendAnalysisProps) {
  const [selectedMetric, setSelectedMetric] = React.useState<string[]>(
    metrics.slice(0, 2).map(m => m.id)
  );

  const handleMetricToggle = (metricId: string) => {
    if (selectedMetric.includes(metricId)) {
      setSelectedMetric(selectedMetric.filter(id => id !== metricId));
    } else {
      setSelectedMetric([...selectedMetric, metricId]);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-muted-foreground">{entry.name}:</span>
                <span className="text-sm font-medium">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select defaultValue="90days">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last quarter</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
            <SelectItem value="ytd">Year to date</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-flow-col auto-cols-max gap-2">
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              onClick={() => handleMetricToggle(metric.id)}
              className={`
                flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer border
                ${selectedMetric.includes(metric.id) 
                  ? 'bg-primary/10 border-primary/20' 
                  : 'bg-muted/30 border-transparent hover:bg-muted/50'}
              `}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }}></div>
              <span className="text-sm font-medium">{metric.label}</span>
            </div>
          ))}
        </div>
        
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={{ stroke: '#e5e7eb' }}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={{ stroke: '#e5e7eb' }}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {metrics
                .filter(metric => selectedMetric.includes(metric.id))
                .map((metric) => (
                  <Line
                    key={metric.id}
                    type="monotone"
                    dataKey={metric.id}
                    name={metric.label}
                    stroke={metric.color}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 3 }}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
