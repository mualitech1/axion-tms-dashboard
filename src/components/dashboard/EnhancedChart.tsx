
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface EnhancedChartProps {
  title: string;
  data: any[];
  type: 'line' | 'bar';
  className?: string;
  height?: number;
  colors?: {
    primary: string;
    secondary?: string;
    grid?: string;
  };
}

export function EnhancedChart({
  title,
  data,
  type,
  className,
  height = 300,
  colors = {
    primary: '#0090FF',
    secondary: '#33C3F0',
    grid: 'rgba(255, 255, 255, 0.1)',
  },
}: EnhancedChartProps) {
  return (
    <Card className={cn(
      "bg-aximo-card/50 backdrop-blur-sm border-aximo-border",
      "transition-all duration-300 hover:shadow-aximo",
      className
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px`, width: '100%' }}>
          <ResponsiveContainer>
            {type === 'line' ? (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: colors.grid }}
                />
                <YAxis
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: colors.grid }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 25, 40, 0.8)',
                    borderColor: colors.primary,
                    borderRadius: '8px',
                    backdropFilter: 'blur(4px)',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={colors.primary}
                  strokeWidth={2}
                  dot={{ fill: colors.primary, strokeWidth: 2 }}
                  activeDot={{ r: 6, stroke: colors.primary }}
                />
              </LineChart>
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: colors.grid }}
                />
                <YAxis
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: colors.grid }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 25, 40, 0.8)',
                    borderColor: colors.primary,
                    borderRadius: '8px',
                    backdropFilter: 'blur(4px)',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar
                  dataKey="onTime"
                  fill={colors.primary}
                  radius={[4, 4, 0, 0]}
                  name="On Time"
                />
                {colors.secondary && (
                  <Bar
                    dataKey="delayed"
                    fill={colors.secondary}
                    radius={[4, 4, 0, 0]}
                    name="Delayed"
                  />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
