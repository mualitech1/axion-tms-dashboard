
import React from 'react';
import { Customer } from '@/types/customer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface CustomerGeneralInfoProps {
  customer: Customer;
}

const CustomerGeneralInfo = ({ customer }: CustomerGeneralInfoProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
        <motion.div className="space-y-4" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Label htmlFor="name" className="text-indigo-700 dark:text-indigo-300 font-medium">Company Name</Label>
            <Input 
              id="name" 
              defaultValue={customer.name}
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700" 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="status" className="text-indigo-700 dark:text-indigo-300 font-medium">Status</Label>
            <div className="flex items-center h-10 space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                customer.status === 'Active' ? 'bg-tms-green-light text-tms-green dark:bg-green-900/30 dark:text-green-400' :
                customer.status === 'On Hold' ? 'bg-tms-yellow-light text-tms-yellow dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-tms-gray-200 text-tms-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}>
                {customer.status}
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="address" className="text-indigo-700 dark:text-indigo-300 font-medium">Registered Address</Label>
            <Input 
              id="address-street" 
              placeholder="Street Address"
              defaultValue={customer.address?.street || ''}
              className="mb-2 border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Input 
                id="address-city" 
                placeholder="City" 
                defaultValue={customer.address?.city || ''}
                className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              />
              <Input 
                id="address-postcode" 
                placeholder="Post Code" 
                defaultValue={customer.address?.postcode || ''}
                className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              />
            </div>
            <Input 
              id="address-country" 
              placeholder="Country" 
              defaultValue={customer.address?.country || 'United Kingdom'} 
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
            />
          </motion.div>
        </motion.div>
        
        <motion.div className="space-y-4" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Label htmlFor="creditLimit" className="text-indigo-700 dark:text-indigo-300 font-medium">Credit Limit (£)</Label>
            <Input 
              id="creditLimit"
              type="number"
              defaultValue={customer.creditLimit.toString()}
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="termsAccepted" className="text-indigo-700 dark:text-indigo-300 font-medium">Terms & Conditions</Label>
            <Card className="mt-1 border-indigo-100 dark:border-indigo-800/30 dark:bg-indigo-950/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-indigo-800 dark:text-indigo-300">Accepted Terms & Conditions</p>
                  <p className="text-sm text-muted-foreground dark:text-indigo-400/70">
                    {customer.acceptedTerms ? 'Accepted on 15/03/2023' : 'Not yet accepted'}
                  </p>
                </div>
                <Switch checked={customer.acceptedTerms || false} />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="notes" className="text-indigo-700 dark:text-indigo-300 font-medium">Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Add notes about this customer..."
              className="min-h-[120px] border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              defaultValue={customer.notes || ''}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerGeneralInfo;
