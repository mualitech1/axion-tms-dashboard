
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface InvoiceSummaryCardsProps {
  invoices: any[];
  totalAmount: number;
  pendingAmount: number;
  paidAmount: number;
}

export function InvoiceSummaryCards({ 
  invoices, 
  totalAmount, 
  pendingAmount, 
  paidAmount 
}: InvoiceSummaryCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
      <Card className="bg-white hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{invoices.length}</span>
            </div>
            <span className="text-lg font-semibold">${totalAmount.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Last 12 months</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Pending Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">{invoices.filter(inv => inv.status === "pending").length}</span>
            </div>
            <span className="text-lg font-semibold text-amber-500">${pendingAmount.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Outstanding amount</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Paid Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{invoices.filter(inv => inv.status === "paid").length}</span>
            </div>
            <span className="text-lg font-semibold text-green-500">${paidAmount.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Collected amount</p>
        </CardContent>
      </Card>
    </div>
  );
}
