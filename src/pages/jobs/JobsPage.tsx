
import { useState, useEffect } from "react";
import { Calendar, LayoutDashboard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

export default function JobsPage() {
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "scheduler">("calendar");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    console.log("JobsPage mounted");
  }, []);
  
  return (
    <MainLayout title="Jobs Dashboard">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage and track all transportation jobs</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <Tabs 
              defaultValue={viewMode} 
              onValueChange={(value) => setViewMode(value as "calendar" | "scheduler")}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="calendar" className="flex items-center gap-1 flex-1 sm:flex-initial">
                  <Calendar className="h-4 w-4" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="scheduler" className="flex items-center gap-1 flex-1 sm:flex-initial">
                  <LayoutDashboard className="h-4 w-4" />
                  Scheduler
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Dialog open={isCreatingJob} onOpenChange={setIsCreatingJob}>
              <DialogTrigger asChild>
                <Button className="ml-0 sm:ml-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Job
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

        {/* Fleet Overview Section */}
        <div>
          <h2 className="text-lg font-medium mb-3 text-tms-gray-800">Fleet Overview</h2>
          <FleetOverview />
        </div>
        
        {/* Planning Calendar & Jobs List Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {viewMode === "calendar" ? (
              <PlanningCalendar />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border/40 h-[500px] flex flex-col items-center justify-center">
                <LayoutDashboard className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Scheduler View</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  The advanced scheduler view is coming soon. Select calendar view to see the current planning calendar.
                </p>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <JobsList openJobCreation={() => setIsCreatingJob(true)} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
