import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { InvoiceDetailsHeader } from '@/components/invoices/invoice-details/InvoiceDetailsHeader';
import { InvoiceDetailsContent } from '@/components/invoices/invoice-details/InvoiceDetailsContent';
import { Card } from '@/components/ui/card';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { motion } from 'framer-motion';
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function InvoiceDetails() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const { data: invoice, isLoading } = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customer:customers(company_name, id),
          invoice_line_items(*)
        `)
        .eq('id', invoiceId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const breadcrumbItems = [
    { label: "Quantum Hub", path: "/" },
    { label: "Financial Matrix", path: "/invoices" },
    { label: `Transaction ${invoiceId?.substring(0, 8)}`, path: `/invoices/${invoiceId}` },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border"
        >
          <Breadcrumb items={breadcrumbItems} />
          <DashboardHeader
            title="Quantum Transaction Details"
            subtitle="Loading transaction entanglement patterns..."
          />
        </motion.div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 bg-aximo-primary/20 rounded"></div>
          <div className="h-[400px] bg-aximo-card/50 rounded-lg border border-aximo-border"></div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="space-y-6 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border"
        >
          <Breadcrumb items={breadcrumbItems} />
          <DashboardHeader
            title="Quantum Transaction Not Found"
            subtitle="The requested transaction does not exist in the quantum matrix"
          />
        </motion.div>
        
        <Card className="text-center py-12 bg-aximo-card border-aximo-border">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl mb-4">🌌</div>
            <h2 className="text-2xl font-semibold text-aximo-text mb-2">Transaction Not Found</h2>
            <p className="text-aximo-text-secondary mb-6">The quantum transaction you're looking for doesn't exist or you don't have permission to view it.</p>
            <Button onClick={() => navigate('/invoices')} className="bg-gradient-to-r from-aximo-primary to-purple-600 hover:from-aximo-primary/90 hover:to-purple-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Financial Matrix
            </Button>
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border"
      >
        <Breadcrumb items={breadcrumbItems} />
        <DashboardHeader
          title={`Quantum Transaction #${invoice.invoice_number}`}
          subtitle={`Energy exchange patterns with ${invoice.customer?.company_name || 'Unknown Entity'}`}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex justify-between items-center"
      >
        <Button variant="outline" onClick={() => navigate('/invoices')} className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Matrix
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="p-6 bg-aximo-card border-aximo-border shadow-aximo">
          <InvoiceDetailsHeader invoice={invoice} />
          <InvoiceDetailsContent invoice={invoice} />
        </Card>
      </motion.div>
    </div>
  );
}
