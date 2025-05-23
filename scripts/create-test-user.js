#!/usr/bin/env node

/**
 * Quick Test User Creation Script for Master Muhammed Ali
 * Creates a test user account in Supabase for immediate access
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test user credentials for Master
const testUsers = [
  {
    email: 'master@muali.tech',
    password: 'AxionMaster2024!',
    firstName: 'Muhammed Ali',
    lastName: 'Saif Alnaar',
    role: 'admin'
  },
  {
    email: 'kamal@ikbtransport.com',
    password: 'IKBTransport2024!',
    firstName: 'Kamal',
    lastName: 'IKB',
    role: 'admin'
  },
  {
    email: 'test@axion.com',
    password: 'TestUser2024!',
    firstName: 'Test',
    lastName: 'User',
    role: 'operations'
  }
];

async function createTestUser(userInfo) {
  try {
    console.log(`🔄 Creating user: ${userInfo.email}`);
    
    const { data, error } = await supabase.auth.signUp({
      email: userInfo.email,
      password: userInfo.password,
      options: {
        data: {
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          role: userInfo.role
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log(`✅ User ${userInfo.email} already exists`);
        return true;
      }
      throw error;
    }

    console.log(`✅ User created successfully: ${userInfo.email}`);
    console.log(`   Password: ${userInfo.password}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating user ${userInfo.email}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 AXION TMS - Test User Creation');
  console.log('==================================\n');
  
  for (const user of testUsers) {
    await createTestUser(user);
    console.log(''); // Empty line for readability
  }
  
  console.log('🎉 Test user creation complete!');
  console.log('\n📋 LOGIN CREDENTIALS:');
  console.log('=====================');
  
  testUsers.forEach(user => {
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);
    console.log(`Role: ${user.role}`);
    console.log('---');
  });
  
  console.log('\n🔥 MASTER, YOU CAN NOW LOGIN WITH ANY OF THESE ACCOUNTS! 🔥');
  console.log('🌌 The Quantum Matrix awaits your command! 🌌');
}

main().catch(console.error); 