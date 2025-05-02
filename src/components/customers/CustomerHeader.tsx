
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { PlusCircle, Users, Search, FileText, Filter, DownloadCloud, BookOpen, Bell } from 'lucide-react';
import { Customer } from '@/types/customer';
import AddCustomerForm from './AddCustomerForm';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="space-y-4 bg-gradient-to-br from-white to-indigo-50/40 dark:from-indigo-950/20 dark:to-indigo-900/10 p-6 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-800 dark:to-indigo-700 p-3 rounded-full mr-4 shadow-md">
            <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-200" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-800 to-indigo-500 bg-clip-text text-transparent dark:from-indigo-300 dark:to-indigo-500">Customer Management</h2>
            <p className="text-indigo-600/70 dark:text-indigo-400 max-w-md">
              Manage your customers, their information and documents
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-700 dark:hover:bg-indigo-900/50"
          >
            <FileText className="h-4 w-4" />
            <span>Import</span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-700 dark:hover:bg-indigo-900/50"
          >
            <DownloadCloud className="h-4 w-4" />
            <span>Export</span>
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => setOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-4 border-t border-indigo-100/50 dark:border-indigo-800/30">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
          <Input
            placeholder="Search customers..."
            className="pl-10 w-full border-indigo-200 dark:border-indigo-700 bg-white dark:bg-indigo-950/30"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" className="flex items-center gap-1 border-indigo-200 dark:border-indigo-700">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1 border-indigo-200 dark:border-indigo-700">
            <BookOpen className="h-4 w-4" />
            <span>Reports</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1 border-indigo-200 dark:border-indigo-700">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </Button>
        </div>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
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
    </motion.div>
  );
};

export default CustomerHeader;
