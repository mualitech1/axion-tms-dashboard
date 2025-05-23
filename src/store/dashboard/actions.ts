import { DashboardState, DashboardActivityItem } from '.';
import { SetStateAction } from 'jotai';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { AppRole } from '@/types/permissions';

export const initializeDashboardState = async (setState: (update: SetStateAction<DashboardState>) => void) => {
  setState(prev => ({ ...prev, isLoading: true, error: null }));
  
  try {
    // In a real app, you'd fetch this data from APIs or database
    // Here we're just using mock data
    const mockData = generateMockDashboardData();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setState(prev => ({
      ...prev,
      isInitialized: true,
      isLoading: false,
      data: mockData
    }));
  } catch (error) {
    console.error('Failed to initialize dashboard', error);
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: 'Failed to load dashboard data. Please try again.'
    }));
  }
};

export const resetDashboardState = (setState: (update: SetStateAction<DashboardState>) => void) => {
  setState(prev => ({
    ...prev,
    isInitialized: false,
    isLoading: false,
    error: null
  }));
};

export const setDashboardError = (
  setState: (update: SetStateAction<DashboardState>) => void,
  error: string
) => {
  setState(prev => ({
    ...prev,
    error
  }));
};

const generateMockDashboardData = () => {
  const activeRole = useAuthStore.getState().activeRole;
  
  return {
    metrics: {
      // Common metrics
      totalRevenue: '$245,500',
      revenueChange: 12.5,
      activeJobs: 32,
      jobsChange: 8.2,
      customers: 78,
      customersChange: 5.7,
      carriers: 15,
      carriersChange: 3.1,
      
      // Financial metrics
      outstandingInvoices: 18500,
      invoicesChange: -2.3,
      profitMargin: 22.5,
      marginChange: 1.8,
      operatingCosts: 185000,
      costsChange: -3.4,
      
      // Operations metrics
      onTimeDelivery: 94.2,
      deliveryChange: 2.1,
      availableDrivers: 18,
      driversChange: 5.5,
      fleetUtilization: 87.3,
      utilizationChange: 4.2,
      
      // Sales metrics
      newCustomers: 12,
      newCustomersChange: 20.0,
      conversionRate: 32.5,
      conversionChange: 5.3,
      leads: 45,
      leadsChange: 15.2,
      
      // Driver metrics (only populated if the user is a driver)
      ...(activeRole === AppRole.Driver ? {
        driverJobs: 8,
        driverJobsChange: 14.3,
        milesDriven: 2450,
        mileageChange: 8.2,
        driverOnTimeRate: 97.5,
        driverOnTimeChange: 2.5,
        fuelEfficiency: 7.8,
        efficiencyChange: 3.2
      } : {}),
      
      // Customer metrics (only populated if the user is a customer)
      ...(activeRole === AppRole.Customer ? {
        customerShipments: 5,
        customerOnTimeRate: 95.0,
        customerOnTimeChange: 5.0,
        customerSpend: 12500,
        customerSpendChange: -2.5,
        customerCompletedShipments: 28
      } : {})
    },
    charts: {
      performanceData: [
        { period: 'Jan', revenue: 125000, costs: 95000, profit: 30000 },
        { period: 'Feb', revenue: 132000, costs: 98000, profit: 34000 },
        { period: 'Mar', revenue: 141000, costs: 102000, profit: 39000 },
        { period: 'Apr', revenue: 138000, costs: 101000, profit: 37000 },
        { period: 'May', revenue: 158000, costs: 110000, profit: 48000 },
        { period: 'Jun', revenue: 162000, costs: 112000, profit: 50000 },
      ],
      
      jobDistribution: [
        { name: 'Completed', value: 68.5 },
        { name: 'In Progress', value: 22.3 },
        { name: 'Scheduled', value: 9.2 },
      ],
      
      financialData: [
        { month: 'Jan', revenue: 125000, expenses: 95000, profit: 30000 },
        { month: 'Feb', revenue: 132000, expenses: 98000, profit: 34000 },
        { month: 'Mar', revenue: 141000, expenses: 102000, profit: 39000 },
        { month: 'Apr', revenue: 138000, expenses: 101000, profit: 37000 },
        { month: 'May', revenue: 158000, expenses: 110000, profit: 48000 },
        { month: 'Jun', revenue: 162000, expenses: 112000, profit: 50000 },
      ],
      
      marginTrends: [
        { period: 'Jan', margin: 24.0 },
        { period: 'Feb', margin: 25.8 },
        { period: 'Mar', margin: 27.7 },
        { period: 'Apr', margin: 26.8 },
        { period: 'May', margin: 30.4 },
        { period: 'Jun', margin: 30.9 },
      ],
      
      completionRates: [
        { period: 'Jan', onTime: 92.3, delayed: 6.2, canceled: 1.5 },
        { period: 'Feb', onTime: 93.1, delayed: 5.8, canceled: 1.1 },
        { period: 'Mar', onTime: 93.8, delayed: 5.2, canceled: 1.0 },
        { period: 'Apr', onTime: 93.5, delayed: 5.4, canceled: 1.1 },
        { period: 'May', onTime: 94.5, delayed: 4.7, canceled: 0.8 },
        { period: 'Jun', onTime: 94.8, delayed: 4.4, canceled: 0.8 },
      ],
      
      utilizationData: [
        { name: 'Trucks', value: 88.5 },
        { name: 'Drivers', value: 85.2 },
        { name: 'Warehouse', value: 76.8 },
      ],
      
      salesPerformance: [
        { period: 'Jan', targets: 120000, actual: 125000 },
        { period: 'Feb', targets: 130000, actual: 132000 },
        { period: 'Mar', targets: 135000, actual: 141000 },
        { period: 'Apr', targets: 140000, actual: 138000 },
        { period: 'May', targets: 150000, actual: 158000 },
        { period: 'Jun', targets: 160000, actual: 162000 },
      ],
      
      customerAcquisition: [
        { period: 'Jan', newCustomers: 8, churn: 2 },
        { period: 'Feb', newCustomers: 10, churn: 3 },
        { period: 'Mar', newCustomers: 12, churn: 1 },
        { period: 'Apr', newCustomers: 9, churn: 2 },
        { period: 'May', newCustomers: 14, churn: 2 },
        { period: 'Jun', newCustomers: 11, churn: 1 },
      ],
      
      // Driver specific charts (only populated if the user is a driver)
      ...(activeRole === AppRole.Driver ? {
        driverPerformance: [
          { period: 'Jan', mileage: 2200, efficiency: 7.2, onTime: 95.0 },
          { period: 'Feb', mileage: 2350, efficiency: 7.3, onTime: 96.0 },
          { period: 'Mar', mileage: 2420, efficiency: 7.5, onTime: 96.5 },
          { period: 'Apr', mileage: 2280, efficiency: 7.6, onTime: 97.0 },
          { period: 'May', mileage: 2550, efficiency: 7.7, onTime: 97.5 },
          { period: 'Jun', mileage: 2450, efficiency: 7.8, onTime: 97.5 },
        ],
        
        driverJobTypes: [
          { name: 'Long Haul', value: 4 },
          { name: 'Regional', value: 3 },
          { name: 'Last Mile', value: 1 },
        ]
      } : {}),
      
      // Customer specific charts (only populated if the user is a customer)
      ...(activeRole === AppRole.Customer ? {
        customerShipmentHistory: [
          { period: 'Jan', shipments: 3, onTime: 3 },
          { period: 'Feb', shipments: 5, onTime: 4 },
          { period: 'Mar', shipments: 4, onTime: 4 },
          { period: 'Apr', shipments: 6, onTime: 6 },
          { period: 'May', shipments: 5, onTime: 5 },
          { period: 'Jun', shipments: 5, onTime: 5 },
        ],
        
        customerShipmentTypes: [
          { name: 'Standard', value: 18 },
          { name: 'Express', value: 7 },
          { name: 'Refrigerated', value: 3 },
        ]
      } : {})
    },
    activity: [
      {
        type: 'job' as const,
        description: 'New job #1242 created for ABC Corp',
        user: 'John Doe',
        time: '10 minutes ago',
        id: '1'
      },
      {
        type: 'finance' as const,
        description: 'Invoice #INV-2022-056 paid ($12,500)',
        user: 'System',
        time: '45 minutes ago',
        id: '2'
      },
      {
        type: 'job' as const,
        description: 'Job #1240 status changed to "Completed"',
        user: 'Jane Smith',
        time: '1 hour ago',
        id: '3'
      },
      {
        type: 'user' as const,
        description: 'New driver "Mike Johnson" added to the system',
        user: 'Admin',
        time: '2 hours ago',
        id: '4'
      },
      {
        type: 'customer' as const,
        description: 'New customer "XYZ Industries" onboarded',
        user: 'Sarah Wilson',
        time: '3 hours ago',
        id: '5'
      },
      {
        type: 'finance' as const,
        description: 'New invoice #INV-2022-057 created ($18,750)',
        user: 'System',
        time: '3 hours ago',
        id: '6'
      },
      {
        type: 'job' as const,
        description: 'Job #1239 scheduled for tomorrow',
        user: 'Dispatcher',
        time: '4 hours ago',
        id: '7'
      },
      {
        type: 'system' as const,
        description: 'System maintenance completed successfully',
        user: 'System',
        time: '5 hours ago',
        id: '8'
      },
      {
        type: 'job' as const,
        description: 'Driver assigned to job #1241',
        user: 'Dispatcher',
        time: '5 hours ago',
        id: '9'
      },
      {
        type: 'finance' as const,
        description: 'Monthly financial report generated',
        user: 'System',
        time: '6 hours ago',
        id: '10'
      }
    ]
  };
}; 