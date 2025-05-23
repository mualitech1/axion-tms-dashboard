import { supabase } from '@/integrations/supabase/client';
import { jobService } from './job-service';
import { getErrorMessage } from '@/utils/error-handler';
import { ulid } from 'ulid';

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  job_id?: string | null;
  issue_date: string;
  due_date: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partially_paid';
  total_amount: number;
  tax_amount: number;
  notes?: string | null;
  terms?: string | null;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  tax_rate?: number | null;
  created_at: string;
  updated_at: string;
}

export interface InvoiceCreationResult {
  success: boolean;
  invoiceId?: string;
  error?: string;
}

export interface SelfInvoice {
  id: string;
  self_invoice_number: string;
  carrier_id: string;
  period_covered_start: string;
  period_covered_end: string;
  invoice_date: string;
  payment_terms_days: number;
  due_date: string;
  subtotal_gbp: number;
  vat_amount_gbp: number;
  total_amount_due_gbp: number;
  deductions_gbp?: number;
  deductions_notes?: string;
  status: 'pending_review' | 'approved_for_payment' | 'payment_processed' | 'disputed' | 'on_hold';
  pdf_url?: string;
  associated_job_ids: string[];
  created_at: string;
  updated_at: string;
}

/**
 * Service for handling invoice-related operations
 */
