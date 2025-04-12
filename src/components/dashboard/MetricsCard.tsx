
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardCard from "./DashboardCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    direction: "up" | "down" | "neutral";
    text?: string;
  };
  icon?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export default function MetricsCard({
  title,
  value,
  change,
  icon,
  className,
  isLoading = false,
}: MetricsCardProps) {
  const isMobile = useIsMobile();

  const getChangeColor = (direction: "up" | "down" | "neutral") => {
    if (direction === "up") return "text-tms-green";
    if (direction === "down") return "text-tms-red";
    return "text-tms-gray-500";
  };

  const getChangeIcon = (direction: "up" | "down" | "neutral") => {
    if (direction === "up") return <ArrowUpIcon className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />;
    if (direction === "down") return <ArrowDownIcon className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />;
    return null;
  };

  return (
    <DashboardCard 
      title={title}
      className={cn("hover-lift", className)}
      isLoading={isLoading}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className={`${isMobile ? 'text-lg md:text-xl' : 'text-2xl'} font-semibold text-tms-gray-800`}>
            {value}
          </div>
          
          {change && (
            <div className="flex items-center mt-1">
              <div 
                className={cn(
                  "flex items-center text-xs font-medium", 
                  getChangeColor(change.direction)
                )}
              >
                {getChangeIcon(change.direction)}
                <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} ml-0.5 md:ml-1`}>{change.value}%</span>
              </div>
              {change.text && (
                <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-tms-gray-500 ml-0.5 md:ml-1`}>
                  {change.text}
                </span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`bg-tms-blue-light p-1.5 md:p-2 rounded-full ${isMobile ? 'scale-75' : ''}`}>
            {icon}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
