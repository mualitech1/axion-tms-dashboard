
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { carriers } from "../../data/carrierList";
import { findBestMatches } from "../../utils/carrierMatchingUtils";
import { JobRequirements, MatchResult } from "../../data/types/matchingTypes";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Truck, AlertTriangle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

interface CarrierMatchingDemoProps {
  onMatchesFound?: (count: number) => void;
}

export default function CarrierMatchingDemo({ onMatchesFound }: CarrierMatchingDemoProps) {
  const [jobRequirements, setJobRequirements] = useState<JobRequirements>({
    id: `JOB-${Math.floor(Math.random() * 10000)}`,
    pickupLocation: "",
    deliveryLocation: "",
    requiredCapabilities: [],
    requiredRegions: [],
    pickupDate: "",
    deliveryDate: "",
    priority: "Medium",
    specialInstructions: ""
  });
  
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("requirements");
  
  const capabilities = [
    { id: "refrigerated", label: "Refrigerated" },
    { id: "hazmat", label: "Hazardous Materials" },
    { id: "oversized", label: "Oversized Load" },
    { id: "expedited", label: "Expedited Shipping" },
    { id: "ltl", label: "Less Than Truckload (LTL)" },
    { id: "ftl", label: "Full Truckload (FTL)" }
  ];
  
  const regions = [
    { id: "northeast", label: "Northeast" },
    { id: "midwest", label: "Midwest" },
    { id: "south", label: "South" },
    { id: "west", label: "West" },
    { id: "northwest", label: "Northwest" },
    { id: "southwest", label: "Southwest" },
    { id: "southeast", label: "Southeast" },
    { id: "central", label: "Central" }
  ];
  
  const handleInputChange = (field: keyof JobRequirements, value: any) => {
    setJobRequirements(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCapabilityToggle = (capabilityId: string) => {
    setJobRequirements(prev => {
      const currentCapabilities = [...prev.requiredCapabilities];
      if (currentCapabilities.includes(capabilityId)) {
        return {
          ...prev,
          requiredCapabilities: currentCapabilities.filter(id => id !== capabilityId)
        };
      } else {
        return {
          ...prev,
          requiredCapabilities: [...currentCapabilities, capabilityId]
        };
      }
    });
  };
  
  const handleRegionToggle = (regionId: string) => {
    setJobRequirements(prev => {
      const currentRegions = [...prev.requiredRegions];
      if (currentRegions.includes(regionId)) {
        return {
          ...prev,
          requiredRegions: currentRegions.filter(id => id !== regionId)
        };
      } else {
        return {
          ...prev,
          requiredRegions: [...currentRegions, regionId]
        };
      }
    });
  };
  
  const handleFindMatches = () => {
    setIsLoading(true);
    setActiveTab("results");
    
    // Simulate API call delay
    setTimeout(() => {
      const matchResults = findBestMatches(jobRequirements, carriers);
      setMatches(matchResults);
      setIsLoading(false);
      
      // Call the callback function with the number of matches found
      if (onMatchesFound) {
        onMatchesFound(matchResults.length);
      }
    }, 1500);
  };
  
  // Set default values for testing
  useEffect(() => {
    setJobRequirements({
      id: `JOB-${Math.floor(Math.random() * 10000)}`,
      pickupLocation: "Chicago, IL",
      deliveryLocation: "Cleveland, OH",
      requiredCapabilities: ["refrigerated", "expedited"],
      requiredRegions: ["midwest"],
      pickupDate: "2025-05-15",
      deliveryDate: "2025-05-16",
      priority: "Medium",
      specialInstructions: "Product must remain between 2-8°C during transport."
    });
  }, []);
  
  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Truck className="h-5 w-5 mr-2 text-indigo-400" />
          Carrier Matching System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-aximo-darker">
            <TabsTrigger value="requirements">Job Requirements</TabsTrigger>
            <TabsTrigger value="results">Matching Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requirements" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - basic info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickup-location">Pickup Location</Label>
                  <Input 
                    id="pickup-location"
                    value={jobRequirements.pickupLocation}
                    onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                    placeholder="Enter city, state"
                  />
                </div>
                
                <div>
                  <Label htmlFor="delivery-location">Delivery Location</Label>
                  <Input 
                    id="delivery-location"
                    value={jobRequirements.deliveryLocation}
                    onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                    placeholder="Enter city, state"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup-date">Pickup Date</Label>
                    <Input 
                      id="pickup-date"
                      type="date"
                      value={jobRequirements.pickupDate}
                      onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="delivery-date">Delivery Date</Label>
                    <Input 
                      id="delivery-date"
                      type="date"
                      value={jobRequirements.deliveryDate}
                      onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={jobRequirements.priority.toString()} 
                    onValueChange={(value) => handleInputChange("priority", value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="special-instructions">Special Instructions</Label>
                  <Textarea 
                    id="special-instructions"
                    value={jobRequirements.specialInstructions}
                    onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                    placeholder="Enter any special requirements or notes"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              
              {/* Right column - capabilities and regions */}
              <div className="space-y-6">
                <div>
                  <Label className="block mb-2">Required Capabilities</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {capabilities.map((capability) => (
                      <div key={capability.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={capability.id}
                          checked={jobRequirements.requiredCapabilities.includes(capability.id)}
                          onCheckedChange={() => handleCapabilityToggle(capability.id)}
                        />
                        <label
                          htmlFor={capability.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {capability.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Required Operating Regions</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {regions.map((region) => (
                      <div key={region.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={region.id}
                          checked={jobRequirements.requiredRegions.includes(region.id)}
                          onCheckedChange={() => handleRegionToggle(region.id)}
                        />
                        <label
                          htmlFor={region.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {region.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700" 
                    onClick={handleFindMatches}
                    disabled={
                      !jobRequirements.pickupLocation || 
                      !jobRequirements.deliveryLocation || 
                      !jobRequirements.pickupDate ||
                      !jobRequirements.deliveryDate ||
                      jobRequirements.requiredCapabilities.length === 0 ||
                      jobRequirements.requiredRegions.length === 0
                    }
                  >
                    Find Matching Carriers
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="pt-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-indigo-400 animate-spin mb-4" />
                <p className="text-lg font-medium">Finding the best carrier matches...</p>
                <p className="text-sm text-muted-foreground">Analyzing carrier capabilities, regions, and availability</p>
              </div>
            ) : matches.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-indigo-500/5 p-4 rounded-md border border-indigo-500/20 mb-4">
                  <h3 className="text-lg font-medium mb-1">Job Requirements Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Pickup:</span> {jobRequirements.pickupLocation}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Delivery:</span> {jobRequirements.deliveryLocation}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pickup Date:</span> {new Date(jobRequirements.pickupDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Delivery Date:</span> {new Date(jobRequirements.deliveryDate).toLocaleDateString()}
                    </div>
                    <div className="col-span-full">
                      <span className="text-muted-foreground">Requirements:</span> 
                      <div className="flex flex-wrap gap-1 mt-1">
                        {jobRequirements.requiredCapabilities.map(cap => (
                          <Badge key={cap} variant="secondary" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
                            {capabilities.find(c => c.id === cap)?.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-2">Best Matches</h3>
                <div className="grid grid-cols-1 gap-4">
                  {matches.map((match, index) => (
                    <motion.div
                      key={match.carrierId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className={`border-l-4 ${
                        match.matchScore > 85 ? "border-l-green-500" : 
                        match.matchScore > 70 ? "border-l-indigo-500" : 
                        match.matchScore > 60 ? "border-l-amber-500" : "border-l-red-500"
                      }`}>
                        <CardContent className="p-5">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-lg font-medium">{match.carrierName}</h4>
                                <Badge variant="outline" className={`
                                  ${match.matchScore > 85 ? "bg-green-500/10 text-green-400 border-green-500/30" : 
                                    match.matchScore > 70 ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" : 
                                    match.matchScore > 60 ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : 
                                    "bg-red-500/10 text-red-400 border-red-500/30"}
                                `}>
                                  Match: {match.matchScore}%
                                </Badge>
                              </div>
                              
                              <div className="text-sm space-y-2">
                                <div className="mt-2">
                                  <h5 className="font-medium text-sm mb-1">Match Reasons:</h5>
                                  <ul className="space-y-1">
                                    {match.matchReasons.map((reason, i) => (
                                      <li key={i} className="text-xs flex items-start">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{reason}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {match.matchWarnings && match.matchWarnings.length > 0 && (
                                  <div>
                                    <h5 className="font-medium text-sm mb-1">Potential Issues:</h5>
                                    <ul className="space-y-1">
                                      {match.matchWarnings.map((warning, i) => (
                                        <li key={i} className="text-xs flex items-start">
                                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
                                          <span className="text-muted-foreground">{warning}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col justify-center items-end gap-2">
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-muted-foreground">Carrier ID:</span>
                                <span className="text-sm font-mono">{match.carrierId}</span>
                              </div>
                              <Button className="bg-indigo-600 hover:bg-indigo-700">
                                Select <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <AlertTriangle className="h-12 w-12 text-amber-400 mb-4" />
                <p className="text-lg font-medium">No matching carriers found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your requirements or expanding the regions
                </p>
                <Button
                  variant="outline" 
                  onClick={() => setActiveTab("requirements")}
                  className="mt-4"
                >
                  Adjust Requirements
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
