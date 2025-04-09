
import { useState, useEffect } from "react";
import { Calendar, LayoutDashboard, Map, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from "@/components/ui/dialog";
import MainLayout from "@/components/layout/MainLayout";
import JobCreation from "./components/JobCreation";
import FleetOverview from "./components/FleetOverview";
import PlanningCalendar from "./components/PlanningCalendar";
import JobsList from "./components/JobsList";
import JobsMap from "./components/JobsMap";
import { useIsMobile } from "@/hooks/use-mobile";

export default function JobsPage() {
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar" | "map">("list");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const isMobile = useIsMobile();
  
  useEffect(() => {
    console.log("JobsPage mounted");
  }, []);

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };
  
  return (
    <MainLayout title="Jobs Dashboard">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">Jobs Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage and track all transportation jobs</p>
          </div>
        </div>

        {/* Fleet Overview Section */}
        <FleetOverview />
        
        {/* Action Bar */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg border border-border/40 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex rounded-lg border shadow-sm">
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-r-none"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    List
                  </Button>
                  <Button 
                    variant={viewMode === "calendar" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-none border-x"
                    onClick={() => setViewMode("calendar")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </Button>
                  <Button 
                    variant={viewMode === "map" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-l-none"
                    onClick={() => setViewMode("map")}
                  >
                    <Map className="h-4 w-4 mr-2" />
                    Map
                  </Button>
                </div>
                
                <div className="flex items-center rounded-lg border shadow-sm">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-r-none border-r"
                    onClick={() => navigateDate('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="px-3 py-1.5 text-sm">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-l-none border-l"
                    onClick={() => navigateDate('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="outline" size="sm" className="shadow-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              <Dialog open={isCreatingJob} onOpenChange={setIsCreatingJob}>
                <DialogTrigger asChild>
                  <Button className="whitespace-nowrap shadow-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogTitle>Create New Job</DialogTitle>
                  <DialogDescription>Fill in the details to create a new job.</DialogDescription>
                  <JobCreation onComplete={() => setIsCreatingJob(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        {/* Main Content Area - Changes based on viewMode */}
        <div>
          {viewMode === "list" && (
            <JobsList 
              selectedDate={selectedDate} 
              openJobCreation={() => setIsCreatingJob(true)}
            />
          )}
          
          {viewMode === "calendar" && (
            <PlanningCalendar 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          )}
          
          {viewMode === "map" && (
            <JobsMap selectedDate={selectedDate} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
