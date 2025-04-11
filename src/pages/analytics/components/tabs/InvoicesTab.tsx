
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceAnalytics } from '@/components/invoices/InvoiceAnalytics';
import { InvoiceData } from '@/components/invoices/create-invoice-dialog/types';

interface InvoicesTabProps {
  invoices: InvoiceData[];
}

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Analytics</CardTitle>
        <CardDescription>Financial trends and payment analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <InvoiceAnalytics invoices={invoices} />
      </CardContent>
    </Card>
  );
}
