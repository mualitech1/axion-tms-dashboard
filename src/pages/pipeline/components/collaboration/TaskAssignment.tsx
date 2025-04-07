
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User, Plus, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { TaskPriority } from '../../data/pipelineTypes';
import { toast } from '@/hooks/use-toast';

interface Task {
  id: string;
  leadId: string;
  company: string;
  title: string;
  dueDate: string;
  completed: boolean;
  assignedTo: string;
  assignedToName: string;
  priority: TaskPriority;
}

interface TaskAssignmentProps {
  leadId?: string;
  company?: string;
  onTaskAdded?: () => void;
}

// Sample users data (in a real app, this would come from an API)
const users = [
  { id: 'user-1', name: 'John Doe' },
  { id: 'user-2', name: 'Sarah Wilson' },
  { id: 'user-3', name: 'Alice Thompson' },
];

export default function TaskAssignment({ leadId, company, onTaskAdded }: TaskAssignmentProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  
  const handleAddTask = () => {
    if (!title.trim()) {
      toast({
        title: "Task Error",
        description: "Please enter a task title",
        variant: "destructive",
      });
      return;
    }
    
    if (!dueDate) {
      toast({
        title: "Task Error",
        description: "Please select a due date",
        variant: "destructive",
      });
      return;
    }
    
    if (!assignedTo) {
      toast({
        title: "Task Error",
        description: "Please assign the task to someone",
        variant: "destructive",
      });
      return;
    }
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      leadId: leadId || '',
      company: company || '',
      title,
      dueDate: dueDate.toISOString(),
      completed: false,
      assignedTo,
      assignedToName: users.find(u => u.id === assignedTo)?.name || '',
      priority,
    };
    
    // In a real app, this would be an API call
    console.log('New task created:', newTask);
    
    // Show success notification
    toast({
      title: "Task Created",
      description: "The task has been assigned successfully",
    });
    
    // Reset form
    setTitle('');
    setDueDate(new Date());
    setAssignedTo('');
    setPriority(TaskPriority.MEDIUM);
    setShowForm(false);
    
    // Call the callback if provided
    if (onTaskAdded) {
      onTaskAdded();
    }
  };
  
  return (
    <div className="space-y-4">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Assign New Task
        </Button>
      ) : (
        <div className="border rounded-lg p-4 space-y-4 bg-card">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Assign New Task</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div>
              <Input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Select
                  value={assignedTo}
                  onValueChange={setAssignedTo}
                >
                  <SelectTrigger className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Assign to" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Select
                value={priority}
                onValueChange={(val) => setPriority(val as TaskPriority)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
                  <SelectItem value={TaskPriority.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={TaskPriority.HIGH}>High</SelectItem>
                  <SelectItem value={TaskPriority.URGENT}>Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleAddTask} className="w-full">
              Assign Task
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
