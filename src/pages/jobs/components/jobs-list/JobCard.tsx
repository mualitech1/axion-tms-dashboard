
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Calendar, User2, MapPin, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { getTimeFromDate } from "./mockJobData";
import { Job, JobStatus } from "../../types/jobTypes";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const isMobile = useIsMobile();
  
  // Format time from date
  const time = job.time || getTimeFromDate(job.date);
  
  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "booked": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "allocated": return "bg-purple-500/10 text-purple-500 border-purple-500/20"; 
      case "in-progress": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "finished": return "bg-teal-500/10 text-teal-500 border-teal-500/20";
      case "invoiced": return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      case "cleared": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "completed": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "archived": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "issues": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "low": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };
  
  return (
    <Link to={`/jobs/${job.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className="overflow-hidden border border-aximo-border bg-gradient-to-br from-aximo-dark to-aximo-darker shadow-aximo hover:shadow-aximo-strong transition-all duration-300">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-aximo-text group-hover:text-aximo-primary transition-colors truncate text-sm md:text-base">
                    {job.title}
                  </h4>
                  <ArrowUpRight className="h-3.5 w-3.5 text-aximo-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 text-xs md:text-sm text-aximo-text-secondary">
                  <div className="flex items-center gap-1">
                    <User2 className="h-3 md:h-3.5 w-3 md:w-3.5" />
                    <span className="truncate max-w-[100px] md:max-w-[120px]">{job.client}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 md:h-3.5 w-3 md:w-3.5" />
                    <span>{time}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3 text-xs text-aximo-text-secondary">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <div className="truncate">
                    <span>{job.origin}</span>
                    <span className="mx-1">→</span>
                    <span>{job.destination}</span>
                  </div>
                </div>
                
                {job.vehicle && (
                  <div className="flex items-center gap-1 mb-3 text-xs text-aximo-text-secondary">
                    <Truck className="h-3 w-3" />
                    <span>{job.vehicle}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center gap-2 mt-auto">
                  <Badge 
                    variant="outline" 
                    className={`capitalize text-xs md:text-sm py-0.5 px-2 ${getStatusColor(job.status)}`}
                  >
                    {job.status.replace("-", " ")}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs md:text-sm py-0.5 px-2 ${getPriorityColor(job.priority)}`}
                  >
                    {job.priority} priority
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`h-1 w-full ${job.status === 'issues' ? 'bg-red-500' : job.status === 'in-progress' ? 'bg-amber-500' : job.status === 'completed' ? 'bg-green-500' : 'bg-aximo-primary'}`}></div>
        </Card>
      </motion.div>
    </Link>
  );
}
