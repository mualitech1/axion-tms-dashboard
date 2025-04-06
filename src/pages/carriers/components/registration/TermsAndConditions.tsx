
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { FilePenLine, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TermsAndConditionsProps {
  accepted: boolean;
  onAcceptChange: (accepted: boolean) => void;
}

export default function TermsAndConditions({ accepted, onAcceptChange }: TermsAndConditionsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Terms & Conditions</h2>
      <p className="text-muted-foreground mb-4">
        Please read the terms and conditions carefully and accept them to proceed with registration.
      </p>
      
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Required Agreement</AlertTitle>
        <AlertDescription>
          You must accept the terms and conditions to complete your registration. Your account cannot be activated without agreeing to these terms.
        </AlertDescription>
      </Alert>
      
      <Card className="mb-6">
        <ScrollArea className="h-80 p-4 rounded-md border">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">IKB Transport Carrier Terms & Conditions</h3>
            <p>Last updated: April 5, 2024</p>
            
            <div className="space-y-2">
              <h4 className="font-medium">1. DEFINITIONS</h4>
              <p>In these Terms and Conditions, the following definitions apply:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>"Company" means IKB Transport.</li>
                <li>"Carrier" means the party agreeing to provide transportation services.</li>
                <li>"Services" means the transportation and related services provided by the Carrier.</li>
                <li>"Goods" means the products, materials or items to be transported.</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">2. COMPLIANCE WITH REGULATIONS</h4>
              <p>2.1 The Carrier shall comply with all applicable laws, regulations, and standards relating to the transportation of goods, including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Road traffic regulations and driving hours limitations.</li>
                <li>Health and safety regulations.</li>
                <li>Environmental protection requirements.</li>
                <li>Any specific regulations applicable to the goods being transported.</li>
              </ul>
              <p>2.2 The Carrier shall maintain all necessary licenses, permits, and authorizations required to lawfully provide the Services.</p>
              <p>2.3 The Carrier shall ensure all drivers are properly licensed and trained for the Services they provide.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">3. INSURANCE AND LIABILITY</h4>
              <p>3.1 The Carrier shall maintain adequate insurance coverage, including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Goods in Transit insurance with minimum coverage of £100,000.</li>
                <li>Public liability insurance with minimum coverage of £5,000,000.</li>
                <li>Employer's liability insurance as required by law.</li>
                <li>Motor or fleet insurance covering all vehicles used in providing the Services.</li>
              </ul>
              <p>3.2 The Carrier shall provide copies of all insurance certificates to the Company and shall update these whenever renewals are issued.</p>
              <p>3.3 The Carrier accepts liability for any loss or damage to goods while in their care, custody, and control.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">4. SERVICE STANDARDS</h4>
              <p>4.1 The Carrier shall:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide the Services with reasonable skill and care.</li>
                <li>Ensure all vehicles used are roadworthy, clean, and suitable for the Goods being transported.</li>
                <li>Ensure all goods are properly secured for transportation.</li>
                <li>Adhere to agreed collection and delivery times.</li>
                <li>Notify the Company immediately of any delays or issues.</li>
                <li>Provide proof of delivery documentation as required.</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">5. PAYMENT TERMS</h4>
              <p>5.1 Payment for Services shall be made within 30 days of receipt of a valid invoice.</p>
              <p>5.2 Invoices must include all relevant job references and supporting documentation.</p>
              <p>5.3 The Company reserves the right to withhold payment for any Services that do not meet the agreed standards.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">6. TERM AND TERMINATION</h4>
              <p>6.1 These Terms and Conditions shall remain in effect until terminated by either party with 30 days written notice.</p>
              <p>6.2 The Company may terminate with immediate effect if the Carrier:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Breaches any material term of these Terms and Conditions.</li>
                <li>Fails to maintain required insurance, licenses, or permits.</li>
                <li>Becomes insolvent or enters into administration.</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">7. DOCUMENT COMPLIANCE</h4>
              <p>7.1 The Carrier acknowledges that their account will not be activated until all required documents have been received, verified, and these Terms and Conditions have been accepted.</p>
              <p>7.2 The Carrier is responsible for ensuring all documents remain valid and for providing updated versions before existing documents expire.</p>
              <p>7.3 The Carrier acknowledges that their account may be suspended if any required documents expire without renewal.</p>
            </div>
          </div>
        </ScrollArea>
      </Card>
      
      <div className="flex items-start space-x-3">
        <Checkbox 
          id="terms" 
          checked={accepted} 
          onCheckedChange={(checked) => onAcceptChange(checked as boolean)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and accept the terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            By checking this box, you agree to all terms and conditions outlined above.
          </p>
        </div>
      </div>
    </div>
  );
}
