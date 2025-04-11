
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { cn } from '@/lib/utils';
import DashboardCard from './DashboardCard';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface ChartProps {
  title: string;
  data: any[]; // Use a more generic type to accept different data structures
  type?: 'line' | 'bar';
  className?: string;
  height?: number;
  colors?: string[];
  dataKeys?: string[];
  isLoading?: boolean;
}

export default function Chart({
  title,
  data,
  type = 'line',
  className,
  height = 300,
  colors = ['#0077C8', '#00A76F', '#FFC107'],
  dataKeys = ['value'],
  isLoading = false,
}: ChartProps) {
  return (
    <DashboardCard 
      title={title}
      className={cn("", className)}
      isLoading={isLoading}
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#637381' }}
                tickLine={false}
                axisLine={{ stroke: '#EEF0F3' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#637381' }}
                tickLine={false}
                axisLine={{ stroke: '#EEF0F3' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#637381' }}
                tickLine={false}
                axisLine={{ stroke: '#EEF0F3' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#637381' }}
                tickLine={false}
                axisLine={{ stroke: '#EEF0F3' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
