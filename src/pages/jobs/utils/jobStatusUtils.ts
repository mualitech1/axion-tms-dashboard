
import { JobStatus, StatusTransition } from "../types/jobTypes";
import { toast } from "@/hooks/use-toast";

// Define the valid status transitions in the job lifecycle
export const statusTransitions: StatusTransition[] = [
  { from: "booked", to: "allocated", label: "Assign Hauler", requiresAction: true, actionType: "assign-hauler" },
  { from: "allocated", to: "in-progress", label: "Start Job", requiresAction: false },
  { from: "in-progress", to: "finished", label: "Mark as Finished", requiresAction: true, actionType: "confirm-completion" },
  { from: "finished", to: "invoiced", label: "Generate Invoice", requiresAction: true, actionType: "upload-pod" },
  { from: "invoiced", to: "cleared", label: "Mark as Paid", requiresAction: true, actionType: "confirm-payment" },
  { from: "cleared", to: "completed", label: "Complete Job", requiresAction: false },
  { from: "completed", to: "archived", label: "Archive", requiresAction: false },
];

// Helper function to get the next possible statuses
export const getNextStatus = (currentStatus: JobStatus): JobStatus | null => {
  const transition = statusTransitions.find(t => t.from === currentStatus);
  return transition ? transition.to : null;
};

// Helper function to get all possible transitions for a given status
export const getPossibleTransitions = (currentStatus: JobStatus): StatusTransition[] => {
  return statusTransitions.filter(t => t.from === currentStatus);
};

// Helper function to check if a transition is valid
export const isValidTransition = (from: JobStatus, to: JobStatus): boolean => {
  return statusTransitions.some(t => t.from === from && t.to === to);
};

// Helper function to check if POD is required for the current status
export const isPodRequired = (currentStatus: JobStatus): boolean => {
  return currentStatus === "finished";
};

// Helper function to transition job status with proper validation
export const transitionJobStatus = (
  currentStatus: JobStatus,
  newStatus: JobStatus,
  onSuccess?: (status: JobStatus) => void,
  hasPodUploaded: boolean = false
): boolean => {
  if (!isValidTransition(currentStatus, newStatus)) {
    toast({
      title: "Invalid status transition",
      description: `Cannot transition from ${currentStatus} to ${newStatus}`,
      variant: "destructive"
    });
    return false;
  }
  
  // Check if POD is required for this transition
  if (currentStatus === "finished" && newStatus === "invoiced" && !hasPodUploaded) {
    toast({
      title: "POD Required",
      description: "You must upload a Proof of Delivery (POD) document before generating an invoice.",
      variant: "destructive"
    });
    return false;
  }
  
  // If successfully validated, call the success callback
  if (onSuccess) {
    onSuccess(newStatus);
  }
  
  toast({
    title: "Status updated",
    description: `Job status changed to ${newStatus.replace('-', ' ')}`
  });
  
  // Check if the job should be auto-archived
  if (newStatus === "completed") {
    setTimeout(() => {
      if (onSuccess) {
        onSuccess("archived");
        toast({
          title: "Job archived",
          description: "Job has been automatically archived"
        });
      }
    }, 2000); // Small delay before auto-archiving
  }
  
  return true;
};

// Status display utilities
export const getStatusLabel = (status: JobStatus): string => {
  return status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const getStatusColor = (status: JobStatus): string => {
  switch(status) {
    case "booked":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "allocated":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "in-progress":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "finished":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "invoiced":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "cleared":
      return "bg-green-100 text-green-800 border-green-200";
    case "completed":
      return "bg-teal-100 text-teal-800 border-teal-200";
    case "archived":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
