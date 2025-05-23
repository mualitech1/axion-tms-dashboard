import { ReactNode, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import { hasPermission } from '@/services/rbac-service';

interface PermissionGateProps {
  resource: string;
  action: string;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component that conditionally renders based on user permissions
 * 
 * @example
 * <PermissionGate resource="jobs" action="create">
 *   <Button>Create Job</Button>
 * </PermissionGate>
 */
export function PermissionGate({
  resource,
  action,
  children,
  fallback = null
}: PermissionGateProps) {
  const { permissions } = useAuthStore();
  
  const hasAccess = useMemo(() => 
    hasPermission(permissions, resource, action), 
    [permissions, resource, action]
  );
  
  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

/**
 * Higher-order component version of PermissionGate
 * 
 * @example
 * const ProtectedButton = withPermission(Button, "jobs", "create");
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  resource: string,
  action: string
) {
  return (props: P) => (
    <PermissionGate resource={resource} action={action}>
      <Component {...props} />
    </PermissionGate>
  );
} 