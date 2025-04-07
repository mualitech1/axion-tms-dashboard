
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface RegistrationAlertProps {
  missingItems: {
    companyInfo: boolean;
    documents: boolean;
    terms: boolean;
  };
}

export function RegistrationAlert({ missingItems }: RegistrationAlertProps) {
  // Don't render alert if nothing is missing
  if (!missingItems.companyInfo && !missingItems.documents && !missingItems.terms) {
    return null;
  }
  
  return (
    <Alert className="mb-4 bg-amber-50 text-amber-900 border-amber-200">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Registration incomplete</AlertTitle>
      <AlertDescription>
        <p>The following items are missing from your registration:</p>
        <ul className="list-disc pl-5 mt-2">
          {missingItems.companyInfo && (
            <li>Company information is incomplete</li>
          )}
          {missingItems.documents && (
            <li>Required document(s) are missing</li>
          )}
          {missingItems.terms && (
            <li>Terms & Conditions have not been accepted</li>
          )}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
