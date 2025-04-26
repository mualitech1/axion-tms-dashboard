
import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  hasSubmenu?: boolean;
}

export const NavItem = ({ to, icon: Icon, label, isCollapsed, hasSubmenu = false }: NavItemProps) => {
  const location = useLocation();
  const isActive = hasSubmenu 
    ? location.pathname.startsWith(to) 
    : location.pathname === to;

  return (
    <NavLink 
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
          "hover:bg-tms-blue-light group",
          isActive ? "bg-tms-blue-light text-tms-blue font-medium" : "text-tms-gray-600",
          isCollapsed && "justify-center"
        )
      }
    >
      <Icon className={cn(
        "h-5 w-5 flex-shrink-0",
        isActive ? "text-tms-blue" : "text-tms-gray-500"
      )} />
      {!isCollapsed && (
        <span className="transition-opacity duration-200">{label}</span>
      )}
      {isCollapsed && (
        <div className="absolute left-full ml-2 rounded-md px-2 py-1 bg-white shadow-lg z-50 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {label}
        </div>
      )}
    </NavLink>
  );
};

interface NavSectionProps {
  title: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

export const NavSection = ({ title, isCollapsed, children }: NavSectionProps) => (
  <div className="mb-6">
    {!isCollapsed && (
      <h3 className="px-3 mb-2 text-xs uppercase tracking-wider text-tms-gray-500 font-semibold">
        {title}
      </h3>
    )}
    <div className="space-y-1">
      {children}
    </div>
  </div>
);
