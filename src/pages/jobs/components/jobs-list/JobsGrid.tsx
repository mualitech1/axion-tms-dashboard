
import { Job } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';
import { JobCard } from './JobCard';
import { motion } from 'framer-motion';

interface JobsGridProps {
  jobs: Job[];
  isLoading: boolean;
}

export default function JobsGrid({ jobs, isLoading }: JobsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <JobCard job={{
              id: Number(job.id),
              title: job.title,
              client: job.customer?.name || 'Unassigned',
              date: job.pickup_date,
              time: new Date(job.pickup_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              origin: job.pickup_location.city,
              destination: job.delivery_location.city,
              vehicle: job.vehicle?.name || job.vehicle?.type || 'Unassigned',
              status: job.status as any,
              priority: (job.priority || 'medium') as any,
              createdAt: job.created_at || new Date().toISOString()
            }} />
          </motion.div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-aximo-primary/10 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-aximo-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-aximo-text mb-1">No jobs found</h3>
          <p className="text-sm text-aximo-text-secondary max-w-sm">
            No jobs match your current filter criteria. Try adjusting your filters or create a new job to get started.
          </p>
        </div>
      )}
    </div>
  );
}
