
import { CompanyInfoSummary } from "./summary/CompanyInfoSummary";
import { AddressSummary } from "./summary/AddressSummary";
import { FleetSummary } from "./summary/FleetSummary";
import { RegionalCoverageSummary } from "./summary/RegionalCoverageSummary";
import { DocumentsSummary } from "./summary/DocumentsSummary";
import { TermsSummary } from "./summary/TermsSummary";
import { RegistrationAlert } from "./summary/RegistrationAlert";

interface RegistrationSummaryProps {
  formData: any;
  documents: any[];
  termsAccepted: boolean;
}

export default function RegistrationSummary({ formData, documents, termsAccepted }: RegistrationSummaryProps) {
  // Check for missing required information
  const requiredDocumentTypes = ['insurance', 'license', 'terms'];
  const hasAllRequiredDocs = requiredDocumentTypes.every(type => 
    documents.some(doc => doc.type === type)
  );
  
  // Determine which items are missing for the alert
  const missingItems = {
    companyInfo: !formData.companyName,
    documents: !hasAllRequiredDocs,
    terms: !termsAccepted
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Registration Summary</h2>
      <p className="text-muted-foreground mb-4">
        Review your information before submitting your registration.
      </p>
      
      <RegistrationAlert missingItems={missingItems} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CompanyInfoSummary formData={formData} />
        <AddressSummary formData={formData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FleetSummary formData={formData} />
        <RegionalCoverageSummary formData={formData} />
      </div>
      
      <DocumentsSummary documents={documents} hasAllRequiredDocs={hasAllRequiredDocs} />
      
      <TermsSummary termsAccepted={termsAccepted} />
    </div>
  );
}
