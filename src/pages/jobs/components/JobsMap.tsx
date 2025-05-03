
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Settings, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { mockJobs } from "./jobs-list/mockJobData";
import JobsMapView from "./map/JobsMapView";
import { OptimizationFactors } from "./map/OptimizationFactors";
import { integrationService } from '@/services/integration-service';
import { toast } from "@/hooks/use-toast";

interface JobsMapProps {
  selectedDate: Date;
}

export default function JobsMap({ selectedDate }: JobsMapProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [optimizationFactors, setOptimizationFactors] = useState({
    traffic: true,
    weather: false,
    historical: true,
    priority: true,
  });
  
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
  
  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      // Find maps integration if available
      const mapsIntegrations = await integrationService.getIntegrationsByType('maps');
      const enabled = mapsIntegrations.filter(i => i.enabled);
      
      if (enabled.length === 0) {
        toast({
          title: "Maps integration not available",
          description: "Please configure a maps integration in the settings",
          variant: "destructive",
        });
        return;
      }
      
      // Track API usage through our integration service
      const integration = enabled[0];
      
      // Log that we're starting optimization
      toast({
        title: "Optimizing routes",
        description: "Please wait while we calculate the optimal route",
      });
      
      // Simulate API call (in real app, would call actual routing API)
      setTimeout(() => {
        setIsOptimizing(false);
        toast({
          title: "Routes optimized",
          description: "Routes have been optimized with selected factors",
        });
      }, 2000);
      
    } catch (error) {
      console.error("Route optimization error:", error);
      toast({
        title: "Optimization error",
        description: "Failed to optimize routes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };
  
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
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Showing {jobs.length} jobs for {format(selectedDate, "MMMM d, yyyy")}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={handleOptimize}
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                'Optimize Routes'
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {showSettings && (
        <OptimizationFactors 
          factors={optimizationFactors} 
          onChange={setOptimizationFactors} 
        />
      )}
      
      <CardContent className="p-0">
        <JobsMapView 
          selectedDate={selectedDate} 
          jobs={jobs} 
          isLoading={isLoading} 
        />
      </CardContent>
    </Card>
  );
}
