
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Navigation } from "lucide-react";
import { format } from "date-fns";
import { mockJobs } from "./jobs-list/mockJobData";
import JobsMapView from "./map/JobsMapView";

interface JobsMapProps {
  selectedDate: Date;
}

export default function JobsMap({ selectedDate }: JobsMapProps) {
  // Filter jobs for the selected date
  const [jobs, setJobs] = useState<any[]>([]);
  
  useEffect(() => {
    // Filter jobs for the selected date
    const jobsForSelectedDate = mockJobs.filter(job => {
      const jobDate = new Date(job.date);
      return (
        jobDate.getDate() === selectedDate.getDate() &&
        jobDate.getMonth() === selectedDate.getMonth() &&
        jobDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    
    setJobs(jobsForSelectedDate);
  }, [selectedDate]);
  
  return (
    <Card className="shadow-sm border-border/40">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle>
            <div className="flex items-center">
              <Navigation className="mr-2 h-5 w-5 text-primary" />
              Route Optimization
            </div>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Showing {jobs.length} jobs for {format(selectedDate, "MMMM d, yyyy")}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <JobsMapView 
          selectedDate={selectedDate} 
          jobs={jobs} 
          isLoading={false} 
        />
      </CardContent>
    </Card>
  );
}
