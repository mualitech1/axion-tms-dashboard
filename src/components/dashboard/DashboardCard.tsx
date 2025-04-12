
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  isLoading?: boolean;
}

export default function DashboardCard({ 
  title, 
  children, 
  className,
  footer,
  isLoading = false
}: DashboardCardProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "dashboard-card overflow-hidden animate-scale-in",
      isMobile ? "p-3" : "",
      className
    )}>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-xs md:text-sm font-medium text-tms-gray-600">{title}</h3>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col space-y-2 md:space-y-3">
          <div className="h-8 md:h-10 bg-tms-gray-200 rounded-md animate-pulse" />
          <div className="h-16 md:h-24 bg-tms-gray-200 rounded-md animate-pulse" />
        </div>
      ) : (
        <div className={isMobile ? "text-sm" : ""}>
          {children}
        </div>
      )}
      
      {footer && (
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-tms-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}
