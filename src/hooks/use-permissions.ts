import { useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { hasPermission } from '@/services/rbac-service';
import { AppRole } from '@/types/permissions';

/**
 * Hook for easily checking permissions and roles
 */
export function usePermissions() {
  const { permissions, activeRole } = useAuthStore();
  
  // Check if user has permission for a specific resource and action
  const can = useCallback(
    (resource: string, action: string) => 
      hasPermission(permissions, resource, action),
    [permissions]
  );
  
  // Check if user has any of the specified permissions
  const canAny = useCallback(
    (permissionChecks: Array<{ resource: string; action: string }>) => 
      permissionChecks.some(check => hasPermission(permissions, check.resource, check.action)),
    [permissions]
  );
  
  // Check if user has all of the specified permissions
  const canAll = useCallback(
    (permissionChecks: Array<{ resource: string; action: string }>) => 
      permissionChecks.every(check => hasPermission(permissions, check.resource, check.action)),
    [permissions]
  );
  
  // Check if user has a specific role
  const hasRole = useCallback(
    (role: AppRole | AppRole[]) => 
      Array.isArray(role) ? role.includes(activeRole!) : activeRole === role,
    [activeRole]
  );
  
  return {
    can,
    canAny,
    canAll,
    hasRole
  };
} 