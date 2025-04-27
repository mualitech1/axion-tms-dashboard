
import { Job } from '@/types/database';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';

interface JobsListProps {
  jobs: Job[];
  isLoading: boolean;
}

export default function JobsList({ jobs, isLoading }: JobsListProps) {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
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
    
    return (
      <Badge 
        variant="outline" 
        className={`capitalize ${statusColors[status as keyof typeof statusColors] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}
      >
        {status.replace('-', ' ')}
      </Badge>
    );
  };
  
  const getPriorityBadge = (priority: string) => {
    const priorityColors = {
      'high': 'bg-red-500/10 text-red-500 border-red-500/20',
      'medium': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      'low': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    };
    
    return (
      <Badge 
        variant="outline" 
        className={`capitalize ${priorityColors[priority.toLowerCase() as keyof typeof priorityColors] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}
      >
        {priority}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-md border border-aximo-border overflow-hidden">
      <Table>
        <TableHeader className="bg-aximo-darker">
          <TableRow className="hover:bg-transparent border-aximo-border">
            <TableHead className="text-aximo-text-secondary">Reference</TableHead>
            <TableHead className="text-aximo-text-secondary">Title</TableHead>
            <TableHead className="text-aximo-text-secondary">Status</TableHead>
            <TableHead className="text-aximo-text-secondary">Priority</TableHead>
            <TableHead className="text-aximo-text-secondary">Pickup Date</TableHead>
            <TableHead className="text-aximo-text-secondary">Customer</TableHead>
            <TableHead className="text-aximo-text-secondary">Carrier</TableHead>
            <TableHead className="text-right text-aximo-text-secondary">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => (
            <motion.tr 
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="cursor-pointer hover:bg-aximo-primary/5 border-aximo-border bg-aximo-dark"
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <TableCell className="font-medium text-aximo-text">{job.reference}</TableCell>
              <TableCell className="text-aximo-text">{job.title}</TableCell>
              <TableCell>{getStatusBadge(job.status)}</TableCell>
              <TableCell>{getPriorityBadge(job.priority)}</TableCell>
              <TableCell className="text-aximo-text">{format(new Date(job.pickup_date), 'PP')}</TableCell>
              <TableCell className="text-aximo-text">{job.customer?.name || 'Unassigned'}</TableCell>
              <TableCell className="text-aximo-text">{job.carrier?.name || 'Unassigned'}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jobs/${job.id}`);
                    }}
                    className="text-aximo-text-secondary hover:text-aximo-primary"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-aximo-text-secondary hover:text-aximo-primary">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-aximo-darker border-aximo-border">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-aximo-border" />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Assign Hauler</DropdownMenuItem>
                      <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-aximo-border" />
                      <DropdownMenuItem className="text-red-500">Cancel Job</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </motion.tr>
          ))}
          {jobs.length === 0 && (
            <TableRow className="border-aximo-border bg-aximo-dark">
              <TableCell colSpan={8} className="text-center py-10">
                <div className="flex flex-col items-center justify-center">
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
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
