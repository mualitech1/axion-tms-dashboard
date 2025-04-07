
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface TermsSummaryProps {
  termsAccepted: boolean;
}

export function TermsSummary({ termsAccepted }: TermsSummaryProps) {
  return (
    <Card className="p-4 mb-6">
      <h3 className="font-medium text-lg mb-3">Terms & Conditions</h3>
      <div className="flex items-center">
        {termsAccepted ? (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Terms & Conditions have been accepted</span>
          </div>
        ) : (
          <div className="flex items-center text-amber-600">
            <XCircle className="h-5 w-5 mr-2" />
            <span>Terms & Conditions have not been accepted</span>
          </div>
        )}
      </div>
    </Card>
  );
}
