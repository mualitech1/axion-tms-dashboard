import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Use the canonical client instead of creating a duplicate
import { supabase } from '@/integrations/supabase/client';

export default function TestSupabase() {
  const [testResult, setTestResult] = useState<string>('No test run yet');
  const [loading, setLoading] = useState(false);

  const runSupabaseTest = async () => {
    console.log('[TEST PAGE] Starting Supabase test with canonical client...');
    setLoading(true);
    setTestResult('Testing with canonical client...');

    try {
      // Test: Simple database query with canonical client
      console.log('[TEST PAGE] Testing companies table with canonical client...');
      setTestResult('Testing companies table...');
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .limit(3);
      
      console.log('[TEST PAGE] Canonical client result:', { data, error });
      
      if (error) {
        setTestResult(`Database Error: ${error.message}`);
      } else {
        setTestResult(`SUCCESS! Canonical client works. Found ${data?.length || 0} companies.`);
      }

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('[TEST PAGE] Caught error:', err);
      setTestResult(`Caught Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={runSupabaseTest}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Supabase Connection'}
          </Button>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Test Result:</h3>
            <p className="text-sm font-mono">{testResult}</p>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>This page tests the Supabase connection using the canonical client.</p>
            <p>Check the browser console for detailed logs.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 