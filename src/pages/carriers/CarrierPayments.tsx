
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Filter, Search, ArrowDown, ArrowUp, SlidersHorizontal } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { carrierData } from './data/carrierData';

type SortField = 'date' | 'amount' | 'status';
type SortOrder = 'asc' | 'desc';

export default function CarrierPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // Generate random payment data for carriers
  const generatePayments = () => {
    const payments = [];
    const statuses = ['Paid', 'Pending', 'Processing', 'Late'];
    
    for (let i = 0; i < 20; i++) {
      const carrier = carrierData[Math.floor(Math.random() * carrierData.length)];
      const amount = Math.floor(Math.random() * 5000) + 500;
      const statusIndex = Math.floor(Math.random() * statuses.length);
      const daysAgo = Math.floor(Math.random() * 60);
      
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      payments.push({
        id: i + 1,
        carrierId: carrier.id,
        carrierName: carrier.name,
        invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
        date: date,
        amount: amount,
        status: statuses[statusIndex],
        jobId: `JOB-${Math.floor(Math.random() * 10000)}`
      });
    }
    
    return payments;
  };
  
  const paymentData = generatePayments();
  
  // Filter and sort payments
  const filteredPayments = paymentData
    .filter(payment => 
      payment.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(payment => statusFilter === 'all' ? true : payment.status === statusFilter)
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'asc' 
          ? a.date.getTime() - b.date.getTime() 
          : b.date.getTime() - a.date.getTime();
      } else if (sortField === 'amount') {
        return sortOrder === 'asc' 
          ? a.amount - b.amount 
          : b.amount - a.amount;
      } else {
        return sortOrder === 'asc' 
          ? a.status.localeCompare(b.status) 
          : b.status.localeCompare(a.status);
      }
    });
  
  // Function to toggle sort order
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };
  
  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-tms-green text-white">Paid</Badge>;
      case 'Pending':
        return <Badge className="bg-tms-yellow text-white">Pending</Badge>;
      case 'Processing':
        return <Badge className="bg-tms-blue text-white">Processing</Badge>;
      case 'Late':
        return <Badge className="bg-tms-red text-white">Late</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Calculate summary statistics
  const totalPaid = filteredPayments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
    
  const totalPending = filteredPayments
    .filter(p => p.status === 'Pending' || p.status === 'Processing')
    .reduce((sum, p) => sum + p.amount, 0);
    
  const totalLate = filteredPayments
    .filter(p => p.status === 'Late')
    .reduce((sum, p) => sum + p.amount, 0);
  
  return (
    <MainLayout title="Carrier Payments">
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">Carrier Payments</h1>
            <p className="text-tms-gray-600">Manage and track payments to carriers</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-tms-blue hover:bg-tms-blue/90">
              <FileText className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-tms-gray-600">Total Paid (Last 60 days)</p>
            <p className="text-2xl font-semibold text-tms-green">£{totalPaid.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-tms-gray-600">Pending Payments</p>
            <p className="text-2xl font-semibold text-tms-yellow">£{totalPending.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-tms-gray-600">Late Payments</p>
            <p className="text-2xl font-semibold text-tms-red">£{totalLate.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-tms-gray-500" />
              <Input
                placeholder="Search payments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="ml-auto">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Job ID</TableHead>
                  <TableHead 
                    onClick={() => toggleSort('date')}
                    className="cursor-pointer hover:bg-tms-gray-100"
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === 'date' && (
                        sortOrder === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    onClick={() => toggleSort('amount')}
                    className="cursor-pointer hover:bg-tms-gray-100"
                  >
                    <div className="flex items-center">
                      Amount
                      {sortField === 'amount' && (
                        sortOrder === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    onClick={() => toggleSort('status')}
                    className="cursor-pointer hover:bg-tms-gray-100"
                  >
                    <div className="flex items-center">
                      Status
                      {sortField === 'status' && (
                        sortOrder === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                    <TableCell>
                      <Link to={`/carriers/details/${payment.carrierId}`} className="text-tms-blue hover:underline">
                        {payment.carrierName}
                      </Link>
                    </TableCell>
                    <TableCell>{payment.jobId}</TableCell>
                    <TableCell>{payment.date.toLocaleDateString('en-GB')}</TableCell>
                    <TableCell>£{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
