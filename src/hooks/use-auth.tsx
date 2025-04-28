
import { useEffect, useState, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/error-handler';
import { SecurityEventType, logSecurityEvent, checkSuspiciousActivity } from '../services/security-audit';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  resetPassword: (email: string) => Promise<void>;
  checkSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Track login attempts for rate limiting
const loginAttempts = new Map<string, { count: number, lastAttempt: number }>();

// Basic rate limiting function
const checkRateLimit = (email: string): boolean => {
  const now = Date.now();
  const attempt = loginAttempts.get(email);
  
  if (!attempt) {
    loginAttempts.set(email, { count: 1, lastAttempt: now });
    return false;
  }
  
  // Reset if last attempt was more than 15 minutes ago
  if (now - attempt.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(email, { count: 1, lastAttempt: now });
    return false;
  }
  
  // Rate limit: 5 attempts in 15 minutes
  if (attempt.count >= 5) {
    return true;
  }
  
  // Increment attempt counter
  loginAttempts.set(email, { 
    count: attempt.count + 1, 
    lastAttempt: now 
  });
  
  return false;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Store IP address (in real app, would be captured server-side)
    const fetchClientIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        sessionStorage.setItem('client_ip', data.ip);
      } catch (error) {
        console.error('Could not fetch IP:', error);
      }
    };
    
    fetchClientIP();
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          // Log successful login
          if (session?.user) {
            await logSecurityEvent(
              SecurityEventType.LOGIN_SUCCESS,
              session.user.id,
              { method: 'password' }
            );
            
            // Check for suspicious activity
            const suspicious = await checkSuspiciousActivity(session.user.id);
            if (suspicious) {
              toast({
                title: "Security Alert",
                description: "Unusual account activity detected. Please review your recent logins.",
                variant: "destructive"
              });
            }
          }
          
          toast({
            title: "Successfully signed in",
            description: `Welcome, ${session?.user?.email}`,
          });
          
          // Instead of using navigate here, we can use window.location
          window.location.href = '/';
        } else if (event === 'SIGNED_OUT') {
          window.location.href = '/auth';
        } else if (event === 'PASSWORD_RECOVERY') {
          // Handle password recovery event
          window.location.href = '/auth?reset=true';
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // If user is already logged in and on auth page, redirect to home
      if (session && window.location.pathname === '/auth') {
        window.location.href = '/';
      }
    });

    // Session timeout check - automatically log out after inactivity
    let inactivityTimeout: number;
    
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      // 30 minute timeout (adjust as needed)
      inactivityTimeout = window.setTimeout(() => {
        if (session) {
          toast({
            title: "Session expired",
            description: "You've been signed out due to inactivity",
          });
          supabase.auth.signOut();
        }
      }, 30 * 60 * 1000);
    };
    
    // Reset timer on user activity
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer);
    });
    
    // Initialize timer
    if (session) {
      resetInactivityTimer();
    }

    return () => {
      subscription.unsubscribe();
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer);
      });
      clearTimeout(inactivityTimeout);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      
      // Check rate limiting
      if (checkRateLimit(email)) {
        toast({
          title: "Too many attempts",
          description: "Please try again later or reset your password",
          variant: "destructive"
        });
        return;
      }
      
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Sign in error:', error.message);
        
        // Log failed login attempt if we have user information
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          await logSecurityEvent(
            SecurityEventType.LOGIN_FAILED,
            userData.user.id,
            { reason: error.message }
          );
        }
        
        // Provide more user-friendly error messages
        if (error.message.includes('credentials')) {
          throw new Error('Invalid email or password');
        } else if (error.message.includes('email') && error.message.includes('confirm')) {
          throw new Error('Please check your email to confirm your account before logging in');
        } else {
          throw error;
        }
      }
      
      console.log('Sign in successful for:', email, data);
    } catch (error: any) {
      console.error('Sign in error:', error.message);
      toast({
        title: "Error signing in",
        description: getErrorMessage(error),
        variant: "destructive"
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log('Attempting sign up for:', email);
      
      // Password strength validation
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
      
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      
      if (!(hasUppercase && hasLowercase && hasNumbers && hasSpecialChars)) {
        throw new Error(
          "Password must include uppercase and lowercase letters, numbers, and special characters"
        );
      }
      
      // Use the current origin for redirectTo
      const redirectUrl = window.location.origin + '/auth';
      console.log('Using redirect URL:', redirectUrl);
      
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          },
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) {
        console.error('Sign up error:', error.message);
        throw error;
      }
      
      // Check if email confirmation is required
      if (data?.user && data?.session === null) {
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account."
        });
      } else {
        toast({
          title: "Account created!",
          description: "You have been successfully registered and logged in."
        });
      }
      
    } catch (error: any) {
      console.error('Sign up error:', error.message);
      
      // Provide more user-friendly error messages
      if (error.message.includes('already registered')) {
        toast({
          title: "Email already registered",
          description: "This email is already registered. Try logging in instead.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error signing up",
          description: getErrorMessage(error),
          variant: "destructive"
        });
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Get the current site URL dynamically
      const siteUrl = window.location.origin;
      console.log('Using site URL for password reset:', siteUrl);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/auth?reset=true`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for password reset instructions."
      });
      
      // Log password reset request (without userId since we don't know it yet)
      // In a real app, you might want to log this server-side
    } catch (error: any) {
      console.error('Password reset error:', error.message);
      toast({
        title: "Error",
        description: getErrorMessage(error),
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting sign out');
      
      // Log the logout event before signing out
      if (user) {
        await logSecurityEvent(
          SecurityEventType.LOGIN_SUCCESS,
          user.id,
          { reason: 'user_initiated' }
        );
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
    } catch (error: any) {
      console.error('Sign out error:', error.message);
      toast({
        title: "Error signing out",
        description: getErrorMessage(error),
        variant: "destructive"
      });
      throw error;
    }
  };

  // Check if session is still valid
  const checkSession = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return !!data.session;
    } catch (error) {
      console.error('Session check error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading,
      resetPassword,
      checkSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
