import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { JobEvent } from '../../types/calendarTypes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export interface DayWithEventsProps {
  date: Date;
  events: JobEvent[];
  isSelected?: boolean;
  isToday?: boolean;
  isOutsideMonth?: boolean;
  isWeekend?: boolean;
  onSelectDate: (date: Date) => void;
  onEventClick?: (event: JobEvent) => void;
}

export function DayWithEvents({
  date,
  events,
  isSelected = false,
  isToday = false,
  isOutsideMonth = false,
  isWeekend = false,
  onSelectDate,
  onEventClick
}: DayWithEventsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Group events by priority to display high priority events first
  const highPriorityEvents = events.filter(event => event.priority === 'high');
  const mediumPriorityEvents = events.filter(event => event.priority === 'medium');
  const lowPriorityEvents = events.filter(event => event.priority === 'low');
  
  // Sort all events by priority
  const sortedEvents = [...highPriorityEvents, ...mediumPriorityEvents, ...lowPriorityEvents];
  
  // Limit visible events (fewer on mobile)
  const maxVisibleEvents = isMobile ? 2 : 3;
  const visibleEvents = sortedEvents.slice(0, maxVisibleEvents);
  const hiddenEventsCount = Math.max(0, sortedEvents.length - maxVisibleEvents);
  
  // Handle click on the day cell
  const handleDayClick = () => {
    onSelectDate(date);
  };
  
  // Handle click on an event
  const handleEventClick = (e: React.MouseEvent, event: JobEvent) => {
    e.stopPropagation(); // Prevent triggering the day click handler
    if (onEventClick) {
      onEventClick(event);
    }
  };
  
  return (
    <div
      className={cn(
        "group relative h-full border border-aximo-border overflow-hidden transition-colors",
        isMobile ? "min-h-[70px]" : "min-h-[100px]",
        isSelected ? "bg-aximo-primary/10 border-aximo-primary" : "bg-aximo-darker",
        isToday ? "ring-1 ring-aximo-accent/40" : "",
        isWeekend ? "bg-aximo-darker/70" : "",
        isOutsideMonth ? "opacity-50" : "",
        "hover:border-aximo-primary/60"
      )}
      onClick={handleDayClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "text-xs font-medium flex justify-between items-center",
        isMobile ? "p-0.5" : "p-1",
        isSelected ? "bg-aximo-primary/30" : "bg-aximo-darker/80",
        isToday ? "text-aximo-accent" : "text-aximo-text-primary"
      )}>
        <span>{format(date, 'd')}</span>
        {isToday && (
          <span className={cn(
            "text-aximo-accent font-mono rounded-sm bg-aximo-accent/10 border border-aximo-accent/20 flex items-center",
            isMobile ? "text-[8px] px-1 py-0.5" : "text-[10px] px-1.5 py-0.5"
          )}>
            <Sparkles className={cn(isMobile ? "h-1.5 w-1.5" : "h-2 w-2", "mr-0.5")} /> 
            NOW
          </span>
        )}
      </div>
      
      <div className={cn(
        "overflow-y-auto",
        isMobile ? "p-0.5 space-y-0.5 max-h-[calc(100%-18px)]" : "p-1 space-y-1 max-h-[calc(100%-26px)]"
      )}>
        {visibleEvents.map((event) => (
          <TooltipProvider key={event.id} delayDuration={isMobile ? 500 : 300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0.8, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "rounded-sm cursor-pointer truncate border-l-2",
                    isMobile ? "text-[9px] p-0.5" : "text-xs p-1",
                    isHovered ? "hover:bg-aximo-darker/90" : "",
                    getEventClassByStatus(event.status),
                    getEventBorderClass(event.priority),
                  )}
                  style={{ 
                    borderLeftColor: event.color || getColorByPriority(event.priority)
                  }}
                  onClick={(e) => handleEventClick(e, event)}
                >
                  <div className="flex items-center gap-1">
                    <div className={cn(
                      "rounded-full",
                      isMobile ? "w-0.5 h-0.5" : "w-1 h-1"
                    )} 
                      style={{ backgroundColor: event.color || getColorByPriority(event.priority) }} 
                    />
                    <span className="truncate">
                      {isMobile ? event.title : `${format(new Date(event.start), 'HH:mm')} ${event.title}`}
                    </span>
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent 
                side={isMobile ? "bottom" : "right"} 
                align={isMobile ? "center" : "start"}
                className="bg-aximo-dark border-aximo-border text-aximo-text-primary p-3 max-w-xs z-50"
              >
                <div className="space-y-2">
                  <div className="text-sm font-medium text-white">{event.title}</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="text-aximo-text-secondary">Client:</div>
                    <div className="text-aximo-text-primary">{event.client}</div>
                    <div className="text-aximo-text-secondary">Time:</div>
                    <div className="text-aximo-text-primary">
                      {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                    </div>
                    {event.vehicleName && (
                      <>
                        <div className="text-aximo-text-secondary">Vehicle:</div>
                        <div className="text-aximo-text-primary">{event.vehicleName}</div>
                      </>
                    )}
                    {event.driverName && (
                      <>
                        <div className="text-aximo-text-secondary">Driver:</div>
                        <div className="text-aximo-text-primary">{event.driverName}</div>
                      </>
                    )}
                    <div className="text-aximo-text-secondary">Status:</div>
                    <div className={getStatusTextClass(event.status)}>{event.status}</div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        
        {hiddenEventsCount > 0 && (
          <div className={cn(
            "font-medium text-aximo-text-secondary bg-aximo-darker/80 rounded-sm",
            isMobile ? "text-[9px] p-0.5" : "text-xs p-1"
          )}>
            + {hiddenEventsCount} more
          </div>
        )}
      </div>
      
      {isSelected && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-aximo-primary"
          layoutId="selectedDay"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
}

// Helper functions for styling
function getEventClassByStatus(status: string): string {
  switch (status) {
    case 'booked':
      return "bg-blue-900/30 text-blue-300";
    case 'allocated':
      return "bg-purple-900/30 text-purple-300";
    case 'in-progress':
      return "bg-amber-900/30 text-amber-300";
    case 'issues':
      return "bg-red-900/30 text-red-300";
    default:
      return "bg-gray-900/30 text-gray-300";
  }
}

function getStatusTextClass(status: string): string {
  switch (status) {
    case 'booked':
      return "text-blue-400";
    case 'allocated':
      return "text-purple-400";
    case 'in-progress':
      return "text-amber-400";
    case 'issues':
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

function getEventBorderClass(priority: string): string {
  switch (priority) {
    case 'high':
      return "border-l-red-500";
    case 'medium':
      return "border-l-yellow-500";
    case 'low':
      return "border-l-green-500";
    default:
      return "border-l-gray-500";
  }
}

function getColorByPriority(priority: string): string {
  switch (priority) {
    case 'high':
      return "#ef4444";
    case 'medium':
      return "#eab308";
    case 'low':
      return "#22c55e";
    default:
      return "#94a3b8";
  }
} 