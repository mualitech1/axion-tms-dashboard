import { useState } from 'react';
import { useToast } from './use-toast';
import { jobService } from '@/services/job-service';
import { invoiceService } from '@/services/invoice-service';

export function useJobToInvoice() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  /**
   * Prepares a job for invoicing by marking it as ready for invoicing
   * @param jobId ID of the job to prepare for invoicing
   * @returns True if successful, false otherwise
   */
  const prepareJobForInvoicing = async (jobId: string): Promise<boolean> => {
    try {
      setIsProcessing(true);
      
      const result = await jobService.markJobReadyForInvoicing(jobId);
      
      if (!result.success) {
        toast({
          title: "Quantum Preparation Failed",
          description: result.error || "Failed to prepare job for invoicing",
          variant: "destructive"
        });
        return false;
      }
      
      toast({
        title: "Quantum Transaction Ready",
        description: "Job successfully marked ready for invoicing",
        variant: "default"
      });
      
      return true;
    } catch (error) {
      console.error('Error in prepareJobForInvoicing:', error);
      toast({
        title: "Quantum Anomaly Detected",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Creates an invoice from a job that is ready for invoicing
   * @param jobId ID of the job to convert to an invoice
   * @param options Additional invoice options
   * @returns The invoice ID if successful, undefined otherwise
   */
  const createInvoiceFromJob = async (
    jobId: string,
    options?: {
      taxRate?: number;
      paymentTermDays?: number;
      notes?: string;
      terms?: string;
    }
  ): Promise<string | undefined> => {
    try {
      setIsProcessing(true);
      
      const result = await invoiceService.createInvoiceFromJob(jobId, options);
      
      if (!result.success) {
        toast({
          title: "Quantum Invoice Creation Failed",
          description: result.error || "Failed to create invoice from job",
          variant: "destructive"
        });
        return undefined;
      }
      
      toast({
        title: "Quantum Invoice Generated",
        description: "Invoice successfully created from job",
        variant: "default"
      });
      
      return result.invoiceId;
    } catch (error) {
      console.error('Error in createInvoiceFromJob:', error);
      toast({
        title: "Quantum Anomaly Detected",
        description: "An unexpected error occurred while creating the invoice",
        variant: "destructive"
      });
      return undefined;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Creates a self-invoice for a carrier based on completed jobs
   * @param carrierId ID of the carrier to create self-invoice for
   * @param jobIds Array of job IDs to include in the self-invoice
   * @param periodStart Start date of the period covered
   * @param periodEnd End date of the period covered
   * @returns The self-invoice ID if successful, undefined otherwise
   */
  const createCarrierSelfInvoice = async (
    carrierId: string,
    jobIds: string[],
    periodStart: Date,
    periodEnd: Date
  ): Promise<string | undefined> => {
    try {
      setIsProcessing(true);
      
      const result = await invoiceService.createCarrierSelfInvoice(
        carrierId,
        jobIds,
        periodStart,
        periodEnd
      );
      
      if (!result.success) {
        toast({
          title: "Quantum Self-Invoice Failed",
          description: result.error || "Failed to create carrier self-invoice",
          variant: "destructive"
        });
        return undefined;
      }
      
      toast({
        title: "Quantum Self-Invoice Generated",
        description: "Carrier self-invoice successfully created",
        variant: "default"
      });
      
      return result.selfInvoiceId;
    } catch (error) {
      console.error('Error in createCarrierSelfInvoice:', error);
      toast({
        title: "Quantum Anomaly Detected",
        description: "An unexpected error occurred while creating the self-invoice",
        variant: "destructive"
      });
      return undefined;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Gets jobs that are ready for invoicing
   * @returns Array of jobs ready for invoicing
   */
  const getJobsReadyForInvoicing = async () => {
    try {
      return await jobService.getJobsReadyForInvoicing();
    } catch (error) {
      console.error('Error in getJobsReadyForInvoicing:', error);
      toast({
        title: "Quantum Query Failed",
        description: "Failed to retrieve jobs ready for invoicing",
        variant: "destructive"
      });
      return [];
    }
  };

  return {
    isProcessing,
    prepareJobForInvoicing,
    createInvoiceFromJob,
    createCarrierSelfInvoice,
    getJobsReadyForInvoicing
  };
} 