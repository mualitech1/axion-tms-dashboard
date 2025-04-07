
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Shield, CheckCircle, Clock } from "lucide-react";

interface CarrierComplianceStatusProps {
  carrier: {
    complianceScore: number;
    insuranceExpiry: string;
    licenseExpiry: string;
  };
}

export default function CarrierComplianceStatus({ carrier }: CarrierComplianceStatusProps) {
  const getExpiryStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysLeft = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return { status: 'expired', label: 'Expired', color: 'text-red-500' };
    } else if (daysLeft < 30) {
      return { status: 'expiring', label: `${daysLeft} days left`, color: 'text-amber-500' };
    } else {
      return { status: 'valid', label: 'Valid', color: 'text-green-500' };
    }
  };

  const insuranceStatus = getExpiryStatus(carrier.insuranceExpiry);
  const licenseStatus = getExpiryStatus(carrier.licenseExpiry);

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 mr-2 text-tms-blue" />
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Overall Compliance Score</span>
            <span className="text-sm font-medium">{carrier.complianceScore}%</span>
          </div>
          <Progress 
            value={carrier.complianceScore} 
            className="h-2" 
            indicatorClassName={carrier.complianceScore > 80 ? "bg-green-500" : "bg-amber-500"} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">Insurance Expiry</span>
            </div>
            <span className={`text-sm font-medium ${insuranceStatus.color}`}>
              {insuranceStatus.label}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">License Expiry</span>
            </div>
            <span className={`text-sm font-medium ${licenseStatus.color}`}>
              {licenseStatus.label}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t">
          {carrier.complianceScore < 80 ? (
            <div className="flex items-center text-amber-500 text-xs">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Action required to improve compliance score</span>
            </div>
          ) : (
            <div className="flex items-center text-green-500 text-xs">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Your compliance status is good</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
