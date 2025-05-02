
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bell, CalendarClock, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function ReminderOverviewCard() {
  const reminders = [
    {
      id: 1,
      title: 'Follow up with ABC Logistics',
      date: 'Today, 2:00 PM',
      type: 'Follow-up',
      completed: false
    },
    {
      id: 2,
      title: 'Review Global Freight proposal',
      date: 'Tomorrow, 11:00 AM',
      type: 'Document',
      completed: false
    },
    {
      id: 3,
      title: 'Call FastTrack CEO',
      date: 'Sep 15, 10:30 AM',
      type: 'Call',
      completed: false
    },
    {
      id: 4,
      title: 'Prepare weekly pipeline report',
      date: 'Sep 16, 9:00 AM',
      type: 'Task',
      completed: true
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Follow-up': return 'text-blue-400 bg-blue-500/10';
      case 'Document': return 'text-amber-400 bg-amber-500/10';
      case 'Call': return 'text-green-400 bg-green-500/10';
      default: return 'text-purple-400 bg-purple-500/10';
    }
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { 
      x: 5, 
      backgroundColor: 'rgba(0, 144, 255, 0.05)',
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
              <Bell size={18} className="mr-2 text-aximo-primary" />
              Reminders
            </CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-aximo-text-secondary hover:text-aximo-primary hover:bg-aximo-primary/10">
            <ChevronRight size={18} />
            <span className="sr-only">View all</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                className={`flex items-start p-2 rounded-md cursor-pointer ${reminder.completed ? 'opacity-60' : ''}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover="hover"
              >
                <div className={`p-1 rounded-full mr-3 ${reminder.completed ? 'bg-green-500/10' : 'bg-aximo-border/30'}`}>
                  {reminder.completed ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <CalendarClock size={16} className="text-aximo-text-secondary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-medium ${reminder.completed ? 'text-aximo-text-secondary line-through' : 'text-aximo-text'}`}>
                      {reminder.title}
                    </h4>
                    <Badge variant="outline" className={`text-xs ml-2 ${getTypeColor(reminder.type)}`}>
                      {reminder.type}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-aximo-text-secondary">
                      {reminder.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-aximo-border">
            <Link to="/pipeline/reminders">
              <Button variant="ghost" size="sm" className="w-full text-aximo-text-secondary hover:text-aximo-primary hover:bg-aximo-primary/10">
                View All Reminders
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
