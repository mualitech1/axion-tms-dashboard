-- EMERGENCY ADMIN PERMISSIONS SURGERY
-- This will give admin role ALL permissions that exist

-- First, let's make sure we have all basic permissions
INSERT INTO permissions (name, resource, action) VALUES
  ('dashboard_view', 'dashboard', 'view'),
  ('jobs_view', 'jobs', 'view'),
  ('jobs_create', 'jobs', 'create'),
  ('jobs_edit', 'jobs', 'edit'),
  ('jobs_delete', 'jobs', 'delete'),
  ('users_view', 'users', 'view'),
  ('users_create', 'users', 'create'),
  ('users_edit', 'users', 'edit'),
  ('users_delete', 'users', 'delete'),
  ('fleet_view', 'fleet', 'view'),
  ('carriers_view', 'carriers', 'view'),
  ('settings_view', 'settings', 'view'),
  ('settings_edit', 'settings', 'edit')
ON CONFLICT (name) DO NOTHING;

-- Now give admin ALL permissions that exist
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions
ON CONFLICT (role, permission_id) DO NOTHING;

-- Double check - this should return a positive number
SELECT COUNT(*) as admin_permissions_count FROM role_permissions WHERE role = 'admin'; 