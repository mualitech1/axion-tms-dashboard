import { useState, useEffect } from "react";
import { addDays, subDays, addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek, isToday, isWeekend, isSameYear } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, Search, Filter, Plus, 
  Sparkles, ArrowDownUp, Truck, User, Building, MoreHorizontal, Download, Settings
} from "lucide-react";
import { DayWithEvents } from "./calendar/DayWithEvents";
import { JobEvent, CalendarViewState } from "../types/calendarTypes";
import { getCalendarEvents, getDateInfo } from "../services/calendarService";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WeekViewGrid } from './calendar/WeekViewGrid';
import { EventDetailsPanel } from "./calendar/EventDetailsPanel";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface PlanningCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onCreateJob?: (date: Date) => void;
}

export default function PlanningCalendar({ 
  selectedDate, 
  onDateChange,
  onCreateJob
}: PlanningCalendarProps) {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [viewState, setViewState] = useState<CalendarViewState>({
    date: new Date(selectedDate),
    view: 'month'
  });
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [events, setEvents] = useState<JobEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<JobEvent | null>(null);
  const [eventDetailOpen, setEventDetailOpen] = useState(false);
  
  // Generate calendar days for the current view
  useEffect(() => {
    const generateCalendarDays = () => {
      const { date, view } = viewState;
      
      if (view === 'month') {
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 }); // End on Sunday
        
        return eachDayOfInterval({ start: startDate, end: endDate });
      } else if (view === 'week') {
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
        
        return eachDayOfInterval({ start: weekStart, end: weekEnd });
      } else {
        // Day view - just return the selected day
        return [date];
      }
    };
    
    setCalendarDays(generateCalendarDays());
  }, [viewState]);
  
  // Load events for the current view
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      
      try {
        const { date, view } = viewState;
        let start, end;
        
        if (view === 'month') {
          start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
          end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
        } else if (view === 'week') {
          start = startOfWeek(date, { weekStartsOn: 1 });
          end = endOfWeek(date, { weekStartsOn: 1 });
        } else {
          // Day view
          start = new Date(date.setHours(0, 0, 0, 0));
          end = new Date(date.setHours(23, 59, 59, 999));
        }
        
        const fetchedEvents = await getCalendarEvents(start, end, viewState.filter);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error loading calendar events:", error);
        toast({
          title: "Error",
          description: "Failed to load calendar events. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, [viewState, toast]);
  
  // Navigation handlers
  const handlePrevious = () => {
    const { date, view } = viewState;
    
    if (view === 'month') {
      setViewState(prev => ({ ...prev, date: subMonths(date, 1) }));
    } else if (view === 'week') {
      setViewState(prev => ({ ...prev, date: subDays(date, 7) }));
    } else {
      setViewState(prev => ({ ...prev, date: subDays(date, 1) }));
    }
  };
  
  const handleNext = () => {
    const { date, view } = viewState;
    
    if (view === 'month') {
      setViewState(prev => ({ ...prev, date: addMonths(date, 1) }));
    } else if (view === 'week') {
      setViewState(prev => ({ ...prev, date: addDays(date, 7) }));
    } else {
      setViewState(prev => ({ ...prev, date: addDays(date, 1) }));
    }
  };
  
  const handleToday = () => {
    setViewState(prev => ({ ...prev, date: new Date() }));
    onDateChange(new Date());
  };
  
  const handleViewChange = (newView: 'day' | 'week' | 'month') => {
    setViewState(prev => ({ ...prev, view: newView }));
  };
  
  const handleSelectDate = (date: Date) => {
    setViewState(prev => ({ ...prev, date }));
    onDateChange(date);
  };
  
  const handleEventClick = (event: JobEvent) => {
    setSelectedEvent(event);
    setEventDetailOpen(true);
  };
  
  const handleCreateJob = () => {
    if (onCreateJob) {
      onCreateJob(viewState.date);
    }
  };
  
  // Group days into weeks for grid display
  const weeks: Date[][] = [];
  if (calendarDays.length > 0 && viewState.view === 'month') {
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
  }
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, day);
    });
  };
  
  // Format title based on view
  const formatViewTitle = () => {
    const { date, view } = viewState;
    
    if (view === 'month') {
      return format(date, isMobile ? 'MMM yyyy' : 'MMMM yyyy');
    } else if (view === 'week') {
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      
      if (isMobile) {
        // Shorter format for mobile
        if (isSameMonth(weekStart, weekEnd)) {
          return `${format(weekStart, 'd')}-${format(weekEnd, 'd MMM yyyy')}`;
        } else if (isSameYear(weekStart, weekEnd)) {
          return `${format(weekStart, 'd MMM')}-${format(weekEnd, 'd MMM yyyy')}`;
        } else {
          return `${format(weekStart, 'd MMM yy')}-${format(weekEnd, 'd MMM yy')}`;
        }
      } else {
        // Full format for desktop
        if (isSameMonth(weekStart, weekEnd)) {
          return `${format(weekStart, 'd')}-${format(weekEnd, 'd MMMM yyyy')}`;
        } else if (isSameYear(weekStart, weekEnd)) {
          return `${format(weekStart, 'd MMMM')}-${format(weekEnd, 'd MMMM yyyy')}`;
        } else {
          return `${format(weekStart, 'd MMMM yyyy')}-${format(weekEnd, 'd MMMM yyyy')}`;
        }
      }
    } else {
      return format(date, isMobile ? 'EEE, d MMM yyyy' : 'EEEE, d MMMM yyyy');
    }
  };
  
  // Count unique vehicles and drivers in current view
  const resourceStats = events.reduce((stats, event) => {
    if (event.vehicleId && !stats.vehicles.includes(event.vehicleId)) {
      stats.vehicles.push(event.vehicleId);
    }
    if (event.driverId && !stats.drivers.includes(event.driverId)) {
      stats.drivers.push(event.driverId);
    }
    if (!stats.clients.includes(event.clientId)) {
      stats.clients.push(event.clientId);
    }
    return stats;
  }, { vehicles: [] as string[], drivers: [] as string[], clients: [] as string[] });

  return (
    <div className={cn("h-full w-full", isMobile ? "p-1" : "p-4")}>
      <Card className="h-full border-aximo-border bg-aximo-dark">
        <CardHeader className={cn(
          "border-b border-aximo-border",
          isMobile ? "px-2 py-2" : "px-6 py-4"
        )}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size={isMobile ? "sm" : "icon"}
                onClick={handlePrevious}
                className="rounded-full bg-aximo-darker border-aximo-border text-aximo-text-primary hover:bg-aximo-darker/80"
              >
                <ChevronLeft className={cn(
                  "stroke-current",
                  isMobile ? "h-4 w-4" : "h-5 w-5"
                )} />
              </Button>
              
              <Button
                variant="outline"
                size={isMobile ? "sm" : "icon"}
                onClick={handleNext}
                className="rounded-full bg-aximo-darker border-aximo-border text-aximo-text-primary hover:bg-aximo-darker/80"
              >
                <ChevronRight className={cn(
                  "stroke-current",
                  isMobile ? "h-4 w-4" : "h-5 w-5"
                )} />
              </Button>
              
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleToday}
                className="ml-2 bg-aximo-darker border-aximo-border text-aximo-text-primary hover:bg-aximo-darker/80"
              >
                Today
              </Button>
            </div>
            
            <div className="flex items-center justify-center">
              <h2 className={cn(
                "text-center font-medium text-aximo-text-primary",
                isMobile ? "text-sm" : "text-xl"
              )}>
                {formatViewTitle()}
              </h2>
            </div>
            
            <div className="flex items-center justify-end gap-2">
              <div className="flex items-center bg-aximo-darker rounded-md p-0.5 border border-aximo-border">
                <Button
                  variant={viewState.view === 'day' ? 'secondary' : 'ghost'}
                  size="sm"
                  className={cn(
                    viewState.view === 'day' 
                      ? "bg-aximo-dark text-aximo-text-primary" 
                      : "text-aximo-text-secondary hover:text-aximo-text-primary hover:bg-aximo-dark",
                    isMobile ? "px-2" : ""
                  )}
                  onClick={() => handleViewChange('day')}
                >
                  {isMobile ? "D" : "Day"}
                </Button>
                
                <Button
                  variant={viewState.view === 'week' ? 'secondary' : 'ghost'}
                  size="sm"
                  className={cn(
                    viewState.view === 'week' 
                      ? "bg-aximo-dark text-aximo-text-primary" 
                      : "text-aximo-text-secondary hover:text-aximo-text-primary hover:bg-aximo-dark",
                    isMobile ? "px-2" : ""
                  )}
                  onClick={() => handleViewChange('week')}
                >
                  {isMobile ? "W" : "Week"}
                </Button>
                
                <Button
                  variant={viewState.view === 'month' ? 'secondary' : 'ghost'}
                  size="sm"
                  className={cn(
                    viewState.view === 'month' 
                      ? "bg-aximo-dark text-aximo-text-primary" 
                      : "text-aximo-text-secondary hover:text-aximo-text-primary hover:bg-aximo-dark",
                    isMobile ? "px-2" : ""
                  )}
                  onClick={() => handleViewChange('month')}
                >
                  {isMobile ? "M" : "Month"}
                </Button>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "sm" : "icon"} 
                    className="rounded-full bg-aximo-darker border-aximo-border text-aximo-text-primary hover:bg-aximo-darker/80"
                  >
                    <MoreHorizontal className={cn(
                      "stroke-current",
                      isMobile ? "h-4 w-4" : "h-5 w-5"
                    )} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-aximo-dark border-aximo-border text-aximo-text-primary">
                  <DropdownMenuItem onClick={() => toast({
                    title: "Coming Soon!",
                    description: "This feature is under development.",
                  })}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Calendar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({
                    title: "Coming Soon!",
                    description: "This feature is under development.",
                  })}>
                    <Settings className="h-4 w-4 mr-2" />
                    Calendar Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 md:col-span-3 flex-wrap",
              isMobile ? "mt-1" : "mt-2"
            )}>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-aximo-darker border-aximo-border text-aximo-text-primary hover:bg-aximo-darker/80"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              <Button 
                size="sm" 
                className="bg-aximo-primary hover:bg-aximo-primary/90"
                onClick={handleCreateJob}
              >
                <Plus className="h-4 w-4 mr-2" />
                {isMobile ? "New" : "New Operation"}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            {viewState.view === 'month' && (
              <motion.div
                key="month-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-7 text-center border-b border-aximo-border">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div 
                      key={day} 
                      className={cn(
                        "font-medium",
                        isMobile ? "py-1 text-[10px]" : "py-2 text-xs", 
                        i >= 5 ? 'text-aximo-accent/80' : 'text-aximo-text-secondary'
                      )}
                    >
                      {isMobile ? day.charAt(0) : day}
                    </div>
                  ))}
                </div>
                <div className={cn(
                  "grid grid-cols-7",
                  isMobile 
                    ? "grid-rows-[repeat(6,minmax(70px,1fr))]" 
                    : "grid-rows-[repeat(6,minmax(100px,1fr))]"
                )}>
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 42 }).map((_, i) => (
                      <div key={i} className="border border-aximo-border bg-aximo-darker h-full min-h-[100px]">
                        <div className="p-1">
                          <Skeleton className="h-4 w-4 rounded-sm bg-aximo-darker" />
                        </div>
                      </div>
                    ))
                  ) : (
                    // Calendar grid
                    weeks.flat().map((day, i) => {
                      const dayEvents = getEventsForDay(day);
                      return (
                        <DayWithEvents
                          key={i}
                          date={day}
                          events={dayEvents}
                          isSelected={isSameDay(day, selectedDate)}
                          isToday={isToday(day)}
                          isOutsideMonth={!isSameMonth(day, viewState.date)}
                          isWeekend={isWeekend(day)}
                          onSelectDate={handleSelectDate}
                          onEventClick={handleEventClick}
                        />
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
            
            {viewState.view === 'week' && (
              <motion.div
                key="week-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-aximo-border border-b"
              >
                <WeekViewGrid 
                  days={calendarDays}
                  events={events}
                  selectedDate={selectedDate}
                  onSelectDate={handleSelectDate}
                  onEventClick={handleEventClick}
                />
              </motion.div>
            )}
            
            {viewState.view === 'day' && (
              <motion.div
                key="day-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "border-aximo-border border-b",
                  isMobile ? "h-[400px]" : "h-[600px]"
                )}
              >
                <div className="text-center p-8 text-aximo-text-secondary">
                  Day view to be implemented
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      
      {/* Event detail dialog */}
      <Dialog open={eventDetailOpen} onOpenChange={setEventDetailOpen}>
        <DialogContent className={cn(
          "bg-aximo-dark border-aximo-border",
          isMobile ? "w-[90vw] max-w-[90vw] p-3" : ""
        )}>
          {selectedEvent && (
            <EventDetailsPanel event={selectedEvent} onClose={() => setEventDetailOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
