
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
    <div className="ml-7 space-y-1 border-l pl-2 border-tms-gray-200 mt-1">
      <NavLink 
        to="/sales-pipeline/dashboard"
        className={({ isActive }) =>
          cn(
            "flex items-center py-1 px-2 text-sm rounded-md transition-colors",
            isActive ? "text-tms-blue font-medium" : "text-tms-gray-600 hover:text-tms-blue"
          )
        }
      >
        <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" />
        <span>Dashboard</span>
      </NavLink>
      
      <NavLink 
        to="/sales-pipeline/board"
        className={({ isActive }) =>
          cn(
            "flex items-center py-1 px-2 text-sm rounded-md transition-colors",
            isActive ? "text-tms-blue font-medium" : "text-tms-gray-600 hover:text-tms-blue"
          )
        }
      >
        <Kanban className="h-3.5 w-3.5 mr-1.5" />
        <span>Pipeline Board</span>
      </NavLink>
      
      <NavLink 
        to="/sales-pipeline/tasks"
        className={({ isActive }) =>
          cn(
            "flex items-center py-1 px-2 text-sm rounded-md transition-colors",
            isActive || 
            location.pathname === '/sales-pipeline/tasks/calendar' || 
            location.pathname === '/sales-pipeline/tasks/tags'
              ? "text-tms-blue font-medium" 
              : "text-tms-gray-600 hover:text-tms-blue"
          )
        }
      >
        <ListTodo className="h-3.5 w-3.5 mr-1.5" />
        <span>Task Management</span>
      </NavLink>
    </div>
  );
};
