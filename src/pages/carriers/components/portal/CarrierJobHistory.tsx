
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription, 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  FileText, 
  Truck, 
  MapPin, 
  Calendar, 
  Filter, 
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface CarrierJobHistoryProps {
  carrierId: number;
}

// Mock job data
const mockJobs = [
  {
    id: 'JOB-1001',
    customer: 'Acme Corp',
    pickupLocation: 'Chicago, IL',
    deliveryLocation: 'Detroit, MI',
    pickupDate: '2023-10-15',
    deliveryDate: '2023-10-16',
    status: 'completed',
    value: 1250.00,
    rating: 5,
    onTime: true
  },
  {
    id: 'JOB-1002',
    customer: 'Globex',
    pickupLocation: 'Indianapolis, IN',
    deliveryLocation: 'Columbus, OH',
    pickupDate: '2023-10-18',
    deliveryDate: '2023-10-19',
    status: 'completed',
    value: 980.00,
    rating: 4,
    onTime: true
  },
  {
    id: 'JOB-1003',
    customer: 'Stark Industries',
    pickupLocation: 'Cleveland, OH',
    deliveryLocation: 'Pittsburgh, PA',
    pickupDate: '2023-10-22',
    deliveryDate: '2023-10-23',
    status: 'in-progress',
    value: 1450.00,
    rating: null,
    onTime: null
  },
  {
    id: 'JOB-1004',
    customer: 'Wayne Enterprises',
    pickupLocation: 'Cincinnati, OH',
    deliveryLocation: 'Louisville, KY',
    pickupDate: '2023-10-25',
    deliveryDate: '2023-10-26',
    status: 'scheduled',
    value: 1100.00,
    rating: null,
    onTime: null
  },
  {
    id: 'JOB-1005',
    customer: 'LexCorp',
    pickupLocation: 'St. Louis, MO',
    deliveryLocation: 'Nashville, TN',
    pickupDate: '2023-09-30',
    deliveryDate: '2023-10-01',
    status: 'completed',
    value: 1320.00,
    rating: 3,
    onTime: false
  }
];

export default function CarrierJobHistory({ carrierId }: CarrierJobHistoryProps) {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    // Filter jobs based on search query and status filter
    let filtered = jobs;
    
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }
    
    setFilteredJobs(filtered);
  }, [searchQuery, statusFilter, jobs]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'scheduled':
        return <Badge className="bg-amber-500">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Job History</CardTitle>
        <CardDescription>
          View all your past, current, and upcoming jobs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {paginatedJobs.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.pickupLocation} → {job.deliveryLocation}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{job.deliveryDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="border rounded-md p-8 text-center">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <Truck className="h-12 w-12 mb-2" />
              <p>No jobs found matching your criteria</p>
            </div>
          </div>
        )}
        
        {filteredJobs.length > jobsPerPage && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {((page - 1) * jobsPerPage) + 1} to {Math.min(page * jobsPerPage, filteredJobs.length)} of {filteredJobs.length} jobs
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {filteredJobs.length > 0 && (
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Performance Summary</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Total Jobs</div>
                <div className="text-lg font-semibold">{jobs.filter(j => j.status === 'completed').length}</div>
              </div>
              <div className="bg-muted rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">On-Time Delivery</div>
                <div className="text-lg font-semibold">
                  {Math.round((jobs.filter(j => j.status === 'completed' && j.onTime).length / 
                  jobs.filter(j => j.status === 'completed').length) * 100)}%
                </div>
              </div>
              <div className="bg-muted rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Average Rating</div>
                <div className="text-lg font-semibold">
                  {(jobs.filter(j => j.status === 'completed' && j.rating !== null)
                    .reduce((sum, job) => sum + (job.rating || 0), 0) / 
                    jobs.filter(j => j.status === 'completed' && j.rating !== null).length).toFixed(1)}/5
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
