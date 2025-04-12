
import { useState, useEffect } from "react";
import { Calendar, LayoutDashboard, Map, Plus, Filter, ChevronLeft, ChevronRight, Zap } from "lucide-react";
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
import { motion } from "framer-motion";

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
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Jobs Dashboard
              </span>
              <Zap className="h-5 w-5 text-blue-500" />
            </h1>
            <p className="text-muted-foreground mt-1">Intelligent job management and tracking</p>
          </div>
        </motion.div>

        {/* Fleet Overview Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FleetOverview />
        </motion.div>
        
        {/* Action Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 gap-4"
        >
          <div className="bg-gradient-to-br from-[#1A1F2C]/5 to-[#111827]/10 p-4 rounded-lg border border-[#1EAEDB]/20 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex rounded-lg border shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    size="sm" 
                    className={`rounded-r-none ${viewMode === "list" ? "bg-[#1EAEDB] hover:bg-[#1EAEDB]/90" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    List
                  </Button>
                  <Button 
                    variant={viewMode === "calendar" ? "default" : "ghost"} 
                    size="sm" 
                    className={`rounded-none border-x ${viewMode === "calendar" ? "bg-[#1EAEDB] hover:bg-[#1EAEDB]/90" : ""}`}
                    onClick={() => setViewMode("calendar")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </Button>
                  <Button 
                    variant={viewMode === "map" ? "default" : "ghost"} 
                    size="sm" 
                    className={`rounded-l-none ${viewMode === "map" ? "bg-[#1EAEDB] hover:bg-[#1EAEDB]/90" : ""}`}
                    onClick={() => setViewMode("map")}
                  >
                    <Map className="h-4 w-4 mr-2" />
                    Map
                  </Button>
                </div>
                
                <div className="flex items-center rounded-lg border shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
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
                
                <Button variant="outline" size="sm" className="shadow-sm bg-white/50 backdrop-blur-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              <Dialog open={isCreatingJob} onOpenChange={setIsCreatingJob}>
                <DialogTrigger asChild>
                  <Button className="whitespace-nowrap shadow-sm bg-gradient-to-r from-[#1EAEDB] to-blue-600 hover:from-[#1EAEDB]/90 hover:to-blue-600/90 text-white">
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
        </motion.div>
        
        {/* Main Content Area - Changes based on viewMode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
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
        </motion.div>
      </div>
    </MainLayout>
  );
}
