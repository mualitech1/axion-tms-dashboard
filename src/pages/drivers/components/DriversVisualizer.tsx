
import { Driver } from '../types/driverTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface DriversVisualizerProps {
  drivers: Driver[];
}

export default function DriversVisualizer({ drivers }: DriversVisualizerProps) {
  // Count drivers by status
  const statusCounts = {
    'Active': drivers.filter(d => d.status === 'Active').length,
    'On Leave': drivers.filter(d => d.status === 'On Leave').length,
    'Inactive': drivers.filter(d => d.status === 'Inactive').length
  };

  const statusData = [
    { name: 'Active', value: statusCounts['Active'], color: '#10B981' },
    { name: 'On Leave', value: statusCounts['On Leave'], color: '#F59E0B' },
    { name: 'Inactive', value: statusCounts['Inactive'], color: '#EF4444' }
  ];

  // Create performance data for bar chart
  const activeDrivers = drivers.filter(d => d.status === 'Active');
  const performanceMetrics = [
    { name: 'On-time Delivery', value: activeDrivers.reduce((acc, d) => acc + d.kpi.onTimeDeliveries, 0) / activeDrivers.length },
    { name: 'Fuel Efficiency', value: activeDrivers.reduce((acc, d) => acc + d.kpi.fuelEfficiency, 0) / activeDrivers.length },
    { name: 'Safety Score', value: activeDrivers.reduce((acc, d) => acc + d.kpi.safetyScore, 0) / activeDrivers.length },
    { name: 'Customer Rating', value: activeDrivers.reduce((acc, d) => acc + d.kpi.customerSatisfaction, 0) / activeDrivers.length }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-aximo-border bg-aximo-card shadow-aximo">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-aximo-text">Driver Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Distribution Chart */}
            <div className="p-4 bg-aximo-darker rounded-lg border border-aximo-border/50">
              <h3 className="text-sm font-medium mb-4 text-aximo-text-secondary">Driver Status Distribution</h3>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value} drivers`, 'Count']}
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        borderColor: '#1F2937',
                        color: '#F9FAFB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Metrics Chart */}
            <div className="p-4 bg-aximo-darker rounded-lg border border-aximo-border/50">
              <h3 className="text-sm font-medium mb-4 text-aximo-text-secondary">Average Performance Metrics</h3>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceMetrics}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={{ stroke: '#1F2937' }} tickLine={{ stroke: '#1F2937' }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={{ stroke: '#1F2937' }} tickLine={{ stroke: '#1F2937' }} />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(1)}%`, 'Score']}
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        borderColor: '#1F2937',
                        color: '#F9FAFB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                    <Bar dataKey="value" fill="#0090FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-xs text-green-400 mb-1">Active Drivers</p>
              <p className="text-2xl font-bold text-green-500">{statusCounts['Active']}</p>
            </div>
            
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-xs text-amber-400 mb-1">On Leave</p>
              <p className="text-2xl font-bold text-amber-500">{statusCounts['On Leave']}</p>
            </div>
            
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-xs text-red-400 mb-1">Inactive Drivers</p>
              <p className="text-2xl font-bold text-red-500">{statusCounts['Inactive']}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
