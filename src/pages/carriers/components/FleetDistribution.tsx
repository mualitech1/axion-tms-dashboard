
import { Progress } from '@/components/ui/progress';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function FleetDistribution() {
  return (
    <DashboardCard title="Fleet Distribution">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-tms-gray-700">HGV Fleet</span>
            <span className="text-sm font-medium text-tms-gray-700">42%</span>
          </div>
          <Progress value={42} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-blue" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-tms-gray-700">LGV Fleet</span>
            <span className="text-sm font-medium text-tms-gray-700">28%</span>
          </div>
          <Progress value={28} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-green" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-tms-gray-700">Mixed Fleet</span>
            <span className="text-sm font-medium text-tms-gray-700">18%</span>
          </div>
          <Progress value={18} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-yellow" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-tms-gray-700">Multimodal</span>
            <span className="text-sm font-medium text-tms-gray-700">12%</span>
          </div>
          <Progress value={12} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-red" />
        </div>
      </div>
    </DashboardCard>
  );
}
