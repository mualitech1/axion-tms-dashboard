
import { Users, Building, Plus, Phone, Mail } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

const CustomerOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DashboardCard title="Customer Overview">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-tms-blue-light p-2 rounded-full mr-3">
              <Users className="h-4 w-4 text-tms-blue" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">158</div>
              <div className="text-sm text-tms-gray-500">Total Customers</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tms-green-light p-2 rounded-full mr-3">
              <Building className="h-4 w-4 text-tms-green" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">142</div>
              <div className="text-sm text-tms-gray-500">Active Customers</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
              <Plus className="h-4 w-4 text-tms-yellow" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">24</div>
              <div className="text-sm text-tms-gray-500">New (Last 30 Days)</div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Contact Metrics">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-tms-blue-light p-2 rounded-full mr-3">
              <Phone className="h-4 w-4 text-tms-blue" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">68</div>
              <div className="text-sm text-tms-gray-500">Calls This Week</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tms-green-light p-2 rounded-full mr-3">
              <Mail className="h-4 w-4 text-tms-green" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">173</div>
              <div className="text-sm text-tms-gray-500">Emails This Week</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
              <Users className="h-4 w-4 text-tms-yellow" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-tms-gray-800">12</div>
              <div className="text-sm text-tms-gray-500">Meetings Scheduled</div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Recent Activity">
        <div className="space-y-4">
          <div className="border-l-2 border-tms-blue pl-4 py-1">
            <p className="text-sm text-tms-gray-800">New customer added: Oscorp Industries</p>
            <p className="text-xs text-tms-gray-500">Today, 10:30 AM</p>
          </div>
          
          <div className="border-l-2 border-tms-green pl-4 py-1">
            <p className="text-sm text-tms-gray-800">Credit limit updated: Wayne Enterprises</p>
            <p className="text-xs text-tms-gray-500">Yesterday, 3:15 PM</p>
          </div>
          
          <div className="border-l-2 border-tms-yellow pl-4 py-1">
            <p className="text-sm text-tms-gray-800">Customer status changed: Daily Planet</p>
            <p className="text-xs text-tms-gray-500">Yesterday, 11:45 AM</p>
          </div>
          
          <div className="border-l-2 border-tms-gray-400 pl-4 py-1">
            <p className="text-sm text-tms-gray-800">Contact details updated: Stark Industries</p>
            <p className="text-xs text-tms-gray-500">Jun 14, 2023, 2:30 PM</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default CustomerOverview;
