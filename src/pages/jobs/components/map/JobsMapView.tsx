
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, AlertTriangle, Clock, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Job } from '@/types/job';
import { OptimizationFactors } from './OptimizationFactors';

interface JobsMapProps {
  selectedDate: Date;
  jobs: Job[];
  isLoading: boolean;
}

export default function JobsMapView({ selectedDate, jobs, isLoading }: JobsMapProps) {
  const [mapType, setMapType] = useState<'satellite' | 'street'>('street');
  const [optimizationEnabled, setOptimizationEnabled] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [optimizationFactors, setOptimizationFactors] = useState({
    traffic: true,
    weather: true,
    historical: true,
    priority: true
  });
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // This would be replaced with actual geospatial data from the jobs
  const jobCoordinates = jobs.map((_, index) => ({
    lat: 51.5 + (Math.random() - 0.5) * 0.1,
    lng: -0.12 + (Math.random() - 0.5) * 0.1
  }));
  
  const formattedDate = format(selectedDate, "MMMM d, yyyy");
  const jobsCount = jobs.length;
  
  // Here we would implement actual map library integration
  // For now, we're simulating the map view
  useEffect(() => {
    if (!mapContainerRef.current || jobs.length === 0) return;
    
    // Simulation of map rendering
    console.log(`Rendering map for ${jobsCount} jobs on ${formattedDate}`);
    console.log('Map type:', mapType);
    console.log('Optimization enabled:', optimizationEnabled);
    console.log('Optimization factors:', optimizationFactors);
    
    // In a real implementation, this is where we would initialize the map
    // and plot the job locations, routes, etc.
  }, [jobs, selectedDate, mapType, optimizationEnabled, optimizationFactors]);
  
  const handleOptimize = () => {
    setOptimizationEnabled(!optimizationEnabled);
    console.log(`Route optimization ${!optimizationEnabled ? 'enabled' : 'disabled'}`);
    
    // In a real implementation, we would trigger the route optimization algorithm here
    if (!optimizationEnabled) {
      console.log('Optimizing routes with factors:', optimizationFactors);
    }
  };
  
  return (
    <Card className="shadow-sm border-border/40">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Route Optimization
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {isLoading ? 'Loading jobs...' : `${jobsCount} jobs for ${formattedDate}`}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  {mapType === 'satellite' ? 'Satellite' : 'Street'} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setMapType('street')}>Street View</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMapType('satellite')}>Satellite View</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant={optimizationEnabled ? "default" : "outline"}
              size="sm"
              onClick={handleOptimize}
              className={optimizationEnabled ? "bg-primary text-primary-foreground" : ""}
            >
              {optimizationEnabled ? 'Optimized' : 'Optimize Routes'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {optimizationEnabled && (
          <div className="p-3 bg-muted/30 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Estimated time saved: 45 minutes</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFactors(!showFactors)}
              >
                Optimization Factors {showFactors ? '▲' : '▼'}
              </Button>
            </div>
            {showFactors && (
              <OptimizationFactors 
                factors={optimizationFactors} 
                onChange={setOptimizationFactors} 
              />
            )}
          </div>
        )}
        <div className="relative">
          {/* Map Container */}
          <div 
            ref={mapContainerRef} 
            className={`h-[600px] w-full flex items-center justify-center bg-${mapType === 'satellite' ? 'gray-800' : 'slate-100'}`}
          >
            {jobs.length === 0 ? (
              <div className="text-center max-w-md p-6 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">No Jobs Available</h3>
                <p className="text-muted-foreground mb-4">
                  There are no jobs scheduled for {formattedDate}. Select a different date or add new jobs to see them on the map.
                </p>
                <Button variant="outline" size="sm">
                  Add New Job
                </Button>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="absolute inset-0 pointer-events-none">
                {/* This is visual styling for the placeholder */}
                {jobCoordinates.map((coord, index) => (
                  <div 
                    key={index} 
                    className="absolute" 
                    style={{ 
                      top: `${(coord.lat - 51.45) * 1000}%`, 
                      left: `${(coord.lng + 0.18) * 1000}%`,
                    }}
                  >
                    <div className={`bg-primary h-3 w-3 rounded-full ${optimizationEnabled ? '' : 'animate-ping'}`} />
                  </div>
                ))}
                
                {/* Route lines visualization */}
                {optimizationEnabled && jobCoordinates.length > 1 && (
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                    <path
                      d="M100,100 C150,150 250,150 300,100 C350,50 450,50 500,100"
                      stroke="rgba(99, 102, 241, 0.6)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </svg>
                )}
              </div>
            )}
          </div>
          
          {/* Weather Warning Overlay - Only show when there are weather alerts */}
          {jobs.length > 0 && !isLoading && (
            <div className="absolute top-4 right-4 bg-yellow-50 border border-yellow-300 rounded-md p-3 shadow-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Weather Alert</h4>
                  <p className="text-xs text-yellow-700 mt-1">Heavy rain expected in downtown area. Consider rescheduling or allowing extra time.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
