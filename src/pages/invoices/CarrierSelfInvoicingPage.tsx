import { useState, useEffect } from 'react';
import { useJobToInvoice } from '@/hooks/use-job-to-invoice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
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
  FileText, 
  Loader2, 
  Check, 
  ArrowRight, 
  Receipt, 
  AlertCircle, 
  Calendar,
  Factory,
  Truck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/pages/jobs/types/jobTypes';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Carrier {
  id: string;
  name: string;
  email?: string;
}

export default function CarrierSelfInvoicingPage() {
  const { isProcessing, createCarrierSelfInvoice } = useJobToInvoice();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [selectedCarrierId, setSelectedCarrierId] = useState<string>('');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [periodStart, setPeriodStart] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1) // First day of current month
  );
  const [periodEnd, setPeriodEnd] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) // Last day of current month
  );
  const navigate = useNavigate();

  // Load carriers
  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('type', 'carrier');

        if (error) throw error;
        
        setCarriers(data || []);
      } catch (err) {
        console.error('Error loading carriers:', err);
        toast({
          title: 'Error',
          description: 'Failed to load carriers',
          variant: 'destructive'
        });
      }
    };
    
    fetchCarriers();
  }, [toast]);

  // Load jobs for selected carrier
  useEffect(() => {
    const fetchJobsForCarrier = async () => {
      try {
        if (!selectedCarrierId) {
          setJobs([]);
          return;
        }
        
        setLoading(true);
        
        // Format dates for database query
        const startDateStr = periodStart.toISOString().split('T')[0];
        const endDateStr = periodEnd.toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('jobs')
          .select('*, customers:customer_id(*)')
          .eq('carrier_id', selectedCarrierId)
          .gte('pickup_date', startDateStr)
          .lte('pickup_date', endDateStr)
          .in('status', ['completed', 'delivered', 'pod_received'])
          .is('self_invoiced', null) // Only jobs not yet self-invoiced
          .order('pickup_date', { ascending: false });
        
        if (error) throw error;
        
        setJobs(data || []);
      } catch (err) {
        console.error('Error loading jobs for carrier:', err);
        toast({
          title: 'Error',
          description: 'Failed to load jobs for carrier',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobsForCarrier();
  }, [selectedCarrierId, periodStart, periodEnd, toast]);

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

  const handleCreateSelfInvoice = async () => {
    try {
      if (!selectedCarrierId) {
        toast({
          title: 'Validation Error',
          description: 'Please select a carrier',
          variant: 'destructive'
        });
        return;
      }
      
      if (selectedJobs.length === 0) {
        toast({
          title: 'Validation Error',
          description: 'Please select at least one job',
          variant: 'destructive'
        });
        return;
      }
      
      const selfInvoiceId = await createCarrierSelfInvoice(
        selectedCarrierId,
        selectedJobs,
        periodStart,
        periodEnd
      );
      
      if (selfInvoiceId) {
        toast({
          title: 'Success',
          description: 'Carrier self-invoice generated successfully',
          variant: 'default'
        });
        
        // Clear selections and reload jobs
        setSelectedJobs([]);
        const { data, error } = await supabase
          .from('jobs')
          .select('*, customers:customer_id(*)')
          .eq('carrier_id', selectedCarrierId)
          .gte('pickup_date', periodStart.toISOString().split('T')[0])
          .lte('pickup_date', periodEnd.toISOString().split('T')[0])
          .in('status', ['completed', 'delivered', 'pod_received'])
          .is('self_invoiced', null)
          .order('pickup_date', { ascending: false });
        
        if (!error) {
          setJobs(data || []);
        }
      }
    } catch (error) {
      console.error('Error creating self-invoice:', error);
      toast({
        title: 'Error',
        description: 'Failed to create carrier self-invoice',
        variant: 'destructive'
      });
    }
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

  const breadcrumbItems = [
    { label: "Quantum Hub", path: "/" },
    { label: "Financial Matrix", path: "/invoices" },
    { label: "Carrier Self-Invoicing", path: "/invoices/carrier-self-invoicing" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-aximo-text">Carrier Self-Invoicing Portal</h1>
            <p className="text-aximo-text-secondary">Generate monthly self-invoices for carrier transactions</p>
          </div>
        </div>
      </div>
      
      <Card className="border-aximo-border bg-aximo-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Truck className="h-5 w-5 text-aximo-primary" />
            Carrier Selection & Period
          </CardTitle>
          <CardDescription>
            Select carrier and date range for self-invoice generation
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Select
                value={selectedCarrierId}
                onValueChange={setSelectedCarrierId}
              >
                <SelectTrigger id="carrier">
                  <SelectValue placeholder="Select a carrier" />
                </SelectTrigger>
                <SelectContent>
                  {carriers.map(carrier => (
                    <SelectItem key={carrier.id} value={carrier.id}>{carrier.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Period Start</Label>
              <DatePicker date={periodStart} onSelect={(date) => date && setPeriodStart(date)} />
            </div>
            
            <div className="space-y-2">
              <Label>Period End</Label>
              <DatePicker date={periodEnd} onSelect={(date) => date && setPeriodEnd(date)} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-aximo-border bg-aximo-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-aximo-primary" />
            Jobs for Self-Invoicing
          </CardTitle>
          <CardDescription>
            Select jobs to include in the carrier self-invoice
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-aximo-primary" />
            </div>
          ) : !selectedCarrierId ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Carrier Selection Required</AlertTitle>
              <AlertDescription>
                Please select a carrier to view jobs available for self-invoicing.
              </AlertDescription>
            </Alert>
          ) : jobs.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Jobs Available</AlertTitle>
              <AlertDescription>
                There are no completed jobs available for self-invoicing in the selected period.
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
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableCaption>Completed jobs for self-invoice generation</TableCaption>
                  <TableHeader>
                    <TableRow className="bg-aximo-darker">
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Cost (GBP)</TableHead>
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
                        <TableCell>{job.status}</TableCell>
                        <TableCell className="text-right">{formatCurrency(job.agreed_cost_gbp || 0)}</TableCell>
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
                          .reduce((sum, job) => sum + (job.agreed_cost_gbp || 0), 0)
                      )}
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleCreateSelfInvoice}
                    disabled={isProcessing || selectedJobs.length === 0}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4 mr-2" />
                    )}
                    Generate Self-Invoice
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between bg-aximo-darker/30 pt-4">
          <Button variant="ghost" onClick={() => navigate('/carriers')}>
            View Carriers
          </Button>
          <Button variant="ghost" onClick={() => navigate('/invoices')}>
            View Invoices
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 