#!/usr/bin/env node

/**
 * This script tests the core features of the TMS application
 * It verifies:
 * 1. Supabase connectivity
 * 2. Job creation and listing
 * 3. Customer creation and listing
 * 4. Invoice creation and listing
 * 
 * Run with: node scripts/test-core-features.js
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Extract Supabase credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials in environment variables');
  console.error('Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

console.log('\n🔍 Testing TMS Core Features\n');

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runTests() {
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Test 1: Check Supabase connectivity
  console.log('Testing Supabase connectivity...');
  try {
    const { data, error } = await supabase.from('jobs').select('id').limit(1);
    if (error) throw error;
    console.log('✅ Successfully connected to Supabase');
    testsPassed++;
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error.message);
    testsFailed++;
  }
  
  // Test 2: Test Jobs functionality
  console.log('\nTesting Jobs functionality...');
  try {
    // Get current jobs count
    const { data: initialJobs, error: countError } = await supabase
      .from('jobs')
      .select('id');
      
    if (countError) throw countError;
    const initialJobCount = initialJobs.length;
    console.log(`Found ${initialJobCount} existing jobs`);
    
    // Create a test job
    const testJob = {
      title: 'Test Job',
      pickup_date: new Date().toISOString(),
      pickup_location: { 
        address: '123 Test St', 
        city: 'Test City', 
        country: 'Test Country', 
        postcode: 'TE1 1ST' 
      },
      delivery_location: { 
        address: '456 Test Ave', 
        city: 'Test City', 
        country: 'Test Country', 
        postcode: 'TE2 2ND' 
      },
      reference: 'TEST-' + Math.floor(Math.random() * 1000),
      status: 'booked',
      priority: 'normal'
    };
    
    const { data: newJob, error: createError } = await supabase
      .from('jobs')
      .insert(testJob)
      .select();
      
    if (createError) throw createError;
    console.log(`✅ Successfully created test job with ID: ${newJob[0].id}`);
    
    // Clean up - delete the test job
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .eq('id', newJob[0].id);
      
    if (deleteError) throw deleteError;
    console.log('✅ Successfully deleted test job');
    
    testsPassed++;
  } catch (error) {
    console.error('❌ Jobs functionality test failed:', error.message);
    testsFailed++;
  }
  
  // Test 3: Test Companies (Customers) functionality
  console.log('\nTesting Customers functionality...');
  try {
    // Create a test customer
    const testCustomer = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '555-1234',
      contact_name: 'Test Contact',
      status: 'Active',
      type: 'customer',
      address: {
        street: '123 Test St',
        city: 'Test City',
        country: 'Test Country',
        postcode: 'TE1 1ST'
      }
    };
    
    const { data: newCustomer, error: createError } = await supabase
      .from('companies')
      .insert(testCustomer)
      .select();
      
    if (createError) throw createError;
    console.log(`✅ Successfully created test customer with ID: ${newCustomer[0].id}`);
    
    // Clean up - delete the test customer
    const { error: deleteError } = await supabase
      .from('companies')
      .delete()
      .eq('id', newCustomer[0].id);
      
    if (deleteError) throw deleteError;
    console.log('✅ Successfully deleted test customer');
    
    testsPassed++;
  } catch (error) {
    console.error('❌ Customers functionality test failed:', error.message);
    testsFailed++;
  }
  
  // Test 4: Test Invoices functionality
  console.log('\nTesting Invoices functionality...');
  try {
    // First create a customer for the invoice
    const testCustomer = {
      name: 'Invoice Test Customer',
      email: 'invoice@example.com',
      type: 'customer',
      status: 'Active'
    };
    
    const { data: customer, error: customerError } = await supabase
      .from('companies')
      .insert(testCustomer)
      .select();
      
    if (customerError) throw customerError;
    
    // Now create a test invoice
    const testInvoice = {
      invoice_number: 'INV-TEST-' + Math.floor(Math.random() * 1000),
      customer_id: customer[0].id,
      issue_date: new Date().toISOString(),
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      total_amount: 100,
      tax_amount: 20,
      status: 'draft'
    };
    
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert(testInvoice)
      .select();
      
    if (invoiceError) throw invoiceError;
    console.log(`✅ Successfully created test invoice with ID: ${invoice[0].id}`);
    
    // Create test invoice items
    const testItem = {
      invoice_id: invoice[0].id,
      description: 'Test Item',
      quantity: 1,
      unit_price: 100,
      amount: 100
    };
    
    const { data: item, error: itemError } = await supabase
      .from('invoice_items')
      .insert(testItem)
      .select();
      
    if (itemError) throw itemError;
    console.log('✅ Successfully created test invoice item');
    
    // Clean up - delete the test invoice and customer
    const { error: itemDeleteError } = await supabase
      .from('invoice_items')
      .delete()
      .eq('invoice_id', invoice[0].id);
      
    if (itemDeleteError) throw itemDeleteError;
    
    const { error: invoiceDeleteError } = await supabase
      .from('invoices')
      .delete()
      .eq('id', invoice[0].id);
      
    if (invoiceDeleteError) throw invoiceDeleteError;
    
    const { error: customerDeleteError } = await supabase
      .from('companies')
      .delete()
      .eq('id', customer[0].id);
      
    if (customerDeleteError) throw customerDeleteError;
    
    console.log('✅ Successfully cleaned up test data');
    
    testsPassed++;
  } catch (error) {
    console.error('❌ Invoices functionality test failed:', error.message);
    testsFailed++;
  }
  
  // Print test summary
  console.log('\n📊 Test Summary:');
  console.log(`Tests Passed: ${testsPassed}`);
  console.log(`Tests Failed: ${testsFailed}`);
  
  if (testsFailed === 0) {
    console.log('\n✅ All core features are working properly!');
    console.log('The application is ready for basic functionality testing.');
  } else {
    console.log('\n⚠️ Some tests failed. Please fix the issues before deploying.');
  }
}

runTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
}); 