
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CalendarIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { DayWithJobs } from "./calendar/DayWithJobs";
import { MonthlyStats } from "./calendar/MonthlyStats";
import { JobsPanel } from "./calendar/JobsPanel";
import { mockJobEvents, getMockJobDetailsForDate } from "./calendar/mockJobData";

export default function PlanningCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedJobs, setSelectedJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "scheduled" | "in-progress">("all");

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    
    if (newDate) {
      const jobsForDate = mockJobEvents.find(
        event => 
          event.date.getDate() === newDate.getDate() && 
          event.date.getMonth() === newDate.getMonth() && 
          event.date.getFullYear() === newDate.getFullYear()
      );
      
      if (jobsForDate) {
        const mockJobDetails = getMockJobDetailsForDate(newDate, jobsForDate.count);
        setSelectedJobs(mockJobDetails);
      } else {
        setSelectedJobs([]);
      }
    }
  };

  return (
    <Card className="p-6 bg-white shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          Planning Calendar
        </h3>
        <div className="flex items-center gap-2">
          <InputWithIcon
            icon={Search}
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px]"
          />
          <Button variant="outline" size="sm">
            April 2025
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="bg-gray-50 p-4 rounded-lg">
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
          
          <div className="mt-4 flex items-center justify-between gap-4">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-full flex-1"
            >
              All
            </Button>
            <Button 
              variant={filter === "scheduled" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("scheduled")}
              className="rounded-full flex-1"
            >
              Scheduled
            </Button>
            <Button 
              variant={filter === "in-progress" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("in-progress")}
              className="rounded-full flex-1"
            >
              In Progress
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <JobsPanel date={date} selectedJobs={selectedJobs} />
        </div>
      </div>
    </Card>
  );
}
