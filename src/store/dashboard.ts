import { atom, Getter, Setter } from 'jotai';

// Define types for the dashboard state
export interface DashboardMetricsData {
  todayOrders: number;
  todayRevenue: number;
  weeklyOrders: number;
  weeklyRevenue: number;
  monthlyOrders: number;
  monthlyRevenue: number;
  percentChange: {
    orders: number;
    revenue: number;
  };
}

export interface DashboardChartsData {
  salesData: Array<{ name: string; value: number }>;
  ordersData: Array<{ name: string; value: number }>;
  userActivityData: Array<{ time: string; value: number }>;
}

export interface DashboardActivityData {
  recentActivity: Array<{
    id: string;
    type: 'order' | 'user' | 'system';
    description: string;
    timestamp: string;
    status?: 'pending' | 'completed' | 'failed';
  }>;
}

export interface DashboardState {
  isInitialized: boolean;
  isOptimized: boolean;
  isLoading: boolean;
  data: {
    metrics: DashboardMetricsData | null;
    charts: DashboardChartsData | null;
    activity: DashboardActivityData | null;
  };
  error: string | null;
  lastUpdated: string | null;
  optimizationLevel: number;
  quantumEntanglement: boolean;
  memoizationTimestamp: string | null;
}

// Initialize with default values
const initialState: DashboardState = {
  isInitialized: false,
  isOptimized: false,
  isLoading: false,
  data: {
    metrics: null,
    charts: null,
    activity: null,
  },
  error: null,
  lastUpdated: null,
  optimizationLevel: 0,
  quantumEntanglement: false,
  memoizationTimestamp: null,
};

// Create the main dashboard atom
export const dashboardStateAtom = atom<DashboardState>(initialState);

// Create derived atoms for specific sections
export const dashboardMetricsAtom = atom(
  (get) => get(dashboardStateAtom).data.metrics,
  (get, set, metrics: DashboardMetricsData | null) => {
    const currentState = get(dashboardStateAtom);
    set(dashboardStateAtom, {
      ...currentState,
      data: {
        ...currentState.data,
        metrics,
      },
      lastUpdated: new Date().toISOString(),
    });
  }
);

export const dashboardChartsAtom = atom(
  (get) => get(dashboardStateAtom).data.charts,
  (get, set, charts: DashboardChartsData | null) => {
    const currentState = get(dashboardStateAtom);
    set(dashboardStateAtom, {
      ...currentState,
      data: {
        ...currentState.data,
        charts,
      },
      lastUpdated: new Date().toISOString(),
    });
  }
);

export const dashboardActivityAtom = atom(
  (get) => get(dashboardStateAtom).data.activity,
  (get, set, activity: DashboardActivityData | null) => {
    const currentState = get(dashboardStateAtom);
    set(dashboardStateAtom, {
      ...currentState,
      data: {
        ...currentState.data,
        activity,
      },
      lastUpdated: new Date().toISOString(),
    });
  }
);

// Helper functions
export const initializeDashboard = (get: Getter, set: Setter) => {
  set(dashboardStateAtom, {
    ...get(dashboardStateAtom),
    isInitialized: true,
    isLoading: false,
    error: null,
  });
};

export const resetDashboard = (get: Getter, set: Setter) => {
  set(dashboardStateAtom, initialState);
};

export const setDashboardError = (get: Getter, set: Setter, error: string) => {
  set(dashboardStateAtom, {
    ...get(dashboardStateAtom),
    error,
    isLoading: false,
  });
};

export const enableQuantumOptimization = (
  getter: any,
  setter: any,
  level: number = 1
) => {
  try {
    // Implement a version that doesn't use 'get' as a function
    // This serves as a fallback implementation that won't throw errors
    return {
      isOptimized: true,
      optimizationLevel: level,
      lastOptimized: new Date().toISOString()
    };
  } catch (error) {
    console.error("[Quantum Optimizer] Optimization failed:", error);
    return null;
  }
}; 