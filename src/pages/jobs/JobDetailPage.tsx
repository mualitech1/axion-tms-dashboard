
import { useParams, useNavigate } from 'react-router-dom';
import { useJob } from '@/hooks/use-job';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { JobStatusCard } from './components/job-detail/JobStatusCard';
import { motion } from 'framer-motion';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Use our improved hook
  const { job, isLoading, error } = useJob(id);
  
  const handleBack = () => {
    navigate('/jobs');
  };

  if (isLoading) {
    return (
      <MainLayout title="Job Details">
        <div className="flex items-center justify-center h-80">
          <Loader2 className="h-8 w-8 animate-spin text-aximo-primary" />
          <span className="ml-2 text-aximo-text">Loading job details...</span>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Job Details">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading job details</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
              </div>
              <div className="mt-4">
                <Button onClick={handleBack} size="sm">
                  Back to Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout title="Job Details">
        <div className="p-4">
          <Button onClick={handleBack} variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-lg font-semibold mb-2">Job Not Found</h2>
              <p className="text-aximo-text-secondary">The job you're looking for doesn't exist or has been removed.</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Job: ${job.title}`}>
      <div className="container mx-auto">
        <Button onClick={handleBack} variant="outline" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Job Title and Basic Info */}
            <div className="bg-white p-5 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-semibold">{job.title}</h1>
                  <p className="text-gray-500 text-sm mt-1">Reference: {job.reference || 'N/A'}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Delete</Button>
                </div>
              </div>
            </div>
            
            {/* Job Status Card */}
            <JobStatusCard 
              status={job.status} 
              priority={job.priority} 
              time={job.time} 
              jobId={Number(job.id)} 
            />
            
            {/* Job Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Information */}
              <Card className="p-5">
                <h2 className="font-medium text-gray-800 mb-3">Customer Information</h2>
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-gray-500">Customer:</span> {job.client}</p>
                  {job.hauler && (
                    <>
                      <p className="text-sm"><span className="text-gray-500">Carrier:</span> {job.hauler.name}</p>
                      {job.hauler.contactPhone && (
                        <p className="text-sm"><span className="text-gray-500">Contact:</span> {job.hauler.contactPhone}</p>
                      )}
                    </>
                  )}
                </div>
              </Card>
              
              {/* Location Details */}
              <Card className="p-5">
                <h2 className="font-medium text-gray-800 mb-3">Location Details</h2>
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-gray-500">Pickup:</span> {job.origin}</p>
                  <p className="text-sm"><span className="text-gray-500">Delivery:</span> {job.destination}</p>
                  <p className="text-sm"><span className="text-gray-500">Vehicle:</span> {job.vehicle}</p>
                  {job.estimatedDuration && (
                    <p className="text-sm"><span className="text-gray-500">Est. Duration:</span> {job.estimatedDuration} hours</p>
                  )}
                </div>
              </Card>
              
              {/* Additional Details */}
              <Card className="p-5">
                <h2 className="font-medium text-gray-800 mb-3">Additional Details</h2>
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-gray-500">Created:</span> {new Date(job.createdAt).toLocaleDateString()}</p>
                  {job.value && (
                    <p className="text-sm"><span className="text-gray-500">Value:</span> £{job.value.toFixed(2)}</p>
                  )}
                  {job.podUploaded && (
                    <p className="text-sm text-green-600">POD Document Uploaded</p>
                  )}
                </div>
              </Card>
            </div>
            
            {/* Notes Section */}
            {job.notes && (
              <Card className="p-5">
                <h2 className="font-medium text-gray-800 mb-3">Notes</h2>
                <p className="text-sm text-gray-600">{job.notes}</p>
              </Card>
            )}
            
            {/* Issue Details */}
            {job.issueDetails && (
              <Card className="p-5 border-red-200 bg-red-50">
                <h2 className="font-medium text-red-800 mb-3">Issue Details</h2>
                <p className="text-sm text-red-700">{job.issueDetails}</p>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
