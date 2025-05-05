
import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockVendorData } from '@/data/supplyChainData';

export function VendorManagement() {
  return (
    <Card className="bg-aximo-card">
      <CardHeader className="pb-2">
        <CardTitle>Vendor Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              className="pl-8 bg-aximo-darker"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border border-aximo-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-aximo-darker hover:bg-aximo-darker">
                <TableHead>Vendor Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Reliability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Delivery</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVendorData.map((vendor) => (
                <TableRow key={vendor.id} className="hover:bg-aximo-darker">
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.category}</TableCell>
                  <TableCell>{vendor.reliabilityScore}%</TableCell>
                  <TableCell>
                    <Badge 
                      variant={vendor.status === 'active' ? 'default' : 'destructive'}
                      className={vendor.status === 'active' ? 'bg-green-500' : ''}
                    >
                      {vendor.status === 'active' ? 'Active' : 'At Risk'}
                    </Badge>
                  </TableCell>
                  <TableCell>{vendor.lastDelivery}</TableCell>
                  <TableCell>
                    <div>
                      <div>{vendor.contact.name}</div>
                      <div className="text-xs text-muted-foreground">{vendor.contact.email}</div>
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
