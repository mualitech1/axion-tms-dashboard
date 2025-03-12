import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Users, Truck, UserCircle, Settings, 
  BarChart2, CreditCard, FileText, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, isCollapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

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

const NavSection = ({ title, isCollapsed, children }: NavSectionProps) => (
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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-full shadow-md text-tms-gray-600 hover:text-tms-blue transition-colors duration-200"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop for mobile */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r border-tms-gray-200 flex flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobile && (isMobileOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        {/* Sidebar Header */}
        <div className={cn(
          "h-16 border-b border-tms-gray-200 flex items-center px-4 sticky top-0 bg-white/90 backdrop-blur-sm",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed ? (
            <>
              <div className="font-semibold text-lg text-tms-gray-800">IKB Transport</div>
              <button 
                onClick={toggleSidebar} 
                className="p-1 rounded-md hover:bg-tms-gray-100 text-tms-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button 
              onClick={toggleSidebar} 
              className="p-1 rounded-md hover:bg-tms-gray-100 text-tms-gray-500"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {/* Sidebar Content */}
        <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto scrollbar-thin">
          <NavSection title="Dashboard" isCollapsed={isCollapsed}>
            <NavItem to="/" icon={Home} label="Overview" isCollapsed={isCollapsed} />
            <NavItem to="/analytics" icon={BarChart2} label="Analytics" isCollapsed={isCollapsed} />
          </NavSection>
          
          <NavSection title="Management" isCollapsed={isCollapsed}>
            <NavItem to="/jobs" icon={Truck} label="Jobs" isCollapsed={isCollapsed} />
            <NavItem to="/customers" icon={Users} label="Customers" isCollapsed={isCollapsed} />
            <NavItem to="/carriers" icon={Truck} label="Carriers" isCollapsed={isCollapsed} />
            <NavItem to="/invoices" icon={FileText} label="Invoices" isCollapsed={isCollapsed} />
            <NavItem to="/finance" icon={CreditCard} label="Finance" isCollapsed={isCollapsed} />
          </NavSection>
          
          <NavSection title="System" isCollapsed={isCollapsed}>
            <NavItem to="/users" icon={UserCircle} label="Users" isCollapsed={isCollapsed} />
            <NavItem to="/settings" icon={Settings} label="Settings" isCollapsed={isCollapsed} />
          </NavSection>
        </div>
      </aside>
    </>
  );
}
