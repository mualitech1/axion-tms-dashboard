
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { DayWithJobs } from "./calendar/DayWithJobs";
import { JobsPanel } from "./calendar/JobsPanel";
import { mockJobEvents, getMockJobDetailsForDate } from "./calendar/mockJobData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PlanningCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedJobs, setSelectedJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "scheduled" | "in-progress">("all");
  const isMobile = useIsMobile();

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

  const today = new Date();

  return (
    <Card className="bg-white border border-border/40 shadow-sm overflow-hidden">
      <div className="p-3 sm:p-5 border-b border-border/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-500" />
            Planning Calendar
          </h3>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <InputWithIcon
              icon={Search}
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[200px] h-9"
            />
            <Button variant="outline" size="sm" className="h-9 whitespace-nowrap">
              April 2025
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 p-2 sm:p-4 lg:border-r border-border/40">
          <div className="bg-gray-50/70 p-2 sm:p-4 rounded-lg">
            <Calendar
              mode="single"
              selected={date}
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
                  
                  const isSelected = date && 
                    date.getDate() === dayDate.getDate() && 
                    date.getMonth() === dayDate.getMonth() && 
                    date.getFullYear() === dayDate.getFullYear();
                    
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
          
          <div className="mt-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
                <TabsTrigger value="scheduled" onClick={() => setFilter("scheduled")}>Scheduled</TabsTrigger>
                <TabsTrigger value="in-progress" onClick={() => setFilter("in-progress")}>In Progress</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="lg:w-1/3 p-2 sm:p-4 bg-gray-50/30">
          <JobsPanel date={date} selectedJobs={selectedJobs} />
        </div>
      </div>
    </Card>
  );
}
