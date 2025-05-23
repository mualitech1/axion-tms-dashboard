import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { AppRole } from '@/types/permissions';
import { hasPermission } from '@/services/rbac-service';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: { resource: string; action: string };
  requiredRole?: AppRole | AppRole[];
  redirectTo?: string;
  fallbackComponent?: ReactNode;
}

// For development/debugging - set to true to bypass auth checks
const DEV_BYPASS_AUTH = import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === 'true';

/**
 * Utility function to conditionally log dev mode messages
 * Only logs in development and can be disabled via env variable
 */
const logDevMode = (message: string) => {
  // Skip logging in production
  if (import.meta.env.PROD) return;
  
  // Skip if explicitly disabled via env variable
  if (import.meta.env.VITE_DISABLE_AUTH_LOGS === 'true') return;
  
  // Only log in console once per message per session
  const key = `logged_${message.replace(/\s+/g, '_')}`;
  if (sessionStorage.getItem(key)) return;
  
  console.log(`🚨 DEV MODE: ${message}`);
  sessionStorage.setItem(key, 'true');
};

/**
 * Protected Route Component
 * Ensures the user is authenticated and has the required permissions before rendering children
 */
export function ProtectedRoute({
  children,
  requiredPermission,
  requiredRole,
  redirectTo = '/auth',
  fallbackComponent
}: ProtectedRouteProps) {
  const { user, activeRole, permissions, loading, isInitialized } = useAuthStore();
  const location = useLocation();
  
  // Show loading state
  if (loading || !isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
            <div className="relative bg-black p-4 rounded-full border border-indigo-500/30">
              <div className="h-8 w-8 text-indigo-400 animate-spin border-2 border-current border-t-transparent rounded-full"></div>
            </div>
          </div>
          <p className="mt-4 text-indigo-300 animate-pulse">Verifying quantum credentials...</p>
        </div>
      </div>
    );
  }
  
  // Not authenticated, redirect to login
  if (!user || !activeRole) {
    // For demo/development, we can bypass this check to show the app
    if (DEV_BYPASS_AUTH) {
      logDevMode('Authentication redirect bypassed');
      return <>{children}</>;
    }
    
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  // Check permission-based access if required
  if (requiredPermission) {
    const { resource, action } = requiredPermission;
    const userHasPermission = hasPermission(permissions, resource, action);
    
    if (!userHasPermission) {
      // For demo/development, we can bypass this check 
      if (DEV_BYPASS_AUTH) {
        logDevMode(`Permission check bypassed for ${resource}:${action}`);
        return <>{children}</>;
      }
      
      // Show custom fallback if provided
      if (fallbackComponent) {
        return <>{fallbackComponent}</>;
      }
      
      // Default unauthorized access UI
      return (
        <div className="flex items-center justify-center min-h-screen p-6">
          <Card className="relative shadow-lg max-w-lg bg-black/40 backdrop-blur-md border border-amber-500/30 overflow-hidden rounded-lg w-full">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-amber-500 to-red-500"></div>
            
            <CardHeader className="border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <ShieldAlert className="h-5 w-5 text-amber-400" />
                </div>
                <CardTitle className="text-xl text-amber-300">Quantum Access Restricted</CardTitle>
              </div>
              <CardDescription className="text-amber-200/70">
                You lack sufficient dimensional clearance for this sector.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <p className="text-amber-200/90 mb-4">
                Your current quantum entanglement level doesn't grant access to this secured area. 
                Please request elevated permissions from your system administrator.
              </p>
              <div className="bg-black/50 border border-amber-500/10 rounded-md p-4 mb-4">
                <p className="text-amber-200/70 text-sm">
                  Required permission: <span className="font-mono font-semibold">{resource}:{action}</span>
                </p>
                <p className="text-amber-200/70 text-sm mt-2">
                  Your role: <span className="font-mono font-semibold">{activeRole}</span>
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-amber-500/20 flex justify-end">
              <Button
                variant="outline"
                className="border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-amber-950/30"
                onClick={() => window.history.back()}
              >
                Return to safe zone
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }
  }
  
  // Check role-based access if required
  if (requiredRole) {
    const hasRequiredRole = Array.isArray(requiredRole)
      ? requiredRole.includes(activeRole)
      : activeRole === requiredRole;
    
    if (!hasRequiredRole) {
      // For demo/development, we can bypass this check 
      if (DEV_BYPASS_AUTH) {
        logDevMode(`Role check bypassed for ${Array.isArray(requiredRole) ? requiredRole.join(', ') : requiredRole}`);
        return <>{children}</>;
      }
      
      // Show custom fallback if provided
      if (fallbackComponent) {
        return <>{fallbackComponent}</>;
      }
      
      // Default unauthorized access UI
      return (
        <div className="flex items-center justify-center min-h-screen p-6">
          <Card className="relative shadow-lg max-w-lg bg-black/40 backdrop-blur-md border border-amber-500/30 overflow-hidden rounded-lg w-full">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-amber-500 to-red-500"></div>
            
            <CardHeader className="border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <ShieldAlert className="h-5 w-5 text-amber-400" />
                </div>
                <CardTitle className="text-xl text-amber-300">Quantum Access Restricted</CardTitle>
              </div>
              <CardDescription className="text-amber-200/70">
                You lack sufficient dimensional clearance for this sector.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <p className="text-amber-200/90 mb-4">
                Your current quantum entanglement level doesn't grant access to this secured area. 
                Please request elevated permissions from your system administrator.
              </p>
              <div className="bg-black/50 border border-amber-500/10 rounded-md p-4 mb-4">
                <p className="text-amber-200/70 text-sm">
                  Required role: <span className="font-mono font-semibold">{Array.isArray(requiredRole) ? requiredRole.join(' or ') : requiredRole}</span>
                </p>
                <p className="text-amber-200/70 text-sm mt-2">
                  Your role: <span className="font-mono font-semibold">{activeRole}</span>
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-amber-500/20 flex justify-end">
              <Button
                variant="outline"
                className="border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-amber-950/30"
                onClick={() => window.history.back()}
              >
                Return to safe zone
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }
  }
  
  // User is authenticated and has required permissions/roles (if any)
  return <>{children}</>;
} 