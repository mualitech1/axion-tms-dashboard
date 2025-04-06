
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, UserPlus, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddCustomerForm from './AddCustomerForm';
import { Customer } from '@/types/customer';

interface CustomerHeaderProps {
  onAddCustomer: (customer: Customer) => void;
}

export default function CustomerHeader({ onAddCustomer }: CustomerHeaderProps) {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-tms-gray-800">Customer Management</h1>
          <p className="text-muted-foreground">Manage your customers and their accounts</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/customer-portal">
              <ExternalLink className="h-4 w-4 mr-2" />
              Customer Portal
            </Link>
          </Button>
          <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new customer record.
                </DialogDescription>
              </DialogHeader>
              <AddCustomerForm 
                onAddCustomer={(customer) => {
                  onAddCustomer(customer);
                  setIsAddCustomerOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Customers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="hidden md:flex space-x-2">
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
