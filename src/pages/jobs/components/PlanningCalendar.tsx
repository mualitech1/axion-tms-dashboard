
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { mockJobEvents, getMockJobDetailsForDate } from "./calendar/mockJobData";
import { DayWithJobs } from "./calendar/DayWithJobs";
import { JobsPanel } from "./calendar/JobsPanel";

interface PlanningCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function PlanningCalendar({ selectedDate, onDateChange }: PlanningCalendarProps) {
  const [selectedJobs, setSelectedJobs] = useState<any[]>([]);
  
  useEffect(() => {
    // Update selected jobs when selectedDate changes
    if (selectedDate) {
      const jobsForDate = mockJobEvents.find(
        event => 
          event.date.getDate() === selectedDate.getDate() && 
          event.date.getMonth() === selectedDate.getMonth() && 
          event.date.getFullYear() === selectedDate.getFullYear()
      );
      
      if (jobsForDate) {
        const mockJobDetails = getMockJobDetailsForDate(selectedDate, jobsForDate.count);
        setSelectedJobs(mockJobDetails);
      } else {
        setSelectedJobs([]);
      }
    }
  }, [selectedDate]);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      onDateChange(newDate);
    }
  };

  const today = new Date();

  return (
    <Card className="bg-white border border-border/40 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle>Calendar View</CardTitle>
          <div className="text-sm text-muted-foreground">
            {selectedJobs.length} jobs on {format(selectedDate, "MMMM d, yyyy")}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 p-4 lg:border-r border-border/40">
            <div className="bg-gray-50/70 p-4 rounded-lg">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border-none"
                components={{
                  Day: ({ date: dayDate }) => {
                    const jobEvent = mockJobEvents.find(
                      event => 
                        event.date.getDate() === dayDate.getDate() && 
                        event.date.getMonth() === dayDate.getMonth() && 
                        event.date.getFullYear() === dayDate.getFullYear()
                    );
                    
                    const isSelected = selectedDate && 
                      selectedDate.getDate() === dayDate.getDate() && 
                      selectedDate.getMonth() === dayDate.getMonth() && 
                      selectedDate.getFullYear() === dayDate.getFullYear();
                      
                    const isToday = 
                      today.getDate() === dayDate.getDate() && 
                      today.getMonth() === dayDate.getMonth() && 
                      today.getFullYear() === dayDate.getFullYear();
                      
                    const isCurrentMonth = today.getMonth() === dayDate.getMonth();
                    
                    return (
                      <DayWithJobs 
                        date={dayDate} 
                        jobCount={jobEvent?.count || 0}
                        isActive={isSelected}
                        isToday={isToday}
                        isOutsideMonth={!isCurrentMonth}
                      />
                    );
                  }
                }}
              />
            </div>
          </div>
          
          <div className="lg:w-1/3 p-4 bg-gray-50/30">
            <JobsPanel date={selectedDate} selectedJobs={selectedJobs} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
