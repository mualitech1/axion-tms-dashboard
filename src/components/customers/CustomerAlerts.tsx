
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Customer } from "@/types/customer";
import { BadgeClock, AlertTriangle, Check } from "lucide-react";

interface CustomerAlertsProps {
  customers: Customer[];
}

const CustomerAlerts = ({ customers }: CustomerAlertsProps) => {
  // Count customers with expiring documents
  const customersWithExpiringDocs = customers.filter(customer => 
    customer.documents?.some(doc => {
      if (!doc.expiryDate) return false;
      const expiryDate = new Date(doc.expiryDate);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    })
  ).length;
  
  // Count pending verifications
  const pendingVerifications = customers.reduce((count, customer) => {
    const pendingDocs = customer.documents?.filter(doc => 
      doc.verificationStatus === 'pending'
    ).length || 0;
    return count + pendingDocs;
  }, 0);
  
  // Count inactive customers
  const inactiveCustomers = customers.filter(
    customer => customer.status === 'Inactive'
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {customersWithExpiringDocs > 0 && (
        <Alert className="bg-amber-50 text-amber-800 border-amber-200">
          <BadgeClock className="h-4 w-4" />
          <AlertTitle>Expiring Documents</AlertTitle>
          <AlertDescription>
            {customersWithExpiringDocs} customer{customersWithExpiringDocs !== 1 ? 's' : ''} with 
            documents expiring within 30 days
          </AlertDescription>
        </Alert>
      )}
      
      {pendingVerifications > 0 && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Pending Verifications</AlertTitle>
          <AlertDescription>
            {pendingVerifications} document{pendingVerifications !== 1 ? 's' : ''} pending verification
          </AlertDescription>
        </Alert>
      )}
      
      {inactiveCustomers > 0 && (
        <Alert className="bg-rose-50 text-rose-800 border-rose-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Inactive Customers</AlertTitle>
          <AlertDescription>
            {inactiveCustomers} customer{inactiveCustomers !== 1 ? 's' : ''} marked as inactive
          </AlertDescription>
        </Alert>
      )}

      {customersWithExpiringDocs === 0 && pendingVerifications === 0 && inactiveCustomers === 0 && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
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
