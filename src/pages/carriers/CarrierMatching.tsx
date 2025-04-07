
import MainLayout from "@/components/layout/MainLayout";
import CarrierMatchingDemo from "./components/matching/CarrierMatchingDemo";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CarrierMatching() {
  return (
    <MainLayout title="Carrier Matching">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="mb-2"
            >
              <Link to="/carriers">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Carriers
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Automated Carrier Matching</h1>
            <p className="text-muted-foreground">
              Find the best carriers for your transportation needs based on capabilities and regions
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800">
          <h3 className="font-medium">Future Development Note</h3>
          <p className="text-sm">
            This is a demo version of the carrier matching system. In future versions, this will be 
            integrated with the job creation workflow and enhanced with machine learning capabilities
            to optimize carrier selection based on historical performance data.
          </p>
        </div>
        
        <CarrierMatchingDemo />
      </div>
    </MainLayout>
  );
}
