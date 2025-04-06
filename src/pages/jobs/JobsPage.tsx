
import { Truck, Calendar, Plus, LayoutDashboard } from "lucide-react";
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
            <JobCreation onComplete={() => setIsCreatingJob(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-12">
          <FleetOverview />
        </div>
        
        <div className="grid gap-6 md:grid-cols-12 md:col-span-12">
          <div className="md:col-span-8">
            {viewMode === "calendar" ? (
              <PlanningCalendar />
            ) : (
              <DragDropScheduler />
            )}
          </div>
          
          <div className="md:col-span-4">
            <JobsList openJobCreation={() => setIsCreatingJob(true)} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
