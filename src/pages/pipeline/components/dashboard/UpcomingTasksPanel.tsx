
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItem {
  id: string;
  title: string;
  company: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
}

export default function UpcomingTasksPanel() {
  const tasks: TaskItem[] = [
    {
      id: '1',
      title: 'Send follow-up email with pricing details',
      company: 'Acme Logistics',
      date: 'Apr 10',
      priority: 'High'
    },
    {
      id: '2',
      title: 'Schedule contract signing meeting',
      company: 'Quick Deliveries',
      date: 'Apr 9',
      priority: 'High'
    },
    {
      id: '3',
      title: 'Prepare case study presentation',
      company: 'Global Freight Ltd',
      date: 'Apr 12',
      priority: 'Medium'
    },
    {
      id: '4',
      title: 'Contact about specialized transport requirements',
      company: 'Tech Innovations',
      date: 'Apr 11',
      priority: 'Low'
    },
    {
      id: '5',
      title: 'Negotiate final contract terms',
      company: 'Retail Solutions',
      date: 'Apr 8',
      priority: 'Urgent'
    }
  ];

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'High':
        return 'text-orange-600';
      case 'Medium':
        return 'text-blue-600';
      case 'Low':
        return 'text-green-600';
      case 'Urgent':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex gap-2">
              <Checkbox id={`task-${task.id}`} className="mt-1" />
              <div className="space-y-1">
                <label htmlFor={`task-${task.id}`} className="text-sm font-medium cursor-pointer">
                  {task.title}
                </label>
                <p className="text-xs text-muted-foreground">
                  {task.company} • {task.date} • 
                  <span className={`ml-1 font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
