-- AXION TMS - Complete Auth Fix SQL Script
-- Copy and paste this ENTIRE script into Supabase SQL Editor and RUN it

-- 1. Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'operations',
  department TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create permissions table
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resource, action)
);

-- 3. Create role_permissions table
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, permission_id)
);

-- 4. Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- 5. Create role_selection_logs table
CREATE TABLE IF NOT EXISTS public.role_selection_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  selected_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_selection_logs ENABLE ROW LEVEL SECURITY;

-- 7. Create liberal policies for development (we'll tighten later)
CREATE POLICY "Allow all operations for authenticated users" ON public.user_profiles FOR ALL USING (true);
CREATE POLICY "Allow all operations for permissions" ON public.permissions FOR ALL USING (true);
CREATE POLICY "Allow all operations for role_permissions" ON public.role_permissions FOR ALL USING (true);
CREATE POLICY "Allow all operations for user_roles" ON public.user_roles FOR ALL USING (true);
CREATE POLICY "Allow all operations for role_selection_logs" ON public.role_selection_logs FOR ALL USING (true);

-- 8. Insert basic permissions
INSERT INTO public.permissions (resource, action, description) VALUES
('dashboard', 'view', 'View dashboard'),
('customers', 'view', 'View customers'),
('customers', 'create', 'Create customers'),
('customers', 'edit', 'Edit customers'),
('customers', 'delete', 'Delete customers'),
('jobs', 'view', 'View jobs'),
('jobs', 'create', 'Create jobs'),
('jobs', 'edit', 'Edit jobs'),
('jobs', 'delete', 'Delete jobs'),
('carriers', 'view', 'View carriers'),
('carriers', 'create', 'Create carriers'),
('carriers', 'edit', 'Edit carriers'),
('fleet', 'view', 'View fleet'),
('users', 'view', 'View users'),
('users', 'manage', 'Manage users'),
('finance', 'view', 'View finance'),
('reports', 'view', 'View reports'),
('settings', 'view', 'View settings'),
('settings', 'edit', 'Edit settings')
ON CONFLICT (resource, action) DO NOTHING;

-- 9. Create role permissions mappings
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'admin', id FROM public.permissions
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO public.role_permissions (role, permission_id)
SELECT 'operations', id FROM public.permissions 
WHERE resource IN ('dashboard', 'customers', 'jobs', 'carriers', 'fleet')
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO public.role_permissions (role, permission_id)
SELECT 'accounts', id FROM public.permissions 
WHERE resource IN ('dashboard', 'customers', 'finance', 'reports')
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO public.role_permissions (role, permission_id)
SELECT 'sales', id FROM public.permissions 
WHERE resource IN ('dashboard', 'customers', 'reports')
ON CONFLICT (role, permission_id) DO NOTHING;

-- 10. Create auto-user profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'operations'
  );
  
  -- Also assign default role
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (NEW.id, 'operations', NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. Insert test user data (for existing users)
INSERT INTO public.user_profiles (user_id, email, first_name, last_name, role)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'first_name', 'Test'),
  COALESCE(raw_user_meta_data->>'last_name', 'User'),
  'admin'
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING; 