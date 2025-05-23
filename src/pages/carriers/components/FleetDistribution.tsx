import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Truck } from "lucide-react";
import { Carrier } from "../data/types/carrierTypes";

interface FleetDistributionProps {
  carriers: Carrier[];
}

export default function FleetDistribution({ carriers }: FleetDistributionProps) {
  // Calculate fleet type distribution based on actual carrier data
  const fleetTypeCounts: { [key: string]: number } = {};
  carriers.forEach(carrier => {
    if (fleetTypeCounts[carrier.fleet]) {
      fleetTypeCounts[carrier.fleet]++;
    } else {
      fleetTypeCounts[carrier.fleet] = 1;
    }
  });

  // Convert to array for easier rendering
  const fleetTypes = Object.keys(fleetTypeCounts).map(type => ({
    name: type,
    count: fleetTypeCounts[type],
    percentage: Math.round((fleetTypeCounts[type] / carriers.length) * 100) || 0
  }));

  // Sort by count (highest first)
  fleetTypes.sort((a, b) => b.count - a.count);

  // Assign colors based on index
  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-green-500", 
    "bg-amber-500", "bg-red-500", "bg-pink-500"
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
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Truck className="h-5 w-5 mr-2 text-aximo-primary" />
            Fleet Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 pt-6">
          {carriers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <PieChart className="h-12 w-12 text-aximo-text-secondary opacity-40 mb-2" />
              <p className="text-aximo-text-secondary">No carrier data available</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {fleetTypes.map((type, index) => (
                  <div 
                    key={type.name} 
                    className="flex items-center bg-aximo-darker rounded-md px-2 py-1"
                  >
                    <div className={`w-2 h-2 rounded-full ${colors[index % colors.length]} mr-2`}></div>
                    <span className="text-xs font-medium text-aximo-text">{type.name}</span>
                    <span className="text-xs text-aximo-text-secondary ml-1">({type.count})</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                {fleetTypes.map((type, index) => (
                  <div key={type.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-2`}></div>
                        <span className="text-sm text-aximo-text">{type.name}</span>
                      </div>
                      <span className="text-sm font-medium text-aximo-text">{type.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[index % colors.length]}`} 
                        style={{ width: `${type.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