export const invoiceService = {
  /**
   * Create a new invoice from a job that is ready for invoicing
   * @param jobId ID of the job to invoice
   * @param options Additional invoice options
   * @returns Result object with success status and error message if applicable
   */
  async createInvoiceFromJob(
    jobId: string, 
    options: {
      taxRate?: number;
      paymentTermDays?: number;
      notes?: string;
      terms?: string;
    } = {}
  ): Promise<InvoiceCreationResult> {
    try {
      // Get the job details
      const job = await jobService.getJobById(jobId);
      
      if (!job) {
        return {
          success: false,
          error: `Job with ID ${jobId} not found`
        };
      }
      
      // Ensure job is ready for invoicing
      if (job.status !== 'ready_for_invoicing') {
        return {
          success: false,
          error: `Job must be in 'ready_for_invoicing' status to create an invoice. Current status: ${job.status}`
        };
      }
      
      // Ensure job has a customer
      if (!job.customer_id) {
        return {
          success: false,
          error: 'Job must be associated with a customer to create an invoice'
        };
      }
      
      // Generate invoice number
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Set issue date and due date
      const issueDate = new Date().toISOString();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + (options.paymentTermDays || 30));
      
      // Calculate tax amount
      const taxRate = options.taxRate || 20; // Default VAT rate
      const jobValue = job.value || 0;
      const taxAmount = (jobValue * taxRate) / 100;
      const totalAmount = jobValue + taxAmount;
      
      // Create the invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([{
          id: ulid(),
          invoice_number: invoiceNumber,
          customer_id: job.customer_id,
          job_id: jobId,
          issue_date: issueDate,
          due_date: dueDate.toISOString(),
          status: 'draft',
          total_amount: totalAmount,
          tax_amount: taxAmount,
          notes: options.notes || null,
          terms: options.terms || 'Payment due within 30 days of invoice.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (invoiceError) {
        console.error('Error creating invoice:', invoiceError);
        return {
          success: false,
          error: `Failed to create invoice: ${invoiceError.message}`
        };
      }
      
      // Create invoice item
      const { error: itemError } = await supabase
        .from('invoice_items')
        .insert([{
          id: ulid(),
          invoice_id: invoice.id,
          description: `${job.title} (Ref: ${job.reference})`,
          quantity: 1,
          unit_price: jobValue,
          amount: jobValue,
          tax_rate: taxRate,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
      
      if (itemError) {
        console.error('Error creating invoice item:', itemError);
        // Since invoice was created, we return success but log the error
        console.warn(`Invoice ${invoice.id} created but failed to create invoice item: ${itemError.message}`);
      }
      
      // Update job status to invoiced
      const { error: jobUpdateError } = await supabase
        .from('jobs')
        .update({ 
          status: 'invoiced',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      if (jobUpdateError) {
        console.error('Error updating job status to invoiced:', jobUpdateError);
      }
      
      return {
        success: true,
        invoiceId: invoice.id
      };
    } catch (error) {
      console.error('Error in createInvoiceFromJob:', error);
      return {
        success: false,
        error: getErrorMessage(error)
      };
    }
  },
  
  /**
   * Create carrier self-invoice for a batch of jobs
   * @param carrierId ID of the carrier to create self-invoice for
   * @param jobIds Array of job IDs to include in the self-invoice
   * @param periodStart Start date of the period covered by the self-invoice
   * @param periodEnd End date of the period covered by the self-invoice
   * @returns Result object with success status and self-invoice ID
   */
  async createCarrierSelfInvoice(
    carrierId: string,
    jobIds: string[],
    periodStart: Date,
    periodEnd: Date
  ): Promise<{success: boolean; selfInvoiceId?: string; error?: string}> {
    try {
      // Validate inputs
      if (!carrierId) {
        return {
          success: false,
          error: 'Carrier ID is required'
        };
      }
      
      if (!jobIds.length) {
        return {
          success: false,
          error: 'At least one job must be included in the self-invoice'
        };
      }
      
      // Get jobs data
      const jobPromises = jobIds.map(id => jobService.getJobById(id));
      const jobs = await Promise.all(jobPromises);
      const validJobs = jobs.filter(job => job && job.carrier_id === carrierId);
      
      if (validJobs.length === 0) {
        return {
          success: false,
          error: 'No valid jobs found for this carrier'
        };
      }
      
      // Calculate totals
      const subtotal = validJobs.reduce((sum, job) => sum + (job?.agreed_cost_gbp || 0), 0);
      const vatRate = 20; // Default VAT rate
      const vatAmount = (subtotal * vatRate) / 100;
      const totalAmount = subtotal + vatAmount;
      
      // Generate self-invoice number
      const selfInvoiceNumber = `SINV-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Set issue date and due date
      const invoiceDate = new Date().toISOString();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30); // Standard 30-day payment terms
      
      // Create the self-invoice using the regular invoices table with special metadata
      const { data: selfInvoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([{
          id: ulid(),
          invoice_number: selfInvoiceNumber,
          customer_id: carrierId, // For self-invoices, carrier becomes the customer
          issue_date: invoiceDate,
          due_date: dueDate.toISOString(),
          status: 'draft',
          total_amount: totalAmount,
          tax_amount: vatAmount,
          notes: `Self-invoice for period ${periodStart.toLocaleDateString()} to ${periodEnd.toLocaleDateString()}. Associated jobs: ${jobIds.join(', ')}`,
          terms: 'Self-invoice payment terms: 30 days',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 'system',
          job_id: jobIds[0], // Link to the first job, remaining will be in notes
        }])
        .select()
        .single();
      
      if (invoiceError) {
        console.error('Error creating carrier self-invoice:', invoiceError);
        return {
          success: false,
          error: `Failed to create self-invoice: ${invoiceError.message}`
        };
      }
      
      // Create invoice items for each job
      for (const job of validJobs) {
        if (!job) continue;
        
        const { error: itemError } = await supabase
          .from('invoice_items')
          .insert([{
            id: ulid(),
            invoice_id: selfInvoice.id,
            description: `Job: ${job.reference} - ${job.title}`,
            quantity: 1,
            unit_price: job.agreed_cost_gbp || 0,
            amount: job.agreed_cost_gbp || 0,
            tax_rate: vatRate,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
        
        if (itemError) {
          console.error(`Error creating invoice item for job ${job.id}:`, itemError);
        }
      }
      
      // Update jobs to mark them as self-invoiced
      for (const jobId of jobIds) {
        const { error: jobUpdateError } = await supabase
          .from('jobs')
          .update({ 
            status: 'self_invoiced',
            updated_at: new Date().toISOString()
          })
          .eq('id', jobId);
        
        if (jobUpdateError) {
          console.error(`Error updating job ${jobId} status to self_invoiced:`, jobUpdateError);
        }
      }
      
      return {
        success: true,
        selfInvoiceId: selfInvoice.id
      };
    } catch (error) {
      console.error('Error in createCarrierSelfInvoice:', error);
      return {
        success: false,
        error: getErrorMessage(error)
      };
    }
  },
  
  /**
   * Generate and store PDF for invoice
   * @param invoiceId ID of the invoice to generate PDF for
   * @returns Result object with success status and PDF URL
   */
  async generateInvoicePDF(invoiceId: string): Promise<{success: boolean; pdfUrl?: string; error?: string}> {
    try {
      // For now, this is a placeholder that would be implemented with a PDF generation library
      // or a backend service that handles PDF generation
      console.log(`PDF generation requested for invoice ${invoiceId}`);
      
      // Mock PDF URL (in a real implementation, this would be a URL to a generated PDF)
      const pdfUrl = `https://storage.example.com/invoices/${invoiceId}.pdf`;
      
      // Update the invoice with the PDF URL
      const { error } = await supabase
        .from('invoices')
        .update({ 
          pdf_url: pdfUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', invoiceId);
      
      if (error) {
        console.error('Error updating invoice with PDF URL:', error);
        return {
          success: false,
          error: `Failed to update invoice with PDF URL: ${error.message}`
        };
      }
      
      return {
        success: true,
        pdfUrl
      };
    } catch (error) {
      console.error('Error in generateInvoicePDF:', error);
      return {
        success: false,
        error: getErrorMessage(error)
      };
    }
  },
  
  /**
   * Get all invoices with optional filtering
   * @param filters Optional filters to apply
   * @returns Array of invoices
   */
  async getInvoices(filters: {
    status?: Invoice['status'];
    customerId?: string;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<Invoice[]> {
    try {
      let query = supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.customerId) {
        query = query.eq('customer_id', filters.customerId);
      }
      
      if (filters.startDate) {
        query = query.gte('issue_date', filters.startDate);
      }
      
      if (filters.endDate) {
        query = query.lte('issue_date', filters.endDate);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching invoices:', error);
        return [];
      }
      
      return data as Invoice[];
    } catch (error) {
      console.error('Error in getInvoices:', error);
      return [];
    }
  }
}; 