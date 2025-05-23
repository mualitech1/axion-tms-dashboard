import React, { useState, useEffect } from 'react';
import { Customer } from '@/types/customer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CustomerGeneralInfoProps {
  customer: Customer;
  isEditing?: boolean;
  onChange?: (updatedCustomer: Customer) => void;
}

const CustomerGeneralInfo = ({ 
  customer, 
  isEditing = false, 
  onChange 
}: CustomerGeneralInfoProps) => {
  const [customerData, setCustomerData] = useState<Customer>({ ...customer });
  
  // Update local state when customer prop changes
  useEffect(() => {
    setCustomerData({ ...customer });
  }, [customer]);
  
  // Handle field changes
  const handleChange = (field: keyof Customer, value: string | number | boolean) => {
    const updatedCustomer = { ...customerData, [field]: value };
    setCustomerData(updatedCustomer);
    onChange?.(updatedCustomer);
  };
  
  // Handle nested address changes
  const handleAddressChange = (field: keyof typeof customer.address, value: string) => {
    const updatedAddress = { ...customerData.address, [field]: value };
    const updatedCustomer = { ...customerData, address: updatedAddress };
    setCustomerData(updatedCustomer);
    onChange?.(updatedCustomer);
  };
  
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
              value={customerData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              disabled={!isEditing}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="status" className="text-indigo-700 dark:text-indigo-300 font-medium">Status</Label>
            {isEditing ? (
              <Select 
                value={customerData.status} 
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger className="w-full border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center h-10 space-x-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  customerData.status === 'Active' ? 'bg-tms-green-light text-tms-green dark:bg-green-900/30 dark:text-green-400' :
                  customerData.status === 'On Hold' ? 'bg-tms-yellow-light text-tms-yellow dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-tms-gray-200 text-tms-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {customerData.status}
                </div>
              </div>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="contact" className="text-indigo-700 dark:text-indigo-300 font-medium">Primary Contact</Label>
            <Input 
              id="contact" 
              value={customerData.contact || ''}
              onChange={(e) => handleChange('contact', e.target.value)}
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              disabled={!isEditing}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="address" className="text-indigo-700 dark:text-indigo-300 font-medium">Registered Address</Label>
            <Input 
              id="address-street" 
              placeholder="Street Address"
              value={customerData.address?.street || ''}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              className="mb-2 border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              disabled={!isEditing}
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Input 
                id="address-city" 
                placeholder="City" 
                value={customerData.address?.city || ''}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
                disabled={!isEditing}
              />
              <Input 
                id="address-postcode" 
                placeholder="Post Code" 
                value={customerData.address?.postcode || ''}
                onChange={(e) => handleAddressChange('postcode', e.target.value)}
                className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
                disabled={!isEditing}
              />
            </div>
            <Input 
              id="address-country" 
              placeholder="Country" 
              value={customerData.address?.country || 'United Kingdom'} 
              onChange={(e) => handleAddressChange('country', e.target.value)}
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              disabled={!isEditing}
            />
          </motion.div>
        </motion.div>
        
        <motion.div className="space-y-4" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Label htmlFor="email" className="text-indigo-700 dark:text-indigo-300 font-medium">Email Address</Label>
            <Input 
              id="email"
              type="email"
              value={customerData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              disabled={!isEditing}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="phone" className="text-indigo-700 dark:text-indigo-300 font-medium">Phone Number</Label>
            <Input 
              id="phone"
              type="tel"
              value={customerData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              disabled={!isEditing}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="creditLimit" className="text-indigo-700 dark:text-indigo-300 font-medium">Credit Limit (£)</Label>
            <Input 
              id="creditLimit"
              type="number"
              value={customerData.creditLimit?.toString() || '0'}
              onChange={(e) => handleChange('creditLimit', Number(e.target.value))}
              className="border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              disabled={!isEditing}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="termsAccepted" className="text-indigo-700 dark:text-indigo-300 font-medium">Terms & Conditions</Label>
            <Card className="mt-1 border-indigo-100 dark:border-indigo-800/30 dark:bg-indigo-950/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-indigo-800 dark:text-indigo-300">Accepted Terms & Conditions</p>
                  <p className="text-sm text-muted-foreground dark:text-indigo-400/70">
                    {customerData.acceptedTerms ? 'Accepted on 15/03/2023' : 'Not yet accepted'}
                  </p>
                </div>
                <Switch 
                  checked={customerData.acceptedTerms || false} 
                  onCheckedChange={(checked) => handleChange('acceptedTerms', checked)}
                  disabled={!isEditing}
                />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="notes" className="text-indigo-700 dark:text-indigo-300 font-medium">Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Add notes about this customer..."
              value={customerData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="min-h-[120px] border-indigo-100 focus:border-indigo-300 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:focus:border-indigo-700"
              disabled={!isEditing}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerGeneralInfo;
