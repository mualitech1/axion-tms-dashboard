
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CarrierMatchingDemo from "./components/matching/CarrierMatchingDemo";
import { Link } from "react-router-dom";
import { ArrowLeft, Truck, BriefcaseBusiness, Map, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { carriers } from "./data/carrierList";

export default function CarrierMatching() {
  const [matchesFound, setMatchesFound] = useState(0);
  
  // Function to be called from the demo component when matches are found
  const handleMatchesFound = (count: number) => {
    setMatchesFound(count);
  };
  
  return (
    <MainLayout title="Carrier Matching">
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
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
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Automated Carrier Matching
            </h1>
            <p className="text-muted-foreground mt-1">
              Find the best carriers for your transportation needs based on capabilities and regions
            </p>
          </div>
          
          <div className="flex items-center bg-indigo-500/10 rounded-lg px-4 py-3 border border-indigo-500/20">
            <Truck className="h-6 w-6 text-indigo-400 mr-3" />
            <div>
              <div className="text-sm text-aximo-text-secondary">Available Carriers</div>
              <div className="text-2xl font-bold text-aximo-text">{carriers.length}</div>
            </div>
            <div className="h-10 mx-4 border-r border-aximo-border"></div>
            <Zap className="h-6 w-6 text-indigo-400 mr-3" />
            <div>
              <div className="text-sm text-aximo-text-secondary">Matches Found</div>
              <div className="text-2xl font-bold text-aximo-text">{matchesFound}</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-blue-500/20 bg-blue-900/5 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-blue-400">
                Smart Matching System
              </CardTitle>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">Beta Feature</Badge>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium text-aximo-text">How It Works</h3>
              <p className="text-sm text-aximo-text-secondary mb-4">
                Our intelligent matching system analyzes your job requirements and finds the most suitable carriers based on their 
                capabilities, operating regions, performance history, and availability.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
                  <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center mb-2">
                    <Truck className="h-5 w-5 text-blue-400" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">Capability Matching</h4>
                  <p className="text-xs text-aximo-text-secondary">
                    Matches carriers with the exact equipment and capabilities required for your shipment
                  </p>
                </div>
                
                <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
                  <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center mb-2">
                    <Map className="h-5 w-5 text-blue-400" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">Regional Coverage</h4>
                  <p className="text-xs text-aximo-text-secondary">
                    Finds carriers that operate in the regions where your pickup and delivery locations are
                  </p>
                </div>
                
                <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
                  <div className="rounded-full w-10 h-10 bg-blue-500/20 flex items-center justify-center mb-2">
                    <BriefcaseBusiness className="h-5 w-5 text-blue-400" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">Performance History</h4>
                  <p className="text-xs text-aximo-text-secondary">
                    Considers past performance metrics like on-time delivery and compliance records
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <CarrierMatchingDemo onMatchesFound={handleMatchesFound} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-indigo-500/20 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Future Enhancements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-aximo-text-secondary">
                In future versions, this system will be enhanced with the following features:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-aximo-card p-4 rounded-lg border border-aximo-border">
                  <h4 className="font-medium text-sm mb-1">AI-Powered Rate Prediction</h4>
                  <p className="text-xs text-aximo-text-secondary">
                    Machine learning algorithms will predict optimal rates based on market conditions and historical data
                  </p>
                </div>
                
                <div className="bg-aximo-card p-4 rounded-lg border border-aximo-border">
                  <h4 className="font-medium text-sm mb-1">Real-Time Carrier Availability</h4>
                  <p className="text-xs text-aximo-text-secondary">
                    Integration with carrier systems to show real-time availability and capacity
                  </p>
                </div>
                
                <div className="bg-aximo-card p-4 rounded-lg border border-aximo-border">
                  <h4 className="font-medium text-sm mb-1">Automated Negotiation</h4>
                  <p className="text-xs text-aximo-text-secondary">
                    Intelligent system to help negotiate rates and terms with carriers based on your business rules
                  </p>
                </div>
                
                <div className="bg-aximo-card p-4 rounded-lg border border-aximo-border">
                  <h4 className="font-medium text-sm mb-1">Carbon Footprint Optimization</h4>
                  <p className="text-xs text-aximo-text-secondary">
                    Match carriers based on environmental impact and sustainability criteria
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
