
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Customer } from "@/types/customer";

interface CustomerSegmentationChartProps {
  customers: Customer[];
}

const CustomerSegmentationChart = ({ customers }: CustomerSegmentationChartProps) => {
  // Calculate the customer segments
  const statuses = customers.reduce((acc, customer) => {
    const status = customer.status;
    if (!acc[status]) acc[status] = 0;
    acc[status]++;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(statuses).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <Card className="h-full bg-white dark:bg-indigo-950/20 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          Customer Status Distribution
        </CardTitle>
        <CardDescription className="text-indigo-500 dark:text-indigo-400">
          Overview of your customer base by status
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} Customers`, 'Count']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {pieData.map((segment, index) => (
            <div 
              key={segment.name} 
              className="flex items-center justify-between p-2 rounded-md bg-indigo-50/50 dark:bg-indigo-900/20"
            >
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
                  {segment.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                {segment.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentationChart;
