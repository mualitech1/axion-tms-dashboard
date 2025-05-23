import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { jobService } from '@/services/job-service';
import { supabase } from '@/integrations/supabase/client';
import { nuclearCleanJobPayload } from '@/utils/nuclear-job-cleaner';
import { ulid } from 'ulid';
import { Database } from '@/integrations/supabase/types';

// Define proper types for our test data
type JobInsertPayload = Database['public']['Tables']['jobs']['Insert'];

/**
 * Test page for debugging job creation issues with job_reference
 */
export default function JobTestPage() {
  const [testResults, setTestResults] = React.useState<{
    test1: { success: boolean; message: string };
    test2: { success: boolean; message: string };
    test3: { success: boolean; message: string };
  }>({
    test1: { success: false, message: 'Not run yet' },
    test2: { success: false, message: 'Not run yet' },
    test3: { success: false, message: 'Not run yet' },
  });
  
  const [isRunning, setIsRunning] = React.useState(false);
  
  // Test 1: Normal job creation with only 'reference'
  const runTest1 = async () => {
    setIsRunning(true);
    try {
      // Create a job with only 'reference'
      const jobData: JobInsertPayload = {
        id: ulid(),
        reference: `REF-${Date.now().toString(36).toUpperCase()}`,
        title: 'Test 1: Normal Reference',
        customer_id: '23230625-29b5-4b75-9a92-27168181a240', // Use a real customer ID
        status: 'booked',
        priority: 'medium',
        pickup_date: new Date().toISOString(),
        pickup_location: { address: '123 Test St', city: 'London', postcode: 'E1 1AA', country: 'UK' },
        delivery_location: { address: '456 Test St', city: 'Birmingham', postcode: 'B1 1BB', country: 'UK' }
      };
      
      // Insert directly using supabase client
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select();
      
      if (error) {
        setTestResults(prev => ({
          ...prev,
          test1: { success: false, message: `Error: ${error.message}` }
        }));
      } else {
        setTestResults(prev => ({
          ...prev,
          test1: { success: true, message: `Success! Job created with ID: ${data[0].id}` }
        }));
      }
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        test1: { success: false, message: `Exception: ${(error as Error).message}` }
      }));
    } finally {
      setIsRunning(false);
    }
  };
  
  // Test 2: Job with job_reference field
  const runTest2 = async () => {
    setIsRunning(true);
    try {
      // Create a job with job_reference
      const jobData = {
        id: ulid(),
        reference: `REF-${Date.now().toString(36).toUpperCase()}`,
        job_reference: `JOBREF-${Date.now().toString(36).toUpperCase()}`, // This will be removed by the cleaner
        title: 'Test 2: With job_reference',
        customer_id: '23230625-29b5-4b75-9a92-27168181a240', // Use a real customer ID
        status: 'booked',
        priority: 'medium',
        pickup_date: new Date().toISOString(),
        pickup_location: { address: '789 Test St', city: 'Manchester', postcode: 'M1 1CC', country: 'UK' },
        delivery_location: { address: '101 Test St', city: 'Leeds', postcode: 'L1 1DD', country: 'UK' }
      };
      
      // Use our nuclear cleaner utility
      const cleanedData = nuclearCleanJobPayload(jobData) as JobInsertPayload;
      
      // Insert the cleaned data
      const { data, error } = await supabase
        .from('jobs')
        .insert([cleanedData])
        .select();
      
      if (error) {
        setTestResults(prev => ({
          ...prev,
          test2: { success: false, message: `Error: ${error.message}` }
        }));
      } else {
        setTestResults(prev => ({
          ...prev,
          test2: { success: true, message: `Success! Job created with ID: ${data[0].id}` }
        }));
      }
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        test2: { success: false, message: `Exception: ${(error as Error).message}` }
      }));
    } finally {
      setIsRunning(false);
    }
  };
  
  // Test 3: Use jobService
  const runTest3 = async () => {
    setIsRunning(true);
    try {
      // Use the job service with form data
      const result = await jobService.createJob({
        jobTitle: 'Test 3: Via JobService',
        vehicleType: '7.5t',
        priority: 'medium',
        customer: 'Oscorp', // This should match a customer name in your database
        pickupDate: new Date(),
        rate: '450',
        productType: 'General Cargo',
        additionalInformation: 'Test via jobService',
        saveTemplate: false,
        collection: {
          companyName: 'Test Origin Ltd',
          contactName: 'John Origin',
          addressLine1: '123 Origin St',
          city: 'London',
          postCode: 'E1 1AA',
          reference: 'ORG-123',
          time: '09:00',
          additionalComments: 'Collection test',
          instructions: 'Ring bell'
        },
        delivery: {
          companyName: 'Test Destination Ltd',
          contactName: 'Jane Destination',
          addressLine1: '456 Destination Ave',
          city: 'Manchester',
          postCode: 'M1 2BB',
          reference: 'DEST-456',
          time: '14:00',
          additionalComments: 'Delivery test',
          instructions: 'Leave at reception'
        }
      });
      
      if (!result.success) {
        setTestResults(prev => ({
          ...prev,
          test3: { success: false, message: `Error: ${result.error}` }
        }));
      } else {
        setTestResults(prev => ({
          ...prev,
          test3: { success: true, message: `Success! Job created with ID: ${result.jobId}` }
        }));
      }
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        test3: { success: false, message: `Exception: ${(error as Error).message}` }
      }));
    } finally {
      setIsRunning(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <Card className="bg-aximo-card shadow-xl border-aximo-border">
        <CardHeader>
          <CardTitle className="text-aximo-text text-2xl">Job Creation Nuclear Test</CardTitle>
          <CardDescription className="text-aximo-text-secondary">
            Test different job creation scenarios to ensure no job_reference issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Test 1 */}
            <Card className={`p-4 border ${testResults.test1.success ? 'border-green-500 bg-green-900/20' : 'border-aximo-border bg-aximo-darker/50'}`}>
              <h3 className="text-lg text-aximo-text mb-2">Test 1: Normal Reference</h3>
              <p className="text-sm text-aximo-text-secondary mb-4">
                Create a job with a normal 'reference' field.
              </p>
              <div className="h-24 overflow-y-auto text-xs text-aximo-text-secondary bg-aximo-dark/40 p-2 rounded mb-4">
                {testResults.test1.message}
              </div>
              <Button 
                onClick={runTest1} 
                disabled={isRunning}
                className="w-full"
              >
                Run Test 1
              </Button>
            </Card>
            
            {/* Test 2 */}
            <Card className={`p-4 border ${testResults.test2.success ? 'border-green-500 bg-green-900/20' : 'border-aximo-border bg-aximo-darker/50'}`}>
              <h3 className="text-lg text-aximo-text mb-2">Test 2: With job_reference</h3>
              <p className="text-sm text-aximo-text-secondary mb-4">
                Create a job with 'job_reference' field (should be cleaned).
              </p>
              <div className="h-24 overflow-y-auto text-xs text-aximo-text-secondary bg-aximo-dark/40 p-2 rounded mb-4">
                {testResults.test2.message}
              </div>
              <Button 
                onClick={runTest2} 
                disabled={isRunning}
                className="w-full"
              >
                Run Test 2
              </Button>
            </Card>
            
            {/* Test 3 */}
            <Card className={`p-4 border ${testResults.test3.success ? 'border-green-500 bg-green-900/20' : 'border-aximo-border bg-aximo-darker/50'}`}>
              <h3 className="text-lg text-aximo-text mb-2">Test 3: Via JobService</h3>
              <p className="text-sm text-aximo-text-secondary mb-4">
                Create a job using the jobService.
              </p>
              <div className="h-24 overflow-y-auto text-xs text-aximo-text-secondary bg-aximo-dark/40 p-2 rounded mb-4">
                {testResults.test3.message}
              </div>
              <Button 
                onClick={runTest3} 
                disabled={isRunning}
                className="w-full"
              >
                Run Test 3
              </Button>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="border-t border-aximo-border pt-4">
          <div className="w-full text-center text-aximo-text-secondary text-sm">
            Run these tests to confirm job creation is working properly.
            <div className="mt-2">
              ⚛️ <span className="text-aximo-primary font-bold">Quantum Nuclear Shield</span> is now active!
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}