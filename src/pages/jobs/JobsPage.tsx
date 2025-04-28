
import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { useJobs } from '@/hooks/use-jobs';
import JobsList from './components/JobsList';
import JobCreation from './components/JobCreation';
import JobsGrid from './components/jobs-list/JobsGrid';
import { Card } from '@/components/ui/card';
import { JobsHeader } from './components/jobs-header/JobsHeader';
import { JobsStatistics } from './components/stats/JobsStatistics';
import { JobsFilters } from './components/filters/JobsFilters';

export default function JobsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { jobs, isLoading, error, refetch } = useJobs();

  const handleCreateJobClick = () => {
    setShowCreateModal(true);
  };

  const filteredJobs = jobs && filterStatus !== 'all' 
    ? jobs.filter(job => job.status === filterStatus) 
    : jobs;

  const jobStatusCounts = jobs ? jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) : {};

  if (error) {
    return (
      <MainLayout title="Jobs">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="flex items-center justify-center h-full"
        >
          <Card className="p-6 max-w-lg w-full bg-destructive/10 border-destructive">
            <p className="text-destructive font-medium text-center">Error loading jobs: {error.message}</p>
          </Card>
        </motion.div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Jobs">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <JobsHeader onCreateJob={handleCreateJobClick} onRefresh={refetch} />
        <JobsStatistics jobs={jobs} jobStatusCounts={jobStatusCounts} />
        
        <div className="bg-gradient-to-br from-aximo-dark to-aximo-darker border border-aximo-border rounded-lg p-6 shadow-lg backdrop-blur-sm">
          <JobsFilters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'list' ? (
              <JobsList jobs={filteredJobs || []} isLoading={isLoading} />
            ) : (
              <JobsGrid jobs={filteredJobs || []} isLoading={isLoading} />
            )}
          </motion.div>
        </div>
      </motion.div>
      
      {showCreateModal && (
        <JobCreation
          onComplete={() => setShowCreateModal(false)}
        />
      )}
    </MainLayout>
  );
}
