
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ListTodo, ArrowRightIcon, BarChart2, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import DashboardMetrics from './components/dashboard/DashboardMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import LeadsByStage from './components/dashboard/LeadsByStage';
import RecentActivityPanel from './components/dashboard/RecentActivityPanel';
import UpcomingTasksPanel from './components/dashboard/UpcomingTasksPanel';
import ReminderOverviewCard from './components/dashboard/ReminderOverviewCard';

export default function PipelineDashboard() {
  const isMobile = useIsMobile();
  const breadcrumbItems = [
    { label: 'Sales', path: '/pipeline' },
    { label: 'Pipeline Dashboard', path: '/pipeline/dashboard' }
  ];

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

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
    <div className="animate-fade-in">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <motion.div 
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
              Logistics Pipeline
            </h1>
            <p className="text-aximo-text-secondary">
              Track leads, opportunities and manage your sales process.
            </p>
          </motion.div>
          <motion.div className="flex flex-wrap items-center gap-2" variants={itemVariants}>
            <Link to="/pipeline/board">
              <Button variant="outline" className="border-aximo-border bg-aximo-dark/50 text-aximo-text hover:bg-aximo-border">
                Board View
              </Button>
            </Link>
            <Link to="/pipeline/tasks">
              <Button variant="outline" className="border-aximo-border bg-aximo-dark/50 text-aximo-text hover:bg-aximo-border">
                <ListTodo className="h-4 w-4 mr-2" />
                Tasks
              </Button>
            </Link>
            <Link to="/pipeline/lead/new">
              <Button className="bg-gradient-to-r from-aximo-primary to-aximo-light hover:opacity-90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Lead
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Metrics Cards */}
      <DashboardMetrics />
      
      {/* Pipeline Overview and Leads by Stage */}
      <motion.div 
        className="grid md:grid-cols-3 gap-6 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="md:col-span-2">
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-gradient-to-br from-aximo-dark to-aximo-darker border border-aximo-border rounded-lg p-6 shadow-aximo h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-aximo-text">Pipeline Overview</h3>
                <p className="text-sm text-aximo-text-secondary">Stage conversion rates</p>
              </div>
              <Badge variant="outline" className="bg-aximo-primary/10 text-aximo-primary border-aximo-primary/20">
                32 Active Leads
              </Badge>
            </div>
            
            <div className="space-y-4 mt-6">
              {[
                { name: 'Lead Identified', count: 12, width: '80%', color: 'from-blue-500/20 to-blue-600/30' },
                { name: 'Initial Contact', count: 10, width: '70%', color: 'from-indigo-500/20 to-indigo-600/30' },
                { name: 'Discovery', count: 8, width: '60%', color: 'from-violet-500/20 to-violet-600/30' },
                { name: 'Proposal Sent', count: 6, width: '50%', color: 'from-purple-500/20 to-purple-600/30' },
                { name: 'Negotiation', count: 4, width: '40%', color: 'from-fuchsia-500/20 to-fuchsia-600/30' },
                { name: 'Pending Agreement', count: 3, width: '30%', color: 'from-pink-500/20 to-pink-600/30' },
                { name: 'Won', count: 2, width: '20%', color: 'from-aximo-primary/20 to-aximo-light/30' }
              ].map((stage, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-aximo-text group-hover:text-aximo-primary transition-colors">{stage.name}</div>
                    <div className="w-6 text-right text-xs text-aximo-text-secondary">{stage.count}</div>
                  </div>
                  <div className="relative h-2.5 bg-aximo-dark/50 rounded-full overflow-hidden">
                    <div 
                      className={`absolute h-full bg-gradient-to-r ${stage.color} backdrop-blur-sm rounded-full 
                        group-hover:shadow-[0_0_8px_rgba(0,144,255,0.6)] transition-all duration-300`}
                      style={{ width: stage.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <LeadsByStage />
        </motion.div>
      </motion.div>
      
      {/* Recent Activity, Upcoming Tasks and Reminders */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <RecentActivityPanel />
        </motion.div>
        <motion.div variants={itemVariants}>
          <UpcomingTasksPanel />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ReminderOverviewCard />
        </motion.div>
      </motion.div>
      
      {/* View All Jobs Button */}
      <motion.div 
        className="mt-6 flex justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Button variant="ghost" size="sm" asChild className="text-aximo-primary hover:text-aximo-light">
          <Link to="/jobs" className="flex items-center text-sm">
            View all jobs
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
