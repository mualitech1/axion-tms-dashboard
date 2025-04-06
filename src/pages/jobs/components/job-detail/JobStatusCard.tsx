
import { Truck, Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface JobStatusCardProps {
  status: string;
  priority: string;
  time: string;
  jobId: number;
}

export function JobStatusCard({ status, priority, time, jobId }: JobStatusCardProps) {
  return (
    <Card className="p-5 md:col-span-3 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted/50 p-3 rounded-full">
            <Truck className="h-6 w-6 text-tms-blue" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="flex items-center gap-2">
              <Badge 
                variant={
                  status === "in-progress" ? "default" :
                  status === "scheduled" ? "secondary" : "outline"
                }
                className="capitalize text-sm"
              >
                {status}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-sm
                  ${priority === "high" ? "bg-red-50 text-red-700 border-red-200" : 
                    priority === "medium" ? "bg-orange-50 text-orange-700 border-orange-200" : 
                    "bg-blue-50 text-blue-700 border-blue-200"}
                `}
              >
                {priority} priority
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="border-r pr-3">
            <p className="text-xs text-muted-foreground">Scheduled for</p>
            <p className="flex items-center text-sm font-medium">
              <Calendar className="h-3.5 w-3.5 mr-1 text-tms-blue" />
              {time}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Reference</p>
            <p className="flex items-center text-sm font-medium">
              <FileText className="h-3.5 w-3.5 mr-1 text-tms-blue" />
              IKB-{jobId}-{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
