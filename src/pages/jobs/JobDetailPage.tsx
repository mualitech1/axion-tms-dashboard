
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockJobs, getTimeFromDate } from "./components/jobs-list/mockJobData";
import { JobDetailHeader } from "./components/job-detail/JobDetailHeader";
import { JobStatusCard } from "./components/job-detail/JobStatusCard";
import { JobDetailsTab } from "./components/job-detail/JobDetailsTab";
import { JobBackofficeTab } from "./components/job-detail/JobBackofficeTab";
import { JobDocumentsTab } from "./components/job-detail/JobDocumentsTab";
import { JobAssignmentInfo } from "./components/job-detail/JobAssignmentInfo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileCheck } from "lucide-react";

// Define job status as a union type for proper type checking
type JobStatus = "in-progress" | "scheduled" | "completed" | "ready-for-invoicing";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const jobId = parseInt(id || "0");
  
  // Find the job from mock data - in a real app, this would be an API call
  const job = mockJobs.find(j => j.id === jobId) || mockJobs[0]; // Fallback to first job if not found
  
  // Get formatted time from the date string
  const jobTime = getTimeFromDate(job.date);
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("details");
  
  // State for job status
  const [jobStatus, setJobStatus] = useState<JobStatus>(job.status as JobStatus);
  
  // State to track document upload status
  const [documentsUploaded, setDocumentsUploaded] = useState(false);
  const [rateConfirmed, setRateConfirmed] = useState(false);
  
  // Check document upload status when tab changes or when uploads happen
  useEffect(() => {
    // This would be an API call in a real application
    // For now we'll simulate checking if documents exist
    const hasDocuments = localStorage.getItem(`job-${jobId}-documents`) === 'true';
    setDocumentsUploaded(hasDocuments);
  }, [jobId, activeTab]);
  
  // Update rate confirmation status
  useEffect(() => {
    const isCompleted = jobStatus === "completed" || jobStatus === "ready-for-invoicing";
    setRateConfirmed(isCompleted);
  }, [jobStatus]);
  
  const handleStatusChange = (newStatus: JobStatus) => {
    setJobStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Job status has been updated to ${newStatus}`,
    });
  };

  const handleMarkReadyForInvoicing = () => {
    setJobStatus("ready-for-invoicing");
    toast({
      title: "Ready for Invoicing",
      description: "This job has been marked as ready for invoicing",
    });
  };

  const canMarkReadyForInvoicing = jobStatus === "completed" && documentsUploaded && rateConfirmed;
  
  // Create a boolean variable to check if the job is completed or ready for invoicing
  // This will help avoid TypeScript's strict literal type checking issues
  const isCompleted = (jobStatus === "completed" || jobStatus === "ready-for-invoicing") as boolean;
  
  return (
    <MainLayout title="Job Details">
      <JobDetailHeader jobId={jobId} title={job.title} client={job.client} />
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Job status card */}
        <JobStatusCard 
          status={jobStatus}
          priority={job.priority}
          time={jobTime}
          jobId={jobId}
        />
        
        {/* Main content area */}
        <div className="md:col-span-2">
          <Card className="p-5 bg-white h-full">
            {/* Status change controls for completed jobs */}
            {jobStatus === "completed" && (
              <div className="mb-4 p-3 border rounded-md bg-blue-50">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="text-sm font-medium">Job Completed</h3>
                      <p className="text-xs text-muted-foreground">
                        This job is completed. You can now prepare it for invoicing.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline" 
                      size="sm"
                      disabled={!canMarkReadyForInvoicing}
                      onClick={handleMarkReadyForInvoicing}
                      className={canMarkReadyForInvoicing ? "border-green-300 hover:bg-green-50" : ""}
                    >
                      Mark Ready for Invoicing
                    </Button>
                    
                    <Select value={jobStatus} onValueChange={(value: JobStatus) => handleStatusChange(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="ready-for-invoicing">Ready for Invoicing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${documentsUploaded ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-xs">Required Documents Uploaded</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${rateConfirmed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-xs">Rate Confirmed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${jobStatus === "ready-for-invoicing" ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-xs">Ready for Invoicing</span>
                  </div>
                </div>
              </div>
            )}
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="backoffice">Backoffice</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <JobDetailsTab />
              </TabsContent>
              
              <TabsContent value="backoffice">
                <JobBackofficeTab />
              </TabsContent>
              
              <TabsContent value="documents">
                <JobDocumentsTab 
                  jobId={jobId}
                  onDocumentsUploaded={() => {
                    setDocumentsUploaded(true);
                    localStorage.setItem(`job-${jobId}-documents`, 'true');
                  }}
                  isCompleted={isCompleted}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="md:col-span-1">
          <JobAssignmentInfo />
        </div>
      </div>
    </MainLayout>
  );
}
