import React from 'react';
import { Search, Filter, AlertCircle, Atom, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockInventoryData } from '@/data/supplyChainData';

export function InventoryTracking() {
  // Mapping for the status labels with quantum terminology
  const statusLabels = {
    'normal': 'optimal',
    'low': 'diminishing',
    'critical': 'unstable'
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-amber-400';
      case 'critical': return 'bg-red-400';
      default: return 'bg-aximo-primary';
    }
  };

  const getInventoryLevel = (item: typeof mockInventoryData[0]) => {
    const range = item.maxThreshold - item.minThreshold;
    const level = ((item.quantity - item.minThreshold) / range) * 100;
    return Math.max(0, Math.min(100, level));
  };

  return (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo">
      <CardHeader className="pb-2">
        <CardTitle className="text-aximo-text">Quantum Energy Reserves</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-aximo-text-secondary" />
            <Input
              placeholder="Search energy reserves..."
              className="pl-8 bg-aximo-darker border-aximo-border text-aximo-text"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10 text-aximo-text">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="default" size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-500/90 hover:to-amber-600/90">
              <Atom className="mr-2 h-4 w-4" />
              Depletion Alerts
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border border-aximo-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-aximo-darker hover:bg-aximo-darker border-aximo-border">
                <TableHead className="font-semibold text-aximo-text">Energy Component</TableHead>
                <TableHead className="font-semibold text-aximo-text">Flux Category</TableHead>
                <TableHead className="font-semibold text-aximo-text">Quantum Units</TableHead>
                <TableHead className="font-semibold text-aximo-text">Matrix Stability</TableHead>
                <TableHead className="font-semibold text-aximo-text">Spatial Coordinates</TableHead>
                <TableHead className="font-semibold text-aximo-text">Last Resonance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInventoryData.map((item) => (
                <TableRow key={item.id} className="hover:bg-aximo-darker/50 border-aximo-border">
                  <TableCell className="font-medium text-aximo-text">{item.item}</TableCell>
                  <TableCell className="text-aximo-text">{item.category}</TableCell>
                  <TableCell className="text-aximo-text">{item.quantity}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-aximo-text">{`${item.quantity} / ${item.maxThreshold}`}</span>
                        <Badge
                          variant={item.status === 'normal' ? 'outline' : 'destructive'}
                          className={
                            item.status === 'normal' 
                              ? 'border-green-500/20 text-green-400 bg-green-950/30' 
                              : item.status === 'low' 
                                ? 'bg-amber-950/30 text-amber-400 border-amber-500/20' 
                                : 'bg-red-950/30 text-red-400 border-red-500/20'
                          }
                        >
                          {statusLabels[item.status] || item.status}
                        </Badge>
                      </div>
                      <Progress value={getInventoryLevel(item)} className={getProgressColor(item.status)} />
                    </div>
                  </TableCell>
                  <TableCell className="text-aximo-text">{item.location}</TableCell>
                  <TableCell className="text-aximo-text">{item.lastRestocked}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
