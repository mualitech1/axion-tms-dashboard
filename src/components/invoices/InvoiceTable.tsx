
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Calendar, Download, Eye, Edit, Trash2, CreditCard } from "lucide-react";
import { InvoiceData } from "./create-invoice-dialog/types";
import { Switch } from "@/components/ui/switch";
import { InvoicePaymentModal } from "./InvoicePaymentModal";

interface InvoiceTableProps {
  invoices: InvoiceData[];
  onEditInvoice?: (invoice: InvoiceData) => void;
  onDeleteInvoice?: (id: string) => void;
  onStatusChange?: (id: string, newStatus: "pending" | "paid") => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
}

export function InvoiceTable({ 
  invoices, 
  onEditInvoice, 
  onDeleteInvoice, 
  onStatusChange,
  sortColumn,
  sortDirection,
  onSort
}: InvoiceTableProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleSort = (column: string) => {
    if (onSort) {
      onSort(column);
    }
  };

  const handlePayNow = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (invoiceId: string) => {
    if (onStatusChange) {
      onStatusChange(invoiceId, "paid");
    }
  };

  const getSortIcon = (column: string) => {
    if (sortColumn === column) {
      return <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180 transform' : ''}`} />;
    }
    return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />;
  };

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700 cursor-pointer" onClick={() => handleSort('id')}>
                <div className="flex items-center">
                  Invoice #
                  {getSortIcon('id')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 cursor-pointer" onClick={() => handleSort('customer')}>
                <div className="flex items-center">
                  Customer
                  {getSortIcon('customer')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 hidden md:table-cell cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center">
                  Issue Date
                  {getSortIcon('date')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 hidden lg:table-cell cursor-pointer" onClick={() => handleSort('dueDate')}>
                <div className="flex items-center">
                  Due Date
                  {getSortIcon('dueDate')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 cursor-pointer" onClick={() => handleSort('amount')}>
                <div className="flex items-center">
                  Amount
                  {getSortIcon('amount')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{invoice.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-3.5 w-3.5 text-gray-500" />
                      {invoice.date}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-3.5 w-3.5 text-gray-500" />
                      {invoice.dueDate}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={`${
                        invoice.status === "paid" 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      }`}>
                        {invoice.status === "paid" ? "Paid" : "Pending"}
                      </Badge>
                      {onStatusChange && (
                        <Switch 
                          checked={invoice.status === "paid"}
                          onCheckedChange={(checked) => 
                            onStatusChange(invoice.id, checked ? "paid" : "pending")
                          }
                          className="ml-2 scale-75 origin-left"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      {invoice.status !== "paid" && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600"
                          onClick={() => handlePayNow(invoice)}
                        >
                          <CreditCard className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => onEditInvoice?.(invoice)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      {onDeleteInvoice && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:bg-red-50 hover:border-red-200"
                          onClick={() => onDeleteInvoice(invoice.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                  No invoices found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <InvoicePaymentModal 
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        invoice={selectedInvoice}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}
