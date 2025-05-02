
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Kanban,
  ListTodo,
  Calendar,
  Tag,
  Settings,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PipelineSidebarItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
          isActive 
            ? "bg-aximo-primary/20 text-aximo-primary font-medium" 
            : "text-aximo-text-secondary hover:bg-aximo-card/60"
        )
      }
    >
      <Icon className="h-4 w-4 mr-2" />
      <span>{label}</span>
    </NavLink>
  );
};

export default function PipelineSidebar() {
  const location = useLocation();
  
  return (
    <div className="w-56 border-r border-aximo-border min-h-full bg-aximo-dark p-4 flex flex-col gap-1">
      <h3 className="font-medium text-sm text-aximo-text-secondary uppercase tracking-wider mb-2 px-3">
        Sales Pipeline
      </h3>
      
      <PipelineSidebarItem 
        to="/pipeline/dashboard" 
        icon={LayoutDashboard} 
        label="Dashboard"
      />
      
      <PipelineSidebarItem 
        to="/pipeline/board" 
        icon={Kanban} 
        label="Pipeline Board" 
      />
      
      <div className="mt-2 mb-1 pl-3">
        <h4 className="text-xs font-medium text-aximo-text-secondary">Task Management</h4>
      </div>
      
      <PipelineSidebarItem 
        to="/pipeline/tasks" 
        icon={ListTodo} 
        label="Task Board"
      />
      
      <PipelineSidebarItem 
        to="/pipeline/tasks/calendar" 
        icon={Calendar} 
        label="Task Calendar"
      />
      
      <PipelineSidebarItem 
        to="/pipeline/tasks/tags" 
        icon={Tag} 
        label="Task Tags"
      />
      
      <div className="mt-2 mb-1 pl-3">
        <h4 className="text-xs font-medium text-aximo-text-secondary">Management</h4>
      </div>
      
      <PipelineSidebarItem 
        to="/pipeline/reminders" 
        icon={Bell} 
        label="Reminders"
      />
      
      <PipelineSidebarItem 
        to="/pipeline/settings" 
        icon={Settings} 
        label="Settings"
      />
    </div>
  );
}
