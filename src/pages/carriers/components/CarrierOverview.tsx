
import { Truck, FileCheck, AlertTriangle } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function CarrierOverview() {
  return (
    <DashboardCard title="Carrier Overview">
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="bg-tms-blue-light p-2 rounded-full mr-3">
            <Truck className="h-4 w-4 text-tms-blue" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-tms-gray-800">124</div>
            <div className="text-sm text-tms-gray-500">Total Carriers</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-tms-green-light p-2 rounded-full mr-3">
            <FileCheck className="h-4 w-4 text-tms-green" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-tms-gray-800">98</div>
            <div className="text-sm text-tms-gray-500">Fully Compliant</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-tms-red-light p-2 rounded-full mr-3">
            <AlertTriangle className="h-4 w-4 text-tms-red" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-tms-gray-800">8</div>
            <div className="text-sm text-tms-gray-500">Compliance Issues</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
