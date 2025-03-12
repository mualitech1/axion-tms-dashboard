
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Clock, Truck, MapPin } from "lucide-react";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    time: string;
    client: string;
    status: string;
    location: string;
    vehicle: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="p-3 border rounded-md bg-white hover:shadow-sm transition-shadow">
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
  );
}
