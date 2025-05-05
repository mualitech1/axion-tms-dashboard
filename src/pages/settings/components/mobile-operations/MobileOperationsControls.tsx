
import React from 'react';
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MobileOperationsControlsProps {
  activeTab: string;
  handleRefresh: () => void;
  handleExport: () => void;
}

export function MobileOperationsControls({ 
  activeTab, 
  handleRefresh, 
  handleExport 
}: MobileOperationsControlsProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="check-records">Check In/Out</TabsTrigger>
        <TabsTrigger value="gps-history">GPS History</TabsTrigger>
        <TabsTrigger value="app-interactions">App Interactions</TabsTrigger>
      </TabsList>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RotateCcw className="h-4 w-4 mr-1" /> Refresh
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-1" /> Export
        </Button>
      </div>
    </div>
  );
}
