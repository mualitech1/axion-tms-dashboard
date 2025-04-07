
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Filter } from 'lucide-react';

export default function ReportsHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pipeline Reports</h1>
        <p className="text-muted-foreground">
          Analytics and reports for your sales pipeline
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <FileDown className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}
