import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogOut, BellIcon, ClockIcon, Search, User as UserIcon, Settings, ChevronDown, ChevronRight, CircleUser, Menu, Zap, Shield } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ui/theme-provider';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useResponsive } from '@/hooks/use-responsive';
import { getSectionTitle } from './sidebar/navigation-config';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '../ui/mode-toggle';
import { AxionLogo } from '../axion-logo/AxionLogo';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications] = useState(3); // Sample notification count
  const [pageTitle, setPageTitle] = useState('');
  const { theme } = useTheme();
  const { isMobile, isDesktopAndAbove } = useResponsive();
  
  // Calculate the breadcrumb path based on current route
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Dynamic title determination
  useEffect(() => {
    // If title prop is provided, use it
    if (title) {
      setPageTitle(title);
      return;
    }
    
    // Otherwise determine from route
    setPageTitle(getSectionTitle(location.pathname));
  }, [location.pathname, title]);
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return 'A';
    const parts = user.email.split('@')[0].split('.');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header className="h-16 border-b border-aximo-border bg-aximo-dark/90 dark:bg-aximo-dark/90 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {!isMobile && (
          <div className="hidden sm:block mr-3">
            <AxionLogo variant="quantum" size={isMobile ? "sm" : "md"} />
          </div>
        )}
        
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-aximo-text-secondary">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-aximo-darker border-aximo-border">
              <SheetHeader className="h-16 border-b border-aximo-border px-4 flex items-center">
                <AxionLogo variant="quantum" size="sm" />
              </SheetHeader>
              {/* Mobile menu content - would normally import Sidebar content here */}
            </SheetContent>
          </Sheet>
        )}
        
        <motion.h1 
          key={pageTitle}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-semibold text-aximo-text ${theme === 'dark' ? 'text-white' : 'text-aximo-text'}`}
        >
          {pageTitle}
        </motion.h1>
        
        {/* Breadcrumbs for deeper paths */}
        {pathSegments.length > 1 && (
          <div className="ml-4 hidden md:block">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${pathSegments[0]}`}>
                    {getSectionTitle(`/${pathSegments[0]}`)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.slice(1).map((segment, index) => {
                  // Don't make the last segment a link
                  const isLastSegment = index === pathSegments.length - 2;
                  const path = `/${pathSegments.slice(0, index + 2).join('/')}`;
                  
                  return (
                    <React.Fragment key={segment}>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        {isLastSegment ? (
                          <span className="text-aximo-text-secondary">{segment}</span>
                        ) : (
                          <BreadcrumbLink href={path}>{segment}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Search button - only visible on desktop */}
        {isDesktopAndAbove && (
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center gap-2 text-aximo-text-secondary border-aximo-border bg-aximo-darker/50"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-aximo-border bg-aximo-darker px-1.5 text-[10px] font-medium text-aximo-text-secondary ml-2">
              Ctrl + K
            </kbd>
          </Button>
        )}
        
        {/* Security status - desktop only */}
        {isDesktopAndAbove && (
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden md:flex text-green-400"
          >
            <Shield className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
            <span className="sr-only">Security Status</span>
          </Button>
        )}
        
        {/* Mode Toggle */}
        <ModeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-aximo-text-secondary">
              <BellIcon className="h-5 w-5" />
              {notifications > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-aximo-primary text-white" 
                  variant="default"
                >
                  {notifications}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-md border-aximo-border bg-aximo-card shadow-lg">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <div className="p-3 text-sm border-b border-aximo-border hover:bg-aximo-card/60 cursor-pointer">
                <div className="font-medium">New carrier registration</div>
                <div className="text-aximo-text-secondary text-xs mt-1">FastFreight Inc. submitted registration documents</div>
                <div className="text-aximo-text-secondary text-xs mt-1">2 hours ago</div>
              </div>
              <div className="p-3 text-sm border-b border-aximo-border hover:bg-aximo-card/60 cursor-pointer">
                <div className="font-medium">Compliance alert</div>
                <div className="text-aximo-text-secondary text-xs mt-1">3 carriers have insurance expiring in the next 7 days</div>
                <div className="text-aximo-text-secondary text-xs mt-1">Yesterday</div>
              </div>
              <div className="p-3 text-sm hover:bg-aximo-card/60 cursor-pointer">
                <div className="font-medium">System update</div>
                <div className="text-aximo-text-secondary text-xs mt-1">New carrier matching algorithm deployed</div>
                <div className="text-aximo-text-secondary text-xs mt-1">2 days ago</div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2 justify-center font-medium text-aximo-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {isDesktopAndAbove && (
          <Button 
            variant="ghost" 
            size="icon"
            className="text-aximo-text-secondary hover:bg-aximo-card hover:text-aximo-primary"
          >
            <ClockIcon className="h-5 w-5" />
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 flex items-center gap-2 group hover:bg-aximo-card px-2">
              <Avatar className="h-8 w-8 border border-aximo-border/50">
                <AvatarImage src="/avatar.jpg" alt="User Avatar" />
                <AvatarFallback className="bg-aximo-primary text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-aximo-text">John Doe</span>
                <span className="text-xs text-aximo-text-secondary">Administrator</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-md border-aximo-border bg-aximo-card shadow-lg" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-aximo-text">John Doe</p>
                <p className="text-xs text-aximo-text-secondary truncate">john.doe@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Zap className="mr-2 h-4 w-4" />
                <span>Activity Log</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* Developer Actions - Only visible in development */}
            {import.meta.env.DEV && (
              <DropdownMenuItem 
                onClick={async () => {
                  // Dynamic import to avoid bundling in production
                  const { resetSupabaseSchemaCache } = await import('@/lib/supabase');
                  const success = await resetSupabaseSchemaCache();
                  
                  // Use toast for feedback
                  if (success) {
                    toast({
                      title: "Cache Reset",
                      description: "Supabase schema cache has been reset successfully",
                      variant: "default",
                    });
                  } else {
                    toast({
                      title: "Reset Failed",
                      description: "Failed to reset Supabase schema cache",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                <span className="text-yellow-500 font-medium">Reset Schema Cache</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
