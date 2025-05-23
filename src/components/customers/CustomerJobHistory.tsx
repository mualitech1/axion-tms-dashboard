import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  FileText, 
  Download, 
  Truck, 
  ArrowRight,
  FileCheck,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CustomerJobHistoryProps {
  customer: Customer;
}

const CustomerJobHistory = ({ customer }: CustomerJobHistoryProps) => {
  const [jobs, setJobs] = React.useState(customer.jobs || []);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateJob = () => {
    if (!customer?.id) {
      toast({
        title: "Customer ID Required",
        description: "Customer information is needed to create a job",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to job creation with customer context
    navigate(`/jobs/new?customerId=${customer.id}&customerName=${encodeURIComponent(customer.name)}`);
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('complete') || statusLower.includes('delivered')) {
      return 'bg-tms-green-light text-tms-green';
    } else if (statusLower.includes('progress') || statusLower.includes('transit')) {
      return 'bg-tms-blue-light text-tms-blue';
    } else if (statusLower.includes('pending') || statusLower.includes('booked')) {
      return 'bg-tms-yellow-light text-tms-yellow';
    } else if (statusLower.includes('cancel') || statusLower.includes('fail')) {
      return 'bg-red-100 text-red-600';
    }
    return 'bg-tms-gray-200 text-tms-gray-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Job History</h3>
        <div className="flex gap-2">
          <Button 
            onClick={handleCreateJob}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Create New Job
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export Report
          </Button>
        </div>
      </div>
      
      {jobs && jobs.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Reference</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    {job.reference}
                  </TableCell>
                  <TableCell>
                    {new Date(job.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="truncate max-w-[100px]">{job.from}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                      <span className="truncate max-w-[100px]">{job.to}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    £{job.value.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed border-indigo-200 dark:border-indigo-800/50 rounded-lg bg-slate-50 dark:bg-indigo-950/30">
          <Truck className="h-12 w-12 text-indigo-400 dark:text-indigo-500 mx-auto mb-3" />
          <h4 className="text-indigo-900 dark:text-indigo-200 font-medium mb-2">No job history</h4>
          <p className="text-sm text-indigo-500/70 dark:text-indigo-400/70 mb-4 max-w-md mx-auto">
            This customer doesn't have any completed jobs yet. Create a new job to get started.
          </p>
          <Button 
            onClick={handleCreateJob}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Job
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerJobHistory;
