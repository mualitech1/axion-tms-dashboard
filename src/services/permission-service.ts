
import { supabase } from '@/integrations/supabase/client';
import { getErrorMessage } from '@/utils/error-handler';
import { auditService } from './audit-service';

export interface Permission {
  id?: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RolePermission {
  id?: string;
  role: string;
  permissionId: string;
  createdAt?: string;
}

export interface UserPermission {
  id?: string;
  userId: string;
  permissionId: string;
  grantedBy?: string;
  createdAt?: string;
  expiresAt?: string;
}

// Type for app roles from the database
export type AppRole = 'admin' | 'operations' | 'accounts' | 'sales' | 'driver' | 'customer';

// Handler for permission management
class PermissionService {
  // Check if current user has a specific permission
  async hasPermission(permissionName: string): Promise<boolean> {
    try {
      // Call the database function that checks both role and direct permissions
      const { data, error } = await supabase.rpc('has_permission', {
        permission_name: permissionName
      });
      
      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error(`Failed to check permission '${permissionName}':`, error);
      return false; // Fail closed - if there's an error, deny access
    }
  }

  // Get all permissions
  async getPermissions(): Promise<Permission[]> {
    try {
      const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        resource: p.resource,
        action: p.action,
        createdAt: p.created_at,
        updatedAt: p.updated_at
      }));
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Create a new permission
  async createPermission(permission: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>): Promise<Permission> {
    try {
      const { data, error } = await supabase
        .from('permissions')
        .insert([{
          name: permission.name,
          description: permission.description,
          resource: permission.resource,
          action: permission.action
        }])
        .select();
      
      if (error) throw error;
      
      const createdPermission = {
        id: data[0].id,
        name: data[0].name,
        description: data[0].description,
        resource: data[0].resource,
        action: data[0].action,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at
      };
      
      // Log permission creation
      await auditService.logAction(
        'permission_created',
        'permissions',
        createdPermission.id,
        null,
        createdPermission
      );
      
      return createdPermission;
    } catch (error) {
      console.error('Failed to create permission:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Assign permission to role
  async assignPermissionToRole(rolePermission: { role: AppRole, permissionId: string }): Promise<void> {
    try {
      const { error } = await supabase
        .from('role_permissions')
        .insert([{
          role: rolePermission.role,
          permission_id: rolePermission.permissionId
        }]);
      
      if (error) throw error;
      
      // Log permission assignment
      await auditService.logAction(
        'permission_assigned_to_role',
        'role_permissions',
        undefined,
        null,
        { role: rolePermission.role, permission_id: rolePermission.permissionId }
      );
    } catch (error) {
      console.error('Failed to assign permission to role:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get permissions for a role
  async getRolePermissions(role: AppRole): Promise<Permission[]> {
    try {
      const { data, error } = await supabase
        .from('role_permissions')
        .select(`
          permission_id,
          permissions (*)
        `)
        .eq('role', role);
      
      if (error) throw error;
      
      return data.map(rp => {
        const p = rp.permissions;
        return {
          id: p.id,
          name: p.name,
          description: p.description,
          resource: p.resource,
          action: p.action,
          createdAt: p.created_at,
          updatedAt: p.updated_at
        };
      });
    } catch (error) {
      console.error(`Failed to fetch permissions for role '${role}':`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Grant direct permission to user
  async grantUserPermission(userPermission: {
    userId: string;
    permissionId: string;
    grantedBy?: string;
    expiresAt?: string;
  }): Promise<void> {
    try {
      // Get current user for audit
      const { data: userData } = await supabase.auth.getUser();
      const grantedBy = userPermission.grantedBy || userData?.user?.id;
      
      const { error } = await supabase
        .from('user_permissions')
        .insert([{
          user_id: userPermission.userId,
          permission_id: userPermission.permissionId,
          granted_by: grantedBy,
          expires_at: userPermission.expiresAt
        }]);
      
      if (error) throw error;
      
      // Log permission grant
      await auditService.logAction(
        'permission_granted_to_user',
        'user_permissions',
        undefined,
        null,
        { 
          user_id: userPermission.userId, 
          permission_id: userPermission.permissionId,
          granted_by: grantedBy,
          expires_at: userPermission.expiresAt
        }
      );
    } catch (error) {
      console.error('Failed to grant permission to user:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Revoke direct permission from user
  async revokeUserPermission(userId: string, permissionId: string): Promise<void> {
    try {
      // Get the permission before deletion (for audit)
      const { data: permData } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', userId)
        .eq('permission_id', permissionId)
        .single();
      
      const { error } = await supabase
        .from('user_permissions')
        .delete()
        .eq('user_id', userId)
        .eq('permission_id', permissionId);
      
      if (error) throw error;
      
      // Log permission revocation
      await auditService.logAction(
        'permission_revoked_from_user',
        'user_permissions',
        undefined,
        permData,
        null
      );
    } catch (error) {
      console.error('Failed to revoke permission from user:', error);
      throw new Error(getErrorMessage(error));
    }
  }
}

export const permissionService = new PermissionService();
