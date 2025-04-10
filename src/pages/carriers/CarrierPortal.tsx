import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Truck, History } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import CarrierDocumentUpload from './components/portal/CarrierDocumentUpload';
import CarrierJobHistory from './components/portal/CarrierJobHistory';
import CarrierComplianceStatus from './components/portal/CarrierComplianceStatus';

// Mock carrier data - in a real app, this would come from API/authentication
const mockCarrierData = {
  id: 1,
  name: "Fast Freight Solutions",
  complianceStatus: "Active", 
  complianceScore: 92,
  region: "Midwest",
  fleet: "15 vehicles",
  registrationDate: "2023-05-15",
  lastActivity: "2023-10-28",
  insuranceExpiry: "2024-07-30",
  licenseExpiry: "2024-08-15"
};

export default function CarrierPortal() {
  const [carrier, setCarrier] = useState(mockCarrierData);
  
  return (
    <MainLayout title="Carrier Portal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="mb-2 flex items-center"
            >
              <Link to="/carriers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Carriers
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Carrier Portal</h1>
            <p className="text-muted-foreground mt-1">{carrier.name}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button variant="outline" size="sm">
              <Truck className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{carrier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compliance Status</span>
                    <span className="font-medium">{carrier.complianceStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compliance Score</span>
                    <span className="font-medium">{carrier.complianceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-medium">{carrier.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fleet</span>
                    <span className="font-medium">{carrier.fleet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registered</span>
                    <span className="font-medium">{carrier.registrationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance Expires</span>
                    <span className="font-medium text-amber-600">{carrier.insuranceExpiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License Expires</span>
                    <span className="font-medium text-amber-600">{carrier.licenseExpiry}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <CarrierComplianceStatus carrier={carrier} />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <Tabs defaultValue="documents" className="space-y-4">
              <TabsList>
                <TabsTrigger value="documents">
                  <Upload className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="jobs">
                  <History className="h-4 w-4 mr-2" />
                  Job History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents" className="space-y-4">
                <CarrierDocumentUpload carrierName={carrier.name} />
              </TabsContent>
              
              <TabsContent value="jobs" className="space-y-4">
                <CarrierJobHistory carrierId={carrier.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
