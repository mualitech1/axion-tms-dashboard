
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useJobs } from '@/hooks/use-jobs';
import JobsList from './components/JobsList';
import JobCreation from './components/JobCreation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function JobsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { jobs, isLoading, error } = useJobs();

  if (error) {
    return (
      <MainLayout title="Jobs">
        <div className="flex items-center justify-center h-full">
          <p className="text-destructive">Error loading jobs: {error.message}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Jobs">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Job
        </Button>
      </div>

      <JobsList jobs={jobs || []} isLoading={isLoading} />
      
      {showCreateModal && (
        <JobCreation
          onComplete={() => setShowCreateModal(false)}
        />
      )}
    </MainLayout>
  );
}
