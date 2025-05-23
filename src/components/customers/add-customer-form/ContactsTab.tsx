import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RequiredIndicator } from '@/components/ui/required-indicator';
import { ContactDetailsForm } from '../ContactDetailsForm';
import { Control, FieldErrors, UseFormTrigger } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone } from 'lucide-react';

interface ContactsTabProps {
  control: Control<any>;
  formState: { errors: FieldErrors };
  trigger: UseFormTrigger<any>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  primaryContact: any;
  setPrimaryContact: (contact: any) => void;
  invoiceContact: any;
  setInvoiceContact: (contact: any) => void;
  operationsContact: any;
  setOperationsContact: (contact: any) => void;
}

export const ContactsTab: React.FC<ContactsTabProps> = ({ 
  control, 
  formState, 
  trigger, 
  activeTab, 
  setActiveTab, 
  primaryContact, 
  setPrimaryContact, 
  invoiceContact, 
  setInvoiceContact, 
  operationsContact, 
  setOperationsContact 
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Primary Contact</CardTitle>
            <Badge variant="default" className="bg-indigo-500">Required</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            The main contact person for this customer
          </p>
        </CardHeader>
        <CardContent>
          <ContactDetailsForm
            control={control}
            formState={formState}
            prefix="primaryContact"
            required={true}
            trigger={trigger}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Invoice Contact</CardTitle>
            <Badge variant="outline" className="border-indigo-500 text-indigo-500">Optional</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            The person responsible for invoice payments
          </p>
        </CardHeader>
        <CardContent>
          <ContactDetailsForm
            control={control}
            formState={formState}
            prefix="invoiceContact"
            required={false}
            trigger={trigger}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Operations Contact</CardTitle>
            <Badge variant="outline" className="border-indigo-500 text-indigo-500">Optional</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            The person responsible for day-to-day operations
          </p>
        </CardHeader>
        <CardContent>
          <ContactDetailsForm
            control={control}
            formState={formState}
            prefix="operationsContact"
            required={false}
            trigger={trigger}
          />
        </CardContent>
      </Card>
    </div>
  );
};
