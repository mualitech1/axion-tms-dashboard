
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';
import CustomerDocuments from '@/components/customers/CustomerDocuments';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';

export default function CustomerDocumentsPage() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCustomer = customerData.find(c => c.id === customerId);
    setCustomer(foundCustomer || null);
  }, [customerId]);

  if (!customer) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold">Customer not found</h2>
        <p className="mt-2 text-gray-500">The customer you're looking for doesn't exist.</p>
        <Button className="mt-4" onClick={() => navigate('/customers')}>
          Back to Customers
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(`/customers/${customerId}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customer
          </Button>
          <h1 className="text-2xl font-bold">{customer.name} Documents</h1>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <CustomerDocuments customer={customer} />
    </div>
  );
}
