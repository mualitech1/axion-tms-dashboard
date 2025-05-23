import { atom, useAtom } from 'jotai';
import { AppRole } from '@/types/permissions';
import { useAuthStore } from '@/store/authStore';

export interface DashboardMetricsData {
  totalRevenue: string;
  revenueChange: number;
  activeJobs: number;
  jobsChange: number;
  customers: number;
  customersChange: number;
  carriers: number;
  carriersChange: number;
  
  // Financial metrics
  outstandingInvoices: number;
  invoicesChange: number;
  profitMargin: number;
  marginChange: number;
  operatingCosts: number;
  costsChange: number;
  
  // Operations metrics
  onTimeDelivery: number;
  deliveryChange: number;
  availableDrivers: number;
  driversChange: number;
  fleetUtilization: number;
  utilizationChange: number;
  
  // Sales metrics
  newCustomers: number;
  newCustomersChange: number;
  conversionRate: number;
  conversionChange: number;
  leads: number;
  leadsChange: number;
  
  // Driver metrics
  driverJobs?: number;
  driverJobsChange?: number;
  milesDriven?: number;
  mileageChange?: number;
  driverOnTimeRate?: number;
  driverOnTimeChange?: number;
  fuelEfficiency?: number;
  efficiencyChange?: number;
  
  // Customer metrics
  customerShipments?: number;
  customerOnTimeRate?: number;
  customerOnTimeChange?: number;
  customerSpend?: number;
  customerSpendChange?: number;
  customerCompletedShipments?: number;
}

export interface DashboardChartsData {
  performanceData: Array<{
    period: string;
    revenue: number;
    costs: number;
    profit: number;
  }>;
  
  jobDistribution: Array<{
    name: string;
    value: number;
  }>;
  
  financialData: Array<{
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }>;
  
  marginTrends: Array<{
    period: string;
    margin: number;
  }>;
  
  completionRates: Array<{
    period: string;
    onTime: number;
    delayed: number;
    canceled: number;
  }>;
  
  utilizationData: Array<{
    name: string;
    value: number;
  }>;
  
  salesPerformance: Array<{
    period: string;
    targets: number;
    actual: number;
  }>;
  
  customerAcquisition: Array<{
    period: string;
    newCustomers: number;
    churn: number;
  }>;
  
  // Driver specific charts
  driverPerformance?: Array<{
    period: string;
    mileage: number;
    efficiency: number;
    onTime: number;
  }>;
  
  driverJobTypes?: Array<{
    name: string;
    value: number;
  }>;
  
  // Customer specific charts
  customerShipmentHistory?: Array<{
    period: string;
    shipments: number;
    onTime: number;
  }>;
  
  customerShipmentTypes?: Array<{
    name: string;
    value: number;
  }>;
}

export interface DashboardActivityItem {
  type: 'job' | 'finance' | 'user' | 'customer' | 'system';
  description: string;
  user: string;
  time: string;
  id: string;
}

export interface DashboardState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  data: {
    metrics: DashboardMetricsData;
    charts: DashboardChartsData;
    activity: DashboardActivityItem[];
  };
}

