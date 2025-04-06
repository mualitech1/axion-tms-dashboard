
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import AddCustomerForm from './AddCustomerForm';

const CustomerHeader = () => {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-tms-gray-800">Customer Management</h1>
        <p className="text-tms-gray-600">Manage your customer database and relationships</p>
      </div>
      
      <Button 
        className="bg-tms-blue hover:bg-tms-blue/90"
        onClick={() => setIsAddCustomerOpen(true)}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Customer
      </Button>

      {/* Add Customer Dialog */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          
          <AddCustomerForm onClose={() => setIsAddCustomerOpen(false)} />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerHeader;
