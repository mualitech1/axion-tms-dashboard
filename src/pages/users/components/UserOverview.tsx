
import { UsersIcon, Shield, UserCog, UserX } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface UserOverviewProps {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  inactiveUsers: number;
}

export default function UserOverview({ 
  totalUsers, activeUsers, adminUsers, inactiveUsers 
}: UserOverviewProps) {
  return (
    <DashboardCard title="User Overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-tms-blue-light p-2 rounded-full mr-3">
              <UsersIcon className="h-4 w-4 text-tms-blue" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">{totalUsers}</div>
              <div className="text-sm text-tms-gray-500">Total Users</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tms-green-light p-2 rounded-full mr-3">
              <UserCog className="h-4 w-4 text-tms-green" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">{activeUsers}</div>
              <div className="text-sm text-tms-gray-500">Active Users</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-tms-blue-light p-2 rounded-full mr-3">
              <Shield className="h-4 w-4 text-tms-blue" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">{adminUsers}</div>
              <div className="text-sm text-tms-gray-500">Admin Users</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tms-red-light p-2 rounded-full mr-3">
              <UserX className="h-4 w-4 text-tms-red" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">{inactiveUsers}</div>
              <div className="text-sm text-tms-gray-500">Inactive Users</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
