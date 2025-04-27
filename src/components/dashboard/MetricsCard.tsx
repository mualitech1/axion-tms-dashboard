
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

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
  accentColor?: 'blue' | 'green' | 'amber' | 'red';
}

export default function MetricsCard({
  title,
  value,
  change,
  icon,
  className,
  accentColor = 'blue'
}: MetricsCardProps) {
  const getChangeColor = (direction: "up" | "down" | "neutral") => {
    if (direction === "up") return "text-green-400";
    if (direction === "down") return "text-red-400";
    return "text-aximo-text-secondary";
  };

  const getBgColor = () => {
    switch (accentColor) {
      case 'blue': return 'bg-aximo-primary/5 border-aximo-primary/20';
      case 'green': return 'bg-green-500/5 border-green-500/20';
      case 'amber': return 'bg-amber-500/5 border-amber-500/20';
      case 'red': return 'bg-red-500/5 border-red-500/20';
      default: return 'bg-aximo-primary/5 border-aximo-primary/20';
    }
  };

  return (
    <div className={cn(
      "relative rounded-lg border backdrop-blur-sm transition-all duration-300",
      "p-4 hover:shadow-aximo",
      getBgColor(),
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-aximo-text-secondary">{title}</span>
        {icon && (
          <div className="p-2 rounded-full bg-aximo-primary/10">
            {icon}
          </div>
        )}
      </div>
      
      <div className="text-2xl font-bold text-aximo-text">
        {value}
      </div>
      
      {change && (
        <div className="flex items-center mt-2 text-xs">
          <span className={cn("flex items-center", getChangeColor(change.direction))}>
            {change.direction === "up" ? 
              <ArrowUpIcon className="w-3 h-3 mr-1" /> : 
              <ArrowDownIcon className="w-3 h-3 mr-1" />
            }
            {change.value}%
          </span>
          {change.text && (
            <span className="ml-1 text-aximo-text-secondary">
              {change.text}
            </span>
          )}
        </div>
      )}
      
      <div className="absolute inset-0 rounded-lg aximo-glow opacity-50 pointer-events-none" />
    </div>
  );
}
