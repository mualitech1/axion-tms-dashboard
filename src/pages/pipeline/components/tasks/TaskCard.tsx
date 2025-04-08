
import React from 'react';
import { Calendar, Tag, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  id: string;
  title: string;
  tags: string[];
  assignee: string;
  dueDate: string;
  company: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getTagColor = (tag: string) => {
    if (tag.includes('priority') || tag === 'urgent') return 'destructive';
    if (tag === 'meeting' || tag === 'call' || tag === 'sales-call') return 'default';
    if (tag === 'contract' || tag === 'legal' || tag === 'documentation') return 'secondary';
    return 'outline';
  };

  return (
    <div className="bg-card border rounded-lg p-3 shadow-sm hover:shadow transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="font-medium">{task.title}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Edit Task</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3">
        {task.company}
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map(tag => (
          <Badge key={tag} variant={getTagColor(tag) as any}>
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{format(new Date(task.dueDate), 'MMM d')}</span>
        </div>
        
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {getInitials(task.assignee)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
