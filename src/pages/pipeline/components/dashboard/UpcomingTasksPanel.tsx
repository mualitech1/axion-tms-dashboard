
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ListTodo, Clock, AlertCircle, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function UpcomingTasksPanel() {
  const tasks = [
    {
      id: 1,
      title: 'Prepare quote for ABC Logistics',
      dueDate: 'Today',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'Call Global Freight about ongoing project',
      dueDate: 'Tomorrow',
      priority: 'medium',
      completed: false
    },
    {
      id: 3,
      title: 'Review contract with FastTrack Inc.',
      dueDate: 'Tomorrow',
      priority: 'high',
      completed: false
    },
    {
      id: 4,
      title: 'Send follow-up email to XYZ Transport',
      dueDate: 'Next Week',
      priority: 'low',
      completed: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-amber-400 bg-amber-500/10';
      default: return 'text-green-400 bg-green-500/10';
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
              <ListTodo size={18} className="mr-2 text-aximo-primary" />
              Upcoming Tasks
            </CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-aximo-text-secondary hover:text-aximo-primary hover:bg-aximo-primary/10">
            <ChevronRight size={18} />
            <span className="sr-only">View all</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                className={`flex items-start p-2 rounded-md cursor-pointer ${task.completed ? 'opacity-60' : ''}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover="hover"
              >
                <div className={`p-1 rounded-full mr-3 ${task.completed ? 'bg-green-500/10' : 'bg-aximo-border/30'}`}>
                  {task.completed ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Clock size={16} className="text-aximo-text-secondary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-medium ${task.completed ? 'text-aximo-text-secondary line-through' : 'text-aximo-text'}`}>
                      {task.title}
                    </h4>
                    <Badge variant="outline" className={`text-xs ml-2 ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    {task.dueDate === 'Today' && !task.completed && (
                      <AlertCircle size={12} className="text-red-400 mr-1" />
                    )}
                    <span className="text-xs text-aximo-text-secondary">
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-aximo-border">
            <Link to="/pipeline/tasks">
              <Button variant="ghost" size="sm" className="w-full text-aximo-text-secondary hover:text-aximo-primary hover:bg-aximo-primary/10">
                View All Tasks
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
