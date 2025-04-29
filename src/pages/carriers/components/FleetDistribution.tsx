
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

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
      <Card className="border border-indigo-200 shadow-md bg-white overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="text-lg font-semibold text-indigo-800">Fleet Analytics</CardTitle>
        </CardHeader>
        <Separator className="bg-indigo-100" />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fleet Type Distribution */}
            <div className="p-4 bg-white rounded-lg border border-indigo-100 shadow-sm">
              <h3 className="text-sm font-medium mb-4 text-indigo-700">Fleet Type Distribution</h3>
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
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="filter drop-shadow-sm" 
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: '#c7d2fe',
                        color: '#4338ca',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Capability Distribution */}
            <div className="p-4 bg-white rounded-lg border border-indigo-100 shadow-sm">
              <h3 className="text-sm font-medium mb-4 text-indigo-700">Carrier Capabilities</h3>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={capabilityData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    layout="vertical"
                  >
                    <XAxis 
                      type="number" 
                      tick={{ fill: '#6366f1', fontSize: 12 }} 
                      axisLine={{ stroke: '#e0e7ff' }} 
                      tickLine={{ stroke: '#e0e7ff' }} 
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={80} 
                      tick={{ fill: '#4f46e5', fontSize: 12 }} 
                      axisLine={{ stroke: '#e0e7ff' }} 
                      tickLine={{ stroke: '#e0e7ff' }} 
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value} carriers`, 'Count']}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: '#c7d2fe',
                        color: '#4338ca',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#818CF8" 
                      radius={[0, 4, 4, 0]} 
                      className="filter drop-shadow-sm"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-xs text-indigo-600 mb-1">HGV Fleet</p>
              <p className="text-2xl font-bold text-indigo-700">42%</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-xs text-emerald-600 mb-1">LGV Fleet</p>
              <p className="text-2xl font-bold text-emerald-700">28%</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="p-3 bg-amber-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-xs text-amber-600 mb-1">Mixed Fleet</p>
              <p className="text-2xl font-bold text-amber-700">18%</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-xs text-red-600 mb-1">Multimodal</p>
              <p className="text-2xl font-bold text-red-700">12%</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
