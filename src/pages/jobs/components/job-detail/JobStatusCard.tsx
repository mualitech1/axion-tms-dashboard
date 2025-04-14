
import { Truck, Calendar, FileText, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { JobStatus } from "../../types/jobTypes";
import { JobStatusUpdate } from "./JobStatusUpdate";
import { getStatusColor } from "../../utils/jobStatusUtils";
import { PodUploadDialog } from "./PodUploadDialog";
import { JobLifecycleViewer } from "./JobLifecycleViewer";

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
  const [rateConfirmed, setRateConfirmed] = useState(isJobCompleted(currentStatus));
  const [podUploaded, setPodUploaded] = useState(false);
  const [showPodUpload, setShowPodUpload] = useState(false);
  
  useEffect(() => {
    setRateConfirmed(isJobCompleted(currentStatus));
  }, [currentStatus]);
  
  const handleStatusChange = (newStatus: JobStatus) => {
    setCurrentStatus(newStatus);
    
    // If status is now invoiced, we could trigger additional actions
    if (newStatus === "invoiced") {
      // In a real app, this would generate an invoice
      console.log("Should generate invoice for job:", jobId);
    }
  };
  
  const handleConfirmRate = () => {
    setRateConfirmed(true);
    toast({
      title: "Rate confirmed",
      description: "The final rate has been confirmed for this job."
    });
  };

  const handlePodUploaded = () => {
    setPodUploaded(true);
    toast({
      title: "POD uploaded",
      description: "Proof of Delivery document has been uploaded successfully."
    });
  };
  
  const isCompleted = isJobCompleted(currentStatus);
  const hasIssues = currentStatus === "issues";
  
  return (
    <Card className="p-5 md:col-span-3 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted/50 p-3 rounded-full">
            <Truck className="h-6 w-6 text-tms-blue" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline"
                className={`capitalize text-sm ${getStatusColor(currentStatus)}`}
              >
                {currentStatus.replace('-', ' ')}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-sm
                  ${priority === "high" ? "bg-red-50 text-red-700 border-red-200" : 
                    priority === "medium" ? "bg-orange-50 text-orange-700 border-orange-200" : 
                    "bg-blue-50 text-blue-700 border-blue-200"}
                `}
              >
                {priority} priority
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="border-r pr-3">
            <p className="text-xs text-muted-foreground">Scheduled for</p>
            <p className="flex items-center text-sm font-medium">
              <Calendar className="h-3.5 w-3.5 mr-1 text-tms-blue" />
              {time}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Reference</p>
            <p className="flex items-center text-sm font-medium">
              <FileText className="h-3.5 w-3.5 mr-1 text-tms-blue" />
              IKB-{jobId}-{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
      
      {/* Issues Alert */}
      {hasIssues && (
        <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <p className="text-sm font-medium text-red-800">
              This job has issues that need attention
            </p>
          </div>
          <p className="mt-1 text-xs text-red-700">
            Please review and resolve the issues to continue with the job.
          </p>
        </div>
      )}
      
      {/* POD Status for Finished Jobs */}
      {currentStatus === "finished" && (
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm font-medium">Proof of Delivery</p>
                <p className="text-xs text-muted-foreground">Upload POD to proceed with invoicing</p>
              </div>
            </div>
            
            <div>
              {podUploaded ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>POD Uploaded</span>
                </Badge>
              ) : (
                <Button 
                  size="sm"
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={() => setShowPodUpload(true)}
                >
                  Upload POD
                </Button>
              )}
            </div>
          </div>
        </div>
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
      <div className="mt-4 pt-3 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-tms-blue" />
            <div>
              <p className="text-sm font-medium">Rate Confirmation</p>
              <p className="text-xs text-muted-foreground">Confirm the final rate for invoicing</p>
            </div>
          </div>
          
          <div>
            {rateConfirmed ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Rate Confirmed
              </Badge>
            ) : (
              <Button 
                size="sm"
                variant="outline" 
                disabled={!isCompleted && currentStatus !== "invoiced"}
                onClick={handleConfirmRate}
              >
                Confirm Final Rate
              </Button>
            )}
          </div>
        </div>
        
        {rateConfirmed && (
          <div className="mt-2 p-2 bg-muted/30 rounded-md border">
            <div className="flex justify-between items-center text-sm">
              <span>Base Rate:</span>
              <span className="font-medium">£450.00</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span>Extra Charges:</span>
              <span className="font-medium">£35.00</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1 pt-1 border-t">
              <span>Final Rate:</span>
              <span className="font-medium">£485.00</span>
            </div>
          </div>
        )}
      </div>

      {/* POD Upload Dialog */}
      {showPodUpload && (
        <PodUploadDialog 
          jobId={jobId}
          open={showPodUpload}
          onClose={() => setShowPodUpload(false)}
          onUploadComplete={handlePodUploaded}
        />
      )}
    </Card>
  );
}
