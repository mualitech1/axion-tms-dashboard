import React from 'react';
import { Atom, Sparkles, Zap, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

export function SupplyChainHeader() {
  const breadcrumbItems = [
    { label: "Quantum Hub", path: "/" },
    { label: "Quantum Flow Network", path: "/supply-chain" }
  ];

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border mb-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-aximo-text">Quantum Flow Intelligence</h2>
            <p className="text-aximo-text-secondary">
              Monitor energy providers, quantum reserves, and spatio-temporal anomalies
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10 text-aximo-text">
              <Sparkles className="mr-2 h-4 w-4 text-aximo-primary" />
              Flux Analytics
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-aximo-primary to-purple-600 hover:from-aximo-primary/90 hover:to-purple-700">
              <Zap className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-aximo-darker p-4 flex items-center gap-4 border-aximo-border">
          <div className="rounded-full bg-aximo-primary/20 p-3">
            <Network className="h-6 w-6 text-aximo-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-aximo-text-secondary">Active Providers</p>
            <h4 className="text-2xl font-bold text-aximo-text">24</h4>
          </div>
        </Card>

        <Card className="bg-aximo-darker p-4 flex items-center gap-4 border-aximo-border">
          <div className="rounded-full bg-amber-950/50 p-3">
            <Atom className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-aximo-text-secondary">Energy Reserve Alerts</p>
            <h4 className="text-2xl font-bold text-aximo-text">3</h4>
          </div>
        </Card>

        <Card className="bg-aximo-darker p-4 flex items-center gap-4 border-aximo-border">
          <div className="rounded-full bg-red-950/50 p-3">
            <Sparkles className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-aximo-text-secondary">Field Anomalies</p>
            <h4 className="text-2xl font-bold text-aximo-text">5</h4>
          </div>
        </Card>
      </div>
    </div>
  );
}
