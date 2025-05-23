import React, { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { X, Menu, ChevronRight, ChevronDown, Maximize2, Minimize2, PhoneCall, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';
import { navigationConfig, NavigationItem } from './sidebar/navigation-config';
import { MobileMenu } from './sidebar/MobileMenu';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/use-permissions';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

interface SidebarProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isMobile, isTablet, isDesktopAndAbove } = useResponsive();
  const location = useLocation();
  const { can, hasRole } = usePermissions();
  const { user } = useAuth();
  
  // Use either the controlled state from props or local state
  const isMobileMenuOpen = open !== undefined ? open : isMobileOpen;
  const setIsMobileMenuOpen = setOpen || setIsMobileOpen;

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  // Auto-expand relevant section on route change
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find if we need to open any parent menu
    navigationConfig.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => 
          currentPath === child.href || currentPath.startsWith(`${child.href}/`)
        );
        
        if (hasActiveChild && !openSubMenus.includes(item.title)) {
          setOpenSubMenus(prev => [...prev, item.title]);
        }
      }
    });
  }, [location.pathname, openSubMenus]);

  // Keyboard shortcut listener for desktop
  useEffect(() => {
    if (!isDesktopAndAbove) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + S to toggle sidebar
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        setIsCollapsed(prev => !prev);
      }
      
      // Navigation shortcuts
      if (e.altKey) {
        // Find matching navigation item by shortcut
        navigationConfig.forEach(item => {
          const shortcutKey = item.shortcut?.split('+')[1]?.toLowerCase();
          if (shortcutKey && e.key.toLowerCase() === shortcutKey) {
            e.preventDefault();
            
            // If the item has children, toggle the submenu
            if (item.children && item.children.length > 0) {
              toggleSubMenu(item.title);
              if (!openSubMenus.includes(item.title)) {
                // Open the submenu if it's not already open
                setOpenSubMenus(prev => [...prev, item.title]);
              }
            } else {
              // Navigate to the item's href
              window.location.href = item.href;
            }
          }
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDesktopAndAbove, openSubMenus]);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  }, [isMobile, isMobileMenuOpen, isCollapsed, setIsMobileMenuOpen]);

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

  const toggleFullscreen = () => {
    if (!isDesktopAndAbove) return;
    
    const elem = document.documentElement;
    
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };

  // Check if user has permission to access a navigation item
  const canAccessNavItem = (item: NavigationItem): boolean => {
    // Check permission requirement
    if (item.requiredPermission) {
      const { resource, action } = item.requiredPermission;
      if (!can(resource, action)) {
        return false;
      }
    }
    
    // Check role requirement
    if (item.requiredRoles && item.requiredRoles.length > 0) {
      if (!hasRole(item.requiredRoles)) {
        return false;
      }
    }
    
    return true;
  };

  // Filter children items based on permissions
  const getAccessibleChildren = (item: NavigationItem): NavigationItem[] | undefined => {
    if (!item.children) return undefined;
    
    const accessibleChildren = item.children.filter(canAccessNavItem);
    return accessibleChildren.length > 0 ? accessibleChildren : undefined;
  };

  const renderNavItem = (item: NavigationItem) => {
    // Skip items the user doesn't have permission to access
    if (!canAccessNavItem(item)) {
      return null;
    }
    
    const accessibleChildren = getAccessibleChildren(item);
    const hasChildren = accessibleChildren && accessibleChildren.length > 0;
    const isSubMenuOpen = openSubMenus.includes(item.title);
    const active = isActive(item.href);
    const IconComponent = item.icon;

    return (
      <div key={item.title} className="mb-1">
        <TooltipProvider delayDuration={isCollapsed ? 300 : 1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center py-2 px-3 rounded-md cursor-pointer transition-all duration-200",
                  active 
                    ? "bg-aximo-primary/10 text-aximo-primary border-l-2 border-aximo-primary" 
                    : "text-aximo-text-secondary hover:bg-aximo-border hover:text-aximo-text",
                  isCollapsed && "justify-center px-0",
                  isDesktopAndAbove && !isCollapsed && "hover:translate-x-1"
                )}
                onClick={() => hasChildren ? toggleSubMenu(item.title) : null}
                data-section={item.href.replace('/', '')}
              >
                <Link 
                  to={item.href}
                  className={cn(
                    "flex items-center w-full", 
                    hasChildren && "mr-2"
                  )}
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                    } else if (isMobile) {
                      // Close mobile menu when clicking a link
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.icon && 
                    <span className={cn(
                      "text-current flex items-center justify-center", 
                      isCollapsed ? "text-xl" : "mr-2",
                      isDesktopAndAbove && "transition-all duration-300"
                    )}>
                      <IconComponent className={cn(
                        active ? "text-aximo-primary" : "text-aximo-text-secondary",
                        "h-5 w-5",
                        isDesktopAndAbove && active && "animate-pulse"
                      )} />
                    </span>
                  }
                  {!isCollapsed && (
                    <span className={cn(
                      "flex-grow text-sm",
                      isDesktopAndAbove && "transition-colors duration-300",
                      active && "font-medium"
                    )}>
                      {item.title}
                      {item.shortcut && isDesktopAndAbove && (
                        <span className="ml-2 text-xs text-aximo-text-tertiary">{item.shortcut}</span>
                      )}
                    </span>
                  )}
                </Link>
                
                {!isCollapsed && hasChildren && (
                  <button 
                    onClick={() => toggleSubMenu(item.title)} 
                    className="p-1 hover:bg-aximo-border rounded-md"
                    aria-label={isSubMenuOpen ? "Collapse submenu" : "Expand submenu"}
                  >
                    {isSubMenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="bg-aximo-dark border-aximo-border text-xs">
                {item.title}
                {item.shortcut && isDesktopAndAbove && (
                  <span className="ml-2 text-aximo-text-tertiary">{item.shortcut}</span>
                )}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {/* Render submenu if open */}
        {!isCollapsed && hasChildren && isSubMenuOpen && (
          <div className="pl-8 mt-1 space-y-1 bg-aximo-dark/30 rounded-md py-1">
            {accessibleChildren?.map(child => {
              // Skip children items the user doesn't have permission to access
              if (!canAccessNavItem(child)) {
                return null;
              }
              
              const ChildIconComponent = child.icon;
              const childActive = isActive(child.href);
              
              return (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "flex items-center py-1.5 px-3 rounded-md text-sm transition-colors",
                    childActive
                      ? "bg-aximo-primary/10 text-aximo-primary"
                      : "text-aximo-text-secondary hover:bg-aximo-border hover:text-aximo-text",
                    isDesktopAndAbove && "hover:translate-x-1 transition-transform duration-200"
                  )}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                >
                  {child.icon && 
                    <span className="mr-2">
                      <ChildIconComponent className={cn(
                        "h-4 w-4",
                        childActive && isDesktopAndAbove && "text-aximo-primary"
                      )} />
                    </span>
                  }
                  <span className={cn(
                    "text-xs",
                    childActive && "font-medium"
                  )}>
                    {child.title}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <MobileMenu isMobileOpen={isMobileMenuOpen} toggleSidebar={toggleSidebar} />

      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-aximo-darker border-r border-aximo-border flex flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobile && (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        <div className={cn(
          "h-16 border-b border-aximo-border flex items-center px-4 sticky top-0 bg-aximo-dark/90 backdrop-blur-sm",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed ? (
            <>
              <AxionLogo variant="quantum" />
              <div className="flex items-center gap-1">
                {isDesktopAndAbove && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full hover:bg-aximo-border text-aximo-text-secondary"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit Fullscreen (F11)" : "Enter Fullscreen (F11)"}
                  >
                    {isFullscreen ? 
                      <Minimize2 className="h-4 w-4" /> : 
                      <Maximize2 className="h-4 w-4" />
                    }
                  </Button>
                )}
                <Button 
                  onClick={toggleSidebar} 
                  className="p-1 rounded-md hover:bg-aximo-border text-aximo-text-secondary transition-colors"
                  aria-label="Collapse Sidebar"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <AxionLogo size="sm" variant="quantum" animated={false} />
              {!isMobile && (
                <Button 
                  onClick={toggleSidebar} 
                  className="p-1 rounded-md hover:bg-aximo-border text-aximo-text-secondary ml-2 transition-colors"
                  aria-label="Expand Sidebar"
                  title="Expand Sidebar (Alt+S)"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
          {navigationConfig.map(renderNavItem)}
        </div>
        
        {isDesktopAndAbove && !isCollapsed && (
          <div className="p-3 border-t border-aximo-border">
            <div className="text-xs text-aximo-text-tertiary">
              <div className="mb-1">Keyboard shortcuts:</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <div>Alt+S</div>
                <div>Toggle sidebar</div>
                <div>F11</div>
                <div>Fullscreen</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Voice and Call buttons fixed to the bottom */}
        <div className={cn(
          "border-t border-aximo-border p-2 bg-aximo-dark/80 backdrop-blur-sm flex justify-center",
          isCollapsed ? "gap-0" : "gap-2"
        )}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size={isCollapsed ? "icon" : "sm"}
                  className={cn(
                    "transition-all",
                    isCollapsed ? "w-10 h-10 rounded-full" : "gap-2",
                    "bg-aximo-darker hover:bg-aximo-primary hover:text-white border-aximo-border"
                  )}
                >
                  <PhoneCall className="h-4 w-4" />
                  {!isCollapsed && <span>Call</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Start Voice Call
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size={isCollapsed ? "icon" : "sm"}
                  className={cn(
                    "transition-all",
                    isCollapsed ? "w-10 h-10 rounded-full" : "gap-2",
                    "bg-aximo-darker hover:bg-aximo-accent hover:text-white border-aximo-border"
                  )}
                >
                  <Mic className="h-4 w-4" />
                  {!isCollapsed && <span>Voice</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Activate Voice Assistant
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>
    </>
  );
}
