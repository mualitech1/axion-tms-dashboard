import { useState, useEffect } from 'react';
import { useJobToInvoice } from '@/hooks/use-job-to-invoice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Receipt, 
  Loader2, 
  Check, 
  ArrowRight, 
  FileCheck, 
  AlertCircle, 
  ChevronsRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/pages/jobs/types/jobTypes';

export function JobToInvoiceConverter() {
  const { 
    isProcessing, 
    getJobsReadyForInvoicing, 
    prepareJobForInvoicing,
    createInvoiceFromJob 
  } = useJobToInvoice();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [taxRate, setTaxRate] = useState<number>(20); // Default VAT rate
  const [paymentTerms, setPaymentTerms] = useState<number>(30); // Default payment terms
  const navigate = useNavigate();

  useEffect(() => {
    // Load jobs that are ready for invoicing
    const loadJobs = async () => {
      setLoading(true);
      const readyJobs = await getJobsReadyForInvoicing();
      setJobs(readyJobs);
      setLoading(false);
    };
    
    loadJobs();
  }, [getJobsReadyForInvoicing]);

  const handleSelectAllJobs = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(jobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    }
  };

  const handlePrepareJobsForInvoicing = async () => {
    for (const jobId of selectedJobs) {
      await prepareJobForInvoicing(jobId);
    }
    
    // Reload jobs
    const readyJobs = await getJobsReadyForInvoicing();
    setJobs(readyJobs);
  };

  const handleCreateInvoices = async () => {
    for (const jobId of selectedJobs) {
      const invoiceId = await createInvoiceFromJob(jobId, {
        taxRate,
        paymentTermDays: paymentTerms
      });
      
      if (invoiceId) {
        // If there's only one job selected, navigate to the new invoice
        if (selectedJobs.length === 1) {
          navigate(`/invoices/${invoiceId}`);
          return;
        }
      }
    }
    
    // Reload jobs after creating invoices
    const readyJobs = await getJobsReadyForInvoicing();
    setJobs(readyJobs);
    setSelectedJobs([]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getBadgeForStatus = (status: string) => {
    switch (status) {
      case 'ready_for_invoicing':
        return <Badge className="bg-green-600">Ready for Invoice</Badge>;
      case 'completed':
        return <Badge className="bg-blue-600">Completed</Badge>;
      case 'delivered':
        return <Badge className="bg-indigo-600">Delivered</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Receipt className="h-5 w-5 text-aximo-primary" />
          Quantum Transaction Materializer
        </CardTitle>
        <CardDescription>
          Convert completed jobs into invoices for financial crystallization
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-aximo-primary" />
          </div>
        ) : jobs.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No jobs ready for invoicing</AlertTitle>
            <AlertDescription>
              There are no completed jobs ready to be converted to invoices. 
              Complete jobs and upload proof of delivery documents first.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex items-center space-x-3 mb-4">
              <Checkbox 
                id="select-all"
                checked={selectedJobs.length === jobs.length && jobs.length > 0}
                onCheckedChange={(checked) => handleSelectAllJobs(!!checked)}
              />
              <Label htmlFor="select-all">Select All Jobs</Label>
              
              <div className="ml-auto flex space-x-2">
                <div className="space-y-1">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input 
                    id="tax-rate"
                    type="number" 
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="payment-terms">Payment Terms (days)</Label>
                  <Input 
                    id="payment-terms"
                    type="number" 
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableCaption>Ready-to-invoice jobs from completed operations</TableCaption>
                <TableHeader>
                  <TableRow className="bg-aximo-darker">
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id} className="hover:bg-aximo-darker/60">
                      <TableCell>
                        <Checkbox 
                          checked={selectedJobs.includes(job.id)}
                          onCheckedChange={(checked) => handleSelectJob(job.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{job.reference}</TableCell>
                      <TableCell>{job.customer?.name || 'Unknown'}</TableCell>
                      <TableCell>{formatDate(job.pickup_date)}</TableCell>
                      <TableCell>{getBadgeForStatus(job.status)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(job.value || 0)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {selectedJobs.length > 0 && (
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-aximo-text-secondary">
                    {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-lg font-semibold">
                    Total: {formatCurrency(
                      jobs
                        .filter(job => selectedJobs.includes(job.id))
                        .reduce((sum, job) => sum + (job.value || 0), 0)
                    )}
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={handlePrepareJobsForInvoicing}
                    disabled={isProcessing || selectedJobs.length === 0}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <FileCheck className="h-4 w-4 mr-2" />
                    )}
                    Prepare for Invoicing
                  </Button>
                  
                  <Button
                    onClick={handleCreateInvoices}
                    disabled={isProcessing || selectedJobs.length === 0}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ChevronsRight className="h-4 w-4 mr-2" />
                    )}
                    Create Invoice{selectedJobs.length > 1 ? 's' : ''}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between bg-aximo-darker/30 pt-4">
        <Button variant="ghost" onClick={() => navigate('/jobs')}>
          View All Jobs
        </Button>
        <Button variant="ghost" onClick={() => navigate('/invoices')}>
          View Invoices
        </Button>
      </CardFooter>
    </Card>
  );
} 