
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
import { motion } from 'framer-motion';

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

  // Calculate due date urgency
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const getDueDateClass = () => {
    if (daysUntilDue < 0) return 'text-red-500';
    if (daysUntilDue <= 2) return 'text-amber-500';
    return 'text-aximo-text-secondary';
  };

  return (
    <motion.div 
      className="bg-aximo-card border border-aximo-border rounded-lg p-3 shadow-sm hover:shadow-aximo hover:border-aximo-border/80 transition-all duration-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-2.5">
        <div className="font-medium text-aximo-text">{task.title}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-aximo-text-secondary hover:text-aximo-text">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-aximo-card border-aximo-border">
            <DropdownMenuItem onClick={onEdit} className="text-aximo-text hover:bg-aximo-darker">
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-aximo-border" />
            <DropdownMenuItem className="text-aximo-text hover:bg-aximo-darker">
              Mark as Complete
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 hover:bg-red-500/10">
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="text-sm text-aximo-text-secondary mb-3">
        {task.company}
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map(tag => (
          <Badge 
            key={tag} 
            variant={getTagColor(tag) as any}
            className="text-xs py-0 px-2 h-5 bg-opacity-80 hover:bg-opacity-100"
          >
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs">
          <Calendar className={`h-3 w-3 ${getDueDateClass()}`} />
          <span className={`${getDueDateClass()}`}>{format(dueDate, 'MMM d')}</span>
        </div>
        
        <Avatar className="h-6 w-6 border border-aximo-primary/30">
          <AvatarFallback className="text-xs bg-aximo-primary/10 text-aximo-primary">
            {getInitials(task.assignee)}
          </AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
}
