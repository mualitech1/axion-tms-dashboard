
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cva, type VariantProps } from "class-variance-authority";

const metricCardVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        primary: "border-blue-200 bg-blue-50/50",
        success: "border-green-200 bg-green-50/50",
        warning: "border-yellow-200 bg-yellow-50/50",
        danger: "border-red-200 bg-red-50/50",
      },
      size: {
        default: "",
        sm: "p-3",
        lg: "p-6",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-blue-100 text-blue-600",
        success: "bg-green-100 text-green-600",
        warning: "bg-yellow-100 text-yellow-600",
        danger: "bg-red-100 text-red-600",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-6 w-6",
        lg: "h-10 w-10",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MetricsCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof metricCardVariants> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    direction: "up" | "down" | "neutral";
    text?: string;
  };
  loading?: boolean;
}

export function MetricsCard({
  title,
  value,
  description,
  icon,
  change,
  variant,
  size,
  loading = false,
  className,
  ...props
}: MetricsCardProps) {
  
  const getChangeColor = (direction: "up" | "down" | "neutral") => {
    switch (direction) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };
  
  const getChangeIcon = (direction: "up" | "down" | "neutral") => {
    if (direction === "up") {
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-3 w-3" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" 
            clipRule="evenodd" 
          />
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.5a1 1 0 102 0V5z" 
            clipRule="evenodd" 
          />
        </svg>
      );
    }
    
    if (direction === "down") {
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-3 w-3" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" 
            clipRule="evenodd" 
          />
        </svg>
      );
    }
    
    return null;
  };
  
  return (
    <Card className={cn(metricCardVariants({ variant, size, className }))} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && (
          <div className={cn(iconVariants({ variant, size }))}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 bg-muted/60 rounded-md animate-pulse" />
            <div className="h-4 w-2/3 bg-muted/60 rounded-md animate-pulse" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {(description || change) && (
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                {change && (
                  <span className={cn("flex items-center mr-1", getChangeColor(change.direction))}>
                    {getChangeIcon(change.direction)}
                    <span className="ml-1">{change.value}%</span>
                  </span>
                )}
                {change?.text || description}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