export const dashboardStateAtom = atom<DashboardState>({
  isInitialized: false,
  isLoading: false,
  error: null,
  data: {
    metrics: {
      totalRevenue: '$0',
      revenueChange: 0,
      activeJobs: 0,
      jobsChange: 0,
      customers: 0,
      customersChange: 0,
      carriers: 0,
      carriersChange: 0,
      outstandingInvoices: 0,
      invoicesChange: 0,
      profitMargin: 0,
      marginChange: 0,
      operatingCosts: 0,
      costsChange: 0,
      onTimeDelivery: 0,
      deliveryChange: 0,
      availableDrivers: 0,
      driversChange: 0,
      fleetUtilization: 0,
      utilizationChange: 0,
      newCustomers: 0,
      newCustomersChange: 0,
      conversionRate: 0,
      conversionChange: 0,
      leads: 0,
      leadsChange: 0,
      driverJobs: 0,
      driverJobsChange: 0,
      milesDriven: 0,
      mileageChange: 0,
      driverOnTimeRate: 0,
      driverOnTimeChange: 0,
      fuelEfficiency: 0,
      efficiencyChange: 0,
      customerShipments: 0,
      customerOnTimeRate: 0,
      customerOnTimeChange: 0,
      customerSpend: 0,
      customerSpendChange: 0,
      customerCompletedShipments: 0
    },
    charts: {
      performanceData: [],
      jobDistribution: [],
      financialData: [],
      marginTrends: [],
      completionRates: [],
      utilizationData: [],
      salesPerformance: [],
      customerAcquisition: [],
      driverPerformance: [],
      driverJobTypes: [],
      customerShipmentHistory: [],
      customerShipmentTypes: []
    },
    activity: []
  }
});

// Derived atoms for specific sections of the dashboard
export const dashboardMetricsAtom = atom((get) => get(dashboardStateAtom).data.metrics);
export const dashboardChartsAtom = atom((get) => get(dashboardStateAtom).data.charts);
export const dashboardActivityAtom = atom((get) => get(dashboardStateAtom).data.activity);

// Custom hooks for accessing dashboard data
export const useDashboardMetrics = () => {
  const roleFilteredMetricsAtom = atom((get) => {
    const baseMetrics = get(dashboardMetricsAtom);
    const activeRole = useAuthStore.getState().activeRole;
    
    // Apply any role-specific transformations to metrics here
    if (activeRole === AppRole.Driver) {
      // Driver-specific metrics formatting
      return {
        ...baseMetrics,
        // Any driver-specific transformations
      };
    }
    
    if (activeRole === AppRole.Customer) {
      // Customer-specific metrics formatting
      return {
        ...baseMetrics,
        // Any customer-specific transformations
      };
    }
    
    return baseMetrics;
  });
  
  const [metrics] = useAtom(roleFilteredMetricsAtom);
  return metrics;
};

export const useDashboardCharts = () => {
  const roleFilteredChartsAtom = atom((get) => {
    const baseCharts = get(dashboardChartsAtom);
    const activeRole = useAuthStore.getState().activeRole;
    
    // Apply any role-specific transformations to charts here
    if (activeRole === AppRole.Driver) {
      // Driver-specific chart formatting
      return {
        ...baseCharts,
        // Any driver-specific transformations
      };
    }
    
    if (activeRole === AppRole.Customer) {
      // Customer-specific chart formatting
      return {
        ...baseCharts,
        // Any customer-specific transformations
      };
    }
    
    return baseCharts;
  });
  
  const [charts] = useAtom(roleFilteredChartsAtom);
  return charts;
};

export const useDashboardActivity = () => {
  const roleFilteredActivityAtom = atom((get) => {
    const baseActivity = get(dashboardActivityAtom);
    const activeRole = useAuthStore.getState().activeRole;
    const userId = useAuthStore.getState().user?.id;
    
    // Filter activity based on role
    if (activeRole === AppRole.Driver && userId) {
      // Only show driver-relevant activity
      return baseActivity.filter(item => 
        item.type === 'job' || 
        (item.type === 'system' && item.description.toLowerCase().includes('driver'))
      );
    }
    
    if (activeRole === AppRole.Customer && userId) {
      // Only show customer-relevant activity
      return baseActivity.filter(item => 
        item.type === 'customer' || 
        (item.type === 'job' && item.description.toLowerCase().includes(userId))
      );
    }
    
    if (activeRole === AppRole.Accounts) {
      // Only show finance-relevant activity
      return baseActivity.filter(item => 
        item.type === 'finance' || 
        item.type === 'system'
      );
    }
    
    return baseActivity;
  });
  
  const [activity] = useAtom(roleFilteredActivityAtom);
  return activity;
}; 