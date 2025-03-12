
import { AlertTriangle, Calendar } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function UpcomingExpirations() {
  return (
    <DashboardCard title="Upcoming Expirations">
      <div className="space-y-4">
        <div className="border-l-2 border-tms-red pl-4 py-1">
          <p className="text-sm text-tms-gray-800">City Distribution Ltd</p>
          <div className="flex items-center text-xs text-tms-red mt-1">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>Insurance expired 2 days ago</span>
          </div>
        </div>
        
        <div className="border-l-2 border-tms-red pl-4 py-1">
          <p className="text-sm text-tms-gray-800">Global Freight Services</p>
          <div className="flex items-center text-xs text-tms-red mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Insurance expires in 7 days</span>
          </div>
        </div>
        
        <div className="border-l-2 border-tms-yellow pl-4 py-1">
          <p className="text-sm text-tms-gray-800">Global Freight Services</p>
          <div className="flex items-center text-xs text-tms-yellow mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>License expires in 24 days</span>
          </div>
        </div>
        
        <div className="border-l-2 border-tms-yellow pl-4 py-1">
          <p className="text-sm text-tms-gray-800">Swift Transport</p>
          <div className="flex items-center text-xs text-tms-yellow mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Insurance expires in 28 days</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
