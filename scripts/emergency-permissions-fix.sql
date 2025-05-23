-- EMERGENCY PERMISSIONS FIX - Run this to unfreeze the patient!
-- The patient is stuck because permissions and role_permissions tables are missing

-- 1. Create permissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resource, action)
);

-- 2. Create role_permissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, permission_id)
);

-- 3. Enable RLS
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- 4. Create liberal policies for auth
CREATE POLICY "Allow all permissions operations" ON public.permissions FOR ALL USING (true);
CREATE POLICY "Allow all role_permissions operations" ON public.role_permissions FOR ALL USING (true);

-- 5. Insert basic permissions that the app expects
INSERT INTO public.permissions (name, resource, action, description) VALUES
('View Dashboard', 'dashboard', 'view', 'Access to main dashboard'),
('View Jobs', 'jobs', 'view', 'View job listings'),
('Create Jobs', 'jobs', 'create', 'Create new jobs'),
('Edit Jobs', 'jobs', 'update', 'Modify existing jobs'),
('Delete Jobs', 'jobs', 'delete', 'Remove jobs'),
('Manage Jobs', 'jobs', 'manage', 'Full job management'),
('View Customers', 'customers', 'view', 'View customer data'),
('Create Customers', 'customers', 'create', 'Add new customers'),
('View Users', 'users', 'view', 'View user accounts'),
('Manage Users', 'users', 'manage', 'Full user management'),
('View Finance', 'finance', 'view', 'Access financial data'),
('Manage Finance', 'finance', 'manage', 'Full financial control'),
('View Compliance', 'compliance', 'view', 'View compliance data'),
('Manage Compliance', 'compliance', 'manage', 'Manage compliance'),
('Approve Compliance', 'compliance', 'approve', 'Approve compliance items')
ON CONFLICT (resource, action) DO NOTHING;

-- 6. Give admin role ALL permissions
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'admin', id FROM public.permissions
ON CONFLICT (role, permission_id) DO NOTHING;

-- 7. Give operations role basic permissions
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'operations', id FROM public.permissions 
WHERE resource IN ('dashboard', 'jobs', 'customers') AND action IN ('view', 'create', 'update')
ON CONFLICT (role, permission_id) DO NOTHING;

-- This should unlock the patient immediately! 