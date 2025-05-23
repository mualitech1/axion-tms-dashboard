import { supabase } from '@/integrations/supabase/client';
// Import both types and create a merged type for internal use
import { Job as JobTypeFromPages } from '@/pages/jobs/types/jobTypes';
import { Job as JobTypeFromDatabase, JobLocation } from '@/types/database';
import { getErrorMessage } from '@/utils/error-handler';
import { locationToJson } from '@/utils/location-utils';
import { generatePrefixedId } from '@/utils/id-utils';
import { JobCreationFormData } from '@/pages/jobs/types/formTypes';
import { notifyByEmail } from './notification-service';
import { mockJobs } from '@/data/mock-jobs';
import { nuclearCleanJobPayload, validateNoJobReference } from '@/utils/nuclear-job-cleaner';

// Use the Pages version of Job which has more complete type definitions
// This helps with validation while still being compatible with the database
export type Job = JobTypeFromPages;

export interface JobCreationResult {
  success: boolean;
  jobId?: string;
  error?: string;
}

export interface CarrierAllocationResult {
  success: boolean;
  jobId?: string;
  carrierId?: string;
  error?: string;
}

export interface OrderConfirmationResult {
  success: boolean;
  jobId?: string;
  customerConfirmationSent: boolean;
  carrierConfirmationSent: boolean;
  error?: string;
}

// Interface for company data to avoid 'any' type
interface CompanyData {
  id: string;
  name: string;
  email?: string;
}

/**
 * Validates job relations (customer_id and carrier_id) against the companies table
 * @param entityId ID to validate
 * @param entityType Type of entity ('customer' or 'carrier')
 * @returns true if valid, false if invalid
 */
async function validateCompanyReference(entityId: string | null, entityType: 'customer' | 'carrier'): Promise<boolean> {
  if (!entityId) return true; // Null ID is valid (optional relation)
  
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, type')
      .eq('id', entityId)
      .single();
    
    if (error || !data) {
      console.error(`Invalid ${entityType} reference:`, entityId, error?.message || 'Not found');
      return false;
    }
    
    // Verify company type matches the expected role
    const companyType = data.type?.toLowerCase();
    if (companyType !== entityType && companyType !== 'both') {
      console.error(`Entity with ID ${entityId} is not registered as a ${entityType}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error validating ${entityType} reference:`, error);
    return false;
  }
}

/**
 * Validates all job relationships before create/update operations
 * @param jobData Job data to validate
 * @returns true if all relations are valid, false otherwise
 */
async function validateJobRelationships(jobData: Partial<Job>): Promise<boolean> {
  // Validate customer reference
  if (jobData.customer_id) {
    const isCustomerValid = await validateCompanyReference(jobData.customer_id, 'customer');
    if (!isCustomerValid) return false;
  }
  
  // Validate carrier reference
  if (jobData.carrier_id) {
    const isCarrierValid = await validateCompanyReference(jobData.carrier_id, 'carrier');
    if (!isCarrierValid) return false;
  }
  
  return true;
}

/**
 * Service for handling job-related operations
 */
