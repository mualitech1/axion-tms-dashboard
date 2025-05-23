import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClockIcon, ArrowUpIcon, AlertTriangleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { JobStatus as JobStatusType } from '@/pages/jobs/types/jobTypes';

// Import refactored components
import { StatusHeader } from "./status-card/StatusHeader";
import { IssuesAlert } from "./status-card/IssuesAlert";
import { PodStatus } from "./status-card/PodStatus";
import { RateConfirmation } from "./status-card/RateConfirmation";
import { JobLifecycleViewer } from "./JobLifecycleViewer";
import { JobStatusUpdate } from "./JobStatusUpdate";

type JobPriority = 'low' | 'medium' | 'high';

interface JobStatusCardProps {
  status: string;
  priority: string;
  time?: string;
  jobId: string; // Changed from number to string to handle text-based IDs
}

export function JobStatusCard({ status, priority, time, jobId }: JobStatusCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Convert status to known status type or default to "booked"
  const normalizedStatus = ((): JobStatusType => {
    const validStatuses: JobStatusType[] = [
      "booked", "allocated", "in-progress", "finished", 
      "invoiced", "cleared", "completed", "archived", "issues"
    ];
    
    if (status && validStatuses.includes(status as JobStatusType)) {
      return status as JobStatusType;
    }
    
    // Map legacy statuses
    switch(status?.toLowerCase()) {
      case 'pending': return 'booked';
      case 'cancelled': return 'archived';
      default: return 'booked';
    }
  })();
  
  // Normalize priority to valid type
  const normalizedPriority = ((): JobPriority => {
    if (priority && ['low', 'medium', 'high'].includes(priority.toLowerCase())) {
      return priority.toLowerCase() as JobPriority;
    }
    return 'medium';
  })();
  
  // Mutation to update job status
  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      setIsUpdating(true);
      const { data, error } = await supabase
        .from('jobs')
        .update({ status: newStatus })
        .eq('id', jobId)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      toast({
        title: 'Status Updated',
        description: 'The job status has been updated successfully.',
      });
    },
    onError: (error) => {
      console.error('Error updating job status:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update job status. Please try again.',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setIsUpdating(false);
    }
  });
  
  // Handle status update
  const handleStatusUpdate = (newStatus: string) => {
    updateStatusMutation.mutate(newStatus);
  };
  
  const [currentStatus, setCurrentStatus] = useState<JobStatusType>(normalizedStatus);
  const [podUploaded, setPodUploaded] = useState(false);
  
  const handleStatusChange = (newStatus: JobStatusType) => {
    setCurrentStatus(newStatus);
    
    // If status is now invoiced, we could trigger additional actions
    if (newStatus === "invoiced") {
      // In a real app, this would generate an invoice
      console.log("Should generate invoice for job:", jobId);
    }
    
    // Update in database
    handleStatusUpdate(newStatus);
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
        priority={normalizedPriority} 
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
      
      {/* Rate confirmation section - only show for relevant statuses */}
      {['finished', 'invoiced', 'completed'].includes(currentStatus) && (
        <RateConfirmation 
          currentStatus={currentStatus}
          initialRateConfirmed={currentStatus === "completed"} 
        />
      )}
    </Card>
  );
}
