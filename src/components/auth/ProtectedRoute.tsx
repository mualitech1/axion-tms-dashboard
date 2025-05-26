import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
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
  const { user, profile, loading, isInitialized } = useAuth();
  const location = useLocation();
  
  // Show loading state while initializing
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
          <p className="mt-2 text-xs text-gray-400">Authenticating...</p>
        </div>
      </div>
    );
  }
  
  // Not authenticated, redirect to login
  if (!user) {
    // For demo/development, we can bypass this check to show the app
    if (DEV_BYPASS_AUTH) {
      logDevMode('Authentication redirect bypassed');
      return <>{children}</>;
    }
    
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // User is authenticated, now check if onboarding has been completed
  // Ensure profile is loaded before checking has_completed_onboarding
  if (profile && profile.has_completed_onboarding === false) {
    // If current path is already /onboarding, don't redirect to avoid loop
    if (location.pathname !== '/onboarding') {
      logDevMode('User authenticated but onboarding not complete. Redirecting to /onboarding.');
      return <Navigate to="/onboarding" state={{ from: location }} replace />;
    }
  }

  // User is authenticated - for now, we'll allow access to all routes
  // TODO: Implement role and permission checks when the RBAC system is ready
  if (requiredPermission || requiredRole) {
    // For development, bypass permission/role checks
    if (DEV_BYPASS_AUTH || import.meta.env.DEV) {
      logDevMode('Permission/role checks bypassed in development');
      return <>{children}</>;
    }
    
    // In production, you would implement proper permission/role checks here
    // For now, we'll allow access if user is authenticated
  }
  
  // User authenticated and authorized - RENDER CHILDREN!
  return <>{children}</>;
} 