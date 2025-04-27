
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
  Legend,
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
  showLegend?: boolean;
  dataKeys?: string[];
  dataLabels?: string[];
}

export function EnhancedChart({
  title,
  data,
  type,
  className,
  height = 300,
  colors = {
    primary: '#0090FF',
    secondary: '#FF4842',
    grid: 'rgba(255, 255, 255, 0.1)',
  },
  showLegend = false,
  dataKeys = ['value'],
  dataLabels,
}: EnhancedChartProps) {
  const renderLegend = () => {
    if (!showLegend) return null;
    
    const labels = dataLabels || dataKeys;
    
    return (
      <div className="flex justify-center mt-4 space-x-6">
        {dataKeys[0] && (
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-sm mr-2`} style={{ backgroundColor: colors.primary }} />
            <span className="text-xs text-aximo-text">{labels[0]}</span>
          </div>
        )}
        {dataKeys[1] && colors.secondary && (
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-sm mr-2`} style={{ backgroundColor: colors.secondary }} />
            <span className="text-xs text-aximo-text">{labels[1]}</span>
          </div>
        )}
      </div>
    );
  };

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
                  dataKey={dataKeys[0]}
                  stroke={colors.primary}
                  strokeWidth={2}
                  dot={{ fill: colors.primary, strokeWidth: 2 }}
                  activeDot={{ r: 6, stroke: colors.primary }}
                  name={dataLabels ? dataLabels[0] : dataKeys[0]}
                />
                {showLegend && <Legend content={() => null} />} {/* Hidden native legend */}
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
                  dataKey={dataKeys[0]}
                  fill={colors.primary}
                  radius={[4, 4, 0, 0]}
                  name={dataLabels ? dataLabels[0] : dataKeys[0]}
                />
                {dataKeys[1] && colors.secondary && (
                  <Bar
                    dataKey={dataKeys[1]}
                    fill={colors.secondary}
                    radius={[4, 4, 0, 0]}
                    name={dataLabels ? dataLabels[1] : dataKeys[1]}
                  />
                )}
                {showLegend && <Legend content={() => null} />} {/* Hidden native legend */}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        {showLegend && renderLegend()}
      </CardContent>
    </Card>
  );
}
