
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function FleetDistribution() {
  // Fleet type distribution data
  const fleetData = [
    { name: 'HGV Fleet', value: 42, color: '#818CF8' }, // indigo-400
    { name: 'LGV Fleet', value: 28, color: '#10B981' }, // emerald-500
    { name: 'Mixed Fleet', value: 18, color: '#F59E0B' }, // amber-500
    { name: 'Multimodal', value: 12, color: '#EF4444' }   // red-500
  ];
  
  // Capability distribution data
  const capabilityData = [
    { name: 'General Cargo', value: 78 },
    { name: 'Refrigerated', value: 45 },
    { name: 'Hazardous', value: 32 },
    { name: 'Heavy Duty', value: 28 },
    { name: 'Express', value: 64 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-aximo-border bg-aximo-card shadow-aximo">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-aximo-text">Fleet Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fleet Type Distribution */}
            <div className="p-4 bg-aximo-darker rounded-lg border border-aximo-border/50">
              <h3 className="text-sm font-medium mb-4 text-aximo-text-secondary">Fleet Type Distribution</h3>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fleetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {fleetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
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

            {/* Capability Distribution */}
            <div className="p-4 bg-aximo-darker rounded-lg border border-aximo-border/50">
              <h3 className="text-sm font-medium mb-4 text-aximo-text-secondary">Carrier Capabilities</h3>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={capabilityData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    layout="vertical"
                  >
                    <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={{ stroke: '#1F2937' }} tickLine={{ stroke: '#1F2937' }} />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={{ stroke: '#1F2937' }} tickLine={{ stroke: '#1F2937' }} />
                    <Tooltip
                      formatter={(value: number) => [`${value} carriers`, 'Count']}
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        borderColor: '#1F2937',
                        color: '#F9FAFB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                    <Bar dataKey="value" fill="#818CF8" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <p className="text-xs text-indigo-400 mb-1">HGV Fleet</p>
              <p className="text-2xl font-bold text-indigo-500">42%</p>
            </div>
            
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <p className="text-xs text-emerald-400 mb-1">LGV Fleet</p>
              <p className="text-2xl font-bold text-emerald-500">28%</p>
            </div>
            
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-xs text-amber-400 mb-1">Mixed Fleet</p>
              <p className="text-2xl font-bold text-amber-500">18%</p>
            </div>
            
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-xs text-red-400 mb-1">Multimodal</p>
              <p className="text-2xl font-bold text-red-500">12%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
