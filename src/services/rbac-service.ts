import { supabase } from '@/integrations/supabase/client';
import { AppRole, Permission } from '@/types/permissions';
import { getErrorMessage } from '@/utils/error-handler';

/**
 * Check if user has permission for a specific resource and action
 */
export const hasPermission = (
  permissions: Permission[],
  resource: string,
  action: string
): boolean => {
  // Check for exact permission match
  const hasExactPermission = permissions.some(
    p => p.resource === resource && p.action === action
  );
  
  if (hasExactPermission) {
    return true;
  }
  
  // Check for management permission (implies all actions)
  const hasManagePermission = permissions.some(
    p => p.resource === resource && p.action === 'manage'
  );
  
  return hasManagePermission;
};

/**
 * Get all roles assigned to a user
 */
export const getUserRoles = async (userId: string): Promise<AppRole[]> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data?.map(item => item.role as AppRole) || [];
  } catch (error) {
    console.error('Error fetching user roles:', error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Get all permissions for a specific role
 */
export const getPermissionsForRole = async (role: AppRole): Promise<Permission[]> => {
  try {
    // Get role permissions with joined permissions data
    const { data, error } = await supabase
      .from('role_permissions')
      .select(`
        permission_id,
        permissions:permission_id(*)
      `)
      .eq('role', role);
    
    if (error) throw error;
    
    // Extract and transform the permissions
    return data?.map(item => ({
      id: item.permissions.id,
      name: item.permissions.name,
      description: item.permissions.description,
      resource: item.permissions.resource,
      action: item.permissions.action,
      created_at: item.permissions.created_at,
      updated_at: item.permissions.updated_at
    })) || [];
  } catch (error) {
    console.error(`Error fetching permissions for role ${role}:`, error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Assign a role to a user
 */
export const assignRoleToUser = async (userId: string, role: AppRole): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: role
      });
    
    if (error) throw error;
  } catch (error) {
    console.error(`Error assigning role ${role} to user ${userId}:`, error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Log role selection in user login history
 */
export const logRoleSelection = async (userId: string, role: AppRole): Promise<void> => {
  try {
    // Custom query to insert into user_login_history
    const { error } = await supabase.rpc('log_user_role_selection', {
      user_id: userId,
      role: role,
      ip_address: sessionStorage.getItem('client_ip') || '',
      user_agent: navigator.userAgent
    });
    
    if (error) {
      console.error(`Error logging role selection:`, error);
    }
  } catch (error) {
    // Just log error but don't throw - this is non-critical functionality
    console.error(`Error logging role selection:`, error);
  }
};

/**
 * Get human-readable role display info
 */
export const getRoleDisplayInfo = (role: AppRole): { title: string; description: string } => {
  const roleInfo = {
    [AppRole.Admin]: {
      title: 'System Administrator',
      description: 'Full system access with all permissions'
    },
    [AppRole.Operations]: {
      title: 'Operations Manager',
      description: 'Manage day-to-day logistics operations'
    },
    [AppRole.Accounts]: {
      title: 'Accounts Manager',
      description: 'Manage financial operations and invoicing'
    },
    [AppRole.Sales]: {
      title: 'Sales Manager',
      description: 'Manage sales pipeline and customer relationships'
    },
    [AppRole.Driver]: {
      title: 'Driver',
      description: 'Access to driver-specific functionality'
    },
    [AppRole.Customer]: {
      title: 'Customer',
      description: 'View jobs, invoices and place orders'
    }
  };
  
  return roleInfo[role] || { 
    title: role, 
    description: 'Custom role with specific permissions'
  };
}; 