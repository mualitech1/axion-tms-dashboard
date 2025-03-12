
import { UsersIcon, Shield, UserCog, LockIcon } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function UserOverview() {
  return (
    <DashboardCard title="User Overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-tms-blue-light p-2 rounded-full mr-3">
              <UsersIcon className="h-4 w-4 text-tms-blue" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">42</div>
              <div className="text-sm text-tms-gray-500">Total Users</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tms-green-light p-2 rounded-full mr-3">
              <UserCog className="h-4 w-4 text-tms-green" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">38</div>
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
              <div className="text-2xl font-semibold text-tms-gray-800">5</div>
              <div className="text-sm text-tms-gray-500">Admin Users</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
              <LockIcon className="h-4 w-4 text-tms-yellow" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">8</div>
              <div className="text-sm text-tms-gray-500">Password Resets (30 days)</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
