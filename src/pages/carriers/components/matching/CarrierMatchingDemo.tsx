
import { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { findMatchingCarriers } from "../../utils/carrierMatchingUtils";
import { carrierData } from "../../data/carrierData";
import { JobRequirements, MatchResult, MatchingFilters } from "../../data/types/matchingTypes";
import { capabilityOptions } from "../registration/sections/CapabilitiesSection";
import { regionOptions } from "../registration/sections/RegionalCoverageSection";
import { AlertCircle } from "lucide-react";

export default function CarrierMatchingDemo() {
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [jobRequirements, setJobRequirements] = useState<JobRequirements>({
    id: `job-${Date.now()}`,
    pickupLocation: '',
    deliveryLocation: '',
    requiredCapabilities: [],
    requiredRegions: [],
    pickupDate: '',
    deliveryDate: '',
    priority: 'Medium',
  });
  
  const [filters, setFilters] = useState<MatchingFilters>({
    requireAllCapabilities: false,
    requireAllRegions: true,
    minimumComplianceLevel: 'Compliant',
    excludeInactiveCarriers: true,
    excludeNonCompliantCarriers: true,
  });

  const handleRequirementChange = (field: keyof JobRequirements, value: any) => {
    setJobRequirements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterChange = (field: keyof MatchingFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCapabilityToggle = (capability: string) => {
    setJobRequirements(prev => {
      const capabilities = prev.requiredCapabilities.includes(capability)
        ? prev.requiredCapabilities.filter(c => c !== capability)
        : [...prev.requiredCapabilities, capability];
      
      return {
        ...prev,
        requiredCapabilities: capabilities
      };
    });
  };

  const handleRegionToggle = (region: string) => {
    setJobRequirements(prev => {
      const regions = prev.requiredRegions.includes(region)
        ? prev.requiredRegions.filter(r => r !== region)
        : [...prev.requiredRegions, region];
      
      return {
        ...prev,
        requiredRegions: regions
      };
    });
  };

  const findMatches = () => {
    setIsMatching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const results = findMatchingCarriers(jobRequirements, carrierData, filters);
      setMatchResults(results);
      setIsMatching(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carrier Matching System (Demo)</CardTitle>
          <CardDescription>
            Enter job requirements to find matching carriers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickup">Pickup Location</Label>
              <Input
                id="pickup"
                placeholder="City or postcode"
                value={jobRequirements.pickupLocation}
                onChange={(e) => handleRequirementChange('pickupLocation', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="delivery">Delivery Location</Label>
              <Input
                id="delivery"
                placeholder="City or postcode"
                value={jobRequirements.deliveryLocation}
                onChange={(e) => handleRequirementChange('deliveryLocation', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickupDate">Pickup Date</Label>
              <Input
                id="pickupDate"
                type="date"
                value={jobRequirements.pickupDate}
                onChange={(e) => handleRequirementChange('pickupDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={jobRequirements.deliveryDate}
                onChange={(e) => handleRequirementChange('deliveryDate', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label>Priority</Label>
            <Select 
              value={jobRequirements.priority} 
              onValueChange={(value: 'Low' | 'Medium' | 'High' | 'Urgent') => 
                handleRequirementChange('priority', value)
              }
            >
              <SelectTrigger>
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
            <Label className="block mb-2">Required Capabilities</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {capabilityOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`capability-${option.id}`}
                    checked={jobRequirements.requiredCapabilities.includes(option.id)}
                    onCheckedChange={() => handleCapabilityToggle(option.id)}
                  />
                  <Label 
                    htmlFor={`capability-${option.id}`}
                    className="text-sm font-normal"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="block mb-2">Required Regions</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {regionOptions.slice(0, 8).map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`region-${option.id}`}
                    checked={jobRequirements.requiredRegions.includes(option.id)}
                    onCheckedChange={() => handleRegionToggle(option.id)}
                  />
                  <Label 
                    htmlFor={`region-${option.id}`}
                    className="text-sm font-normal"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-md">
            <h3 className="font-medium mb-3">Matching Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireAllCapabilities"
                  checked={filters.requireAllCapabilities}
                  onCheckedChange={(checked) => 
                    handleFilterChange('requireAllCapabilities', checked)
                  }
                />
                <Label htmlFor="requireAllCapabilities" className="font-normal">
                  Require all capabilities
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireAllRegions"
                  checked={filters.requireAllRegions}
                  onCheckedChange={(checked) => 
                    handleFilterChange('requireAllRegions', checked)
                  }
                />
                <Label htmlFor="requireAllRegions" className="font-normal">
                  Require all regions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="excludeInactive"
                  checked={filters.excludeInactiveCarriers}
                  onCheckedChange={(checked) => 
                    handleFilterChange('excludeInactiveCarriers', checked)
                  }
                />
                <Label htmlFor="excludeInactive" className="font-normal">
                  Exclude inactive carriers
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="excludeNonCompliant"
                  checked={filters.excludeNonCompliantCarriers}
                  onCheckedChange={(checked) => 
                    handleFilterChange('excludeNonCompliantCarriers', checked)
                  }
                />
                <Label htmlFor="excludeNonCompliant" className="font-normal">
                  Exclude non-compliant carriers
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full md:w-auto" 
            onClick={findMatches}
            disabled={isMatching}
          >
            {isMatching ? 'Finding matches...' : 'Find Matching Carriers'}
          </Button>
        </CardFooter>
      </Card>
      
      {matchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Matching Results</CardTitle>
            <CardDescription>
              {matchResults.length} carriers match your requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Carrier Name</TableHead>
                    <TableHead className="text-center">Match Score</TableHead>
                    <TableHead>Match Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchResults.map((result) => (
                    <TableRow key={result.carrierId}>
                      <TableCell className="font-medium">{result.carrierName}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-semibold">{result.matchScore}%</div>
                          <div 
                            className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"
                          >
                            <div 
                              className={`h-full ${
                                result.matchScore >= 80 ? 'bg-green-500' : 
                                result.matchScore >= 60 ? 'bg-blue-500' :
                                result.matchScore >= 40 ? 'bg-amber-500' : 
                                'bg-red-500'
                              }`}
                              style={{ width: `${result.matchScore}%` }} 
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {result.matchReasons.map((reason, idx) => (
                              <Badge key={idx} variant="outline" className="bg-green-50 text-green-800 border-green-200">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                          
                          {result.matchWarnings && (
                            <div className="flex flex-wrap gap-1">
                              {result.matchWarnings.map((warning, idx) => (
                                <Badge key={idx} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  {warning}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {matchResults.length === 0 && isMatching === false && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-6">
            <p className="text-muted-foreground">No matching carriers found. Try adjusting your requirements.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
