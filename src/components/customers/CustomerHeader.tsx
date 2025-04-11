
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { PlusCircle, Users, Search, FileText, Filter, DownloadCloud } from 'lucide-react';
import { Customer } from '@/types/customer';
import AddCustomerForm from './AddCustomerForm';
import { Input } from '@/components/ui/input';

interface CustomerHeaderProps {
  onAddCustomer?: (customer: Customer) => void;
}

const CustomerHeader = ({ onAddCustomer }: CustomerHeaderProps) => {
  const [open, setOpen] = useState(false);
  
  const handleAddCustomer = (customer: Customer) => {
    if (onAddCustomer) {
      onAddCustomer(customer);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
          <p className="text-muted-foreground max-w-md">
            Manage your customers, their information and documents
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1"
            onClick={() => {}}
          >
            <FileText className="h-4 w-4" />
            <span>Import</span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1"
            onClick={() => {}}
          >
            <DownloadCloud className="h-4 w-4" />
            <span>Export</span>
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
            onClick={() => setOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-10 w-full"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <div className="flex items-center gap-2 ml-2">
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 text-blue-600 border border-blue-100 rounded-full">
              All
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              Active
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              Inactive
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <DialogTitle className="text-xl">Add New Customer</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new customer record
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="px-6">
            <AddCustomerForm onClose={() => setOpen(false)} onAddCustomer={handleAddCustomer} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerHeader;