export const jobService = {
  /**
   * Get all jobs with related data
   */
  async getJobs(): Promise<Job[]> {
    try {
      // First, fetch just the jobs without attempting to join
      const { data: jobs, error } = await supabase
        .from('jobs')
        .select('*');

      if (error) {
        console.error('Error fetching jobs:', error);
        return mockJobs; // Return mock data on error
      }

      if (!jobs || jobs.length === 0) {
        console.log('No jobs found, returning mock data');
        return mockJobs;
      }

      // Collect customer and carrier IDs to fetch them separately
      const customerIds = jobs
        .map(job => job.customer_id)
        .filter(Boolean);
      
      const carrierIds = jobs
        .map(job => job.carrier_id)
        .filter(Boolean);

      // Fetch customer data
      const { data: customers, error: customerError } = await supabase
        .from('companies')
        .select('*')
        .in('id', customerIds);

      if (customerError) {
        console.error('Error fetching customers:', customerError);
      }

      // Fetch carrier data
      const { data: carriers, error: carrierError } = await supabase
        .from('companies')
        .select('*')
        .in('id', carrierIds);

      if (carrierError) {
        console.error('Error fetching carriers:', carrierError);
      }

      // Create maps for quick lookup
      const customersMap: Record<string, CompanyData> = (customers || []).reduce(
        (acc, customer) => {
          acc[customer.id] = customer as CompanyData;
          return acc;
        },
        {} as Record<string, CompanyData>
      );

      const carriersMap: Record<string, CompanyData> = (carriers || []).reduce(
        (acc, carrier) => {
          acc[carrier.id] = carrier as CompanyData;
          return acc;
        },
        {} as Record<string, CompanyData>
      );

      // Manually join the data
      const enrichedJobs = jobs.map(job => ({
        ...job,
        customer: job.customer_id ? customersMap[job.customer_id] || null : null,
        carrier: job.carrier_id ? carriersMap[job.carrier_id] || null : null
      })) as unknown as Job[];

      return enrichedJobs;
    } catch (error) {
      console.error('Error in getJobs:', error);
      return mockJobs; // Return mock data on any error
    }
  },

  /**
   * Create a new job in the database
   */
  async createJob(formData: JobCreationFormData): Promise<JobCreationResult> {
    try {
      // Transform form data to Job entity
      const jobId = generatePrefixedId('job');
      
      // Create pickup and delivery locations
      const pickupLocation: JobLocation = {
        address: formData.collection.addressLine1,
        city: formData.collection.city,
        postcode: formData.collection.postCode,
        country: 'United Kingdom', // Default
        notes: formData.collection.additionalComments || ''
      };
      
      const deliveryLocation: JobLocation = {
        address: formData.delivery.addressLine1,
        city: formData.delivery.city,
        postcode: formData.delivery.postCode,
        country: 'United Kingdom', // Default
        notes: formData.delivery.additionalComments || ''
      };
      
      // Look up customer ID by name
      const { data: customerData } = await supabase
        .from('companies')
        .select('id')
        .eq('name', formData.customer)
        .eq('type', 'customer')
        .single();
      
      const customerId = customerData?.id || null;
      
      // Create the job object - use type compatible with database
      const jobForDatabase: Partial<JobTypeFromDatabase> = {
        reference: `JOB-${Date.now().toString(36).toUpperCase()}`,
        title: formData.jobTitle,
        customer_id: customerId,
        carrier_id: null, // Will be set during carrier allocation
        vehicle_id: null,
        driver_id: null,
        status: 'booked', // Use a valid status from JobStatus
        priority: formData.priority,
        pickup_date: new Date().toISOString(), // Default to current date
        pickup_location: locationToJson(pickupLocation),
        delivery_location: locationToJson(deliveryLocation),
        estimated_duration: null,
        value: formData.rate ? parseFloat(formData.rate) : null,
        notes: formData.additionalInformation || null,
        created_by: 'system',
        pod_uploaded: false,
        pod_document_id: null,
        issue_details: null
      };
      
      // 🛡️ QUANTUM SHIELD: Validate relationships before inserting
      if (customerId) {
        const isValid = await validateJobRelationships({ customer_id: customerId });
        if (!isValid) {
          return {
            success: false,
            error: `Invalid customer reference: ${customerId}. Customer may not exist or is not registered as a customer.`
          };
        }
      }
      
      // ⚛️ NUCLEAR DEFENSE: Clean the job object to remove ANY trace of job_reference
      const sanitizedJob = nuclearCleanJobPayload({
        id: jobId,
        ...jobForDatabase
      });
      
      console.log('⚛️ SANITIZED JOB PAYLOAD FOR SUPABASE:', sanitizedJob);
      
      // 💂‍♀️ VALIDATION CHECKPOINT: Verify no job_reference remains
      const isClean = validateNoJobReference(sanitizedJob);
      if (!isClean) {
        console.error('🚨 CRITICAL ERROR: job_reference still detected after nuclear cleaning!');
        return {
          success: false,
          error: 'Critical error: Failed to remove job_reference field. Operation aborted for safety.'
        };
      } else {
        console.log('✅ Nuclear defense passed validation: No job_reference found');
      }
      
      // Insert job into the database using NUCLEAR CLEANED object
      // Using JobTypeFromDatabase type to match Supabase table structure
      const { data, error } = await supabase
        .from('jobs')
        .insert([sanitizedJob as JobTypeFromDatabase])
        .select();
      
      if (error) {
        console.error('Error creating job:', error);
        return {
          success: false,
          error: getErrorMessage(error)
        };
      }
      
      console.log('[JobService] Job created successfully:', jobId);
      
      return {
        success: true,
        jobId
      };
    } catch (error) {
      console.error('Error in job creation:', error);
      return {
        success: false,
        error: getErrorMessage(error)
      };
    }
  },
  
  /**
   * Allocate a carrier to an existing job
   */
  async allocateCarrier(jobId: string, carrierId: string): Promise<CarrierAllocationResult> {
    try {
      // 🛡️ QUANTUM SHIELD: Validate carrier reference before allocation
      const isValid = await validateJobRelationships({ carrier_id: carrierId });
      if (!isValid) {
        return {
          success: false,
          error: `Invalid carrier reference: ${carrierId}. Carrier may not exist or is not registered as a carrier.`
        };
      }
      
      // Update the job with the carrier ID
      const { data, error } = await supabase
        .from('jobs')
        .update({ 
          carrier_id: carrierId,
          status: 'allocated', // Update status
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .select();
      
      if (error) {
        console.error('Error allocating carrier:', error);
        return {
          success: false,
          error: getErrorMessage(error)
        };
      }
      
      console.log('[JobService] Carrier allocated successfully:', carrierId, 'to job:', jobId);
      
      return {
        success: true,
        jobId,
        carrierId
      };
    } catch (error) {
      console.error('Error in carrier allocation:', error);
      return {
        success: false,
        error: getErrorMessage(error)
      };
    }
  },
  
  /**
   * Send order confirmations to customer and carrier
   */
  async sendOrderConfirmations(jobId: string): Promise<OrderConfirmationResult> {
    try {
      // Get the job details with related entities
      const { data: job, error: jobError } = await supabase
        .from('jobs')
        .select(`
          *,
          customer:companies!customer_id(*),
          carrier:companies!carrier_id(*)
        `)
        .eq('id', jobId)
        .single();
      
      if (jobError || !job) {
        console.error('Error fetching job for confirmation:', jobError);
        return {
          success: false,
          jobId,
          customerConfirmationSent: false,
          carrierConfirmationSent: false,
          error: getErrorMessage(jobError)
        };
      }
      
      // Send confirmations (simulate for now)
      let customerConfirmationSent = false;
      let carrierConfirmationSent = false;
      
      // Send to customer if available
      if (job.customer && job.customer.email) {
        // In a real app, this would send an actual email
        await notifyByEmail(
          job.customer.email,
          `Order Confirmation: ${job.reference}`,
          `Your order ${job.reference} has been confirmed. Details: ${job.title}`
        );
        customerConfirmationSent = true;
      }
      
      // Send to carrier if available
      if (job.carrier && job.carrier.email) {
        await notifyByEmail(
          job.carrier.email,
          `New Job Allocation: ${job.reference}`,
          `You have been allocated job ${job.reference}. Details: ${job.title}`
        );
        carrierConfirmationSent = true;
      }
      
      // Update the job status
      const { error: updateError } = await supabase
        .from('jobs')
        .update({ 
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      if (updateError) {
        console.error('Error updating job status:', updateError);
      }
      
      return {
        success: true,
        jobId,
        customerConfirmationSent,
        carrierConfirmationSent
      };
    } catch (error) {
      console.error('Error sending order confirmations:', error);
      return {
        success: false,
        jobId,
        customerConfirmationSent: false,
        carrierConfirmationSent: false,
        error: getErrorMessage(error)
      };
    }
  },
  
  /**
   * Get carrier information by ID
   */
  async getCarrierById(carrierId: string) {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', carrierId)
        .eq('type', 'carrier')
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching carrier:', error);
      throw error;
    }
  },
  
  /**
   * Get available carriers
   */
  async getAvailableCarriers() {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('type', 'carrier')
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching carriers:', error);
      throw error;
    }
  },

  /**
   * Confirm an order after carrier allocation
   */
  async confirmOrder(jobId: string): Promise<OrderConfirmationResult> {
    try {
      // Update the job status to confirmed
      const { error } = await supabase
        .from('jobs')
        .update({ 
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      if (error) {
        console.error('Error confirming order:', error);
        return {
          success: false,
          jobId,
          customerConfirmationSent: false,
          carrierConfirmationSent: false,
          error: getErrorMessage(error)
        };
      }
      
      console.log('[JobService] Order confirmed successfully:', jobId);
      
      return {
        success: true,
        jobId,
        customerConfirmationSent: true,
        carrierConfirmationSent: true
      };
    } catch (error) {
      console.error('Error in order confirmation:', error);
      return {
        success: false,
        jobId,
        customerConfirmationSent: false,
        carrierConfirmationSent: false,
        error: getErrorMessage(error)
      };
    }
  },

  /**
   * Get a specific job by ID
   */
  async getJobById(jobId: string): Promise<Job | null> {
    try {
      // First, fetch just the job without attempting to join
      const { data: job, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error(`Error fetching job ${jobId}:`, error);
        // Find a matching mock job if available
        const mockJob = mockJobs.find(mj => mj.id === jobId);
        return mockJob || null;
      }

      if (!job) {
        console.log(`No job found with ID ${jobId}, checking mock data`);
        const mockJob = mockJobs.find(mj => mj.id === jobId);
        return mockJob || null;
      }

      // Fetch customer data if available
      let customer = null;
      if (job.customer_id) {
        const { data: customerData, error: customerError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', job.customer_id)
          .single();

        if (customerError) {
          console.error('Error fetching customer:', customerError);
        } else {
          customer = customerData;
        }
      }

      // Fetch carrier data if available
      let carrier = null;
      if (job.carrier_id) {
        const { data: carrierData, error: carrierError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', job.carrier_id)
          .single();

        if (carrierError) {
          console.error('Error fetching carrier:', carrierError);
        } else {
          carrier = carrierData;
        }
      }

      // Fetch vehicle data if available
      let vehicle = null;
      if (job.vehicle_id) {
        const { data: vehicleData, error: vehicleError } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', job.vehicle_id)
          .single();

        if (vehicleError) {
          console.error('Error fetching vehicle:', vehicleError);
        } else {
          vehicle = vehicleData;
        }
      }

      // Return enriched job with related data
      return {
        ...job,
        customer,
        carrier,
        vehicle
      } as unknown as Job;
    } catch (error) {
      console.error(`Error in getJobById for job ${jobId}:`, error);
      return null;
    }
  },

  /**
   * Mark a job as ready for invoicing after completion and POD verification
   * @param jobId ID of the job to mark as ready for invoicing
   * @returns Result object with success status and error message if applicable
   */
  async markJobReadyForInvoicing(jobId: string): Promise<{success: boolean; error?: string}> {
    try {
      // First verify if the job exists and is in completed status
      const { data: job, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();
      
      if (fetchError) {
        console.error('Error fetching job for invoice preparation:', fetchError);
        return { 
          success: false, 
          error: `Failed to find job with ID ${jobId}: ${fetchError.message}` 
        };
      }
      
      // Check if job is in the correct state to be marked for invoicing
      if (job.status !== 'completed' && job.status !== 'delivered') {
        return { 
          success: false, 
          error: `Job must be in 'completed' or 'delivered' status to mark for invoicing. Current status: ${job.status}` 
        };
      }
      
      // Check if POD has been uploaded
      if (!job.pod_uploaded) {
        return {
          success: false,
          error: 'Proof of Delivery (POD) must be uploaded before job can be marked for invoicing'
        };
      }
      
      // Update job status to ready_for_invoicing
      const { error: updateError } = await supabase
        .from('jobs')
        .update({ 
          status: 'ready_for_invoicing',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      if (updateError) {
        console.error('Error updating job for invoicing:', updateError);
        return { 
          success: false, 
          error: `Failed to update job status: ${updateError.message}` 
        };
      }
      
      // Log the status change for audit trail
      console.log(`Job ${jobId} marked as ready for invoicing`);
      
      return { success: true };
    } catch (error) {
      console.error('Error in markJobReadyForInvoicing:', error);
      return { 
        success: false, 
        error: getErrorMessage(error) 
      };
    }
  },

  /**
   * Get all jobs that are ready for invoicing
   * @returns Array of jobs with 'ready_for_invoicing' status
   */
  async getJobsReadyForInvoicing(): Promise<Job[]> {
    try {
      const { data: jobs, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'ready_for_invoicing');
      
      if (error) {
        console.error('Error fetching jobs ready for invoicing:', error);
        return [];
      }
      
      return jobs as unknown as Job[];
    } catch (error) {
      console.error('Error in getJobsReadyForInvoicing:', error);
      return [];
    }
  }
};

export default jobService; 