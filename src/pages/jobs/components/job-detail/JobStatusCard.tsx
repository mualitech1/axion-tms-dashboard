
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { JobStatus } from "../../types/jobTypes";
import { toast } from "@/hooks/use-toast";

// Import refactored components
import { StatusHeader } from "./status-card/StatusHeader";
import { IssuesAlert } from "./status-card/IssuesAlert";
import { PodStatus } from "./status-card/PodStatus";
import { RateConfirmation } from "./status-card/RateConfirmation";
import { JobLifecycleViewer } from "./JobLifecycleViewer";
import { JobStatusUpdate } from "./JobStatusUpdate";

interface JobStatusCardProps {
  status: JobStatus;
  priority: string;
  time: string;
  jobId: number;
}

export function JobStatusCard({ status, priority, time, jobId }: JobStatusCardProps) {
  // Helper function to safely check if status is completed or ready for invoicing
  const isJobCompleted = (status: JobStatus): boolean => {
    return status === "completed" || status === "archived";
  };
  
  const [currentStatus, setCurrentStatus] = useState<JobStatus>(status);
  const [podUploaded, setPodUploaded] = useState(false);
  
  useEffect(() => {
    // Update component when job status changes
  }, [currentStatus]);
  
  const handleStatusChange = (newStatus: JobStatus) => {
    setCurrentStatus(newStatus);
    
    // If status is now invoiced, we could trigger additional actions
    if (newStatus === "invoiced") {
      // In a real app, this would generate an invoice
      console.log("Should generate invoice for job:", jobId);
    }
  };

  const handlePodUploaded = () => {
    setPodUploaded(true);
    toast({
      title: "POD uploaded",
      description: "Proof of Delivery document has been uploaded successfully."
    });
  };
  
  const hasIssues = currentStatus === "issues";
  
  return (
    <Card className="p-5 md:col-span-3 bg-white">
      {/* Status Header */}
      <StatusHeader 
        status={currentStatus} 
        priority={priority} 
        time={time} 
        jobId={jobId} 
      />
      
      {/* Issues Alert */}
      {hasIssues && <IssuesAlert />}
      
      {/* POD Status for Finished Jobs */}
      {currentStatus === "finished" && (
        <PodStatus 
          jobId={jobId} 
          podUploaded={podUploaded} 
          onPodUploaded={handlePodUploaded} 
        />
      )}
      
      {/* Job Lifecycle Viewer */}
      <div className="mt-4 pt-3 border-t">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Job Lifecycle</p>
          <JobLifecycleViewer 
            jobId={jobId} 
            currentStatus={currentStatus} 
          />
        </div>
      </div>
      
      {/* Status Update Section */}
      <div className="mt-4 pt-3 border-t">
        <JobStatusUpdate 
          jobId={jobId}
          status={currentStatus}
          onStatusChange={handleStatusChange}
        />
      </div>
      
      {/* Rate confirmation section */}
      <RateConfirmation 
        currentStatus={currentStatus} 
        initialRateConfirmed={isJobCompleted(currentStatus)} 
      />
    </Card>
  );
}
