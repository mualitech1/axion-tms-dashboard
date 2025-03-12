
import { cn } from "@/lib/utils";

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
  return (
    <div className={cn(
      "dashboard-card overflow-hidden animate-scale-in",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-tms-gray-600">{title}</h3>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <div className="h-10 bg-tms-gray-200 rounded-md animate-pulse" />
          <div className="h-24 bg-tms-gray-200 rounded-md animate-pulse" />
        </div>
      ) : (
        <div>
          {children}
        </div>
      )}
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-tms-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}
