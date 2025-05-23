import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Calendar, Download, Eye, Edit, Trash2, Zap, Network } from "lucide-react";
import { InvoiceData } from "./create-invoice-dialog/types";
import { Switch } from "@/components/ui/switch";
import { InvoicePaymentModal } from "./InvoicePaymentModal";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

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
  const navigate = useNavigate();
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

  // Status label mapping for quantum terminology
  const statusLabels = {
    "paid": "Entangled",
    "pending": "Pending Entanglement"
  };

  return (
    <>
      <div className="rounded-md border border-aximo-border overflow-hidden">
        <Table>
          <TableHeader className="bg-aximo-darker">
            <TableRow className="hover:bg-transparent border-aximo-border">
              <TableHead className="font-semibold text-aximo-text cursor-pointer" onClick={() => handleSort('id')}>
                <div className="flex items-center">
                  Quantum ID
                  {getSortIcon('id')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-aximo-text cursor-pointer" onClick={() => handleSort('customer')}>
                <div className="flex items-center">
                  Entity
                  {getSortIcon('customer')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-aximo-text hidden md:table-cell cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center">
                  Creation Point
                  {getSortIcon('date')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-aximo-text hidden lg:table-cell cursor-pointer" onClick={() => handleSort('dueDate')}>
                <div className="flex items-center">
                  Entanglement Deadline
                  {getSortIcon('dueDate')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-aximo-text cursor-pointer" onClick={() => handleSort('amount')}>
                <div className="flex items-center">
                  Energy Units
                  {getSortIcon('amount')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-aximo-text">Quantum State</TableHead>
              <TableHead className="text-right font-semibold text-aximo-text">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <TableRow 
                  key={invoice.id} 
                  className="group border-aximo-border hover:bg-aximo-darker/60 group-hover:ring-1 group-hover:ring-aximo-primary/70 group-hover:shadow-[0_0_12px_rgba(var(--color-aximo-primary-rgb),0.4)] transition-all duration-300"
                >
                  <TableCell className="font-medium text-aximo-text">{invoice.id}</TableCell>
                  <TableCell className="max-w-[150px] truncate text-aximo-text">{invoice.customer}</TableCell>
                  <TableCell className="hidden md:table-cell text-aximo-text">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-3.5 w-3.5 text-aximo-text-secondary" />
                      {invoice.date}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-aximo-text">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-3.5 w-3.5 text-aximo-text-secondary" />
                      {invoice.dueDate}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-aximo-text">{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={`${
                        invoice.status === "paid" 
                          ? "bg-green-950/30 text-green-400 border-green-500/20" 
                          : "bg-amber-950/30 text-amber-400 border-amber-500/20"
                      }`}>
                        {statusLabels[invoice.status] || invoice.status}
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
                          className="h-8 w-8 text-aximo-primary border-aximo-border hover:bg-aximo-primary/10"
                          onClick={() => handlePayNow(invoice)}
                        >
                          <Zap className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 border-aximo-border hover:bg-aximo-primary/10"
                        onClick={() => navigate(`/invoices/${invoice.id}`)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 border-aximo-border hover:bg-aximo-primary/10"
                        onClick={() => onEditInvoice?.(invoice)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 border-aximo-border hover:bg-aximo-primary/10"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      {onDeleteInvoice && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-400 hover:bg-red-950/30 border-red-400/20"
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
              <TableRow className="border-aximo-border">
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-aximo-text-secondary">
                    <Network className="h-12 w-12 mb-2 opacity-30" />
                    <h3 className="font-medium">No quantum transactions found</h3>
                    <p className="text-sm">Adjust your search parameters to recalibrate results</p>
                  </div>
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
