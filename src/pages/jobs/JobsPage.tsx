
import { Truck, Calendar, Plus } from "lucide-react";
import { useState } from "react";
import JobsList from "./components/JobsList";
import FleetOverview from "./components/FleetOverview";
import PlanningCalendar from "./components/PlanningCalendar";
import JobCreation from "./components/JobCreation";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DragDropScheduler from "./components/DragDropScheduler";

export default function JobsPage() {
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "scheduler">("calendar");
  
  return (
    <MainLayout title="Jobs & Planning">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant={viewMode === "calendar" ? "default" : "outline"}
            onClick={() => setViewMode("calendar")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button 
            variant={viewMode === "scheduler" ? "default" : "outline"}
            onClick={() => setViewMode("scheduler")}
          >
            <Truck className="mr-2 h-4 w-4" />
            Scheduler View
          </Button>
        </div>
        <Dialog open={isCreatingJob} onOpenChange={setIsCreatingJob}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <JobCreation onComplete={() => setIsCreatingJob(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Fleet Status Overview */}
        <div className="md:col-span-12">
          <FleetOverview />
        </div>
        
        {/* Main Planning Area */}
        <div className="md:col-span-8">
          {viewMode === "calendar" ? (
            <PlanningCalendar />
          ) : (
            <DragDropScheduler />
          )}
        </div>
        
        {/* Jobs List */}
        <div className="md:col-span-4">
          <JobsList openJobCreation={() => setIsCreatingJob(true)} />
        </div>
      </div>
    </MainLayout>
  );
}
