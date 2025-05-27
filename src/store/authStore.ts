import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { AppRole, Permission, AuthState } from '@/types/permissions';
import { supabase } from '@/integrations/supabase/client';

/**
 * Simplified Auth store - bypassing RBAC for development
 */
export const useAuthStore = create<AuthState & {
  setUser: (user: User | null) => void;
  setActiveRole: (role: AppRole | null) => void;
  setPermissions: (permissions: Permission[]) => void;
  activateRole: (role: AppRole) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  reset: () => void;
}>((set, get) => ({
  // State
  user: null,
  activeRole: AppRole.Operations, // Default to operations for manager testing
  permissions: [],
  loading: false,
  isInitialized: false,
  
  // Actions
  setUser: (user) => set({ user }),
  
  setActiveRole: (role) => {
    set({ activeRole: role });
    if (role) {
      localStorage.setItem('activeRole', role);
    } else {
      localStorage.removeItem('activeRole');
    }
  },
  
  setPermissions: (permissions) => set({ permissions }),
  
  activateRole: async (role) => {
    set({ activeRole: role, loading: false });
    localStorage.setItem('activeRole', role);
  },
  
  initialize: async () => {
    set({ loading: true });
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth: Session error:', error);
        set({ 
          user: null, 
          activeRole: null,
          permissions: [],
          loading: false,
          isInitialized: true
        });
        return;
      }
      
      if (!session?.user) {
        set({ 
          user: null, 
          activeRole: null,
          permissions: [],
          loading: false,
          isInitialized: true
        });
        return;
      }
      
      // User is logged in - set default operations role for manager testing
      set({ 
        user: session.user,
        activeRole: AppRole.Operations, // Changed from Admin to Operations for manager experience
        permissions: [], // Add mock permissions if needed
        loading: false,
        isInitialized: true
      });
      
    } catch (error) {
      console.error('Auth: Initialization error:', error);
      set({ 
        user: null,
        activeRole: null,
        permissions: [],
        loading: false,
        isInitialized: true
      });
    }
  },
  
  logout: async () => {
    set({ loading: true });
    
    try {
      await supabase.auth.signOut();
      set({
        user: null,
        activeRole: null,
        permissions: [],
        loading: false
      });
      localStorage.removeItem('activeRole');
    } catch (error) {
      console.error('Error logging out:', error);
      set({ loading: false });
      throw error;
    }
  },
  
  reset: () => {
    set({
      user: null,
      activeRole: null,
      permissions: [],
      loading: false,
      isInitialized: false
    });
    localStorage.removeItem('activeRole');
  }
})); 