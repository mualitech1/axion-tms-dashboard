import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { AppRole } from '@/types/permissions';

// Types
export interface OnboardingHint {
  id: string;
  targetSelector: string;
  title: string;
  description: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

export interface RoleBasedHints {
  [key: string]: OnboardingHint[];
}

// Onboarding context type
interface OnboardingContextType {
  isFirstVisit: boolean;
  hasSeenHint: (hintId: string) => boolean;
  markHintAsSeen: (hintId: string) => void;
  resetOnboarding: () => void;
  activeHint: OnboardingHint | null;
  setActiveHint: (hint: OnboardingHint | null) => void;
  isOnboardingEnabled: boolean;
  setOnboardingEnabled: (enabled: boolean) => void;
  startTour: () => void;
}

// Default context values
const defaultContext: OnboardingContextType = {
  isFirstVisit: false,
  hasSeenHint: () => true,
  markHintAsSeen: () => {},
  resetOnboarding: () => {},
  activeHint: null,
  setActiveHint: () => {},
  isOnboardingEnabled: true,
  setOnboardingEnabled: () => {},
  startTour: () => {},
};

// Create context
const OnboardingContext = createContext<OnboardingContextType>(defaultContext);

// Role-specific onboarding hints
export const onboardingHints: RoleBasedHints = {
  [AppRole.Admin]: [
    {
      id: 'admin-dashboard',
      targetSelector: '[data-section="dashboard"]',
      title: 'Administrator Dashboard',
      description: 'Get a high-level overview of your entire operation with real-time KPIs and metrics.',
      placement: 'right'
    },
    {
      id: 'admin-users',
      targetSelector: '[data-section="users"]',
      title: 'User Management',
      description: 'Add, modify, or remove users and assign appropriate roles and permissions.',
      placement: 'right'
    },
    {
      id: 'admin-finance',
      targetSelector: '[data-section="finance"]',
      title: 'Financial Overview',
      description: 'Monitor revenue, expenses, and profitability across your business.',
      placement: 'right'
    }
  ],
  [AppRole.Operations]: [
    {
      id: 'ops-jobs',
      targetSelector: '[data-section="jobs"]',
      title: 'Job Management',
      description: 'Manage all transportation jobs and track their progress in real-time.',
      placement: 'right'
    },
    {
      id: 'ops-carriers',
      targetSelector: '[data-section="carriers"]',
      title: 'Carrier Network',
      description: 'Manage your carrier relationships and track performance metrics.',
      placement: 'right'
    },
    {
      id: 'ops-fleet',
      targetSelector: '[data-section="fleet"]',
      title: 'Fleet Management',
      description: 'Track and maintain your company vehicles and assets.',
      placement: 'right'
    }
  ],
  [AppRole.Accounts]: [
    {
      id: 'accounts-finance',
      targetSelector: '[data-section="finance"]',
      title: 'Financial Management',
      description: 'Access detailed financial reports and manage accounting activities.',
      placement: 'right'
    },
    {
      id: 'accounts-invoices',
      targetSelector: '[data-section="invoices"]',
      title: 'Invoice Center',
      description: 'Create, send, and track all customer invoices in one place.',
      placement: 'right'
    },
    {
      id: 'accounts-dashboard',
      targetSelector: '[data-section="dashboard"]',
      title: 'Financial Dashboard',
      description: 'Your customized view of important financial metrics and KPIs.',
      placement: 'right'
    }
  ],
  [AppRole.Sales]: [
    {
      id: 'sales-customers',
      targetSelector: '[data-section="customers"]',
      title: 'Customer Management',
      description: 'Manage your customer relationships and track communication history.',
      placement: 'right'
    },
    {
      id: 'sales-analytics',
      targetSelector: '[data-section="analytics"]',
      title: 'Sales Analytics',
      description: 'Track your sales performance and identify growth opportunities.',
      placement: 'right'
    }
  ],
  [AppRole.Driver]: [
    {
      id: 'driver-assignments',
      targetSelector: '[data-section="driver/assignments"]',
      title: 'My Assignments',
      description: 'View and manage all your assigned deliveries and pickups.',
      placement: 'right'
    },
    {
      id: 'driver-scanner',
      targetSelector: '[data-section="document-scanning"]',
      title: 'Document Scanner',
      description: 'Easily capture and upload delivery documents and signatures.',
      placement: 'right'
    },
    {
      id: 'driver-status',
      targetSelector: '[data-section="driver/status"]',
      title: 'Delivery Status',
      description: 'Update the status of your deliveries in real-time.',
      placement: 'right'
    }
  ],
  [AppRole.Customer]: [
    {
      id: 'customer-shipments',
      targetSelector: '[data-section="customer/shipments"]',
      title: 'My Shipments',
      description: 'Track all your shipments and their current status.',
      placement: 'right'
    },
    {
      id: 'customer-orders',
      targetSelector: '[data-section="customer/orders"]',
      title: 'Order History',
      description: 'View your complete order history and access related documents.',
      placement: 'right'
    },
    {
      id: 'customer-support',
      targetSelector: '[data-section="customer/support"]',
      title: 'Support Center',
      description: 'Get help with any issues or questions about your shipments.',
      placement: 'right'
    }
  ]
};

// Provider component
export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { activeRole, user } = useAuthStore();
  const [seenHints, setSeenHints] = useState<Record<string, boolean>>({});
  const [activeHint, setActiveHint] = useState<OnboardingHint | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isOnboardingEnabled, setOnboardingEnabled] = useState(true);

  // Check if this is the user's first visit
  useEffect(() => {
    if (!user) return;
    
    const storageKey = `axion-onboarding-${user.id}`;
    const onboardingData = localStorage.getItem(storageKey);
    
    if (!onboardingData) {
      setIsFirstVisit(true);
      localStorage.setItem(storageKey, JSON.stringify({ 
        seenHints: {},
        firstVisitTimestamp: new Date().toISOString()
      }));
    } else {
      try {
        const parsed = JSON.parse(onboardingData);
        setSeenHints(parsed.seenHints || {});
        // Determine if we should consider this a "first visit" still
        const firstVisitTimestamp = parsed.firstVisitTimestamp ? new Date(parsed.firstVisitTimestamp) : null;
        const isStillNew = firstVisitTimestamp && 
          (new Date().getTime() - firstVisitTimestamp.getTime() < 1000 * 60 * 60 * 24 * 3); // 3 days
        setIsFirstVisit(isStillNew);
      } catch (error) {
        console.error('Failed to parse onboarding data', error);
        // Reset onboarding data if corrupted
        localStorage.setItem(storageKey, JSON.stringify({ 
          seenHints: {},
          firstVisitTimestamp: new Date().toISOString()
        }));
        setIsFirstVisit(true);
      }
    }
    
    // Check if onboarding is enabled globally
    const onboardingEnabled = localStorage.getItem('axion-onboarding-enabled');
    if (onboardingEnabled === 'false') {
      setOnboardingEnabled(false);
    }
  }, [user]);

  // Function to check if a hint has been seen
  const hasSeenHint = (hintId: string): boolean => {
    return !!seenHints[hintId];
  };

  // Function to mark a hint as seen
  const markHintAsSeen = (hintId: string) => {
    if (!user) return;
    
    const newSeenHints = { ...seenHints, [hintId]: true };
    setSeenHints(newSeenHints);
    
    // Update localStorage
    const storageKey = `axion-onboarding-${user.id}`;
    try {
      const existingData = localStorage.getItem(storageKey);
      const parsedData = existingData ? JSON.parse(existingData) : { firstVisitTimestamp: new Date().toISOString() };
      
      localStorage.setItem(storageKey, JSON.stringify({
        ...parsedData,
        seenHints: newSeenHints
      }));
    } catch (error) {
      console.error('Failed to update onboarding data', error);
    }
  };

  // Function to reset onboarding
  const resetOnboarding = () => {
    if (!user) return;
    
    setSeenHints({});
    setIsFirstVisit(true);
    
    // Update localStorage
    const storageKey = `axion-onboarding-${user.id}`;
    localStorage.setItem(storageKey, JSON.stringify({
      seenHints: {},
      firstVisitTimestamp: new Date().toISOString()
    }));
  };

  // Function to toggle onboarding globally
  const toggleOnboardingEnabled = (enabled: boolean) => {
    setOnboardingEnabled(enabled);
    localStorage.setItem('axion-onboarding-enabled', String(enabled));
  };

  // Function to manually start the tour
  const startTour = () => {
    if (!activeRole || !user) return;
    
    // Get hints for the current role
    const roleHints = onboardingHints[activeRole] || [];
    // Filter out hints that have been seen
    const unseenHints = roleHints.filter(hint => !hasSeenHint(hint.id));
    
    if (unseenHints.length > 0) {
      // Start with the first unseen hint
      setActiveHint(unseenHints[0]);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isFirstVisit,
        hasSeenHint,
        markHintAsSeen,
        resetOnboarding,
        activeHint,
        setActiveHint,
        isOnboardingEnabled,
        setOnboardingEnabled: toggleOnboardingEnabled,
        startTour
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook to use the onboarding context
export const useOnboarding = () => useContext(OnboardingContext); 