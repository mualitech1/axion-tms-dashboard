
import { Progress } from '@/components/ui/progress';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function DeliveryPerformanceCard() {
  return (
    <DashboardCard title="Delivery Performance">
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-tms-gray-700">On-Time Delivery</span>
            <span className="text-sm font-medium text-tms-green">92%</span>
          </div>
          <Progress value={92} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-green" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-tms-gray-700">POD Compliance</span>
            <span className="text-sm font-medium text-tms-blue">87%</span>
          </div>
          <Progress value={87} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-blue" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-tms-gray-700">Customer Satisfaction</span>
            <span className="text-sm font-medium text-tms-blue">94%</span>
          </div>
          <Progress value={94} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-blue" />
        </div>
      </div>
    </DashboardCard>
  );
}
