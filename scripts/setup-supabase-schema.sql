-- Axion TMS Database Schema Setup
-- Execute this in Supabase SQL Editor

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'operations',
  department TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'active',
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index on user_id
CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_user_id_idx ON public.user_profiles(user_id);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow service role to do everything
CREATE POLICY "Service role can manage all profiles" ON public.user_profiles
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, first_name, last_name, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'operations'),
    COALESCE(NEW.raw_user_meta_data->>'first_name', '') || ' ' || COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create app_roles enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE app_role AS ENUM ('admin', 'operations', 'accounts', 'sales', 'driver', 'customer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Insert test data for development
INSERT INTO public.user_profiles (user_id, email, first_name, last_name, role, department, status)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'master@muali.tech', 'Muhammed Ali', 'Saif Alnaar', 'admin', 'Executive', 'active'),
  ('00000000-0000-0000-0000-000000000002', 'kamal@ikbtransport.com', 'Kamal', 'IKB', 'admin', 'Management', 'active'),
  ('00000000-0000-0000-0000-000000000003', 'test@axion.com', 'Test', 'User', 'operations', 'Operations', 'active')
ON CONFLICT (user_id) DO NOTHING; 