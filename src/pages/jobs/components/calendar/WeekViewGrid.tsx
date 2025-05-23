import React from 'react';
import { format, isSameDay } from 'date-fns';
import { JobEvent } from '../../types/calendarTypes';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface WeekViewGridProps {
  days: Date[];
  events: JobEvent[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onEventClick: (event: JobEvent) => void;
}

interface PositionedEvent {
  event: JobEvent;
  column: number;
  startRow: number;
  endRow: number;
  width: number;
  offset: number;
}

export function WeekViewGrid({ days, events, selectedDate, onSelectDate, onEventClick }: WeekViewGridProps) {
  const isMobile = useIsMobile();
  
  // Time slots for the day (7 AM to 9 PM, or fewer hours on mobile)
  const timeSlots = Array.from({ length: isMobile ? 10 : 15 }, (_, i) => i + (isMobile ? 9 : 7));
  
  // Get the column index (day of week) for a date
  const getColumnIndex = (date: Date) => {
    return days.findIndex(day => isSameDay(day, date));
  };
  
  // Get the row index (hour) for a time
  const getRowIndex = (hour: number) => {
    const adjustedHour = isMobile ? hour - 9 : hour - 7;
    return Math.max(0, Math.min(adjustedHour, timeSlots.length - 1));
  };
  
  // Position events on the grid
  const positionEvents = (events: JobEvent[]): PositionedEvent[] => {
    const positioned: PositionedEvent[] = [];
    
    // Group events by day
    const eventsByDay = days.map((day, dayIndex) => {
      return events
        .filter(event => isSameDay(new Date(event.start), day))
        .map(event => {
          const startHour = new Date(event.start).getHours();
          const endHour = Math.min(new Date(event.end).getHours() + (new Date(event.end).getMinutes() > 0 ? 1 : 0), isMobile ? 19 : 21);
          
          return {
            event,
            column: dayIndex,
            startRow: Math.max(getRowIndex(startHour), 0),
            endRow: Math.min(getRowIndex(endHour), timeSlots.length - 1),
            width: 1,
            offset: 0
          };
        })
        .sort((a, b) => a.startRow - b.startRow || b.endRow - a.endRow);
    });
    
    // Resolve overlaps within each day
    eventsByDay.forEach(dayEvents => {
      const processed: PositionedEvent[] = [];
      
      dayEvents.forEach(event => {
        // Find overlapping events that have already been processed
        const overlapping = processed.filter(
          p => !(p.endRow <= event.startRow || p.startRow >= event.endRow)
        );
        
        if (overlapping.length === 0) {
          // No overlaps, use full width
          event.width = 1;
          event.offset = 0;
        } else {
          // Find available offset
          const usedOffsets = new Set(overlapping.map(e => e.offset));
          let maxOffset = 0;
          
          for (const o of overlapping) {
            maxOffset = Math.max(maxOffset, o.offset + o.width);
          }
          
          // Find the first available slot
          let offset = 0;
          while (usedOffsets.has(offset)) {
            offset++;
          }
          
          event.offset = offset;
          
          // Determine width based on available space
          const totalSlots = Math.max(maxOffset, offset + 1);
          event.width = 1 / totalSlots;
          
          // Adjust width of other events if needed
          if (totalSlots > overlapping.length + 1) {
            overlapping.forEach(o => {
              o.width = 1 / totalSlots;
            });
          }
        }
        
        processed.push(event);
      });
      
      positioned.push(...processed);
    });
    
    return positioned;
  };
  
  const positionedEvents = positionEvents(events);
  
  // Calculate cell dimensions based on device
  const cellHeight = isMobile ? 12 : 16;
  const multiplier = isMobile ? 3 : 4;
  const headerHeight = isMobile ? 8 : 10;
  
  return (
    <div className="relative overflow-y-auto max-h-[calc(100vh-14rem)]">
      <div className={cn(
        "grid border-collapse",
        isMobile
          ? "grid-cols-[60px_repeat(7,1fr)] min-w-full"
          : "grid-cols-[80px_repeat(7,1fr)] min-w-[800px]"
      )}>
        {/* Times column */}
        <div className="border-r border-aximo-border">
          <div className={`h-${headerHeight} border-b border-aximo-border`}></div>
          {timeSlots.map(hour => (
            <div 
              key={hour} 
              className={`h-${cellHeight} border-b border-aximo-border flex items-start justify-end pr-2 pt-1`}
            >
              <span className={cn(
                isMobile ? "text-[9px]" : "text-xs",
                "text-aximo-text-secondary"
              )}>
                {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </span>
            </div>
          ))}
        </div>
        
        {/* Days columns */}
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="relative">
            {/* Day header */}
            <div 
              className={cn(
                `h-${headerHeight} border-b border-aximo-border flex flex-col items-center justify-center cursor-pointer group`,
                isSameDay(day, selectedDate) ? "bg-aximo-primary/20" : "hover:bg-aximo-darker/50"
              )}
              onClick={() => onSelectDate(day)}
            >
              <span className={cn(
                isMobile ? "text-[9px]" : "text-xs",
                "text-aximo-text-secondary"
              )}>
                {format(day, isMobile ? 'EEEEE' : 'E')}
              </span>
              <span 
                className={cn(
                  isMobile ? "text-xs" : "text-sm font-medium", 
                  isSameDay(day, selectedDate) ? "text-aximo-primary" : "text-aximo-text-primary group-hover:text-white"
                )}
              >
                {format(day, 'd')}
              </span>
            </div>
            
            {/* Hour cells */}
            {timeSlots.map(hour => (
              <div 
                key={hour} 
                className={cn(
                  `h-${cellHeight} border-b border-r border-aximo-border`,
                  dayIndex === 6 ? "border-r-0" : ""
                )}
              ></div>
            ))}
          </div>
        ))}
        
        {/* Events */}
        {positionedEvents.map((positioned, index) => {
          const { event, column, startRow, endRow, width, offset } = positioned;
          const duration = endRow - startRow + 1;
          
          // Position and size calculations
          const top = (headerHeight * 4) + startRow * (cellHeight * multiplier); // header + each time slot
          const height = duration * (cellHeight * multiplier);
          const leftOffset = isMobile ? 60 : 80;
          const left = `calc(${leftOffset}px + ${column + offset * width} * ((100% - ${leftOffset}px) / 7))`;
          const widthStyle = `calc(${width} * ((100% - ${leftOffset}px) / 7))`;
          
          const eventColorClass = getEventColorClass(event.status);
          
          return (
            <TooltipProvider key={index} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className={cn(
                      "absolute rounded-sm p-1 md:p-1.5 cursor-pointer overflow-hidden border-l-2",
                      eventColorClass
                    )}
                    style={{
                      top,
                      height: `${height - 4}px`, // -4px for margin
                      left,
                      width: widthStyle,
                    }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="h-full flex flex-col overflow-hidden">
                      <h4 className={cn(
                        "font-medium truncate",
                        isMobile ? "text-[10px]" : "text-xs"
                      )}>
                        {event.title}
                      </h4>
                      {!isMobile && duration > 1 && (
                        <p className="text-[10px] opacity-80 truncate">
                          {event.client}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-aximo-darker border-aximo-border text-aximo-text-primary">
                  <div className="space-y-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-aximo-text-secondary">
                      {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                    </p>
                    <div className="text-xs flex justify-between items-center gap-4">
                      <span>{event.client}</span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded-full text-[10px]",
                        getColorByStatus(event.status)
                      )}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}

function getEventColorClass(status: string): string {
  switch (status) {
    case 'booked':
      return 'border-blue-500 bg-blue-500/10 text-blue-300';
    case 'allocated':
      return 'border-purple-500 bg-purple-500/10 text-purple-300';
    case 'in-progress':
      return 'border-amber-500 bg-amber-500/10 text-amber-300';
    case 'issues':
      return 'border-red-500 bg-red-500/10 text-red-300';
    case 'completed':
      return 'border-green-500 bg-green-500/10 text-green-300';
    default:
      return 'border-gray-500 bg-gray-500/10 text-gray-300';
  }
}

function getColorByStatus(status: string): string {
  switch (status) {
    case 'booked':
      return 'bg-blue-500/20 text-blue-300';
    case 'allocated':
      return 'bg-purple-500/20 text-purple-300';
    case 'in-progress':
      return 'bg-amber-500/20 text-amber-300';
    case 'issues':
      return 'bg-red-500/20 text-red-300';
    case 'completed':
      return 'bg-green-500/20 text-green-300';
    default:
      return 'bg-gray-500/20 text-gray-300';
  }
} 