import { User } from '@supabase/supabase-js';

/**
 * App Role enum matching the Supabase database enum
 */
export enum AppRole {
  Admin = 'admin',
  Operations = 'operations',
  Accounts = 'accounts', 
  Sales = 'sales',
  Driver = 'driver',
  Customer = 'customer'
}

/**
 * Permission interface matching the permissions table structure
 */
export interface Permission {
  id: string;
  name: string;
  description: string | null;
  resource: string;
  action: string;
  created_at: string;
  updated_at: string;
}

/**
 * Role interface matching the roles table structure
 */
export interface Role {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  is_system: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * User Role Assignment interface
 */
export interface UserRoleAssignment {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

/**
 * Role Permission Assignment interface
 */
export interface RolePermission {
  id: string;
  role: AppRole;
  permission_id: string;
  created_at: string;
}

/**
 * Auth State with role-based functionality
 */
export interface AuthState {
  user: User | null;
  activeRole: AppRole | null;
  permissions: Permission[];
  loading: boolean;
  isInitialized: boolean;
}

/**
 * Resource action mapping for permission checks
 */
export const ResourceActions = {
  // Job actions
  JOBS_VIEW: { resource: 'jobs', action: 'view' },
  JOBS_CREATE: { resource: 'jobs', action: 'create' },
  JOBS_UPDATE: { resource: 'jobs', action: 'update' },
  JOBS_DELETE: { resource: 'jobs', action: 'delete' },
  JOBS_MANAGE: { resource: 'jobs', action: 'manage' },
  
  // Finance actions
  FINANCE_VIEW: { resource: 'finance', action: 'view' },
  FINANCE_MANAGE: { resource: 'finance', action: 'manage' },
  
  // User actions
  USERS_VIEW: { resource: 'users', action: 'view' },
  USERS_MANAGE: { resource: 'users', action: 'manage' },
  
  // Compliance actions
  COMPLIANCE_VIEW: { resource: 'compliance', action: 'view' },
  COMPLIANCE_MANAGE: { resource: 'compliance', action: 'manage' },
  COMPLIANCE_APPROVE: { resource: 'compliance', action: 'approve' }
}; 