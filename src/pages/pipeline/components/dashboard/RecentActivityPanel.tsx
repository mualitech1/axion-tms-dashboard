import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Activity, Users as UsersIcon, MessageSquare, FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function RecentActivityPanel() {
  const activities = [
    {
      id: 1,
      type: 'contact',
      title: 'Call with ABC Logistics',
      description: 'Discussed transportation requirements',
      time: '2 hours ago',
      icon: <UsersIcon size={16} className="text-blue-400" />,
      iconBg: 'bg-blue-500/10'
    },
    {
      id: 2,
      type: 'message',
      title: 'Email sent to XYZ Transport',
      description: 'Quote for warehouse services',
      time: '4 hours ago',
      icon: <MessageSquare size={16} className="text-violet-400" />,
      iconBg: 'bg-violet-500/10'
    },
    {
      id: 3,
      type: 'document',
      title: 'Proposal updated',
      description: 'Revised proposal for FastTrack Inc.',
      time: 'Yesterday',
      icon: <FileText size={16} className="text-amber-400" />,
      iconBg: 'bg-amber-500/10'
    },
    {
      id: 4,
      type: 'contact',
      title: 'Meeting with Global Freight',
      description: 'New lead discussion',
      time: '2 days ago',
      icon: <UsersIcon size={16} className="text-blue-400" />,
      iconBg: 'bg-blue-500/10'
    },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { 
      x: 5, 
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
              <Activity size={18} className="mr-2 text-aximo-primary" />
              Recent Activity
            </CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-aximo-text-secondary hover:text-aximo-primary hover:bg-aximo-primary/10">
            <ChevronRight size={18} />
            <span className="sr-only">View all</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="flex gap-3 group cursor-pointer"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover="hover"
              >
                <div className={`${activity.iconBg} p-2 rounded-full mt-0.5 h-fit`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-aximo-text group-hover:text-aximo-primary transition-colors">
                      {activity.title}
                    </h4>
                    <span className="text-xs text-aximo-text-secondary">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs text-aximo-text-secondary mt-0.5">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-aximo-border">
            <Link to="/pipeline/activity">
              <Button variant="ghost" size="sm" className="w-full text-aximo-text-secondary hover:text-aximo-primary hover:bg-aximo-primary/10">
                View All Activity
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
