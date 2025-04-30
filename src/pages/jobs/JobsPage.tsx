
import { useState } from 'react';
import { useJobs } from '@/hooks/use-job';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobsHeader } from './components/jobs-header/JobsHeader';
import JobsList from './components/JobsList';
import JobCreation from './components/JobCreation';
import { JobStatus } from '@/types/job';
import { motion } from 'framer-motion';

export default function JobsPage() {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [currentTab, setCurrentTab] = useState<JobStatus | 'all'>('all');
  
  // Use our improved hook with status filter
  const { 
    jobs, 
    isLoading, 
    error, 
    refetch,
    createJob 
  } = useJobs(currentTab !== 'all' ? { status: currentTab } : undefined);
  
  const handleCreateJob = () => {
    setShowCreateJob(true);
  };
  
  const handleJobCreationComplete = () => {
    setShowCreateJob(false);
    refetch();
  };
  
  // Convert our jobs to the format expected by JobsList
  const jobsForList = jobs?.map(job => ({
    ...job,
    id: typeof job.id === 'string' ? parseInt(job.id, 10) || job.id : job.id
  })) || [];
  
  // Filter jobs based on tab selection (fallback for when we're not using API filtering)
  const filteredJobs = currentTab === 'all' 
    ? jobsForList 
    : jobsForList.filter(job => job.status === currentTab);

  return (
    <MainLayout title="Jobs Management">
      {showCreateJob && (
        <JobCreation onComplete={handleJobCreationComplete} />
      )}
      
      <div className="container mx-auto space-y-6">
        <JobsHeader onCreateJob={handleCreateJob} onRefresh={refetch} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-aximo-card rounded-lg shadow-sm border border-aximo-border overflow-hidden"
        >
          <Tabs 
            defaultValue="all" 
            onValueChange={(value) => setCurrentTab(value as JobStatus | 'all')}
            className="w-full"
          >
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-5 w-full max-w-3xl bg-aximo-darker">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  All Jobs
                </TabsTrigger>
                <TabsTrigger 
                  value="booked"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  Booked
                </TabsTrigger>
                <TabsTrigger 
                  value="in-progress"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger 
                  value="completed"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger 
                  value="issues"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  Issues
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="p-4">
              <JobsList jobs={filteredJobs} isLoading={isLoading} />
            </TabsContent>
            
            {['booked', 'in-progress', 'completed', 'issues'].map((status) => (
              <TabsContent key={status} value={status} className="p-4">
                <JobsList jobs={filteredJobs} isLoading={isLoading} />
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading jobs</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error.message}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
