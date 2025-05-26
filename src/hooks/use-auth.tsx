import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { AppRole } from '@/types/permissions';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isInitialized: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error | string | null; emailNotConfirmed?: boolean; email?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: Error | string | null; requiresConfirmation?: boolean; email?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: Error | string | null }>;
  resendConfirmationEmail: (email: string) => Promise<{ success: boolean; error?: Error | string | null }>;
  markOnboardingComplete: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper function to fetch user profile (scoped inside AuthProvider)
  const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        return null;
      }
      console.log('Fetched user profile:', data);
      // Assuming 'data' matches the structure of 'Profile' type from Supabase generated types
      return data as Profile; 
    } catch (error) {
      console.error('Exception fetching profile:', error);
      return null;
    }
  };

  // Helper function to create user profile (scoped inside AuthProvider)
  const createUserProfile = async (user: User, fullName: string): Promise<Profile | null> => {
    try {
      console.log(`Creating profile for user: ${user.id}, email: ${user.email}`);
      const profileDataToInsert: Partial<Database['public']['Tables']['user_profiles']['Row']> = {
        id: user.id,
        email: user.email,
        full_name: fullName,
        has_completed_onboarding: false, // Explicitly set for new profiles
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .insert(profileDataToInsert as Database['public']['Tables']['user_profiles']['Row'])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error.message);
        if (error.code === '23505') { 
          console.warn('Profile likely already exists, attempting to fetch it.');
          return fetchUserProfile(user.id);
        }
        return null;
      }
      console.log('Profile created successfully:', data);
      return data as Profile;
    } catch (error) {
      console.error('Exception creating profile:', error);
      return null;
    }
  };

  // Function to mark onboarding as complete (scoped inside AuthProvider)
  const markOnboardingComplete = async (): Promise<boolean> => {
    if (!user?.id) {
      console.error('Cannot mark onboarding complete: no user logged in.');
      return false;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ has_completed_onboarding: true, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error marking onboarding complete:', error.message);
        return false;
      }

      if (data) {
        setProfile(data as Profile);
        console.log('Onboarding marked as complete for user:', user.id, data);
      } else {
        // Fallback for optimistic update if select() doesn't return expected data
        setProfile(prevProfile => prevProfile ? { ...prevProfile, has_completed_onboarding: true } as Profile : null);
        console.log('Onboarding marked as complete (optimistic) for user:', user.id);
      }
      return true;
    } catch (error) {
      console.error('Exception marking onboarding complete:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Initialize auth state & listen for changes (simplified for stability)
  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id).then(setProfile);
      }
      setLoading(false);
      setIsInitialized(true);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const fetchedProfile = await fetchUserProfile(session.user.id);
        if (fetchedProfile) {
          setProfile(fetchedProfile);
        } else if (_event === 'SIGNED_IN' || (_event === 'USER_UPDATED' && !fetchedProfile)) {
            const fullNameFromAuth = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'New User';
            const newProfile = await createUserProfile(session.user, fullNameFromAuth as string);
            setProfile(newProfile); 
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // --- Auth functions (restored to previously stable versions) ---

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: Error | string | null; emailNotConfirmed?: boolean; email?: string }> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          return { success: false, error: 'Email not confirmed', emailNotConfirmed: true, email: email.trim() };
        }
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      console.error("Sign in exception:", err);
      return { success: false, error: err.message || 'An unexpected error occurred during sign in.' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<{ success: boolean; error?: Error | string | null; requiresConfirmation?: boolean; email?: string }> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user && data.user.identities && data.user.identities.length === 0) {
        // This case might indicate an issue like email already in use but unconfirmed.
        return { success: false, error: 'User already exists or unconfirmed. Please check your email or try logging in.', email: email.trim() };
      }
      
      if (data.session) { // User is signed in, profile will be created by onAuthStateChange or already exists
        return { success: true, requiresConfirmation: !data.session, email: email.trim() };
      } else if (data.user) { // User exists, email confirmation needed
         // Attempt to create profile here if it might not exist yet, before onAuthStateChange runs
        // This can happen if email confirmation is on and it's the first signup.
        const existingProfile = await fetchUserProfile(data.user.id);
        if (!existingProfile) {
            await createUserProfile(data.user, fullName); 
        }
        return { success: true, requiresConfirmation: true, email: email.trim() };
      }
      
      // Fallback if neither session nor user is in data, but no error - unusual
      return { success: false, error: 'Sign up completed, but user state is unclear. Please try logging in.' };

    } catch (err: any) {
      console.error("Sign up exception:", err);
      return { success: false, error: err.message || 'An unexpected error occurred during sign up.' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('🚪 Starting aggressive logout...');
    window.dispatchEvent(new CustomEvent('axion-logout'));
    setLoading(true);
    setSession(null);
    setUser(null);
    setProfile(null);
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.includes('supabase') || key.includes('auth') || key.includes('session')) {
          localStorage.removeItem(key);
        }
      });
      Object.keys(sessionStorage).forEach(key => {
        if (key.includes('supabase') || key.includes('auth') || key.includes('session')) {
          sessionStorage.removeItem(key);
        }
      });
      await supabase.auth.signOut({ scope: 'global' });
      console.log('✅ Supabase logout successful');
    } catch (error) {
      console.warn('⚠️ Supabase logout failed, but continuing with local logout:', error);
    }
    setTimeout(() => {
      window.location.href = '/auth';
    }, 100);
    setLoading(false);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: Error | string | null }> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      console.error("Reset password exception:", err);
      return { success: false, error: err.message || 'An unexpected error occurred during password reset.' };
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmationEmail = async (email: string): Promise<{ success: boolean; error?: Error | string | null }> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({ 
        type: 'signup', 
        email: email.trim() 
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      console.error("Resend confirmation exception:", err);
      return { success: false, error: err.message || 'An unexpected error occurred during email resend.' };
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    session,
    user,
    profile,
    loading,
    isInitialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
    resendConfirmationEmail,
    markOnboardingComplete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
