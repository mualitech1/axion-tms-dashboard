
import { User, Bell, ChevronDown } from 'lucide-react';
import { Customer } from '@/types/customer';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface CustomerPortalHeaderProps {
  customer: Customer;
}

const CustomerPortalHeader = ({ customer }: CustomerPortalHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                {customer.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                ID: {customer.id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4 mr-1" /> 
            Notifications
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Account <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="h-4 w-4 mr-2" /> Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Primary Contact</div>
          <div className="font-medium">{customer.contact}</div>
          <div className="text-sm">{customer.email}</div>
          <div className="text-sm">{customer.phone}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Credit Limit</div>
          <div className="font-medium">£{customer.creditLimit.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Available credit</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Address</div>
          {customer.address ? (
            <>
              <div className="font-medium">{customer.address.street}</div>
              <div className="text-sm">
                {customer.address.city}, {customer.address.postcode}
              </div>
              <div className="text-sm">{customer.address.country}</div>
            </>
          ) : (
            <div className="font-medium">No address on file</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalHeader;
