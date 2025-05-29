import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

interface InvoiceDetailsContentProps {
  invoice: any;
}

export function InvoiceDetailsContent({ invoice }: InvoiceDetailsContentProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium text-gray-900">Issue Date</h3>
          <p className="mt-1 text-gray-600">{new Date(invoice.invoice_date).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Due Date</h3>
          <p className="mt-1 text-gray-600">{new Date(invoice.due_date).toLocaleDateString()}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-4">Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.invoice_line_items?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.unit_price_gbp)}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.line_total_gbp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 border-t pt-6">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(invoice.subtotal_gbp)}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="font-medium text-gray-600">VAT (20%)</span>
            <span className="font-medium">{formatCurrency(invoice.vat_amount_gbp)}</span>
          </div>
          <div className="flex justify-between text-lg mt-4 font-semibold">
            <span>Total</span>
            <span>{formatCurrency(invoice.total_amount_gbp)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
          <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}

      {invoice.terms && (
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Terms</h3>
          <p className="text-gray-600 whitespace-pre-line">{invoice.terms}</p>
        </div>
      )}
    </div>
  );
}
