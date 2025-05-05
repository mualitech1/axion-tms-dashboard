
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { X, Menu, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { navigationConfig, NavigationItem } from './sidebar/navigation-config';
import { MobileMenu } from './sidebar/MobileMenu';
import { AximoLogo } from '@/components/aximo/AximoLogo';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
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

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const renderNavItem = (item: NavigationItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSubMenuOpen = openSubMenus.includes(item.title);
    const active = isActive(item.href);

    return (
      <div key={item.title} className="mb-1">
        <div
          className={cn(
            "flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors",
            active 
              ? "bg-aximo-primary/10 text-aximo-primary" 
              : "text-aximo-text-secondary hover:bg-aximo-border hover:text-aximo-text",
            isCollapsed && "justify-center px-0"
          )}
          onClick={() => hasChildren ? toggleSubMenu(item.title) : null}
        >
          <Link 
            to={item.href}
            className={cn(
              "flex items-center w-full", 
              hasChildren && "mr-2"
            )}
            onClick={(e) => hasChildren && e.preventDefault()}
          >
            {item.icon && 
              <span className={cn("text-current", isCollapsed ? "text-xl" : "mr-2")}>
                {typeof item.icon === 'function' ? item.icon({className: "h-5 w-5"}) : item.icon}
              </span>
            }
            {!isCollapsed && (
              <span className="flex-grow">{item.title}</span>
            )}
          </Link>
          
          {!isCollapsed && hasChildren && (
            <button onClick={() => toggleSubMenu(item.title)} className="p-1">
              {isSubMenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* Render submenu if open */}
        {!isCollapsed && hasChildren && isSubMenuOpen && (
          <div className="pl-8 mt-1 space-y-1">
            {item.children?.map(child => (
              <Link
                key={child.href}
                to={child.href}
                className={cn(
                  "flex items-center py-1.5 px-3 rounded-md text-sm transition-colors",
                  isActive(child.href)
                    ? "bg-aximo-primary/10 text-aximo-primary"
                    : "text-aximo-text-secondary hover:bg-aximo-border hover:text-aximo-text"
                )}
              >
                {child.icon && typeof child.icon === 'function' && 
                  <span className="mr-2">
                    {child.icon({className: "h-4 w-4"})}
                  </span>
                }
                <span>{child.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
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
        
        <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-thin">
          {navigationConfig.map(renderNavItem)}
        </div>
      </aside>
    </>
  );
}
