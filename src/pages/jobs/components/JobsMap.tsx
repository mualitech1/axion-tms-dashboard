
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { mockJobs } from "./jobs-list/mockJobData";
import { format } from "date-fns";

interface JobsMapProps {
  selectedDate: Date;
}

export default function JobsMap({ selectedDate }: JobsMapProps) {
  // Filter jobs for the selected date
  const jobsForSelectedDate = mockJobs.filter(job => {
    const jobDate = new Date(job.date);
    return (
      jobDate.getDate() === selectedDate.getDate() &&
      jobDate.getMonth() === selectedDate.getMonth() &&
      jobDate.getFullYear() === selectedDate.getFullYear()
    );
  });
  
  return (
    <Card className="shadow-sm border-border/40">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle>Jobs Map View</CardTitle>
          <div className="text-sm text-muted-foreground">
            Showing {jobsForSelectedDate.length} jobs for {format(selectedDate, "MMMM d, yyyy")}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Map Placeholder */}
          <div className="bg-slate-100 h-[600px] w-full flex items-center justify-center">
            <div className="text-center max-w-md p-6 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Map View</h3>
              <p className="text-muted-foreground mb-4">
                This is a placeholder for the interactive map that would display the origins and destinations 
                of the {jobsForSelectedDate.length} jobs scheduled for {format(selectedDate, "MMMM d, yyyy")}.
              </p>
              <Button variant="outline" size="sm">
                Enable Geolocation
              </Button>
            </div>
          </div>
          
          {/* Sample Map Markers - These would be positioned on a real map */}
          {jobsForSelectedDate.length > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              {/* This is just visual styling for the placeholder */}
              <div className="absolute top-1/4 left-1/4">
                <div className="bg-primary h-3 w-3 rounded-full animate-ping" />
              </div>
              <div className="absolute top-1/3 left-1/2">
                <div className="bg-primary h-3 w-3 rounded-full animate-ping" />
              </div>
              <div className="absolute top-2/3 left-1/3">
                <div className="bg-primary h-3 w-3 rounded-full animate-ping" />
              </div>
              <div className="absolute top-1/2 left-2/3">
                <div className="bg-primary h-3 w-3 rounded-full animate-ping" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
