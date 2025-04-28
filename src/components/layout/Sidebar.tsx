
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { sidebarItems } from './sidebar/navigation-config';
import { NavSection, NavItem } from './sidebar/NavSection';
import { SubMenu } from './sidebar/SubMenu';
import { MobileMenu } from './sidebar/MobileMenu';
import { AximoLogo } from '@/components/aximo/AximoLogo';
import { Icons } from '@/components/ui/icons';

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
          "fixed left-0 top-0 z-50 h-full bg-aximo-darker border-r border-aximo-border flex flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobile && (isMobileOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        <div className={cn(
          "h-16 border-b border-aximo-border flex items-center px-4 sticky top-0 bg-aximo-dark/90 backdrop-blur-sm",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed ? (
            <>
              <AximoLogo />
              <button 
                onClick={toggleSidebar} 
                className="p-1 rounded-md hover:bg-aximo-border text-aximo-text-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button 
              onClick={toggleSidebar} 
              className="p-1 rounded-md hover:bg-aximo-border text-aximo-text-secondary"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto scrollbar-thin">
          {sidebarItems.map((item) => {
            // Handle items with or without submenu differently
            if ('items' in item) {
              return (
                <div key={item.title}>
                  <NavItem
                    to={item.href || '#'}
                    icon={item.icon ? Icons[item.icon] : null}
                    label={item.title}
                    isCollapsed={isCollapsed}
                    hasSubmenu={Boolean(item.items)}
                  />
                  {item.items && <SubMenu isCollapsed={isCollapsed} />}
                </div>
              );
            } else {
              return (
                <div key={item.title}>
                  <NavItem
                    to={item.href || '#'}
                    icon={item.icon ? Icons[item.icon] : null}
                    label={item.title}
                    isCollapsed={isCollapsed}
                    hasSubmenu={false}
                  />
                </div>
              );
            }
          })}
        </div>
      </aside>
    </>
  );
}
