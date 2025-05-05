
import React from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockInventoryData } from '@/data/supplyChainData';

export function InventoryTracking() {
  const getProgressColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  const getInventoryLevel = (item: typeof mockInventoryData[0]) => {
    const range = item.maxThreshold - item.minThreshold;
    const level = ((item.quantity - item.minThreshold) / range) * 100;
    return Math.max(0, Math.min(100, level));
  };

  return (
    <Card className="bg-aximo-card">
      <CardHeader className="pb-2">
        <CardTitle>Inventory Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              className="pl-8 bg-aximo-darker"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="default" size="sm">
              <AlertCircle className="mr-2 h-4 w-4" />
              Restock Alerts
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border border-aximo-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-aximo-darker hover:bg-aximo-darker">
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Restocked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInventoryData.map((item) => (
                <TableRow key={item.id} className="hover:bg-aximo-darker">
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{`${item.quantity} / ${item.maxThreshold}`}</span>
                        <Badge
                          variant={item.status === 'normal' ? 'outline' : 'destructive'}
                          className={
                            item.status === 'normal' 
                              ? 'border-green-500 text-green-500' 
                              : item.status === 'low' 
                                ? 'bg-amber-500 hover:bg-amber-600' 
                                : 'bg-red-500 hover:bg-red-600'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <Progress value={getInventoryLevel(item)} className={getProgressColor(item.status)} />
                    </div>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.lastRestocked}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
