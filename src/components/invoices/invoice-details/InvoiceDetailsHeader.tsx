import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface InvoiceDetailsHeaderProps {
  invoice: any;
}

export function InvoiceDetailsHeader({ invoice }: InvoiceDetailsHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Invoice #{invoice.invoice_number}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Customer: {invoice.customer?.name}
          </p>
        </div>
        <div className="text-right">
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {formatCurrency(invoice.total_amount)}
          </p>
        </div>
      </div>
    </div>
  );
}
