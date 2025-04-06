
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "./mockJobData";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="p-4 hover:bg-accent/50 cursor-pointer transition-colors border border-border">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{job.title}</h4>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{job.client}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant={
                  job.status === "in-progress" ? "default" :
                  job.status === "scheduled" ? "secondary" : "outline"
                }
                className="capitalize"
              >
                {job.status}
              </Badge>
              <Badge 
                variant="outline" 
                className={`
                  ${job.priority === "high" ? "bg-red-50 text-red-700 border-red-200" : 
                    job.priority === "medium" ? "bg-orange-50 text-orange-700 border-orange-200" : 
                    "bg-blue-50 text-blue-700 border-blue-200"}
                `}
              >
                {job.priority} priority
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium bg-muted/30 px-2 py-1 rounded">{job.time}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
