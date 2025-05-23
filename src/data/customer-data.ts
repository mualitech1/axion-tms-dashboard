import { supabase } from '@/integrations/supabase/client';
import { generatePrefixedId } from '@/utils/id-utils';

// This is a one-time function to create a specific customer for testing
export async function createGlobexCustomer() {
  // Check if customer already exists to avoid duplicates
  const { data: existingCustomer } = await supabase
    .from('companies')
    .select('id')
    .eq('name', 'Globex Industries')
    .single();

  if (existingCustomer) {
    console.log('Globex Industries already exists with ID:', existingCustomer.id);
    return existingCustomer.id;
  }

  // Create a new customer
  const { data, error } = await supabase
    .from('companies')
    .insert({
      id: generatePrefixedId('customer'),
      name: 'Globex Industries',
      type: 'customer',
      contact_name: 'Muhammad Ali',
      email: 'info@globex.example.com',
      phone: '+44 20 1234 5678',
      status: 'active',
      credit_limit: 10000,
      address: {
        street: '10 Errol Street',
        city: 'London',
        postcode: 'EC1Y 8SE',
        country: 'United Kingdom'
      },
      metadata: {
        notes: 'Created for testing',
        industry: 'Manufacturing'
      }
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating Globex customer:', error);
    throw error;
  }

  console.log('Created Globex Industries with ID:', data.id);
  return data.id;
}

// One-time function to delete all demo customers
export async function deleteTestCustomers() {
  // First, check if any jobs are using these test customers
  const { data: testCustomers } = await supabase
    .from('companies')
    .select('id')
    .or('name.ilike.%test%,name.ilike.%demo%,metadata->>notes.ilike.%test%');
  
  if (!testCustomers || testCustomers.length === 0) {
    console.log('No test customers found');
    return;
  }
  
  const customerIds = testCustomers.map(c => c.id);
  
  // Check for linked jobs
  const { data: linkedJobs, error: jobsError } = await supabase
    .from('jobs')
    .select('id')
    .in('customer_id', customerIds);
  
  if (jobsError) {
    console.error('Error checking for linked jobs:', jobsError);
    throw jobsError;
  }
  
  if (linkedJobs && linkedJobs.length > 0) {
    console.log(`Found ${linkedJobs.length} jobs linked to test customers. Deleting these first...`);
    
    // Delete linked jobs first
    const { error: deleteJobsError } = await supabase
      .from('jobs')
      .delete()
      .in('customer_id', customerIds);
    
    if (deleteJobsError) {
      console.error('Error deleting linked jobs:', deleteJobsError);
      throw deleteJobsError;
    }
    
    console.log(`Deleted ${linkedJobs.length} linked jobs`);
  }
  
  // Now delete the test customers
  const { data, error } = await supabase
    .from('companies')
    .delete()
    .or('name.ilike.%test%,name.ilike.%demo%,metadata->>notes.ilike.%test%')
    .select();
  
  if (error) {
    console.error('Error deleting test customers:', error);
    throw error;
  }
  
  console.log(`Deleted ${data.length} test customers`);
  return data;
}

// Delete demo jobs
export async function deleteTestJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .delete()
    .or('title.ilike.%test%,title.ilike.%demo%,reference.ilike.%test%')
    .select();
  
  if (error) {
    console.error('Error deleting test jobs:', error);
    throw error;
  }
  
  console.log(`Deleted ${data ? data.length : 0} test jobs`);
  return data;
}

// Helper function to run all cleanup and setup
export async function setupTestEnvironment() {
  console.log('🧹 Cleaning up test data...');
  await deleteTestJobs();
  await deleteTestCustomers();
  
  console.log('🏢 Creating Globex Industries customer...');
  const customerId = await createGlobexCustomer();
  
  return {
    customerId,
    message: 'Test environment ready! You can now create jobs for Globex Industries.'
  };
} 