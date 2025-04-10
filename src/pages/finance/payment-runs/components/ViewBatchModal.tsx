
import { format } from "date-fns";
import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BatchInvoice {
  id: string;
  carrierName: string;
  dueDate: string;
  amount: number;
  vatAmount: number;
  totalAmount: number;
}

interface ViewBatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBatch: string | null;
  batchInvoices: BatchInvoice[];
  onApproveBatch: () => void;
}

export function ViewBatchModal({
  open,
  onOpenChange,
  selectedBatch,
  batchInvoices,
  onApproveBatch
}: ViewBatchModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Payment Batch: {selectedBatch}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-3">
              <p className="text-xs text-muted-foreground">Payment Date</p>
              <p className="font-medium">20/04/2025</p>
            </div>
            <div className="border rounded-md p-3">
              <p className="text-xs text-muted-foreground">Total Invoices</p>
              <p className="font-medium">6</p>
            </div>
            <div className="border rounded-md p-3">
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="font-medium">£22,322.10</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="font-medium mb-4">Invoices in Batch</p>
            <div className="border rounded-md max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Net Amount (£)</TableHead>
                    <TableHead>VAT (£)</TableHead>
                    <TableHead>Total (£)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.carrierName}</TableCell>
                      <TableCell>{format(new Date(invoice.dueDate), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        £{invoice.amount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </TableCell>
                      <TableCell>
                        £{invoice.vatAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </TableCell>
                      <TableCell>
                        £{invoice.totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between">
            <div>
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-sm">This batch is pending approval</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
              <Button onClick={onApproveBatch}>Approve Batch</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
