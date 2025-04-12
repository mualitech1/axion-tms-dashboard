
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type Vehicle = {
  id: number;
  name: string;
  type: string;
  status: "available" | "maintenance" | "in-use";
};

type Job = {
  id: number;
  title: string;
  client: string;
  status: "scheduled" | "in-progress" | "pending";
  assignedTo?: number;
  timeSlot?: number;
};

// Mock time slots for the scheduler
const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

// Mock vehicles
const mockVehicles: Vehicle[] = [
  { id: 1, name: "Truck 101", type: "Flatbed", status: "available" },
  { id: 2, name: "Van 202", type: "Cargo", status: "available" },
  { id: 3, name: "Truck 303", type: "Refrigerated", status: "maintenance" },
  { id: 4, name: "Truck 404", type: "Box", status: "available" }
];

// Mock jobs
const initialJobs: Job[] = [
  { id: 1, title: "Delivery to Downtown Storage", client: "Storage Co.", status: "scheduled", assignedTo: 1, timeSlot: 2 },
  { id: 2, title: "Warehouse Pickup", client: "Tech Industries", status: "in-progress", assignedTo: 2, timeSlot: 1 },
  { id: 3, title: "Cross-city Transport", client: "Logistics Ltd", status: "pending" },
  { id: 4, title: "Equipment Delivery", client: "Construction Inc", status: "scheduled", assignedTo: 4, timeSlot: 4 },
];

