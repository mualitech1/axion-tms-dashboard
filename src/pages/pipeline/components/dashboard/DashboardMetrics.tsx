import React from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, CreditCard, BarChart2, TrendingUp } from 'lucide-react';
import { BadgeDelta } from '@/components/ui/badge-delta';
import { useIsMobile } from '@/hooks/use-mobile';

export default function DashboardMetrics() {
  const isMobile = useIsMobile();
  
  // Metrics data
  const metrics = [
    {
      title: "Total Leads",
      value: "32",
      change: 8,
      icon: <UsersIcon className="h-5 w-5 text-blue-400" />,
      iconBg: "bg-blue-500/10",
      iconGlow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      trend: "up"
    },
    {
      title: "Pipeline Value",
      value: "£128,400",
      change: 14.3,
      icon: <CreditCard className="h-5 w-5 text-green-400" />,
      iconBg: "bg-green-500/10",
      iconGlow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
      trend: "up"
    },
    {
      title: "Conversion Rate",
      value: "24.3%",
      change: 5.1,
      icon: <BarChart2 className="h-5 w-5 text-purple-400" />,
      iconBg: "bg-purple-500/10",
      iconGlow: "shadow-[0_0_15px_rgba(139,92,246,0.5)]",
      trend: "up"
    },
    {
      title: "Avg. Deal Size",
      value: "£8,450",
      change: 2.5,
      icon: <TrendingUp className="h-5 w-5 text-amber-400" />,
      iconBg: "bg-amber-500/10",
      iconGlow: "shadow-[0_0_15px_rgba(245,158,11,0.5)]",
      trend: "up"
    }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.03, 
            transition: { duration: 0.2 } 
          }}
          className="group"
        >
          <div className="bg-gradient-to-br from-aximo-dark to-aximo-darker border border-aximo-border rounded-lg p-6 shadow-aximo hover:shadow-aximo-strong transition-all duration-300 h-full">
            <div className="flex justify-between items-start mb-4">
              <motion.div 
                className={`${metric.iconBg} p-3 rounded-lg group-hover:${metric.iconGlow} group-hover:scale-110 transition-all duration-300`}
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {metric.icon}
              </motion.div>
              <BadgeDelta value={metric.change} />
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-aximo-text mb-1 tracking-tight group-hover:text-aximo-primary transition-colors">
                {metric.value}
              </h3>
              <p className="text-sm text-aximo-text-secondary">
                {metric.title}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
