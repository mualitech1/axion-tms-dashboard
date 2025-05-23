import React from 'react';
import { Search, Filter, Download, Network, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockVendorData } from '@/data/supplyChainData';

export function VendorManagement() {
  // Mapping for the status labels with quantum terminology
  const statusLabels = {
    'active': 'Synchronized',
    'at risk': 'Fluctuating'
  };

  return (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo">
      <CardHeader className="pb-2">
        <CardTitle className="text-aximo-text">Quantum Provider Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-aximo-text-secondary" />
            <Input
              placeholder="Search quantum providers..."
              className="pl-8 bg-aximo-darker border-aximo-border text-aximo-text"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10 text-aximo-text">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10 text-aximo-text">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border border-aximo-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-aximo-darker hover:bg-aximo-darker border-aximo-border">
                <TableHead className="font-semibold text-aximo-text">Provider Designation</TableHead>
                <TableHead className="font-semibold text-aximo-text">Energy Category</TableHead>
                <TableHead className="font-semibold text-aximo-text">Quantum Stability</TableHead>
                <TableHead className="font-semibold text-aximo-text">Sync Status</TableHead>
                <TableHead className="font-semibold text-aximo-text">Last Transmission</TableHead>
                <TableHead className="font-semibold text-aximo-text">Quantum Liaison</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVendorData.map((vendor) => (
                <TableRow key={vendor.id} className="hover:bg-aximo-darker/50 border-aximo-border">
                  <TableCell className="font-medium text-aximo-text">{vendor.name}</TableCell>
                  <TableCell className="text-aximo-text">{vendor.category}</TableCell>
                  <TableCell className="text-aximo-text">{vendor.reliabilityScore}%</TableCell>
                  <TableCell>
                    <Badge 
                      variant={vendor.status === 'active' ? 'default' : 'destructive'}
                      className={vendor.status === 'active' 
                        ? 'bg-green-950/30 text-green-400 border-green-500/20' 
                        : 'bg-red-950/30 text-red-400 border-red-500/20'}
                    >
                      {statusLabels[vendor.status] || vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-aximo-text">{vendor.lastDelivery}</TableCell>
                  <TableCell className="text-aximo-text">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-aximo-primary/20 flex items-center justify-center">
                        <Network className="h-3 w-3 text-aximo-primary" />
                      </div>
                      <div>
                        <div>{vendor.contact.name}</div>
                        <div className="text-xs text-aximo-text-secondary">{vendor.contact.email}</div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
