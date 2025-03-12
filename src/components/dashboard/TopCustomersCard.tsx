
import { ShoppingBag } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface Customer {
  id: number;
  name: string;
  revenue: number;
  growth: number;
}

interface TopCustomersCardProps {
  customers: Customer[];
}

export default function TopCustomersCard({ customers }: TopCustomersCardProps) {
  return (
    <DashboardCard title="Top Customers">
      <div className="space-y-4">
        {customers.map((customer) => (
          <div key={customer.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-tms-gray-200 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                <ShoppingBag className="h-4 w-4 text-tms-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-tms-gray-800">{customer.name}</p>
                <p className="text-xs text-tms-gray-500">£{customer.revenue.toLocaleString()}</p>
              </div>
            </div>
            <div className={`text-xs font-medium ${customer.growth >= 0 ? 'text-tms-green' : 'text-tms-red'}`}>
              {customer.growth >= 0 ? '+' : ''}{customer.growth}%
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
