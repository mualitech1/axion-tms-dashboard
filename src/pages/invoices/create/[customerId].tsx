import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import InvoiceCreator from '@/components/invoices/InvoiceCreator';

export default function CreateInvoicePage() {
  const { customerId } = useParams();

  return (
    <MainLayout title="Create Invoice" description="Create a new invoice for your customer">
      <div className="container mx-auto py-6">
        <InvoiceCreator 
          customerId={customerId as string}
        />
      </div>
    </MainLayout>
  );
} 