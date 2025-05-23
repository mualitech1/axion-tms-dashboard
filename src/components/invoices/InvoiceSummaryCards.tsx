import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Zap, ArrowUpRight, CircleDollarSign, Clock3, CheckCircle2 } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface InvoiceSummaryCardsProps {
  totals: {
    all: number;
    pending: number;
    paid: number;
  };
}

export function InvoiceSummaryCards({ totals }: InvoiceSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gradient-to-br from-aximo-darker to-aximo-darker/80 border border-aximo-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-aximo-text-secondary flex items-center">
            <Zap className="mr-2 h-4 w-4 text-aximo-primary" />
            Total Quantum Energy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-aximo-text">{formatCurrency(totals.all)}</div>
          <p className="text-xs text-aximo-text-secondary mt-1">
            <ArrowUpRight className="h-3 w-3 inline mr-1 text-green-400" />
            <span className="text-green-400">+15.3%</span> from previous cycle
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-aximo-darker to-aximo-darker/80 border border-aximo-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-aximo-text-secondary flex items-center">
            <Clock3 className="mr-2 h-4 w-4 text-amber-400" />
            Pending Entanglements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-aximo-text">{formatCurrency(totals.pending)}</div>
          <p className="text-xs text-aximo-text-secondary mt-1">
            <span className="text-amber-400 font-medium">{Math.round((totals.pending / totals.all) * 100)}%</span> of total energy awaiting entanglement
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-aximo-darker to-aximo-darker/80 border border-aximo-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-aximo-text-secondary flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
            Entangled Energy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-aximo-text">{formatCurrency(totals.paid)}</div>
          <p className="text-xs text-aximo-text-secondary mt-1">
            <span className="text-green-400 font-medium">{Math.round((totals.paid / totals.all) * 100)}%</span> of total quantum energy secured
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
