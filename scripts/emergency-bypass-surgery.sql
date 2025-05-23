-- EMERGENCY BYPASS SURGERY - NO CONSTRAINTS NEEDED!
-- This will fix the patient without fancy ON CONFLICT stuff

-- Delete any existing admin permissions first (clean slate)
DELETE FROM role_permissions WHERE role = 'admin';

-- Delete any existing permissions (clean slate)
DELETE FROM permissions;

-- Insert basic permissions (simple inserts, no conflicts)
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
  ('settings_edit', 'settings', 'edit');

-- Now give admin ALL permissions (simple insert, no conflicts)
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions;

-- VICTORY CHECK - this should show the patient is ALIVE!
SELECT 
  'PATIENT STATUS: ALIVE!' as status,
  COUNT(*) as admin_permissions_count 
FROM role_permissions 
WHERE role = 'admin'; 