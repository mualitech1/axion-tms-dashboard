
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export function DateRangeFilter({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange 
}: DateRangeFilterProps) {
  const [dateView, setDateView] = useState<"start" | "end">("start");

  return (
    <div>
      <label className="text-sm font-medium block mb-2">Date Range</label>
      <div className="flex gap-2 mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setDateView("start")}
          className={cn(
            "flex-1",
            dateView === "start" ? "border-primary/50 bg-primary/5" : ""
          )}
        >
          Start Date
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setDateView("end")}
          className={cn(
            "flex-1",
            dateView === "end" ? "border-primary/50 bg-primary/5" : ""
          )}
        >
          End Date
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs">
          {startDate ? format(startDate, "MMM dd, yyyy") : "No start date"}
        </div>
        <div className="text-xs">
          {endDate ? format(endDate, "MMM dd, yyyy") : "No end date"}
        </div>
      </div>

      <Calendar
        mode="single"
        selected={dateView === "start" ? startDate || undefined : endDate || undefined}
        onSelect={(date) => {
          if (dateView === "start") {
            onStartDateChange(date);
            setDateView("end");
          } else {
            onEndDateChange(date);
          }
        }}
        className="rounded border p-3"
        initialFocus
      />
    </div>
  );
}
