
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ListTodo, Tag, Users } from 'lucide-react';
import TaskBoard from './components/tasks/TaskBoard';
import TaskCalendar from './components/tasks/TaskCalendar';
import TaskTags from './components/tasks/TaskTags';

interface PipelineTasksProps {
  defaultTab?: 'board' | 'calendar' | 'tags';
}

export default function PipelineTasks({ defaultTab = 'board' }: PipelineTasksProps) {
  const [view, setView] = useState<'all' | 'team' | 'mine'>('all');
  
  return (
    <MainLayout title="Task Management">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Task Management</h1>
            <p className="text-muted-foreground">
              Manage and organize all tasks across your sales pipeline
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 border rounded-md p-1">
              <Button 
                variant={view === 'all' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setView('all')}
              >
                All
              </Button>
              <Button 
                variant={view === 'team' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setView('team')}
              >
                Team
              </Button>
              <Button 
                variant={view === 'mine' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setView('mine')}
              >
                Mine
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="board" className="flex items-center gap-1">
            <ListTodo className="h-4 w-4" />
            Board
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="tags" className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            Tags
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="board">
          <TaskBoard viewFilter={view} />
        </TabsContent>
        
        <TabsContent value="calendar">
          <TaskCalendar viewFilter={view} />
        </TabsContent>
        
        <TabsContent value="tags">
          <TaskTags />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
