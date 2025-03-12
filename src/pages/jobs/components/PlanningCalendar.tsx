
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowUpRight, Truck, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock job events for the calendar
const mockJobEvents = [
  { date: new Date(2023, 7, 12), count: 3 },
  { date: new Date(2023, 7, 15), count: 1 },
  { date: new Date(2023, 7, 20), count: 2 },
  { date: new Date(2023, 7, 22), count: 4 },
  { date: new Date(2023, 7, 28), count: 2 },
];

// Today and the next 2 days always have some jobs for demo purposes
const today = new Date();
mockJobEvents.push({ date: today, count: 3 });
mockJobEvents.push({ date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), count: 2 });
mockJobEvents.push({ date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), count: 1 });

interface DayWithJobsProps {
  date: Date;
  jobCount: number;
}

function DayWithJobs({ date, jobCount }: DayWithJobsProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div>{date.getDate()}</div>
      {jobCount > 0 && (
        <div className="absolute -top-1 -right-1">
          <Badge variant="default" className="h-4 min-w-4 text-[10px] flex items-center justify-center">
            {jobCount}
          </Badge>
        </div>
      )}
    </div>
  );
}

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
        // Mock job details for the selected date
        const mockJobDetails = Array.from({ length: jobsForDate.count }, (_, i) => ({
          id: i + 1,
          title: `Job #${i + 1} on ${newDate.toLocaleDateString()}`,
          time: `${9 + i}:00 ${i < 3 ? 'AM' : 'PM'}`,
          client: `Client ${String.fromCharCode(65 + i)}`,
          status: i % 3 === 0 ? "scheduled" : i % 3 === 1 ? "in-progress" : "pending",
          location: `${i + 1}23 Main St, City ${i+1}`,
          vehicle: `Truck ${101 + i}`
        }));
        
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
          
          <div className="mt-4 p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-tms-blue" />
              <span className="font-medium">Month at a Glance</span>
            </div>
            <Separator className="my-2" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-muted-foreground">Total Jobs</span>
                <span className="font-bold text-lg">42</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Scheduled</span>
                <span className="font-bold text-lg">36</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Unscheduled</span>
                <span className="font-bold text-lg">6</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3 border rounded-md p-4 bg-muted/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium flex items-center gap-2">
              {date ? (
                <>
                  <CalendarIcon className="h-4 w-4 text-tms-blue" />
                  Jobs for {format(date, "MMMM d, yyyy")}
                </>
              ) : (
                <>Select a date to view jobs</>
              )}
            </h4>
            <Badge variant="outline" className="font-normal">
              {selectedJobs.length} jobs
            </Badge>
          </div>
          
          {selectedJobs.length > 0 ? (
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
              {selectedJobs.map(job => (
                <div key={job.id} className="p-3 border rounded-md bg-white hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{job.title}</h5>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <Badge 
                      variant={
                        job.status === "in-progress" ? "default" :
                        job.status === "scheduled" ? "secondary" : "outline"
                      }
                      className="capitalize"
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.client}</p>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{job.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{job.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="truncate">{job.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[320px] text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground font-medium">
                {date ? "No jobs scheduled for this date." : "Please select a date to view scheduled jobs."}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {date && "Click 'Create New Job' to schedule something for this day."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
