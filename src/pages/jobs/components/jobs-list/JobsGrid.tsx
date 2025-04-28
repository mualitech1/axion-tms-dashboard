
import { Job } from '../../types/jobTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar, MapPin, Truck } from 'lucide-react';

interface JobsGridProps {
  jobs: Job[];
  isLoading: boolean;
}

export default function JobsGrid({ jobs, isLoading }: JobsGridProps) {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    const statusColors = {
      'booked': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'allocated': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      'in-progress': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      'finished': 'bg-teal-500/10 text-teal-500 border-teal-500/20',
      'invoiced': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      'cleared': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      'completed': 'bg-green-500/10 text-green-500 border-green-500/20',
      'archived': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
      'issues': 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }
  
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-aximo-darker/30 rounded-lg border border-aximo-border">
        <div className="bg-aximo-primary/10 p-4 rounded-full mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-aximo-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-aximo-text mb-1">No jobs found</h3>
        <p className="text-sm text-aximo-text-secondary">
          No jobs match your current filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {jobs.map((job, index) => (
        <motion.div 
          key={job.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-aximo-darker border border-aximo-border rounded-lg overflow-hidden hover:border-aximo-primary/50 transition-colors duration-300 cursor-pointer"
          onClick={() => navigate(`/jobs/${job.id}`)}
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-aximo-text truncate mr-2" title={job.title}>
                {job.title}
              </h3>
              <Badge 
                variant="outline" 
                className={`capitalize whitespace-nowrap ${getStatusColor(job.status)}`}
              >
                {job.status.replace('-', ' ')}
              </Badge>
            </div>
            
            <div className="text-sm text-aximo-text-secondary mb-3 flex items-center">
              <span className="truncate flex-grow">{job.client}</span>
              <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 ml-1" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-aximo-text-secondary" />
                <span className="text-aximo-text">{job.date} {job.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 mr-2 text-aximo-text-secondary" />
                <span className="text-aximo-text truncate" title={job.vehicle}>{job.vehicle}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-aximo-text-secondary" />
                <div className="flex items-center truncate">
                  <span className="text-aximo-text truncate" title={job.origin}>{job.origin}</span>
                  <span className="mx-1">→</span>
                  <span className="text-aximo-text truncate" title={job.destination}>{job.destination}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-2 border-t border-aximo-border bg-aximo-dark/30 flex justify-between items-center">
            <div>
              <span className="text-xs text-aximo-text-secondary">Ref: {job.reference}</span>
            </div>
            <Badge 
              variant="outline" 
              className={`capitalize text-xs ${job.priority === 'high' 
                ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                : job.priority === 'medium' 
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                  : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}
            >
              {job.priority}
            </Badge>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
