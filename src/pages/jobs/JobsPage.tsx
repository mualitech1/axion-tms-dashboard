
import { Truck, Calendar, AlertCircle } from "lucide-react";
import JobsList from "./components/JobsList";
import FleetOverview from "./components/FleetOverview";
import PlanningCalendar from "./components/PlanningCalendar";
import MainLayout from "@/components/layout/MainLayout";

export default function JobsPage() {
  return (
    <MainLayout title="Jobs & Planning">
      <div className="grid gap-6 md:grid-cols-12">
        {/* Fleet Status Overview */}
        <div className="md:col-span-12">
          <FleetOverview />
        </div>
        
        {/* Main Planning Area */}
        <div className="md:col-span-8">
          <PlanningCalendar />
        </div>
        
        {/* Jobs List */}
        <div className="md:col-span-4">
          <JobsList />
        </div>
      </div>
    </MainLayout>
  );
}
