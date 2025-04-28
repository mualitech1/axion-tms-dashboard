
import React from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { InvoiceData } from "./create-invoice-dialog/types";

interface InvoiceSummaryCardsProps {
  invoices: InvoiceData[];
  totalAmount: number;
  pendingAmount: number;
  paidAmount: number;
}

export function InvoiceSummaryCards({
  invoices,
  totalAmount,
  pendingAmount,
  paidAmount,
}: InvoiceSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-aximo-card to-aximo-darker border-aximo-border p-6 hover:shadow-aximo transition-all duration-300">
        <div className="space-y-2">
          <p className="text-sm text-aximo-text-secondary">Total Invoices</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-aximo-text">{formatCurrency(totalAmount)}</h3>
            <span className="text-sm text-aximo-text-secondary">{invoices.length} invoices</span>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-aximo-card to-aximo-darker border-aximo-border p-6 hover:shadow-aximo transition-all duration-300">
        <div className="space-y-2">
          <p className="text-sm text-amber-400">Pending Invoices</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-amber-400">{formatCurrency(pendingAmount)}</h3>
            <span className="text-sm text-aximo-text-secondary">
              {invoices.filter(i => i.status === "pending").length} pending
            </span>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-aximo-card to-aximo-darker border-aximo-border p-6 hover:shadow-aximo transition-all duration-300">
        <div className="space-y-2">
          <p className="text-sm text-green-400">Paid Invoices</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-green-400">{formatCurrency(paidAmount)}</h3>
            <span className="text-sm text-aximo-text-secondary">
              {invoices.filter(i => i.status === "paid").length} paid
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
