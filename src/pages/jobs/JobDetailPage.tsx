
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { mockJobs } from "./components/jobs-list/mockJobData";
import { JobDetailHeader } from "./components/job-detail/JobDetailHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobDetailsTab } from "./components/job-detail/JobDetailsTab";
import { JobBackofficeTab } from "./components/job-detail/JobBackofficeTab";
import { JobDocumentsTab } from "./components/job-detail/JobDocumentsTab";
import { JobAssignmentInfo } from "./components/job-detail/JobAssignmentInfo";
import { JobStatusCard } from "./components/job-detail/JobStatusCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any | null>(null);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (id) {
      const jobId = parseInt(id, 10);
      const foundJob = mockJobs.find(j => j.id === jobId);
      if (foundJob) {
        setJob(foundJob);
      }
    }
  }, [id]);
  
  const handleDocumentsUploaded = () => {
    setDocumentsUploaded(true);
    toast({
      title: "Documents uploaded",
      description: "All documents have been successfully uploaded.",
    });
  };
  
  // Determine if the job is completed based on status
  const isJobCompleted = job?.status === "completed" || job?.status === "ready-for-invoicing";
  
  if (!job) {
    return (
      <MainLayout title="Job Details">
        <div className="p-4 md:p-8 text-center">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Job not found</h2>
          <p className="text-muted-foreground">The requested job could not be found.</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title={`Job #${job.id}`}>
      <div className="space-y-4 md:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <JobDetailHeader jobId={job.id} title={job.title} client={job.client} />
        </motion.div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-4 md:gap-6`}>
          <motion.div 
            className={`${isMobile ? '' : 'md:col-span-2'} space-y-4 md:space-y-6`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-white to-blue-50/30 border-[#1EAEDB]/20">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className={`grid grid-cols-3 bg-muted/40 rounded-none border-b overflow-x-auto scrollbar-none ${isMobile ? 'text-xs' : ''}`}>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="backoffice">Back Office</TabsTrigger>
                </TabsList>
                <div className="p-3 md:p-4">
                  <TabsContent value="details" className="mt-0 space-y-4">
                    <JobDetailsTab />
                  </TabsContent>
                  <TabsContent value="documents" className="mt-0">
                    <JobDocumentsTab 
                      jobId={job.id}
                      onDocumentsUploaded={handleDocumentsUploaded}
                      isCompleted={isJobCompleted}
                    />
                  </TabsContent>
                  <TabsContent value="backoffice" className="mt-0">
                    <JobBackofficeTab />
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
            
            {/* Collection Reference Box for Additional Comments */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-3 md:p-4 border-[#1EAEDB]/20 bg-gradient-to-br from-white to-blue-50/30">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 md:h-5 w-4 md:w-5 text-[#1EAEDB]" />
                  <h3 className="font-medium text-sm md:text-base">Collection Reference Notes</h3>
                </div>
                
                <Separator className="mb-3 md:mb-4" />
                
                <div className="space-y-2 md:space-y-3">
                  <div className="bg-white/60 p-2 md:p-3 rounded-md border border-[#1EAEDB]/10 shadow-sm">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                      <span className="font-medium text-gray-700">Collection Reference:</span> ABC-9876-COL
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Customer requested notification 30 minutes before arrival. Security code for gate: 4872.
                    </p>
                  </div>
                  
                  <div className="bg-white/60 p-2 md:p-3 rounded-md border border-[#1EAEDB]/10 shadow-sm">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                      <span className="font-medium text-gray-700">Delivery Reference:</span> XYZ-1234-DEL
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Delivery location has height restriction (4.2m). Unloading bay #3 is reserved.
                    </p>
                  </div>
                  
                  <div className="bg-white/60 p-2 md:p-3 rounded-md border border-[#1EAEDB]/10 shadow-sm">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                      <span className="font-medium text-gray-700">Additional Instructions:</span>
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Fragile items on pallet #2 - handle with care. Contact Sarah Johnson (07892 123456) with any issues during collection or delivery.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <JobStatusCard 
              status={job.status} 
              priority={job.priority || "medium"} 
              time={job.date} 
              jobId={job.id}
            />
            <JobAssignmentInfo />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
