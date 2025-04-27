
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
  accentColor?: 'blue' | 'green' | 'amber' | 'red';
}

export default function DashboardCard({ 
  title, 
  children, 
  className,
  footer,
  isLoading = false,
  icon,
  accentColor
}: DashboardCardProps) {
  const isMobile = useIsMobile();
  
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
  
  return (
    <div className={cn(
      "bg-aximo-card border rounded-lg shadow-aximo overflow-hidden animate-scale-in p-4 md:p-5",
      getBorderClass(),
      isMobile ? "p-3" : "",
      className
    )}>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center">
          {icon && (
            <div className="mr-3 text-aximo-primary">
              {icon}
            </div>
          )}
          <h3 className="text-xs md:text-sm font-medium text-aximo-text-secondary">{title}</h3>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col space-y-2 md:space-y-3">
          <div className="h-8 md:h-10 bg-aximo-border rounded-md animate-pulse" />
          <div className="h-16 md:h-24 bg-aximo-border rounded-md animate-pulse" />
        </div>
      ) : (
        <div className={isMobile ? "text-sm" : ""}>
          {children}
        </div>
      )}
      
      {footer && (
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-aximo-border">
          {footer}
        </div>
      )}
    </div>
  );
}
