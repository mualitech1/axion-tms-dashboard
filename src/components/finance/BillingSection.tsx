
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInvoices } from "@/hooks/use-invoices";
import { Loader2, Plus } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";
import { CreateInvoiceDialog } from "@/components/invoices/create-invoice-dialog/CreateInvoiceDialog";

export function BillingSection() {
  const { invoices, isLoading } = useInvoices();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
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
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Billing Overview</CardTitle>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Outstanding Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalOutstanding)}
              </div>
              <p className="text-xs text-muted-foreground">
                From {invoices?.filter(inv => ['draft', 'sent', 'overdue'].includes(inv.status)).length || 0} invoices
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Recent Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(invoices
                  ?.filter(inv => inv.status === 'paid')
                  .slice(0, 5)
                  .reduce((sum, inv) => sum + inv.total_amount, 0) || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 5 payments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Overdue Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(invoices
                  ?.filter(inv => inv.status === 'overdue')
                  .reduce((sum, inv) => sum + inv.total_amount, 0) || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                {invoices?.filter(inv => inv.status === 'overdue').length || 0} overdue invoices
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
