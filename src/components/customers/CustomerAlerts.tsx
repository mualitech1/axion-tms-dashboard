
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Customer } from "@/types/customer";
import { BadgeCheck, AlertTriangle, Check, FileText, CreditCard, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CustomerAlertsProps {
  customers: Customer[];
  alertTypes?: string[];
  showAllAlerts?: boolean;
}

const CustomerAlerts = ({ customers, alertTypes = ['documents', 'verification', 'status', 'terms', 'contracts', 'credit'], showAllAlerts = true }: CustomerAlertsProps) => {
  const [expandedAlerts, setExpandedAlerts] = useState<Record<string, boolean>>({});
  
  const toggleExpand = (alertId: string) => {
    setExpandedAlerts(prev => ({
      ...prev,
      [alertId]: !prev[alertId]
    }));
  };
  
  // Count customers with expiring documents
  const customersWithExpiringDocs = alertTypes.includes('documents') ? customers.filter(customer => 
    customer.documents?.some(doc => {
      if (!doc.expiryDate) return false;
      const expiryDate = new Date(doc.expiryDate);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    })
  ) : [];
  
  // Count pending verifications
  const customersWithPendingVerifications = alertTypes.includes('verification') ? customers.filter(customer => 
    customer.documents?.some(doc => doc.verificationStatus === 'pending')
  ) : [];
  
  // Count inactive customers
  const inactiveCustomers = alertTypes.includes('status') ? customers.filter(
    customer => customer.status === 'Inactive'
  ) : [];
  
  // Count customers with unsigned terms
  const customersWithoutTerms = alertTypes.includes('terms') ? customers.filter(
    customer => customer.acceptedTerms === false
  ) : [];
  
  // Count customers with expiring contracts/rate cards
  const customersWithExpiringContracts = alertTypes.includes('contracts') ? customers.filter(customer => 
    customer.rateCards?.some(card => {
      if (!card.validTo) return false;
      const expiryDate = new Date(card.validTo);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    })
  ) : [];
  
  // Count customers with low credit
  const customersWithLowCredit = alertTypes.includes('credit') ? customers.filter(
    customer => customer.creditLimit !== undefined && customer.creditLimit < 5000
  ) : [];
  
  const getAffectedCustomerNames = (customerList: Customer[]) => {
    return customerList.map(c => c.name).join(', ');
  };

  const hasAlerts = 
    customersWithExpiringDocs.length > 0 || 
    customersWithPendingVerifications.length > 0 || 
    inactiveCustomers.length > 0 || 
    customersWithoutTerms.length > 0 || 
    customersWithExpiringContracts.length > 0 || 
    customersWithLowCredit.length > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {customersWithExpiringDocs.length > 0 && (
        <Alert className="bg-amber-50 text-amber-800 border-amber-200 relative overflow-hidden">
          <BadgeCheck className="h-4 w-4" />
          <AlertTitle>Expiring Documents</AlertTitle>
          <AlertDescription>
            <div className="mb-1">
              {customersWithExpiringDocs.length} customer{customersWithExpiringDocs.length !== 1 ? 's' : ''} with 
              documents expiring within 30 days
            </div>
            {expandedAlerts['expiringDocs'] && (
              <div className="mt-2 text-sm bg-amber-100 p-2 rounded">
                <strong>Affected customers:</strong> {getAffectedCustomerNames(customersWithExpiringDocs)}
              </div>
            )}
            <Button 
              variant="link" 
              size="sm" 
              className="text-amber-800 p-0 h-auto mt-1"
              onClick={() => toggleExpand('expiringDocs')}
            >
              {expandedAlerts['expiringDocs'] ? 'Show less' : 'Show details'}
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {customersWithPendingVerifications.length > 0 && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200 relative overflow-hidden">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Pending Verifications</AlertTitle>
          <AlertDescription>
            <div className="mb-1">
              {customersWithPendingVerifications.length} customer{customersWithPendingVerifications.length !== 1 ? 's' : ''} with documents pending verification
            </div>
            {expandedAlerts['pendingVerifications'] && (
              <div className="mt-2 text-sm bg-blue-100 p-2 rounded">
                <strong>Affected customers:</strong> {getAffectedCustomerNames(customersWithPendingVerifications)}
              </div>
            )}
            <Button 
              variant="link" 
              size="sm" 
              className="text-blue-800 p-0 h-auto mt-1"
              onClick={() => toggleExpand('pendingVerifications')}
            >
              {expandedAlerts['pendingVerifications'] ? 'Show less' : 'Show details'}
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {inactiveCustomers.length > 0 && (
        <Alert className="bg-rose-50 text-rose-800 border-rose-200 relative overflow-hidden">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Inactive Customers</AlertTitle>
          <AlertDescription>
            <div className="mb-1">
              {inactiveCustomers.length} customer{inactiveCustomers.length !== 1 ? 's' : ''} marked as inactive
            </div>
            {expandedAlerts['inactiveCustomers'] && (
              <div className="mt-2 text-sm bg-rose-100 p-2 rounded">
                <strong>Affected customers:</strong> {getAffectedCustomerNames(inactiveCustomers)}
              </div>
            )}
            <Button 
              variant="link" 
              size="sm" 
              className="text-rose-800 p-0 h-auto mt-1"
              onClick={() => toggleExpand('inactiveCustomers')}
            >
              {expandedAlerts['inactiveCustomers'] ? 'Show less' : 'Show details'}
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {customersWithoutTerms.length > 0 && (
        <Alert className="bg-purple-50 text-purple-800 border-purple-200 relative overflow-hidden">
          <FileText className="h-4 w-4" />
          <AlertTitle>Missing Terms Acceptance</AlertTitle>
          <AlertDescription>
            <div className="mb-1">
              {customersWithoutTerms.length} customer{customersWithoutTerms.length !== 1 ? 's' : ''} haven't accepted terms
            </div>
            {expandedAlerts['missingTerms'] && (
              <div className="mt-2 text-sm bg-purple-100 p-2 rounded">
                <strong>Affected customers:</strong> {getAffectedCustomerNames(customersWithoutTerms)}
              </div>
            )}
            <Button 
              variant="link" 
              size="sm" 
              className="text-purple-800 p-0 h-auto mt-1"
              onClick={() => toggleExpand('missingTerms')}
            >
              {expandedAlerts['missingTerms'] ? 'Show less' : 'Show details'}
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {customersWithExpiringContracts.length > 0 && (
        <Alert className="bg-indigo-50 text-indigo-800 border-indigo-200 relative overflow-hidden">
          <Clock className="h-4 w-4" />
          <AlertTitle>Expiring Rate Cards</AlertTitle>
          <AlertDescription>
            <div className="mb-1">
              {customersWithExpiringContracts.length} customer{customersWithExpiringContracts.length !== 1 ? 's' : ''} with rate cards expiring soon
            </div>
            {expandedAlerts['expiringContracts'] && (
              <div className="mt-2 text-sm bg-indigo-100 p-2 rounded">
                <strong>Affected customers:</strong> {getAffectedCustomerNames(customersWithExpiringContracts)}
              </div>
            )}
            <Button 
              variant="link" 
              size="sm" 
              className="text-indigo-800 p-0 h-auto mt-1"
              onClick={() => toggleExpand('expiringContracts')}
            >
              {expandedAlerts['expiringContracts'] ? 'Show less' : 'Show details'}
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {customersWithLowCredit.length > 0 && (
        <Alert className="bg-orange-50 text-orange-800 border-orange-200 relative overflow-hidden">
          <CreditCard className="h-4 w-4" />
          <AlertTitle>Low Credit Limit</AlertTitle>
          <AlertDescription>
            <div className="mb-1">
              {customersWithLowCredit.length} customer{customersWithLowCredit.length !== 1 ? 's' : ''} with low credit limit
            </div>
            {expandedAlerts['lowCredit'] && (
              <div className="mt-2 text-sm bg-orange-100 p-2 rounded">
                <strong>Affected customers:</strong> {getAffectedCustomerNames(customersWithLowCredit)}
              </div>
            )}
            <Button 
              variant="link" 
              size="sm" 
              className="text-orange-800 p-0 h-auto mt-1"
              onClick={() => toggleExpand('lowCredit')}
            >
              {expandedAlerts['lowCredit'] ? 'Show less' : 'Show details'}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!showAllAlerts && !hasAlerts && (
        <Alert className="bg-green-50 text-green-800 border-green-200 col-span-full">
          <Check className="h-4 w-4" />
          <AlertTitle>All Clear</AlertTitle>
          <AlertDescription>
            No alerts or pending actions needed at this time
          </AlertDescription>
        </Alert>
      )}
      
      {showAllAlerts && customersWithExpiringDocs.length === 0 && customersWithPendingVerifications.length === 0 && 
        inactiveCustomers.length === 0 && customersWithoutTerms.length === 0 && 
        customersWithExpiringContracts.length === 0 && customersWithLowCredit.length === 0 && (
        <Alert className="bg-green-50 text-green-800 border-green-200 col-span-full">
          <Check className="h-4 w-4" />
          <AlertTitle>All Clear</AlertTitle>
          <AlertDescription>
            No alerts or pending actions needed at this time
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CustomerAlerts;
