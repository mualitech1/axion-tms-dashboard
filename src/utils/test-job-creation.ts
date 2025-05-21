/**
 * Quantum Shield Test Utility
 * For validating job creation and schema compatibility
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Test function to verify job creation with different field configurations
 * This helps ensure our fixes for job_reference vs reference work properly
 */
export async function testJobCreation() {
  console.log('🧪 QUANTUM SHIELD: Testing job creation with different field configurations');
  
  // Test Case 1: Using only reference (should work)
  const job1 = {
    id: `job_${Date.now()}_1`,
    reference: `REF-${Date.now().toString(36).toUpperCase()}`,
    title: 'Test Job 1 (reference only)',
    status: 'booked',
    priority: 'medium',
    pickup_date: new Date().toISOString(),
    pickup_location: { address: '123 Test St', city: 'London', postcode: 'E1 1AA', country: 'UK' },
    delivery_location: { address: '456 Test St', city: 'Birmingham', postcode: 'B1 1BB', country: 'UK' }
  };
  
  // Test Case 2: Using job_reference (which should be converted to reference)
  const job2 = {
    id: `job_${Date.now()}_2`,
    job_reference: `JOBREF-${Date.now().toString(36).toUpperCase()}`,
    title: 'Test Job 2 (job_reference only)',
    status: 'booked',
    priority: 'medium',
    pickup_date: new Date().toISOString(),
    pickup_location: { address: '789 Test St', city: 'Manchester', postcode: 'M1 1CC', country: 'UK' },
    delivery_location: { address: '101 Test St', city: 'Leeds', postcode: 'L1 1DD', country: 'UK' }
  };
  
  // Test Case 3: Using both fields (reference should take precedence)
  const job3 = {
    id: `job_${Date.now()}_3`,
    reference: `REF-PRIORITY-${Date.now().toString(36).toUpperCase()}`,
    job_reference: `JOBREF-IGNORE-${Date.now().toString(36).toUpperCase()}`,
    title: 'Test Job 3 (both fields)',
    status: 'booked',
    priority: 'medium',
    pickup_date: new Date().toISOString(),
    pickup_location: { address: '102 Test St', city: 'Glasgow', postcode: 'G1 1EE', country: 'UK' },
    delivery_location: { address: '103 Test St', city: 'Edinburgh', postcode: 'E1 1FF', country: 'UK' }
  };
  
  // Run tests and gather results
  const results = {
    test1: { success: false, error: null, data: null },
    test2: { success: false, error: null, data: null },
    test3: { success: false, error: null, data: null }
  };
  
  try {
    // Test Case 1
    console.log('🧪 Running Test Case 1: reference only');
    const { data: data1, error: error1 } = await supabase.from('jobs').insert([job1]).select();
    results.test1 = { success: !error1, error: error1, data: data1 };
    console.log(error1 ? '❌ Test 1 Failed:' : '✅ Test 1 Passed:', error1 || data1);
    
    // Test Case 2
    console.log('🧪 Running Test Case 2: job_reference only');
    const { data: data2, error: error2 } = await supabase.from('jobs').insert([job2]).select();
    results.test2 = { success: !error2, error: error2, data: data2 };
    console.log(error2 ? '❌ Test 2 Failed:' : '✅ Test 2 Passed:', error2 || data2);
    
    // Test Case 3
    console.log('🧪 Running Test Case 3: both fields (reference should win)');
    const { data: data3, error: error3 } = await supabase.from('jobs').insert([job3]).select();
    results.test3 = { success: !error3, error: error3, data: data3 };
    console.log(error3 ? '❌ Test 3 Failed:' : '✅ Test 3 Passed:', error3 || data3);
  } catch (error) {
    console.error('💥 Unexpected error during testing:', error);
  }
  
  // Summary
  console.log('🧪 QUANTUM SHIELD TEST SUMMARY:');
  console.log(`Test 1 (reference only): ${results.test1.success ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Test 2 (job_reference only): ${results.test2.success ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Test 3 (both fields): ${results.test3.success ? '✅ PASSED' : '❌ FAILED'}`);
  
  return results;
}

/**
 * Cleanup test jobs
 */
export async function cleanupTestJobs() {
  console.log('🧹 Cleaning up test jobs...');
  const { error } = await supabase
    .from('jobs')
    .delete()
    .like('title', 'Test Job%');
  
  if (error) {
    console.error('❌ Error cleaning up test jobs:', error);
  } else {
    console.log('✅ Test jobs cleaned up successfully');
  }
} 