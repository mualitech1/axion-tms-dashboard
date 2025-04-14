
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Calendar, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Job, getTimeFromDate } from "./mockJobData";
import { JobStatus } from "../../types/jobTypes";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const isMobile = useIsMobile();
  
  // Format time from date
  const time = job.time || getTimeFromDate(job.date);
  
  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <Card className="p-3 md:p-4 hover:bg-accent/30 cursor-pointer transition-all duration-200 border border-border/40 group shadow-sm hover:shadow">
        <div className="flex items-start justify-between">
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h4 className="font-medium group-hover:text-primary truncate text-sm md:text-base">{job.title}</h4>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User2 className="h-3 md:h-3.5 w-3 md:w-3.5" />
                <span className="truncate max-w-[100px] md:max-w-[120px]">{job.client}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 md:h-3.5 w-3 md:w-3.5" />
                <span>{time}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-2">
              <Badge 
                variant={
                  job.status === "in-progress" ? "default" :
                  job.status === "booked" ? "secondary" : "outline"
                }
                className="capitalize text-xs md:text-sm py-0 md:py-0.5 px-1.5 md:px-2"
              >
                {job.status.replace("-", " ")}
              </Badge>
              <Badge 
                variant="outline" 
                className={`
                  text-xs md:text-sm py-0 md:py-0.5 px-1.5 md:px-2
                  ${job.priority.toLowerCase() === "high" ? "bg-red-50 text-red-700 border-red-200" : 
                    job.priority.toLowerCase() === "medium" ? "bg-orange-50 text-orange-700 border-orange-200" : 
                    "bg-blue-50 text-blue-700 border-blue-200"}
                `}
              >
                {job.priority} priority
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
