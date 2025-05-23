import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/use-responsive";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
  accentColor?: 'blue' | 'green' | 'amber' | 'red';
  actions?: React.ReactNode;
  onExpand?: () => void;
  collapsible?: boolean;
}

export default function DashboardCard({ 
  title, 
  children, 
  className,
  footer,
  isLoading = false,
  icon,
  accentColor,
  actions,
  onExpand,
  collapsible = false
}: DashboardCardProps) {
  const { isMobile, isTablet, isDesktopAndAbove } = useResponsive();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const getBorderClass = () => {
    if (!accentColor) return "border-aximo-border";
    
    switch (accentColor) {
      case 'blue': return "border-aximo-primary/40";
      case 'green': return "border-green-500/40";
      case 'amber': return "border-amber-500/40";
      case 'red': return "border-red-500/40";
      default: return "border-aximo-border";
    }
  };

  const getAccentGradient = () => {
    if (!accentColor) return "";
    
    switch (accentColor) {
      case 'blue': return "bg-gradient-to-r from-aximo-primary/10 to-transparent";
      case 'green': return "bg-gradient-to-r from-green-500/10 to-transparent";
      case 'amber': return "bg-gradient-to-r from-amber-500/10 to-transparent";
      case 'red': return "bg-gradient-to-r from-red-500/10 to-transparent";
      default: return "";
    }
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div className={cn(
      "bg-aximo-card border rounded-lg shadow-aximo overflow-hidden transition-all duration-300",
      getBorderClass(),
      isDesktopAndAbove && "hover:shadow-aximo-strong",
      isMobile ? "p-3" : isTablet ? "p-4" : "p-5",
      className
    )}>
      <div className={cn(
        "flex items-center justify-between",
        isMobile ? "mb-2" : isTablet ? "mb-3" : "mb-4",
        isDesktopAndAbove && getAccentGradient(),
        isDesktopAndAbove && "-mx-5 px-5 py-1"
      )}>
        <div className="flex items-center">
          {icon && (
            <div className={cn(
              "mr-3 text-aximo-primary", 
              isDesktopAndAbove && "transition-transform group-hover:scale-110"
            )}>
              {icon}
            </div>
          )}
          <h3 className={cn(
            "font-medium text-aximo-text-primary",
            isMobile ? "text-xs" : isTablet ? "text-sm" : "text-base"
          )}>
            {title}
          </h3>
        </div>
        
        <div className="flex items-center gap-1">
          {actions && (
            <div className="mr-1">
              {actions}
            </div>
          )}
          
          {collapsible && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={toggleCollapse}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
          
          {onExpand && isDesktopAndAbove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onExpand}
              className="h-7 w-7 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </Button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col space-y-2 md:space-y-3">
          <div className="h-8 md:h-10 bg-aximo-border rounded-md animate-pulse" />
          <div className="h-16 md:h-24 bg-aximo-border rounded-md animate-pulse" />
        </div>
      ) : (
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "h-0 opacity-0 overflow-hidden" : "opacity-100",
          isMobile ? "text-sm" : ""
        )}>
          {children}
        </div>
      )}
      
      {footer && !isCollapsed && (
        <div className={cn(
          "pt-3 border-t border-aximo-border",
          isMobile ? "mt-2" : isTablet ? "mt-3" : "mt-4"
        )}>
          {footer}
        </div>
      )}
    </div>
  );
}
