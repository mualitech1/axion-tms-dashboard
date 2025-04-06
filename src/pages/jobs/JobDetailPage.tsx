
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockJobs } from "./components/jobs-list/mockJobData";
import { JobDetailHeader } from "./components/job-detail/JobDetailHeader";
import { JobStatusCard } from "./components/job-detail/JobStatusCard";
import { JobDetailsTab } from "./components/job-detail/JobDetailsTab";
import { JobBackofficeTab } from "./components/job-detail/JobBackofficeTab";
import { JobDocumentsTab } from "./components/job-detail/JobDocumentsTab";
import { JobAssignmentInfo } from "./components/job-detail/JobAssignmentInfo";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const jobId = parseInt(id || "0");
  
  // Find the job from mock data - in a real app, this would be an API call
  const job = mockJobs.find(j => j.id === jobId) || mockJobs[0]; // Fallback to first job if not found
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("details");
  
  return (
    <MainLayout title="Job Details">
      <JobDetailHeader jobId={jobId} title={job.title} client={job.client} />
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Job status card */}
        <JobStatusCard 
          status={job.status}
          priority={job.priority}
          time={job.time}
          jobId={jobId}
        />
        
        {/* Main content area */}
        <div className="md:col-span-2">
          <Card className="p-5 bg-white h-full">
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
                <JobDocumentsTab />
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