export default function DragDropScheduler() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleDragStart = (job: Job) => {
    setDraggedJob(job);
  };

  const handleDrop = (vehicleId: number, timeSlotIndex: number) => {
    if (!draggedJob) return;
    
    // Check if the vehicle is available
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle?.status !== "available") {
      toast({
        title: "Cannot assign job",
        description: "This vehicle is not available for scheduling",
        variant: "destructive"
      });
      return;
    }
    
    // Update the job assignment
    const updatedJobs = jobs.map(job => {
      if (job.id === draggedJob.id) {
        return { 
          ...job, 
          assignedTo: vehicleId, 
          timeSlot: timeSlotIndex, 
          status: "scheduled" as const
        };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    setDraggedJob(null);
    
    toast({
      title: "Job Scheduled",
      description: `${draggedJob.title} has been scheduled to ${vehicle.name} at ${timeSlots[timeSlotIndex]}`,
    });
  };

  const getJobForCell = (vehicleId: number, timeSlotIndex: number) => {
    return jobs.find(job => job.assignedTo === vehicleId && job.timeSlot === timeSlotIndex);
  };

  return (
    <Card className="p-3 md:p-6 overflow-auto bg-white shadow-md border-0">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Truck className="h-5 w-5 text-tms-blue" />
        Interactive Scheduler
      </h3>
      
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} mb-6 ${isMobile ? 'space-y-4' : 'space-x-4'}`}>
        <div className={`border rounded-md p-3 md:p-4 ${isMobile ? 'w-full' : 'w-1/3'} bg-muted/30`}>
          <h4 className="font-medium mb-2 text-tms-blue">Unassigned Jobs</h4>
          <div className="space-y-2">
            {jobs.filter(job => !job.assignedTo).map(job => (
              <div 
                key={job.id}
                className="p-3 bg-white rounded-md cursor-move border border-border shadow-sm hover:shadow-md transition-shadow"
                draggable
                onDragStart={() => handleDragStart(job)}
              >
                <p className="font-medium text-tms-gray-800 text-sm md:text-base">{job.title}</p>
                <p className="text-xs md:text-sm text-tms-gray-600">{job.client}</p>
                <Badge variant={job.status === "pending" ? "outline" : "secondary"} className="mt-2 text-xs">
                  {job.status}
                </Badge>
              </div>
            ))}
            {jobs.filter(job => !job.assignedTo).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No unassigned jobs</p>
                <p className="text-xs mt-1">All jobs have been scheduled</p>
              </div>
            )}
          </div>
        </div>
        
        <div className={`${isMobile ? 'w-full' : 'w-2/3'} border rounded-md bg-white shadow-sm overflow-x-auto`}>
          {isMobile ? (
            <div className="p-3">
              <p className="text-center text-sm text-muted-foreground mb-2">Swipe horizontally to view all time slots</p>
              <div className="overflow-x-auto pb-2">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[120px] font-medium text-xs md:text-sm">Vehicle</TableHead>
                      {timeSlots.map((slot, index) => (
                        <TableHead key={index} className="text-center font-medium text-xs whitespace-nowrap">{slot}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map(vehicle => (
                      <TableRow key={vehicle.id} className="hover:bg-muted/20">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-1">
                            {vehicle.status === "maintenance" ? (
                              <AlertCircle className="h-3 w-3 text-red-500" />
                            ) : (
                              <Truck className="h-3 w-3 text-tms-blue" />
                            )}
                            <div>
                              <span className="block text-xs">{vehicle.name}</span>
                              <span className="text-[10px] text-muted-foreground block">
                                {vehicle.type}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        
                        {timeSlots.map((_, timeSlotIndex) => {
                          const job = getJobForCell(vehicle.id, timeSlotIndex);
                          
                          return (
                            <TableCell 
                              key={timeSlotIndex}
                              className={`p-1 min-h-[50px] min-w-[80px] ${
                                vehicle.status === "available" 
                                  ? "bg-muted/30 hover:bg-muted/40 transition-colors" 
                                  : "bg-muted/10"
                              } border border-border/30`}
                              onDragOver={(e) => vehicle.status === "available" && e.preventDefault()}
                              onDrop={() => handleDrop(vehicle.id, timeSlotIndex)}
                            >
                              {job && (
                                <div 
                                  className="p-1 bg-white border rounded-md text-[10px] shadow-sm hover:shadow-md transition-shadow"
                                  draggable
                                  onDragStart={() => handleDragStart(job)}
                                >
                                  <p className="font-medium truncate max-w-[70px]">{job.title}</p>
                                  <p className="text-tms-gray-600 text-[8px] truncate">{job.client}</p>
                                  <Badge variant="outline" className="mt-1 text-[8px] py-0 px-1">
                                    {job.status}
                                  </Badge>
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[150px] font-medium">Vehicle</TableHead>
                  {timeSlots.map((slot, index) => (
                    <TableHead key={index} className="text-center font-medium">{slot}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map(vehicle => (
                  <TableRow key={vehicle.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {vehicle.status === "maintenance" ? (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <Truck className="h-4 w-4 text-tms-blue" />
                        )}
                        <div>
                          <span className="block">{vehicle.name}</span>
                          <span className="text-xs text-muted-foreground block">
                            {vehicle.type}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    
                    {timeSlots.map((_, timeSlotIndex) => {
                      const job = getJobForCell(vehicle.id, timeSlotIndex);
                      
                      return (
                        <TableCell 
                          key={timeSlotIndex}
                          className={`p-1 min-h-[60px] ${
                            vehicle.status === "available" 
                              ? "bg-muted/30 hover:bg-muted/40 transition-colors" 
                              : "bg-muted/10"
                          } border border-border/30`}
                          onDragOver={(e) => vehicle.status === "available" && e.preventDefault()}
                          onDrop={() => handleDrop(vehicle.id, timeSlotIndex)}
                        >
                          {job && (
                            <div 
                              className="p-2 bg-white border rounded-md text-xs shadow-sm hover:shadow-md transition-shadow"
                              draggable
                              onDragStart={() => handleDragStart(job)}
                            >
                              <p className="font-medium truncate max-w-[100px]">{job.title}</p>
                              <p className="text-tms-gray-600 text-[10px] truncate">{job.client}</p>
                              <Badge variant="outline" className="mt-1 text-[10px]">
                                {job.status}
                              </Badge>
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      
      <div className="text-xs md:text-sm text-muted-foreground bg-muted/20 p-2 md:p-3 rounded-md">
        <p className="flex items-center gap-2">
          <AlertCircle className="h-3 md:h-4 w-3 md:w-4" />
          Drag unassigned jobs to the schedule grid to assign them to vehicles and time slots.
        </p>
      </div>
    </Card>
  );
}
