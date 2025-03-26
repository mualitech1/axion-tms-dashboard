
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { UserLog } from '../types';

interface UserLogVisualizationProps {
  logs: UserLog[];
}

export default function UserLogVisualization({ logs }: UserLogVisualizationProps) {
  // Process logs data for visualization
  const activityByDay = useMemo(() => {
    // Get last 7 days
    const days = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      days.push({
        date,
        dateStr: date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }),
        count: 0
      });
    }
    
    // Count logs for each day
    logs.forEach(log => {
      const logDate = new Date(log.timestamp);
      
      days.forEach(day => {
        if (logDate >= day.date && logDate < new Date(day.date.getTime() + 24 * 60 * 60 * 1000)) {
          day.count++;
        }
      });
    });
    
    return days;
  }, [logs]);
  
  // Process activity by type
  const activityByType = useMemo(() => {
    const actionCounts: Record<string, number> = {};
    
    logs.forEach(log => {
      actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
    });
    
    return Object.entries(actionCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 actions
  }, [logs]);
  
  // Colors for the charts
  const dayColors = ['#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1'];
  const typeColors = ['#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212'];
  
  // Custom tooltip for bar charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-tms-gray-200 shadow-sm text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-tms-blue">{`Activities: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-md font-medium mb-2">Activity in the Last 7 Days</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activityByDay}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="dateStr" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Activities">
                {activityByDay.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={dayColors[index % dayColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-medium mb-2">Top 5 Activity Types</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activityByType}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Count">
                {activityByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={typeColors[index % typeColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
