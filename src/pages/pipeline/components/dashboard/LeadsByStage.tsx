
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function LeadsByStage() {
  const isMobile = useIsMobile();
  
  const data = [
    { name: 'Website', value: 10, color: '#3b82f6' },
    { name: 'Referral', value: 7, color: '#10B981' },
    { name: 'Cold Call', value: 5, color: '#F59E0B' },
    { name: 'Event', value: 6, color: '#6366F1' },
    { name: 'LinkedIn', value: 4, color: '#EC4899' },
    { name: 'Email', value: 3, color: '#8B5CF6' }
  ];
  
  // Calculate total leads
  const totalLeads = data.reduce((sum, item) => sum + item.value, 0);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 } 
    },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 10px 30px -10px rgba(0, 144, 255, 0.3)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <Card className="border-aximo-border bg-gradient-to-br from-aximo-dark to-aximo-darker shadow-aximo h-full">
        <CardHeader className="pb-2 flex justify-between items-start">
          <div>
            <CardTitle className="text-aximo-text font-semibold flex items-center">
              Lead Sources
              <Badge className="ml-2 bg-aximo-primary/20 text-aximo-primary border-none">
                {totalLeads} Total
              </Badge>
            </CardTitle>
            <p className="text-sm text-aximo-text-secondary">Distribution by origin</p>
          </div>
          <motion.div 
            className="p-1.5 rounded-full bg-aximo-primary/10 text-aximo-primary cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 144, 255, 0.2)' }}
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className={isMobile ? "h-[200px]" : "h-[240px]"}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 50}
                  outerRadius={isMobile ? 60 : 70}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#0A121F"
                  className="focus:outline-none"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3))'}}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} Leads (${((value as number / totalLeads) * 100).toFixed(1)}%)`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: '#0A121F', 
                    borderColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                  }}
                  itemStyle={{ color: '#CBD5E1' }}
                  labelStyle={{ color: '#CBD5E1' }}
                />
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle" 
                  iconSize={8}
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-aximo-text-secondary">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
