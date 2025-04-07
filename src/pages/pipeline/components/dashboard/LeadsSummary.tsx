
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LeadSource } from '../../data/pipelineTypes';
import { initialLeadsData } from '../../data/pipelineData';

export default function LeadsSummary() {
  // Get counts by lead source
  const sourceData = Object.values(LeadSource).map(source => {
    const count = initialLeadsData.filter(lead => lead.source === source).length;
    return {
      name: formatSourceName(source),
      value: count
    };
  }).filter(item => item.value > 0); // Only include sources with leads
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#64748b', '#8b5cf6'];

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sourceData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {sourceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} Leads`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function formatSourceName(source: string): string {
  return source
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
