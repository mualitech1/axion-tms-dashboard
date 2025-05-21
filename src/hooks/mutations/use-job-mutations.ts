import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { queryClient } from '@/config/query-client';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/error-handler';
import { Job as DBJob } from '@/types/database';
import { ulid } from 'ulid';

const ALLOWED_FIELDS = [
  'id', 'reference', 'title', 'customer_id', 'carrier_id', 'vehicle_id', 'driver_id',
  'status', 'priority', 'pickup_date', 'pickup_location', 'delivery_location',
  'estimated_duration', 'value', 'notes', 'created_at', 'updated_at', 'created_by',
  'pod_uploaded', 'pod_document_id', 'issue_details'
];

const REQUIRED_FIELDS = [
  'id', 'reference', 'title', 'pickup_date', 'pickup_location', 'delivery_location'
];

type JobInput = Partial<Omit<DBJob, 'customer' | 'carrier' | 'vehicle' | 'driver'>> & {
  [key: string]: unknown;
};

function stripRelationships(job: JobInput): JobInput {
  const { customer, carrier, vehicle, driver, ...rest } = job;
  return rest;
}

export function useJobMutations() {
  const toast = useToast();

  const createJob = useMutation({
    mutationFn: async (newJobData: JobInput) => {
      try {
        console.log('🚀 RAW JOB INPUT:', newJobData);
        
        // CRITICAL FIX: Handle job_reference properly before anything else
        // If job_reference exists anywhere in the payload, convert it to reference and remove job_reference
        if ('job_reference' in newJobData) {
          console.warn('⚠️ Found job_reference in payload - converting to reference');
          if (!newJobData.reference && newJobData.job_reference) {
            newJobData.reference = String(newJobData.job_reference);
          }
          // Always delete job_reference to prevent it from causing schema mismatch
          delete newJobData.job_reference;
        }

        // Generate ULID if not provided
        if (!newJobData.id) {
          newJobData.id = ulid();
        }

        // Generate reference if not provided
        if (!newJobData.reference) {
          const prefix = 'JOB';
          const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
          const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
          newJobData.reference = `${prefix}-${timestamp}-${random}`;
        }

        // Remove joined relationships
        const cleanJob = stripRelationships(newJobData);
        
        // Filter to allowed fields only
        const filteredJob: Record<string, unknown> = {};
        for (const key of ALLOWED_FIELDS) {
          if (cleanJob[key] !== undefined) {
            filteredJob[key] = cleanJob[key];
          }
        }

        // DEFENSIVE: Ensure required fields are present
        for (const field of REQUIRED_FIELDS) {
          if (!filteredJob[field]) {
            // For reference field specifically, make extra sure we have it
            if (field === 'reference') {
              filteredJob.reference = `JOB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7)}`;
              console.warn(`⚠️ Generated emergency reference: ${filteredJob.reference}`);
            } else {
              throw new Error(`Missing required field: ${field}`);
            }
          }
        }

        // Validate and format JSONB fields (with better error handling)
        try {
          filteredJob.pickup_location = typeof filteredJob.pickup_location === 'object'
            ? filteredJob.pickup_location
            : JSON.parse(typeof filteredJob.pickup_location === 'string' 
                ? filteredJob.pickup_location 
                : '{"address":"", "city":"", "postcode":"", "country":""}');
          
          filteredJob.delivery_location = typeof filteredJob.delivery_location === 'object'
            ? filteredJob.delivery_location
            : JSON.parse(typeof filteredJob.delivery_location === 'string' 
                ? filteredJob.delivery_location 
                : '{"address":"", "city":"", "postcode":"", "country":""}');
        } catch (parseError) {
          console.error('❌ ERROR PARSING LOCATION DATA:', parseError);
          // Provide default location objects if parsing fails
          filteredJob.pickup_location = {"address":"", "city":"", "postcode":"", "country":""};
          filteredJob.delivery_location = {"address":"", "city":"", "postcode":"", "country":""};
        }

        // Validate pickup_date is ISO string
        if (typeof filteredJob.pickup_date === 'string') {
          const date = new Date(filteredJob.pickup_date as string);
          if (isNaN(date.getTime())) {
            // If invalid date, use current date
            filteredJob.pickup_date = new Date().toISOString();
            console.warn('⚠️ Invalid pickup_date - using current date');
          } else {
            filteredJob.pickup_date = date.toISOString();
          }
        } else if (Object.prototype.toString.call(filteredJob.pickup_date) === '[object Date]') {
          filteredJob.pickup_date = (filteredJob.pickup_date as Date).toISOString();
        } else {
          // If missing or wrong type, use current date
          filteredJob.pickup_date = new Date().toISOString();
          console.warn('⚠️ Missing or invalid pickup_date - using current date');
        }

        // Log the final job data before submitting
        console.log('🚀 FINAL JOB PAYLOAD:', filteredJob);

        // First check if the table exists and has the expected schema
        const { error: schemaError } = await supabase
          .from('jobs')
          .select('id, reference')
          .limit(1);
        
        if (schemaError) {
          console.error('❌ SCHEMA VALIDATION ERROR:', schemaError);
          
          // Check specifically for reference field issues in schema errors
          if (schemaError.message.includes('reference') || schemaError.message.includes('job_reference')) {
            throw new Error('Database schema error: Please ensure the field "reference" is used in the database schema.');
          }
          
          throw new Error(`Database schema error: ${schemaError.message}`);
        }

        // Extract typed values for the insert operation
        const jobPayload = {
          id: filteredJob.id as string,
          reference: filteredJob.reference as string,
          title: filteredJob.title as string,
          customer_id: filteredJob.customer_id as string | null,
          carrier_id: filteredJob.carrier_id as string | null,
          vehicle_id: filteredJob.vehicle_id as string | null,
          driver_id: filteredJob.driver_id as string | null,
          status: (filteredJob.status as string) || 'booked',
          priority: (filteredJob.priority as string) || 'medium',
          pickup_date: filteredJob.pickup_date as string,
          // Ensure proper Json typing for JSONB fields
          pickup_location: filteredJob.pickup_location as Record<string, unknown>,
          delivery_location: filteredJob.delivery_location as Record<string, unknown>,
          estimated_duration: filteredJob.estimated_duration as number | null,
          value: filteredJob.value as number | null,
          notes: filteredJob.notes as string | null,
          pod_uploaded: (filteredJob.pod_uploaded as boolean) || false,
          pod_document_id: filteredJob.pod_document_id as string | null,
          issue_details: filteredJob.issue_details as string | null
        };

        // FINAL DEFENSIVE CHECK: Ensure absolutely no job_reference field is present
        // This is the critical check that prevents schema mismatch
        const payloadForSupabase = { ...jobPayload }; // Create a mutable copy
        if ('job_reference' in payloadForSupabase) {
          console.warn("🛡️ CRITICAL DEFENSIVE DELETION: 'job_reference' found in final payload, deleting it");
          delete (payloadForSupabase as any).job_reference;
        }
        
        // FINAL DEFENSIVE CHECK: Ensure reference field is always present and valid
        if (!payloadForSupabase.reference || typeof payloadForSupabase.reference !== 'string'){
            const emergencyReference = `JOB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5)}`;
            console.warn(`🛡️ CRITICAL DEFENSIVE FIX: 'reference' field missing or invalid in final payload. Setting emergency reference: ${emergencyReference}`);
            payloadForSupabase.reference = emergencyReference;
        }

        console.log('🛡️ FINAL PAYLOAD DIRECTLY BEFORE SUPABASE INSERT:', JSON.stringify(payloadForSupabase, null, 2));

        // Use the sanitized payload for insert
        const { data, error } = await supabase
          .from('jobs')
          .insert([payloadForSupabase as any])
          .select()
          .single();

        if (error) {
          console.error('❌ SUPABASE ERROR:', error);
          
          // Enhanced error handling for common issues
          if (error.message.includes('duplicate key')) {
            throw new Error('A job with this ID already exists');
          } else if (error.message.includes('violates foreign key constraint')) {
            throw new Error('Invalid relationship: Customer, carrier, vehicle or driver does not exist');
          } else if (error.message.includes('violates not-null constraint')) {
            // Extract the field name from error message
            const fieldMatch = error.message.match(/column "([^"]+)"/);
            const fieldName = fieldMatch ? fieldMatch[1] : 'unknown field';
            throw new Error(`Missing required field: ${fieldName}`);
          } else if (error.message.includes('has no field "reference"')) {
            throw new Error('Schema mismatch: The database expects "reference" for job identifiers. Please update your code.');
          } else if (error.message.includes('has no field')) {
            const fieldMatch = error.message.match(/has no field "([^"]+)"/);
            const fieldName = fieldMatch ? fieldMatch[1] : 'unknown field';
            throw new Error(`Schema mismatch: The field "${fieldName}" does not exist in the database. Please contact support.`);
          } else {
            throw error;
          }
        }

        console.log('✅ SUCCESS:', data);
        return data as DBJob;
      } catch (error) {
        console.error('💥 MUTATION ERROR:', error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.toast({
        title: 'Job Created',
        description: 'The job has been successfully created.',
      });
    },
    onError: (error: Error) => {
      console.error('🔥 MUTATION FAILED:', error);
      toast.toast({
        title: 'Error Creating Job',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  return { createJob };
}