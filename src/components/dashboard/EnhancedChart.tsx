
import React, { useEffect, useState } from 'react';
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
  title?: string;
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
  const [chartData, setChartData] = useState<any[]>([]);

  // Animate chart data
  useEffect(() => {
    setChartData([]);
    const timer = setTimeout(() => {
      setChartData(data);
    }, 200);
    return () => clearTimeout(timer);
  }, [data]);

  const renderLegend = () => {
    if (!showLegend) return null;
    
    const labels = dataLabels || dataKeys;
    
    return (
      <div className="flex justify-center mt-4 space-x-6">
        {dataKeys[0] && (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors.primary }} />
            <span className="text-xs text-aximo-text">{labels[0]}</span>
          </div>
        )}
        {dataKeys[1] && colors.secondary && (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors.secondary }} />
            <span className="text-xs text-aximo-text">{labels[1]}</span>
          </div>
        )}
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-aximo-darker/95 backdrop-blur-md border border-aximo-border p-3 rounded-md shadow-aximo text-sm">
          <p className="text-aximo-text-secondary mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-aximo-text">
                {`${dataLabels?.[index] || entry.dataKey}: ${entry.value}`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer>
        {type === 'line' ? (
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
            />
            <YAxis
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKeys[0]}
              stroke={colors.primary}
              strokeWidth={2}
              dot={{ fill: colors.primary, strokeWidth: 2, r: 4, strokeOpacity: 0.8 }}
              activeDot={{ r: 6, stroke: colors.primary }}
              name={dataLabels ? dataLabels[0] : dataKeys[0]}
              fill="url(#primaryGradient)"
            />
            {showLegend && <Legend content={() => null} />} {/* Hidden native legend */}
          </LineChart>
        ) : (
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
            />
            <YAxis
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={dataKeys[0]}
              fill={colors.primary}
              radius={[4, 4, 0, 0]}
              name={dataLabels ? dataLabels[0] : dataKeys[0]}
              animationDuration={1000}
            />
            {dataKeys[1] && colors.secondary && (
              <Bar
                dataKey={dataKeys[1]}
                fill={colors.secondary}
                radius={[4, 4, 0, 0]}
                name={dataLabels ? dataLabels[1] : dataKeys[1]}
                animationDuration={1000}
              />
            )}
            {showLegend && <Legend content={() => null} />} {/* Hidden native legend */}
          </BarChart>
        )}
      </ResponsiveContainer>
      {showLegend && renderLegend()}
    </div>
  );
}
