
import React from 'react';
import { cn } from '@/lib/utils';

export interface DayWithJobsProps {
  date: Date;
  jobCount: number;
  isActive?: boolean;
  isToday?: boolean;
  isOutsideMonth?: boolean;
}

export function DayWithJobs({ 
  date, 
  jobCount, 
  isActive = false,
  isToday = false,
  isOutsideMonth = false
}: DayWithJobsProps) {
  const day = date.getDate();
  
  const getBadgeStyles = () => {
    if (jobCount > 3) return 'bg-primary text-primary-foreground';
    if (jobCount > 1) return 'bg-blue-500/80 text-white';
    return 'bg-blue-100 text-blue-700';
  };
  
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center w-full h-full group",
        isActive && "bg-primary/10 rounded-sm",
        isToday && "font-bold",
        isOutsideMonth && "opacity-40"
      )}
    >
      <div className={cn(
        "relative z-10 text-sm",
        isActive && "text-primary font-medium"
      )}>
        {day}
      </div>
      
      {jobCount > 0 && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center transition-all group-hover:scale-110">
          <div className={cn(
            "text-[9px] font-medium rounded-full px-1.5 py-0.5 h-[14px] flex items-center justify-center transition-colors",
            getBadgeStyles()
          )}>
            {jobCount}
          </div>
        </div>
      )}
    </div>
  );
}
