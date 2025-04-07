
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CarrierPerformanceFilters } from "../../data/types/performanceTypes";
import { FileSearch } from "lucide-react";

interface PerformanceFiltersProps {
  onFilterChange: (filters: CarrierPerformanceFilters) => void;
}

export default function PerformanceFilters({ onFilterChange }: PerformanceFiltersProps) {
  const [timeframe, setTimeframe] = useState<CarrierPerformanceFilters["timeframe"]>("last30");
  const [complianceStatus, setComplianceStatus] = useState<string>("All");

  const handleApplyFilters = () => {
    onFilterChange({
      timeframe,
      complianceStatus: complianceStatus !== "All" 
        ? complianceStatus as CarrierPerformanceFilters["complianceStatus"] 
        : undefined
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Time Period</Label>
              <Select
                value={timeframe}
                onValueChange={(value) => setTimeframe(value as CarrierPerformanceFilters["timeframe"])}
              >
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="last90">Last 90 Days</SelectItem>
                  <SelectItem value="last180">Last 180 Days</SelectItem>
                  <SelectItem value="lastYear">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compliance-status">Compliance Status</Label>
              <Select
                value={complianceStatus}
                onValueChange={setComplianceStatus}
              >
                <SelectTrigger id="compliance-status">
                  <SelectValue placeholder="Select compliance status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Compliant">Compliant</SelectItem>
                  <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                  <SelectItem value="Action Required">Action Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleApplyFilters} className="w-full">
            <FileSearch className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
