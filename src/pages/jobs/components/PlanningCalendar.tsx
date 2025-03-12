
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

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
    <div className="relative flex items-center justify-center">
      <div>{date.getDate()}</div>
      {jobCount > 0 && (
        <div className="absolute bottom-0 right-0">
          <Badge variant="secondary" className="h-4 min-w-4 text-[10px] flex items-center justify-center">
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
          status: i % 3 === 0 ? "scheduled" : i % 3 === 1 ? "in-progress" : "pending"
        }));
        
        setSelectedJobs(mockJobDetails);
      } else {
        setSelectedJobs([]);
      }
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Planning Calendar</h3>
      
      <div className="grid md:grid-cols-7 gap-6">
        <div className="md:col-span-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
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
        
        <div className="md:col-span-3 border rounded-md p-4">
          <h4 className="font-medium mb-3">
            {date ? (
              <>Jobs for {date.toLocaleDateString()}</>
            ) : (
              <>Select a date to view jobs</>
            )}
          </h4>
          
          {selectedJobs.length > 0 ? (
            <div className="space-y-3">
              {selectedJobs.map(job => (
                <div key={job.id} className="p-2 border rounded-md bg-accent/20">
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.client}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm">{job.time}</span>
                    <Badge 
                      variant={
                        job.status === "in-progress" ? "default" :
                        job.status === "scheduled" ? "secondary" : "outline"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              {date ? "No jobs scheduled for this date." : "Please select a date to view scheduled jobs."}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
