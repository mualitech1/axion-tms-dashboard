import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle,
  ArrowRight,
  Clipboard,
  FileCheck,
  FileText,
  Truck,
  UserCheck,
  CheckCircle,
  Archive,
  Upload
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  JobStatus, 
  StatusTransition 
} from "../../types/jobTypes";
import { 
  getStatusLabel, 
  getStatusColor, 
  getPossibleTransitions,
  transitionJobStatus,
  isPodRequired
} from "../../utils/jobStatusUtils";
import { PodUploadDialog } from "./PodUploadDialog";

interface JobStatusUpdateProps {
  jobId: string | number;
  status: JobStatus;
  onStatusChange: (status: JobStatus) => void;
}

export function JobStatusUpdate({ jobId, status, onStatusChange }: JobStatusUpdateProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPodUpload, setShowPodUpload] = useState(false);
  const [podUploaded, setPodUploaded] = useState(false);
  const possibleTransitions = getPossibleTransitions(status);

  const getStatusIcon = (status: JobStatus) => {
    switch(status) {
      case "booked": return <Clipboard className="h-4 w-4" />;
      case "allocated": return <UserCheck className="h-4 w-4" />;
      case "in-progress": return <Truck className="h-4 w-4" />;
      case "finished": return <FileCheck className="h-4 w-4" />;
      case "invoiced": return <FileText className="h-4 w-4" />;
      case "cleared": return <CheckCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "archived": return <Archive className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const handleStatusUpdate = (transition: StatusTransition) => {
    if (transition.actionType === "upload-pod") {
      // Open POD upload dialog instead of transitioning directly
      setShowPodUpload(true);
      return;
    }
    
    setIsUpdating(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const success = transitionJobStatus(
        status, 
        transition.to, 
        onStatusChange, 
        transition.from === "finished" ? podUploaded : undefined
      );
      
      setIsUpdating(false);
      
      if (!success) {
        console.error("Failed to update job status");
      }
    }, 500);
  };

  const handlePodUploaded = () => {
    setPodUploaded(true);
    setShowPodUpload(false);
    
    // Now we can transition to the next status
    const transition = possibleTransitions.find(t => t.actionType === "upload-pod");
    if (transition) {
      setTimeout(() => {
        transitionJobStatus(status, transition.to, onStatusChange, true);
      }, 500);
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500 mr-2">Current Status:</span>
          <Badge className={`${getStatusColor(status)} capitalize text-sm font-medium flex items-center gap-1.5`}>
            {getStatusIcon(status)}
            {getStatusLabel(status)}
          </Badge>
        </div>
        
        {/* Status Timeline Indicator */}
        <div className="hidden md:flex items-center text-xs text-gray-500 space-x-1">
          <span className={status === "booked" || status === "allocated" || status === "in-progress" || status === "finished" || status === "invoiced" || status === "cleared" || status === "completed" ? "text-blue-600 font-medium" : ""}>Booked</span>
          <ArrowRight className="h-3 w-3" />
          <span className={status === "allocated" || status === "in-progress" || status === "finished" || status === "invoiced" || status === "cleared" || status === "completed" ? "text-blue-600 font-medium" : ""}>Allocated</span>
          <ArrowRight className="h-3 w-3" />
          <span className={status === "in-progress" || status === "finished" || status === "invoiced" || status === "cleared" || status === "completed" ? "text-blue-600 font-medium" : ""}>In Progress</span>
          <ArrowRight className="h-3 w-3" />
          <span className={status === "finished" || status === "invoiced" || status === "cleared" || status === "completed" ? "text-blue-600 font-medium" : ""}>Finished</span>
          <ArrowRight className="h-3 w-3" />
          <span className={status === "invoiced" || status === "cleared" || status === "completed" ? "text-blue-600 font-medium" : ""}>Invoiced</span>
          <ArrowRight className="h-3 w-3" />
          <span className={status === "cleared" || status === "completed" ? "text-blue-600 font-medium" : ""}>Cleared</span>
          <ArrowRight className="h-3 w-3" />
          <span className={status === "completed" ? "text-blue-600 font-medium" : ""}>Completed</span>
        </div>
      </div>
      
      {/* POD requirement indicator for finished status */}
      {status === "finished" && !podUploaded && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-sm text-amber-800 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>Proof of Delivery (POD) document required before invoicing</span>
        </div>
      )}
      
      {status === "finished" && podUploaded && (
        <div className="bg-green-50 border border-green-200 rounded-md p-2 text-sm text-green-800 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>POD uploaded successfully. Ready for invoicing.</span>
        </div>
      )}
      
      {possibleTransitions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-sm font-medium text-gray-500 w-full">Next actions:</span>
          <TooltipProvider>
            {possibleTransitions.map((transition) => (
              <Tooltip key={transition.to}>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isUpdating}
                    className="flex items-center gap-1 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                    onClick={() => handleStatusUpdate(transition)}
                  >
                    {transition.actionType === "upload-pod" ? 
                      <Upload className="h-4 w-4" /> : 
                      getStatusIcon(transition.to)
                    }
                    <span>{transition.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change status to {getStatusLabel(transition.to)}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      )}
      
      {/* POD Upload Dialog */}
      {showPodUpload && (
        <PodUploadDialog 
          jobId={jobId} 
          open={showPodUpload} 
          onClose={() => setShowPodUpload(false)}
          onUploadComplete={handlePodUploaded}
        />
      )}
    </div>
  );
}
