
import { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/error-handler';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Successfully signed in",
            description: `Welcome, ${session?.user?.email}`,
          });
          navigate('/');
        } else if (event === 'SIGNED_OUT') {
          navigate('/auth');
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
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Sign in error:', error.message);
        
        // Provide more user-friendly error messages
        if (error.message.includes('credentials')) {
          throw new Error('Invalid email or password');
        } else if (error.message.includes('email') && error.message.includes('confirm')) {
          throw new Error('Please check your email to confirm your account before logging in');
        } else {
          throw error;
        }
      }
      
      console.log('Sign in successful for:', email);
      return data;
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
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
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
      
      return data;
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/auth?reset=true',
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for password reset instructions."
      });
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

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading,
      resetPassword
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
