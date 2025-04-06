
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CustomerHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-tms-gray-800">Customer Management</h1>
        <p className="text-tms-gray-600">Manage your customer database and relationships</p>
      </div>
      
      <Button className="bg-tms-blue hover:bg-tms-blue/90">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Customer
      </Button>
    </div>
  );
};

export default CustomerHeader;
