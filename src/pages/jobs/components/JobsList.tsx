
import { Job } from '@/types/database';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

interface JobsListProps {
  jobs: Job[];
  isLoading: boolean;
}

export default function JobsList({ jobs, isLoading }: JobsListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Pickup Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Carrier</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow 
            key={job.id}
            className="cursor-pointer hover:bg-muted"
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <TableCell>{job.reference}</TableCell>
            <TableCell>{job.title}</TableCell>
            <TableCell>{job.status}</TableCell>
            <TableCell>{job.priority}</TableCell>
            <TableCell>{format(new Date(job.pickup_date), 'PPP')}</TableCell>
            <TableCell>{job.customer?.name || 'Unassigned'}</TableCell>
            <TableCell>{job.carrier?.name || 'Unassigned'}</TableCell>
          </TableRow>
        ))}
        {jobs.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              No jobs found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
