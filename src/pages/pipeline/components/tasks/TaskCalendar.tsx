
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import TaskCard from './TaskCard';
import TaskDialog from './TaskDialog';

interface TaskCalendarProps {
  viewFilter: 'all' | 'team' | 'mine';
}

// Sample tasks data for calendar view
const calendarTasks = [
  { id: 'task-1', title: 'Follow up with Acme Logistics', tags: ['high-priority', 'sales-call'], assignee: 'John Doe', dueDate: '2025-04-15', company: 'Acme Logistics' },
  { id: 'task-2', title: 'Prepare proposal for Tech Innovations', tags: ['proposal', 'documentation'], assignee: 'Sarah Wilson', dueDate: '2025-04-18', company: 'Tech Innovations' },
  { id: 'task-3', title: 'Schedule meeting with Quick Deliveries', tags: ['meeting'], assignee: 'Alice Thompson', dueDate: '2025-04-20', company: 'Quick Deliveries' },
  { id: 'task-4', title: 'Draft contract for Global Freight', tags: ['contract', 'legal'], assignee: 'John Doe', dueDate: '2025-04-12', company: 'Global Freight Ltd' },
  { id: 'task-5', title: 'Review service agreement', tags: ['contract', 'review'], assignee: 'Sarah Wilson', dueDate: '2025-04-13', company: 'Retail Solutions' },
  { id: 'task-6', title: 'Initial outreach to Express Shipping', tags: ['outreach'], assignee: 'Alice Thompson', dueDate: '2025-04-05', company: 'Express Shipping' },
  { id: 'task-7', title: 'Send pricing sheet', tags: ['pricing', 'sales'], assignee: 'John Doe', dueDate: '2025-04-02', company: 'Cargo Express' },
  { id: 'task-8', title: 'Quarterly review with FastTrack', tags: ['meeting', 'review'], assignee: 'John Doe', dueDate: '2025-04-22', company: 'FastTrack Inc' },
  { id: 'task-9', title: 'Send updated quote to ShipFast', tags: ['pricing'], assignee: 'Sarah Wilson', dueDate: '2025-04-25', company: 'ShipFast Ltd' },
];

export default function TaskCalendar({ viewFilter }: TaskCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDayTasks, setSelectedDayTasks] = useState<any[]>([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  
  // Filter tasks based on view filter
  const filteredTasks = viewFilter === 'all' 
    ? calendarTasks 
    : calendarTasks.filter(task => viewFilter === 'mine' ? task.assignee === 'John Doe' : true);
  
  // Get tasks for a specific day
  const getTasksForDay = (day: Date) => {
    return filteredTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === day.getDate() &&
        taskDate.getMonth() === day.getMonth() &&
        taskDate.getFullYear() === day.getFullYear()
      );
    });
  };
  
  // Handle day selection in calendar
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const tasks = getTasksForDay(selectedDate);
      setSelectedDayTasks(tasks);
    } else {
      setSelectedDayTasks([]);
    }
  };
  
  // Handle edit task
  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setShowTaskDialog(true);
  };
  
  // Handle save task
  const handleSaveTask = (task: any) => {
    console.log('Task saved:', task);
    setShowTaskDialog(false);
    setEditingTask(null);
  };
  
  // Generate calendar day modifiers to show indicators for days with tasks
  const getDayClassNames = (day: Date): string => {
    const dayTasks = getTasksForDay(day);
    if (dayTasks.length === 0) return '';
    return 'bg-primary/5 rounded-md';
  };

  // Create modifiers for the calendar
  const modifiers = {
    hasTask: (day: Date) => getTasksForDay(day).length > 0,
    today: new Date()
  };

  // Create modifier styles
  const modifiersStyles = {
    hasTask: {
      fontWeight: 'bold',
      border: '2px solid',
      borderColor: 'hsl(var(--primary) / 0.2)'
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </CardContent>
      </Card>
      
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-4">
              {date ? format(date, 'PPPP') : 'Select a date'}
            </h3>
            
            {selectedDayTasks.length > 0 ? (
              <div className="space-y-3">
                {selectedDayTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => handleEditTask(task)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {date ? 'No tasks scheduled for this day' : 'Select a date to view tasks'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <TaskDialog
        open={showTaskDialog}
        onOpenChange={setShowTaskDialog}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}
