import { useResponsive } from "@/hooks/use-responsive";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function DashboardHeader({ 
  title, 
  subtitle, 
  actions,
  className,
  children
}: DashboardHeaderProps) {
  const { isMobile, isTablet, isDesktopAndAbove } = useResponsive();
  
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6",
      isMobile ? "mb-4" : isTablet ? "mb-6" : "mb-8",
      className
    )}>
      <div>
        <h1 className={cn(
          "font-bold text-white tracking-tight",
          isMobile ? "text-xl" : isTablet ? "text-2xl" : "text-3xl",
          isDesktopAndAbove && "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        )}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn(
            "text-aximo-text-secondary mt-1",
            isMobile ? "text-xs" : isTablet ? "text-sm" : "text-base"
          )}>
            {subtitle}
          </p>
        )}
      </div>
      
      {actions && (
        <div className={cn(
          "flex items-center",
          isMobile ? "mt-2 self-start" : "",
          isDesktopAndAbove && "space-x-3"
        )}>
          {actions}
        </div>
      )}
      
      {children && (
        <div className="mt-4 w-full">
          {children}
        </div>
      )}
    </div>
  );
}
