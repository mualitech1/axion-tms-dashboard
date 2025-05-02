
import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Kanban, ListTodo } from 'lucide-react';

interface SubMenuProps {
  isCollapsed: boolean;
}

export const SubMenu = ({ isCollapsed }: SubMenuProps) => {
  const location = useLocation();

  if (isCollapsed) return null;

  return (
    <div className="ml-7 space-y-1 border-l pl-2 border-aximo-border mt-1">
      <NavLink 
        to="/pipeline/dashboard"
        className={({ isActive }) =>
          cn(
            "flex items-center py-1.5 px-2 text-sm rounded-md transition-all",
            isActive 
              ? "text-aximo-primary font-medium bg-aximo-primary/10" 
              : "text-aximo-text-secondary hover:text-aximo-text hover:bg-aximo-card/60"
          )
        }
      >
        <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" />
        <span>Dashboard</span>
      </NavLink>
      
      <NavLink 
        to="/pipeline/board"
        className={({ isActive }) =>
          cn(
            "flex items-center py-1.5 px-2 text-sm rounded-md transition-all",
            isActive 
              ? "text-aximo-primary font-medium bg-aximo-primary/10" 
              : "text-aximo-text-secondary hover:text-aximo-text hover:bg-aximo-card/60"
          )
        }
      >
        <Kanban className="h-3.5 w-3.5 mr-1.5" />
        <span>Pipeline Board</span>
      </NavLink>
      
      <NavLink 
        to="/pipeline/tasks"
        className={({ isActive }) =>
          cn(
            "flex items-center py-1.5 px-2 text-sm rounded-md transition-all",
            isActive || 
            location.pathname === '/pipeline/tasks/calendar' || 
            location.pathname === '/pipeline/tasks/tags'
              ? "text-aximo-primary font-medium bg-aximo-primary/10" 
              : "text-aximo-text-secondary hover:text-aximo-text hover:bg-aximo-card/60"
          )
        }
      >
        <ListTodo className="h-3.5 w-3.5 mr-1.5" />
        <span>Task Management</span>
      </NavLink>
    </div>
  );
};
