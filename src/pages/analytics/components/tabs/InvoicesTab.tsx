import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceAnalytics } from '@/components/invoices/InvoiceAnalytics';
import { InvoiceData } from '@/components/invoices/create-invoice-dialog/types';

interface InvoicesTabProps {
  invoices: InvoiceData[];
}

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  return (
    <Card className="bg-aximo-darker border-aximo-border">
      <CardHeader>
        <CardTitle className="text-aximo-text">Quantum Transaction Analysis</CardTitle>
        <CardDescription className="text-aximo-text-secondary">Energy transfer patterns and entanglement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <InvoiceAnalytics invoices={invoices} />
      </CardContent>
    </Card>
  );
}
