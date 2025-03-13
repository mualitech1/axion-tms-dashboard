
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { JobCard } from "./JobCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobsPanelProps {
  date: Date | undefined;
  selectedJobs: any[];
}

export function JobsPanel({ date, selectedJobs }: JobsPanelProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="border rounded-md p-3 md:p-4 bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium flex items-center gap-2 text-sm md:text-base">
          {date ? (
            <>
              <CalendarIcon className="h-4 w-4 text-tms-blue" />
              <span className="truncate">
                Jobs for {format(date, isMobile ? "MMM d" : "MMMM d, yyyy")}
              </span>
            </>
          ) : (
            <>Select a date to view jobs</>
          )}
        </h4>
        <Badge variant="outline" className="font-normal text-xs whitespace-nowrap">
          {selectedJobs.length} jobs
        </Badge>
      </div>
      
      {selectedJobs.length > 0 ? (
        <div className="space-y-3 max-h-[280px] md:max-h-[320px] overflow-y-auto pr-2">
          {selectedJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[220px] md:h-[320px] text-center">
          <CalendarIcon className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/50 mb-2" />
          <p className="text-muted-foreground font-medium text-sm md:text-base">
            {date ? "No jobs scheduled for this date." : "Please select a date to view scheduled jobs."}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {date && "Click 'Create New Job' to schedule something for this day."}
          </p>
        </div>
      )}
    </div>
  );
}
