import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { dashboardStateAtom } from '@/store/dashboard';
import { initializeDashboardState } from '@/store/dashboard/actions';
import { useAtom } from 'jotai';
import { AppRole } from '@/types/permissions';
import { usePermissions } from '@/hooks/use-permissions';
import { useAuth } from '@/hooks/use-auth';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const [dashboardState, setDashboardState] = useAtom(dashboardStateAtom);
  const { can, hasRole } = usePermissions();
  const { user, profile } = useAuth();
  const userRole = useAuthStore(state => state.activeRole); // Keep this for now until we fully migrate roles
  
  // Get user display name from new auth system
  const getUserDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.split('.').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
    }
    return 'User';
  };

  const getWelcomeMessage = () => {
    const userName = getUserDisplayName();
    
    switch (userRole) {
      case AppRole.Admin:
        return `Welcome back, ${userName}. You have full administrative access.`;
      case AppRole.Operations:
        return `Welcome, ${userName}. Operations dashboard is ready.`;
      case AppRole.Accounts:
        return `Welcome, ${userName}. Financial overview is available.`;
      case AppRole.Sales:
        return `Welcome, ${userName}. Sales performance metrics are updated.`;
      case AppRole.Driver:
        return `Welcome, ${userName}. Your driving assignments are ready.`;
      case AppRole.Customer:
        return `Welcome, ${userName}. Your shipment status is available below.`;
      default:
        return `Hello ${userName}! Welcome to Axion TMS`;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">{getWelcomeMessage()}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Temporary simplified dashboard while we fix the complex metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-4">
              <div className="text-2xl font-bold">157</div>
              <p className="text-xs text-emerald-600">↑ 12.7%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-4">
              <div className="text-2xl font-bold">£12,750</div>
              <p className="text-xs text-emerald-600">↑ 16.2%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Weekly Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-4">
              <div className="text-2xl font-bold">891</div>
              <p className="text-xs text-emerald-600">↑ 8.5%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-4">
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-emerald-600">New this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Exclusively for You section */}
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">⭐</span>
              <CardTitle className="text-blue-400">Welcome to Your Command Center</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold text-white mb-2">
              {getWelcomeMessage()}
            </h2>
            <p className="text-gray-300 mb-4">
              Your personalized logistics command center is ready. Access real-time data, 
              manage operations efficiently, and drive your business forward with 
              quantum-powered intelligence.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-emerald-400 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                All systems operational
              </div>
              <div className="text-xs text-gray-400">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Section */}
        <Card>
          <CardHeader>
            <CardTitle>Axion TMS Dashboard</CardTitle>
            <p className="text-muted-foreground">Welcome to your transport management system</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">System Status: Operational</h3>
              <p className="text-muted-foreground">
                All systems are running smoothly. Your data is being processed in real-time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 