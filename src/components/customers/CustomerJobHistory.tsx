
import React from 'react';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';
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
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CustomerJobHistoryProps {
  customer: Customer;
}

const CustomerJobHistory = ({ customer }: CustomerJobHistoryProps) => {
  const [jobs, setJobs] = React.useState(customer.jobs || []);

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
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export Report
        </Button>
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
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-md">
          <Truck className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <h4 className="text-muted-foreground font-medium mb-1">No job history</h4>
          <p className="text-sm text-muted-foreground mb-3">
            This customer doesn't have any completed jobs yet
          </p>
          <Button size="sm">
            <Truck className="h-4 w-4 mr-1" />
            Create New Job
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerJobHistory;
