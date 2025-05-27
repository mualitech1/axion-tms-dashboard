import { LoaderFunctionArgs } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export async function jobDetailsLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  
  if (!id) {
    throw new Response('Job ID is required', { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        customer:customers!jobs_customer_id_fkey (
          company_name,
          finance_contact,
          operations_contact,
          main_address
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      // Check if it's a "not found" error
      if (error.code === 'PGRST116' || error.message.includes('No rows returned')) {
        throw new Response('Job not found', { 
          status: 404,
          statusText: 'Job Not Found'
        });
      }
      
      // For other database errors
      console.error('Database error loading job:', error);
      throw new Response('Failed to load job', { 
        status: 500,
        statusText: 'Internal Server Error'
      });
    }

    if (!data) {
      throw new Response('Job not found', { 
        status: 404,
        statusText: 'Job Not Found'
      });
    }

    return data;
  } catch (error) {
    // If it's already a Response, re-throw it
    if (error instanceof Response) {
      throw error;
    }
    
    // For unexpected errors
    console.error('Unexpected error loading job:', error);
    throw new Response('Failed to load job', { 
      status: 500,
      statusText: 'Internal Server Error'
    });
  }
}

export async function jobEditLoader({ params }: LoaderFunctionArgs) {
  // Reuse the same logic for editing
  return jobDetailsLoader({ params } as LoaderFunctionArgs);
} 