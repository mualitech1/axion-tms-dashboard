import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, FileText, Mail, Truck } from 'lucide-react';
import { jobService } from '@/services/job-service';
import { supabase } from '@/integrations/supabase/client';

interface OrderConfirmationProps {
  jobId: string;
  carrierId: string;
  onComplete: () => void;
  isProcessing: boolean;
}

interface JobDetails {
  title: string;
  reference: string;
  customer: {
    name: string;
    email?: string;
  };
  carrier: {
    name: string;
    email?: string;
  };
}

export function OrderConfirmation({ 
  jobId, 
  carrierId, 
  onComplete, 
  isProcessing 
}: OrderConfirmationProps) {
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobDetails() {
      try {
        setLoading(true);
        
        // Get job details
        const job = await supabase
          .from('jobs')
          .select(`
            id,
            title,
            reference,
            customer:companies!customer_id(id, name, email),
            carrier:companies!carrier_id(id, name, email)
          `)
          .eq('id', jobId)
          .single();
        
        if (job.error) throw job.error;
        
        setJobDetails({
          title: job.data.title,
          reference: job.data.reference,
          customer: {
            name: job.data.customer?.name || 'Unknown Customer',
            email: job.data.customer?.email
          },
          carrier: {
            name: job.data.carrier?.name || 'Unknown Carrier',
            email: job.data.carrier?.email
          }
        });
      } catch (error) {
        console.error("Error loading job details:", error);
        // Set fallback data if we can't load the real data
        setJobDetails({
          title: 'Job Details',
          reference: `JOB-${jobId.substring(0, 8)}`,
          customer: { name: 'Customer' },
          carrier: { name: 'Selected Carrier' }
        });
      } finally {
        setLoading(false);
      }
    }

    if (jobId && carrierId) {
      loadJobDetails();
    }
  }, [jobId, carrierId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3">Loading order details...</span>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Confirm Order</CardTitle>
        <CardDescription>
          Review the order details before sending confirmations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {jobDetails && (
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-md">
              <h3 className="text-lg font-medium mb-2">{jobDetails.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Reference</p>
                  <p className="font-medium">{jobDetails.reference}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{jobDetails.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Carrier</p>
                  <p className="font-medium">{jobDetails.carrier.name}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-medium">Confirmation Actions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border rounded-md flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Generate Order Document</p>
                    <p className="text-sm text-muted-foreground">Create official order confirmation</p>
                  </div>
                  <CheckCircle className="ml-auto h-5 w-5 text-primary" />
                </div>
                
                <div className="p-3 border rounded-md flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email to Customer</p>
                    <p className="text-sm text-muted-foreground">Send confirmation with details</p>
                  </div>
                  <CheckCircle className="ml-auto h-5 w-5 text-primary" />
                </div>
                
                <div className="p-3 border rounded-md flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Notify Carrier</p>
                    <p className="text-sm text-muted-foreground">Send job details to carrier</p>
                  </div>
                  <CheckCircle className="ml-auto h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button 
                onClick={onComplete} 
                disabled={isProcessing}
                className="w-full md:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm & Send'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 