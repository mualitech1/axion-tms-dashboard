import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { useAuthStore } from '@/store/authStore';
import { getUserRoles } from '@/services/rbac-service';
import { AppRole } from '@/types/permissions';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';
import '@/../asi-wonderland🛡️/axion-branding.css';

/**
 * Page displayed after login when user has multiple roles
 */
export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { user, activateRole, loading } = useAuthStore();
  const [availableRoles, setAvailableRoles] = useState<AppRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load user's roles
  useEffect(() => {
    async function loadUserRoles() {
      try {
        if (!user) {
          // User not logged in, redirect to auth page
          navigate('/auth');
          return;
        }
        
        // Get user's roles
        const roles = await getUserRoles(user.id);
        
        if (roles.length === 0) {
          setError('Your account has no roles assigned. Please contact an administrator.');
          setIsLoading(false);
          return;
        }
        
        if (roles.length === 1) {
          // User has only one role, automatically select it
          handleRoleSelect(roles[0]);
          return;
        }
        
        // User has multiple roles, display selection screen
        setAvailableRoles(roles);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading user roles:', error);
        setError('Failed to load your assigned roles. Please try again.');
        setIsLoading(false);
      }
    }
    
    loadUserRoles();
  }, [user, navigate]);
  
  // Handle role selection
  const handleRoleSelect = async (role: AppRole) => {
    try {
      await activateRole(role);
      
      // Show success toast
      toast({
        title: "Role activated",
        description: "Your quantum matrix access has been initialized",
      });
      
      // Redirect based on role
      switch (role) {
        case AppRole.Admin:
          navigate('/');
          break;
        case AppRole.Customer:
          navigate('/customer-portal');
          break;
        case AppRole.Driver:
          navigate('/driver-portal');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Error activating role:', error);
      toast({
        title: "Quantum disruption",
        description: "Failed to activate selected role",
        variant: "destructive"
      });
    }
  };
  
  // Show loading state while checking user's roles
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-aximo-darker">
      <div className="text-center">
        <div className="animate-pulse text-aximo-primary">
          Retrieving quantum identities...
        </div>
      </div>
    </div>;
  }
  
  // Show error if any
  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-aximo-darker">
      <div className="text-center p-6 bg-red-900/20 border border-red-800 rounded-lg max-w-md">
        <h3 className="text-lg font-medium text-red-400 mb-2">Quantum Disruption</h3>
        <p className="text-aximo-text">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-aximo-primary text-white rounded-md hover:bg-aximo-primary/90"
          onClick={() => navigate('/auth')}
        >
          Return to Authentication Matrix
        </button>
      </div>
    </div>;
  }
  
  // Display role selector
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A101F] via-[#001F3F] to-[#060C17] px-4 overflow-hidden relative">
      {/* Quantum Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-axion-blue-primary/10 rounded-full blur-3xl axion-quantum-glow"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-axion-gold-primary/10 rounded-full blur-2xl axion-quantum-glow"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        {/* Axion Logo */}
        <div className="flex flex-col items-center mb-8">
          <AxionLogo size="lg" variant="divine" animated={true} />
          <h1 className="axion-title text-2xl md:text-3xl mt-4 text-center">Select Your Quantum Role</h1>
          <p className="axion-subtitle text-center mt-1">Choose your dimensional access level</p>
        </div>
        <div className="axion-auth-container shadow-2xl">
          <RoleSelector 
            availableRoles={availableRoles} 
            onRoleSelect={handleRoleSelect}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
} 