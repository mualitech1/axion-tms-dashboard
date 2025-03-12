
import { MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function RegionsCard() {
  return (
    <DashboardCard title="Active Regions">
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="bg-tms-blue-light p-2 rounded-full mr-3">
            <MapPin className="h-4 w-4 text-tms-blue" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium">London & South East</span>
              <span className="text-xs font-medium text-tms-gray-500">42%</span>
            </div>
            <Progress value={42} className="h-1.5 mt-1 bg-tms-gray-200" indicatorClassName="bg-tms-blue" />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-tms-green-light p-2 rounded-full mr-3">
            <MapPin className="h-4 w-4 text-tms-green" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Midlands</span>
              <span className="text-xs font-medium text-tms-gray-500">28%</span>
            </div>
            <Progress value={28} className="h-1.5 mt-1 bg-tms-gray-200" indicatorClassName="bg-tms-green" />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
            <MapPin className="h-4 w-4 text-tms-yellow" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium">North West</span>
              <span className="text-xs font-medium text-tms-gray-500">18%</span>
            </div>
            <Progress value={18} className="h-1.5 mt-1 bg-tms-gray-200" indicatorClassName="bg-tms-yellow" />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-tms-red-light p-2 rounded-full mr-3">
            <MapPin className="h-4 w-4 text-tms-red" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Scotland</span>
              <span className="text-xs font-medium text-tms-gray-500">12%</span>
            </div>
            <Progress value={12} className="h-1.5 mt-1 bg-tms-gray-200" indicatorClassName="bg-tms-red" />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
