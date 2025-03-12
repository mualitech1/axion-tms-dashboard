
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
        return { ...job, assignedTo: vehicleId, timeSlot: timeSlotIndex, status: "scheduled" };
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
    <Card className="p-6 overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Drag & Drop Scheduler</h3>
      
      <div className="flex mb-6 space-x-4">
        <div className="border rounded-md p-4 w-1/3">
          <h4 className="font-medium mb-2">Unassigned Jobs</h4>
          <div className="space-y-2">
            {jobs.filter(job => !job.assignedTo).map(job => (
              <div 
                key={job.id}
                className="p-2 bg-accent rounded-md cursor-move"
                draggable
                onDragStart={() => handleDragStart(job)}
              >
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.client}</p>
                <Badge variant="outline">{job.status}</Badge>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Vehicle</TableHead>
                {timeSlots.map((slot, index) => (
                  <TableHead key={index}>{slot}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map(vehicle => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {vehicle.status === "maintenance" ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Truck className="h-4 w-4 text-tms-blue" />
                      )}
                      <span>{vehicle.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground block">
                      {vehicle.type}
                    </span>
                  </TableCell>
                  
                  {timeSlots.map((_, timeSlotIndex) => {
                    const job = getJobForCell(vehicle.id, timeSlotIndex);
                    
                    return (
                      <TableCell 
                        key={timeSlotIndex}
                        className={`p-1 min-h-[60px] ${vehicle.status === "available" ? "bg-muted/30" : "bg-muted/10"}`}
                        onDragOver={(e) => vehicle.status === "available" && e.preventDefault()}
                        onDrop={() => handleDrop(vehicle.id, timeSlotIndex)}
                      >
                        {job && (
                          <div 
                            className="p-2 bg-card border rounded-md text-xs"
                            draggable
                            onDragStart={() => handleDragStart(job)}
                          >
                            <p className="font-medium truncate max-w-[100px]">{job.title}</p>
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
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Drag unassigned jobs to the schedule grid to assign them to vehicles and time slots.</p>
      </div>
    </Card>
  );
}
