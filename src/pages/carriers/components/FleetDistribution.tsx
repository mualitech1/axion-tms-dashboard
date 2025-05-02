
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
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
      <Card className="bg-[#1a1e2b] border-none shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500/40 to-purple-500/40"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <svg className="absolute top-0 right-0 opacity-10" width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,400 Q200,100 400,400 Q600,700 750,400" stroke="#9b87f5" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-lg font-semibold text-white">Fleet Analytics</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Fleet Type Distribution */}
            <div className="p-4 bg-[#1a1e2b]/80 rounded-lg border border-gray-700 shadow-sm">
              <h3 className="text-sm font-medium mb-4 text-gray-200">Fleet Type Distribution</h3>
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
                      label={({ name }) => name}
                      labelLine={false}
                    >
                      {fleetData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="filter drop-shadow-lg" 
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
                      contentStyle={{
                        backgroundColor: 'rgba(26, 30, 43, 0.95)',
                        borderColor: '#4B5563',
                        color: '#E5E7EB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Capability Distribution */}
            <div className="p-4 bg-[#1a1e2b]/80 rounded-lg border border-gray-700 shadow-sm">
              <h3 className="text-sm font-medium mb-4 text-gray-200">Carrier Capabilities</h3>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={capabilityData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    layout="vertical"
                  >
                    <XAxis 
                      type="number" 
                      tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                      axisLine={{ stroke: '#4B5563' }} 
                      tickLine={{ stroke: '#4B5563' }} 
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={80} 
                      tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                      axisLine={{ stroke: '#4B5563' }} 
                      tickLine={{ stroke: '#4B5563' }} 
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value} carriers`, 'Count']}
                      contentStyle={{
                        backgroundColor: 'rgba(26, 30, 43, 0.95)',
                        borderColor: '#4B5563',
                        color: '#E5E7EB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
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
          <div className="grid grid-cols-4 gap-4">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-3 bg-[#1a1e2b]/80 border border-indigo-900/50 rounded-lg"
            >
              <p className="text-xs text-indigo-400 mb-1">HGV Fleet</p>
              <p className="text-2xl font-bold text-indigo-300">42%</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-3 bg-[#1a1e2b]/80 border border-emerald-900/50 rounded-lg"
            >
              <p className="text-xs text-emerald-400 mb-1">LGV Fleet</p>
              <p className="text-2xl font-bold text-emerald-300">28%</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="p-3 bg-[#1a1e2b]/80 border border-amber-900/50 rounded-lg"
            >
              <p className="text-xs text-amber-400 mb-1">Mixed Fleet</p>
              <p className="text-2xl font-bold text-amber-300">18%</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="p-3 bg-[#1a1e2b]/80 border border-red-900/50 rounded-lg"
            >
              <p className="text-xs text-red-400 mb-1">Multimodal</p>
              <p className="text-2xl font-bold text-red-300">12%</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
