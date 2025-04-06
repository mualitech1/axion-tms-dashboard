
import React from 'react';
import { Customer } from '@/types/customer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

interface CustomerGeneralInfoProps {
  customer: Customer;
}

const CustomerGeneralInfo = ({ customer }: CustomerGeneralInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Company Name</Label>
            <Input id="name" defaultValue={customer.name} />
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <div className="flex items-center h-10 space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                customer.status === 'Active' ? 'bg-tms-green-light text-tms-green' :
                customer.status === 'On Hold' ? 'bg-tms-yellow-light text-tms-yellow' :
                'bg-tms-gray-200 text-tms-gray-600'
              }`}>
                {customer.status}
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Registered Address</Label>
            <Input 
              id="address-street" 
              placeholder="Street Address"
              defaultValue={customer.address?.street || ''}
              className="mb-2"
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Input 
                id="address-city" 
                placeholder="City" 
                defaultValue={customer.address?.city || ''}
              />
              <Input 
                id="address-postcode" 
                placeholder="Post Code" 
                defaultValue={customer.address?.postcode || ''}
              />
            </div>
            <Input 
              id="address-country" 
              placeholder="Country" 
              defaultValue={customer.address?.country || 'United Kingdom'} 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="creditLimit">Credit Limit (£)</Label>
            <Input 
              id="creditLimit"
              type="number"
              defaultValue={customer.creditLimit.toString()}
            />
          </div>
          
          <div>
            <Label htmlFor="termsAccepted">Terms & Conditions</Label>
            <Card className="mt-1">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Accepted Terms & Conditions</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.acceptedTerms ? 'Accepted on 15/03/2023' : 'Not yet accepted'}
                  </p>
                </div>
                <Switch checked={customer.acceptedTerms || false} />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Add notes about this customer..."
              className="min-h-[120px]"
              defaultValue={customer.notes || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerGeneralInfo;
