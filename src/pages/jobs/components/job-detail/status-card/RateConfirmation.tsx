
import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { JobStatus } from "../../../types/jobTypes";

interface RateConfirmationProps {
  currentStatus: JobStatus;
  initialRateConfirmed: boolean;
}

export function RateConfirmation({ currentStatus, initialRateConfirmed }: RateConfirmationProps) {
  const [rateConfirmed, setRateConfirmed] = useState(initialRateConfirmed);
  
  // Helper function to safely check if status is completed or ready for invoicing
  const isJobCompleted = (status: JobStatus): boolean => {
    return status === "completed" || status === "archived";
  };

  const isCompleted = isJobCompleted(currentStatus);

  const handleConfirmRate = () => {
    setRateConfirmed(true);
    toast({
      title: "Rate confirmed",
      description: "The final rate has been confirmed for this job."
    });
  };

  return (
    <div className="mt-4 pt-3 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-tms-blue" />
          <div>
            <p className="text-sm font-medium">Rate Confirmation</p>
            <p className="text-xs text-muted-foreground">Confirm the final rate for invoicing</p>
          </div>
        </div>
        
        <div>
          {rateConfirmed ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Rate Confirmed
            </Badge>
          ) : (
            <Button 
              size="sm"
              variant="outline" 
              disabled={!isCompleted && currentStatus !== "invoiced"}
              onClick={handleConfirmRate}
            >
              Confirm Final Rate
            </Button>
          )}
        </div>
      </div>
      
      {rateConfirmed && (
        <div className="mt-2 p-2 bg-muted/30 rounded-md border">
          <div className="flex justify-between items-center text-sm">
            <span>Base Rate:</span>
            <span className="font-medium">£450.00</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span>Extra Charges:</span>
            <span className="font-medium">£35.00</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1 pt-1 border-t">
            <span>Final Rate:</span>
            <span className="font-medium">£485.00</span>
          </div>
        </div>
      )}
    </div>
  );
}
