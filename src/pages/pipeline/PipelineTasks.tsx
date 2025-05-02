
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ListTodo, Tag, Users, Plus, Filter } from 'lucide-react';
import TaskBoard from './components/tasks/TaskBoard';
import TaskCalendar from './components/tasks/TaskCalendar';
import TaskTags from './components/tasks/TaskTags';
import { motion } from 'framer-motion';

interface PipelineTasksProps {
  defaultTab?: 'board' | 'calendar' | 'tags';
}

export default function PipelineTasks({ defaultTab = 'board' }: PipelineTasksProps) {
  const [view, setView] = useState<'all' | 'team' | 'mine'>('all');
  
  return (
    <div className="animate-in fade-in duration-500">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-aximo-light to-aximo-primary bg-clip-text text-transparent">
              Task Management
            </h1>
            <p className="text-aximo-text-secondary mt-1">
              Manage and organize all tasks across your sales pipeline
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-aximo-border text-aximo-text-secondary hover:bg-aximo-card hover:text-aximo-primary"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
            
            <div className="flex bg-aximo-card rounded-md p-1 border border-aximo-border">
              <Button 
                variant={view === 'all' ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView('all')}
                className={view === 'all' ? "bg-aximo-primary text-white" : "text-aximo-text-secondary hover:text-aximo-text"}
              >
                All
              </Button>
              <Button 
                variant={view === 'team' ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView('team')}
                className={view === 'team' ? "bg-aximo-primary text-white" : "text-aximo-text-secondary hover:text-aximo-text"}
              >
                <Users className="h-3.5 w-3.5 mr-1" />
                Team
              </Button>
              <Button 
                variant={view === 'mine' ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView('mine')}
                className={view === 'mine' ? "bg-aximo-primary text-white" : "text-aximo-text-secondary hover:text-aximo-text"}
              >
                Mine
              </Button>
            </div>
            
            <Button 
              variant="default"
              size="sm"
              className="bg-aximo-primary hover:bg-aximo-primary/80 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Task
            </Button>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-aximo-card border border-aximo-border rounded-lg shadow-aximo p-1 overflow-hidden"
      >
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="bg-aximo-darker/50 mb-4 w-full justify-start">
            <TabsTrigger 
              value="board" 
              className="flex items-center gap-1 data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              <ListTodo className="h-4 w-4" />
              Board
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="flex items-center gap-1 data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="tags" 
              className="flex items-center gap-1 data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              <Tag className="h-4 w-4" />
              Tags
            </TabsTrigger>
          </TabsList>
          
          <div className="p-3">
            <TabsContent value="board" className="mt-0">
              <TaskBoard viewFilter={view} />
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-0">
              <TaskCalendar viewFilter={view} />
            </TabsContent>
            
            <TabsContent value="tags" className="mt-0">
              <TaskTags />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
}
