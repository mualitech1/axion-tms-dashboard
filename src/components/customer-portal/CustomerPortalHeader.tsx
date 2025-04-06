
import { User } from 'lucide-react';
import { Customer } from '@/types/customer';
import { Badge } from '@/components/ui/badge';

interface CustomerPortalHeaderProps {
  customer: Customer;
}

const CustomerPortalHeader = ({ customer }: CustomerPortalHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-tms-gray-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-tms-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                {customer.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Customer ID: {customer.id}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1 text-right">
          <div className="text-sm">
            <span className="text-muted-foreground">Primary Contact: </span>
            <span className="font-medium">{customer.contact}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Last Activity: </span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalHeader;
