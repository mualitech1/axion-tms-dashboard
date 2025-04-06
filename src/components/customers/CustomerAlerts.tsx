import React from 'react';
import { Bell, CalendarClock, CreditCard, FileCheck } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Customer } from '@/types/customer';
import { formatDistanceToNow } from 'date-fns';

interface CustomerAlertsProps {
  customer?: Customer;
  allCustomers?: Customer[];
}

interface CustomerAlert {
  id: string;
  type: 'document' | 'contract' | 'creditLimit' | 'invoice';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  customerId: number;
}

// This would typically come from an API or database
const generateCustomerAlerts = (customers: Customer[]): CustomerAlert[] => {
  const alerts: CustomerAlert[] = [];
  
  customers.forEach(customer => {
    // Check for documents nearing expiry
    if (customer.documents) {
      customer.documents.forEach(doc => {
        if (doc.expiryDate) {
          const expiryDate = new Date(doc.expiryDate);
          const today = new Date();
          const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysUntilExpiry <= 30) {
            alerts.push({
              id: `doc-${customer.id}-${doc.id}`,
              type: 'document',
              title: 'Document Expiring Soon',
              description: `${doc.name} for ${customer.name} expires in ${daysUntilExpiry} days`,
              severity: daysUntilExpiry <= 7 ? 'high' : daysUntilExpiry <= 14 ? 'medium' : 'low',
              date: doc.expiryDate,
              customerId: customer.id
            });
          }
        }
      });
    }
    
    // Check for rate cards nearing expiry
    if (customer.rateCards) {
      customer.rateCards.forEach(rateCard => {
        const expiryDate = new Date(rateCard.validTo);
        const today = new Date();
        const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry <= 30) {
          alerts.push({
            id: `rate-${customer.id}-${rateCard.id}`,
            type: 'contract',
            title: 'Rate Card Expiring Soon',
            description: `${rateCard.name} for ${customer.name} expires in ${daysUntilExpiry} days`,
            severity: daysUntilExpiry <= 7 ? 'high' : daysUntilExpiry <= 14 ? 'medium' : 'low',
            date: rateCard.validTo,
            customerId: customer.id
          });
        }
      });
    }
    
    // Check if customer has accepted terms
    if (customer.acceptedTerms === false) {
      alerts.push({
        id: `terms-${customer.id}`,
        type: 'document',
        title: 'Terms Not Accepted',
        description: `${customer.name} has not accepted the terms and conditions`,
        severity: 'high',
        date: new Date().toISOString(),
        customerId: customer.id
      });
    }
    
    // Sample alert for credit limit usage (in real app, would check actual usage)
    if (customer.creditLimit && customer.creditLimit < 10000) {
      alerts.push({
        id: `credit-${customer.id}`,
        type: 'creditLimit',
        title: 'Low Credit Limit',
        description: `${customer.name}'s credit limit is below recommended minimum`,
        severity: 'medium',
        date: new Date().toISOString(),
        customerId: customer.id
      });
    }
  });
  
  return alerts;
};

const getAlertIcon = (alertType: string) => {
  switch (alertType) {
    case 'document':
      return <FileCheck className="h-5 w-5 mr-2" />;
    case 'contract':
      return <CalendarClock className="h-5 w-5 mr-2" />;
    case 'creditLimit':
      return <CreditCard className="h-5 w-5 mr-2" />;
    case 'invoice':
      return <Bell className="h-5 w-5 mr-2" />;
    default:
      return <Bell className="h-5 w-5 mr-2" />;
  }
};

const getAlertClassName = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'border-red-500 bg-red-50';
    case 'medium':
      return 'border-yellow-500 bg-yellow-50';
    case 'low':
      return 'border-blue-500 bg-blue-50';
    default:
      return '';
  }
};

const CustomerAlerts: React.FC<CustomerAlertsProps> = ({ customer, allCustomers }) => {
  // If a specific customer is provided, only show alerts for that customer
  // Otherwise, show alerts for all customers
  const customersToCheck = customer ? [customer] : allCustomers || [];
  const alerts = generateCustomerAlerts(customersToCheck);
  
  if (alerts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No alerts or reminders at this time
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Alert key={alert.id} className={`flex items-center ${getAlertClassName(alert.severity)}`}>
          <div className="flex items-center">
            {getAlertIcon(alert.type)}
            <div>
              <AlertTitle className="font-medium">{alert.title}</AlertTitle>
              <AlertDescription className="text-sm">
                {alert.description} - {formatDistanceToNow(new Date(alert.date), { addSuffix: true })}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default CustomerAlerts;
