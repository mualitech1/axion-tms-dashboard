
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DayWithJobs } from "./calendar/DayWithJobs";
import { MonthlyStats } from "./calendar/MonthlyStats";
import { JobsPanel } from "./calendar/JobsPanel";
import { mockJobEvents, getMockJobDetailsForDate } from "./calendar/mockJobData";

export default function PlanningCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedJobs, setSelectedJobs] = useState<any[]>([]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    
    // Find jobs for the selected date
    if (newDate) {
      const jobsForDate = mockJobEvents.find(
        event => 
          event.date.getDate() === newDate.getDate() && 
          event.date.getMonth() === newDate.getMonth() && 
          event.date.getFullYear() === newDate.getFullYear()
      );
      
      if (jobsForDate) {
        // Get mock job details for the selected date
        const mockJobDetails = getMockJobDetailsForDate(newDate, jobsForDate.count);
        setSelectedJobs(mockJobDetails);
      } else {
        setSelectedJobs([]);
      }
    }
  };

  return (
    <Card className="p-6 bg-white shadow-md border-0">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-tms-blue" />
        Planning Calendar
      </h3>
      
      <div className="grid md:grid-cols-7 gap-6">
        <div className="md:col-span-4">
          <div className="bg-muted/20 p-4 rounded-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border-none"
              components={{
                Day: ({ date }) => {
                  const jobEvent = mockJobEvents.find(
                    event => 
                      event.date.getDate() === date.getDate() && 
                      event.date.getMonth() === date.getMonth() && 
                      event.date.getFullYear() === date.getFullYear()
                  );
                  
                  return jobEvent ? (
                    <DayWithJobs date={date} jobCount={jobEvent.count} />
                  ) : (
                    <div>{date.getDate()}</div>
                  );
                }
              }}
            />
          </div>
          
          <MonthlyStats />
        </div>
        
        <div className="md:col-span-3">
          <JobsPanel date={date} selectedJobs={selectedJobs} />
        </div>
      </div>
    </Card>
  );
}
