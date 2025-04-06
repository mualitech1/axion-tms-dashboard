
import { useState, useEffect } from "react";
import { Calendar, LayoutDashboard, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import MainLayout from "@/components/layout/MainLayout";
import JobCreation from "./components/JobCreation";
import FleetOverview from "./components/FleetOverview";
import PlanningCalendar from "./components/PlanningCalendar";
import JobsList from "./components/JobsList";

export default function JobsPage() {
  console.log("JobsPage component rendered");
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "scheduler">("calendar");
  
  useEffect(() => {
    console.log("JobsPage mounted");
  }, []);
  
  return (
    <MainLayout title="Dashboard">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant={viewMode === "calendar" ? "default" : "outline"}
            onClick={() => setViewMode("calendar")}
            className="flex items-center gap-1"
            size="sm"
          >
            <Calendar className="h-4 w-4" />
            Calendar View
          </Button>
          <Button 
            variant={viewMode === "scheduler" ? "default" : "outline"}
            onClick={() => setViewMode("scheduler")}
            className="flex items-center gap-1"
            size="sm"
          >
            <LayoutDashboard className="h-4 w-4" />
            Scheduler View
          </Button>
        </div>
        <Dialog open={isCreatingJob} onOpenChange={setIsCreatingJob}>
          <DialogTrigger asChild>
            <Button className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Create New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogTitle>Create New Job</DialogTitle>
            <DialogDescription>Fill in the details to create a new job.</DialogDescription>
            <JobCreation onComplete={() => setIsCreatingJob(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Fleet Overview Section */}
      <div className="mb-6">
        <FleetOverview />
      </div>
      
      {/* Planning Calendar & Jobs List Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {viewMode === "calendar" ? (
            <PlanningCalendar />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Scheduler View</h3>
              <p className="text-muted-foreground">Select calendar view to see the planning calendar.</p>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <JobsList openJobCreation={() => setIsCreatingJob(true)} />
        </div>
      </div>
    </MainLayout>
  );
}
