
import { format } from "date-fns";
import { Check, CheckCircle, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

// Types
export interface PaymentBatch {
  id: string;
  creationDate: string;
  paymentDate: string;
  totalAmount: number;
  invoiceCount: number;
  status: string;
}

interface PaymentRunsTableProps {
  filteredBatches: PaymentBatch[];
  onViewBatch: (batchId: string) => void;
  onApproveBatch: (batchId: string) => void;
  onExportBatch: (batchId: string) => void;
  onMarkAsPaid: (batchId: string) => void;
}

// Helper function to get status badge styling
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending Approval":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">{status}</Badge>;
    case "Approved":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">{status}</Badge>;
    case "Exported":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100">{status}</Badge>;
    case "Paid":
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function PaymentRunsTable({
  filteredBatches,
  onViewBatch,
  onApproveBatch,
  onExportBatch,
  onMarkAsPaid
}: PaymentRunsTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payment Batches</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Total Amount (£)</TableHead>
              <TableHead>No. of Invoices</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-medium">{batch.id}</TableCell>
                <TableCell>{format(new Date(batch.creationDate), "dd/MM/yyyy")}</TableCell>
                <TableCell>{format(new Date(batch.paymentDate), "dd/MM/yyyy")}</TableCell>
                <TableCell>£{batch.totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                <TableCell>{batch.invoiceCount}</TableCell>
                <TableCell>{getStatusBadge(batch.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="View Invoices" 
                      onClick={() => onViewBatch(batch.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {batch.status === "Pending Approval" && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Approve Batch" 
                        onClick={() => onApproveBatch(batch.id)}
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                    
                    {batch.status === "Approved" && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Export Batch" 
                        onClick={() => onExportBatch(batch.id)}
                      >
                        <FileText className="h-4 w-4 text-blue-600" />
                      </Button>
                    )}
                    
                    {(batch.status === "Approved" || batch.status === "Exported") && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Mark as Paid" 
                        onClick={() => onMarkAsPaid(batch.id)}
                      >
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredBatches.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No payment batches found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
