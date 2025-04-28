
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { InvoiceDetailsHeader } from '@/components/invoices/invoice-details/InvoiceDetailsHeader';
import { InvoiceDetailsContent } from '@/components/invoices/invoice-details/InvoiceDetailsContent';
import { Card } from '@/components/ui/card';

export default function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: invoice, isLoading } = useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customer:companies(name),
          invoice_items(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <MainLayout title="Invoice Details">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-[400px] bg-gray-100 rounded-lg"></div>
        </div>
      </MainLayout>
    );
  }

  if (!invoice) {
    return (
      <MainLayout title="Invoice Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Invoice not found</h2>
          <p className="mt-2 text-gray-600">The invoice you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/invoices')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Invoice #${invoice.invoice_number}`}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate('/invoices')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <InvoiceDetailsHeader invoice={invoice} />
          <InvoiceDetailsContent invoice={invoice} />
        </Card>
      </div>
    </MainLayout>
  );
}
