
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Kanban, Plus } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
        <p className="text-muted-foreground">
          Track leads, opportunities and manage your sales process.
        </p>
      </div>
      <div className="flex gap-2">
        <Link to="/pipeline/board">
          <Button variant="outline">
            <Kanban className="mr-2 h-4 w-4" />
            Board View
          </Button>
        </Link>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Lead
        </Button>
      </div>
    </div>
  );
}
