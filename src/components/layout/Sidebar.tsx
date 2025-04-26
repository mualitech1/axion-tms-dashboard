
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { navigationItems } from './sidebar/navigation-config';
import { NavSection, NavItem } from './sidebar/NavSection';
import { SubMenu } from './sidebar/SubMenu';
import { MobileMenu } from './sidebar/MobileMenu';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

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
      <MobileMenu isMobileOpen={isMobileOpen} toggleSidebar={toggleSidebar} />

      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r border-tms-gray-200 flex flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobile && (isMobileOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
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
        
        <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto scrollbar-thin">
          {navigationItems.map((section) => (
            <NavSection 
              key={section.section} 
              title={section.section} 
              isCollapsed={isCollapsed}
            >
              {section.items.map((item) => (
                <div key={item.title}>
                  <NavItem
                    to={item.to}
                    icon={item.icon}
                    label={item.title}
                    isCollapsed={isCollapsed}
                    hasSubmenu={Boolean(item.subItems)}
                  />
                  {item.subItems && <SubMenu isCollapsed={isCollapsed} />}
                </div>
              ))}
            </NavSection>
          ))}
        </div>
      </aside>
    </>
  );
}
