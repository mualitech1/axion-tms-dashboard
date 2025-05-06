
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CarrierPerformanceFilters } from "../../data/types/performanceTypes";
import { FileSearch, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface PerformanceFiltersProps {
  onFilterChange: (filters: CarrierPerformanceFilters) => void;
}

export default function PerformanceFilters({ onFilterChange }: PerformanceFiltersProps) {
  const [timeframe, setTimeframe] = useState<CarrierPerformanceFilters["timeframe"]>("last30");
  const [complianceStatus, setComplianceStatus] = useState<string>("All");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [includeInactive, setIncludeInactive] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange({
      timeframe,
      complianceStatus: complianceStatus !== "All" 
        ? complianceStatus as CarrierPerformanceFilters["complianceStatus"] 
        : undefined,
      // Include other filter options as needed
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timeframe" className="text-sm text-muted-foreground">Time Period</Label>
          <Select
            value={timeframe}
            onValueChange={(value) => setTimeframe(value as CarrierPerformanceFilters["timeframe"])}
          >
            <SelectTrigger id="timeframe" className="bg-indigo-500/5 border-indigo-500/20">
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
          <Label htmlFor="compliance-status" className="text-sm text-muted-foreground">Compliance Status</Label>
          <Select
            value={complianceStatus}
            onValueChange={setComplianceStatus}
          >
            <SelectTrigger id="compliance-status" className="bg-indigo-500/5 border-indigo-500/20">
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
        
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Advanced Options</Label>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full bg-indigo-500/5 border-indigo-500/20 justify-between"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span>Advanced Filters</span>
            <SlidersHorizontal className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {showAdvanced && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pt-2 pb-1 border-t border-indigo-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-inactive" 
                checked={includeInactive}
                onCheckedChange={(checked) => setIncludeInactive(checked as boolean)}
              />
              <label
                htmlFor="include-inactive"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include inactive carriers
              </label>
            </div>
            
            {/* Add more advanced filter options here */}
          </div>
        </motion.div>
      )}

      <Button onClick={handleApplyFilters} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
        <FileSearch className="mr-2 h-4 w-4" />
        Apply Filters
      </Button>
    </div>
  );
}
