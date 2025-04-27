
import { useEffect, useState } from 'react';
import { EnhancedChart } from './EnhancedChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDelta } from '@/components/ui/badge-delta';
import { motion } from 'framer-motion';

interface ChartData {
  name: string;
  value: number;
}

interface DeliveryPerformanceData {
  name: string;
  onTime: number;
  delayed: number;
}

interface ChartsSectionProps {
  revenueData: ChartData[];
  consignmentsData: DeliveryPerformanceData[];
}

export default function ChartsSection({ revenueData, consignmentsData }: ChartsSectionProps) {
  const [animateCharts, setAnimateCharts] = useState(false);
  
  // Animate charts on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimateCharts(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate total on-time and delayed deliveries
  const totalOnTime = consignmentsData.reduce((sum, item) => sum + item.onTime, 0);
  const totalDelayed = consignmentsData.reduce((sum, item) => sum + item.delayed, 0);
  const totalDeliveries = totalOnTime + totalDelayed;
  const onTimePercentage = totalDeliveries > 0 ? ((totalOnTime / totalDeliveries) * 100).toFixed(1) : '0';
  
  // Calculate revenue growth
  const revenueGrowth = revenueData.length >= 2 
    ? ((revenueData[revenueData.length-1].value - revenueData[0].value) / revenueData[0].value * 100).toFixed(1)
    : '0';
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate={animateCharts ? "show" : "hidden"}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
    >
      <motion.div variants={item}>
        <Card className="bg-gradient-to-br from-aximo-dark to-aximo-darker border-aximo-border overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
              Revenue Trend
            </CardTitle>
            <BadgeDelta value={parseFloat(revenueGrowth)} />
          </CardHeader>
          <CardContent className="pt-0">
            <EnhancedChart 
              data={revenueData} 
              type="line"
              height={280}
              colors={{
                primary: '#0090FF',
                grid: 'rgba(255, 255, 255, 0.05)'
              }}
            />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="bg-gradient-to-br from-aximo-dark to-aximo-darker border-aximo-border overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
              Delivery Performance
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-aximo-text-secondary">On-time:</span>
              <BadgeDelta variant="success" value={parseFloat(onTimePercentage)} suffix="%" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <EnhancedChart 
              data={consignmentsData}
              type="bar"
              height={280}
              colors={{
                primary: '#33C3F0',
                secondary: '#FF4842',
                grid: 'rgba(255, 255, 255, 0.05)'
              }}
              showLegend={true}
              dataKeys={['onTime', 'delayed']}
              dataLabels={['On-Time', 'Delayed']}
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
