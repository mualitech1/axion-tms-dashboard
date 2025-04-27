
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardMetrics from '../../../pipeline/components/dashboard/DashboardMetrics';
import SalesFunnelChart from '../../../pipeline/components/reports/SalesFunnelChart';
import RevenueForecasting from '../../../pipeline/components/reports/RevenueForecasting';
import { initialLeadsData, pipelineStages } from '../../../pipeline/data/pipelineData';
import { motion } from 'framer-motion';

export function OverviewTab() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <DashboardMetrics />
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-aximo-dark to-aximo-darker border-aximo-border shadow-aximo">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
                Sales Pipeline
              </CardTitle>
              <CardDescription className="text-aximo-text-secondary">
                Distribution by stage
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 pt-4">
              <SalesFunnelChart data={initialLeadsData} stages={pipelineStages} simplified={true} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-aximo-dark to-aximo-darker border-aximo-border shadow-aximo">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
                Revenue Forecast
              </CardTitle>
              <CardDescription className="text-aximo-text-secondary">
                Projected revenue for next 3 months
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueForecasting data={initialLeadsData} simplified={true} />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
