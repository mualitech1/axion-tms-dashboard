import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInvoices } from "@/hooks/use-invoices";
import { Loader2, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { CreateInvoiceDialog } from "@/components/invoices/create-invoice-dialog/CreateInvoiceDialog";

export function BillingSection() {
  const { invoices, isLoading } = useInvoices();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-aximo-text">
        <Loader2 className="h-8 w-8 animate-spin text-aximo-primary" />
      </div>
    );
  }

  const totalOutstanding = invoices
    ?.filter(inv => ['draft', 'sent', 'overdue'].includes(inv.status))
    .reduce((sum, inv) => sum + inv.total_amount, 0) || 0;

  const handleInvoiceCreated = (invoice: any) => {
    // The useInvoices hook will automatically refresh the data
    setCreateDialogOpen(false);
  };

  return (
    <Card className="mb-6 bg-aximo-card border-aximo-border shadow-aximo">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-aximo-text">Quantum Energy Monitoring</CardTitle>
        <Button 
          onClick={() => setCreateDialogOpen(true)}
          className="bg-gradient-to-r from-aximo-primary to-purple-600 hover:from-aximo-primary/90 hover:to-purple-700"
        >
          <Zap className="mr-2 h-4 w-4" />
          Initialize Transaction
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-aximo-darker border-aximo-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-aximo-text-secondary">
                Unprocessed Quantum Energy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-aximo-text">
                {formatCurrency(totalOutstanding)}
              </div>
              <p className="text-xs text-aximo-text-secondary">
                From {invoices?.filter(inv => ['draft', 'sent', 'overdue'].includes(inv.status)).length || 0} quantum transactions
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-aximo-darker border-aximo-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-aximo-text-secondary">
                Recent Entanglements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-aximo-text">
                {formatCurrency(invoices
                  ?.filter(inv => inv.status === 'paid')
                  .slice(0, 5)
                  .reduce((sum, inv) => sum + inv.total_amount, 0) || 0)}
              </div>
              <p className="text-xs text-aximo-text-secondary">
                Last 5 energy entanglements
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-aximo-darker border-aximo-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-aximo-text-secondary">
                Spatio-Temporal Anomalies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {formatCurrency(invoices
                  ?.filter(inv => inv.status === 'overdue')
                  .reduce((sum, inv) => sum + inv.total_amount, 0) || 0)}
              </div>
              <p className="text-xs text-aximo-text-secondary">
                {invoices?.filter(inv => inv.status === 'overdue').length || 0} quantum field disruptions
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>

      <CreateInvoiceDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onInvoiceCreated={handleInvoiceCreated}
      />
    </Card>
  );
}
