import { ReactNode, useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AxionAssistant } from '../axion/AxionAssistant';

interface MainLayoutProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function MainLayout({ 
  children, 
  title = "Dashboard",
  description,
  className,
  showBackButton = false,
  onBack
}: MainLayoutProps) {
  const { isMobile, isDesktopAndAbove } = useResponsive();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen bg-aximo-background overflow-hidden"
    >
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        isDesktopAndAbove ? "ml-16 md:ml-64" : "w-full"
      )}>
        {/* Header moved here to be part of main content area */}
        <Header title={title} />
        
        <main 
          className={cn(
            "flex-1 pt-4 sm:pt-6 px-3 sm:px-4 md:px-6 pb-6 sm:pb-8 overflow-hidden",
            isMobile && "pt-2 px-2",
            className
          )}>
            <div className="overflow-auto h-full max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4rem)] custom-scrollbar pb-20 md:pb-8">
              {(showBackButton || description) && (
                <div className={cn(
                  "mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1",
                  isMobile && "mt-2 mb-3"
                )}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {showBackButton && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 rounded-full text-aximo-text-secondary hover:text-aximo-text-primary"
                        onClick={onBack}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    )}
                    <div>
                      {description && (
                        <p className={cn(
                          "text-aximo-text-secondary",
                          isMobile ? "text-xs" : "text-sm"
                        )}>
                          {description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Optional slot for action buttons */}
                  <div className="mt-2 sm:mt-0 flex justify-end">
                    {/* Rendered by page components when needed */}
                  </div>
                </div>
              )}
              
              {/* Content area with safe spacing for assistant */}
              <div className={cn(
                "relative", 
                isMobile && "pb-28 md:pb-16"
              )}>
                {children || <Outlet />}

                {/* Extra padding at the bottom for mobile to ensure content isn't hidden behind the assistant */}
                {isMobile && (
                  <div className="h-16 md:h-0" aria-hidden="true"></div>
                )}
              </div>
            </div>
          </main>
      </div>
      
      {/* Axion Assistant */}
      <AxionAssistant />
    </motion.div>
  );
}
