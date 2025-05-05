
import React from 'react';
import { Box, BarChart2, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function SupplyChainHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Supply Chain Intelligence</h2>
          <p className="text-muted-foreground">
            Monitor vendors, inventory, and supply chain disruptions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BarChart2 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button size="sm">
            <Truck className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-aximo-card p-4 flex items-center gap-4">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
            <Box className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
            <h4 className="text-2xl font-bold">24</h4>
          </div>
        </Card>

        <Card className="bg-aximo-card p-4 flex items-center gap-4">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-3">
            <Box className="h-6 w-6 text-amber-600 dark:text-amber-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Inventory Alerts</p>
            <h4 className="text-2xl font-bold">3</h4>
          </div>
        </Card>

        <Card className="bg-aximo-card p-4 flex items-center gap-4">
          <div className="rounded-full bg-red-100 dark:bg-red-900 p-3">
            <Box className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Disruptions</p>
            <h4 className="text-2xl font-bold">5</h4>
          </div>
        </Card>
      </div>
    </div>
  );
}
