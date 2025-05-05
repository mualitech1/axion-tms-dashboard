
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import our newly refactored components
import { MobileOperationsHeader } from './mobile-operations/MobileOperationsHeader';
import { MobileOperationsControls } from './mobile-operations/MobileOperationsControls';
import { MobileOperationsFilters } from './mobile-operations/MobileOperationsFilters';
import { CheckInRecords } from './mobile-operations/CheckInRecords';
import { GpsHistory } from './mobile-operations/GpsHistory';
import { AppInteractions } from './mobile-operations/AppInteractions';

// Import mock data
import { mockCheckRecords, mockGpsHistory, mockAppInteractions } from './mobile-operations/mockData';

export default function MobileOperations() {
  const [activeTab, setActiveTab] = useState("check-records");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Latest mobile operations data has been loaded.",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being prepared and will download shortly.",
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
  };

  return (
    <Card>
      <CardHeader>
        <MobileOperationsHeader />
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="check-records" className="w-full" onValueChange={setActiveTab}>
          <MobileOperationsControls 
            activeTab={activeTab} 
            handleRefresh={handleRefresh} 
            handleExport={handleExport}
          />
          
          <MobileOperationsFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearFilters={handleClearFilters}
          />

          <TabsContent value="check-records" className="mt-0">
            <CheckInRecords records={mockCheckRecords} />
          </TabsContent>
          
          <TabsContent value="gps-history" className="mt-0">
            <GpsHistory locations={mockGpsHistory} />
          </TabsContent>
          
          <TabsContent value="app-interactions" className="mt-0">
            <AppInteractions interactions={mockAppInteractions} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
