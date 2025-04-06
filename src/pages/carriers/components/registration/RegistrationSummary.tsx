
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Truck, 
  AlertCircle,
  MapIcon
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDocumentDate, formatFileSize } from '@/utils/documents/documentFormat';
import { getRequiredDocumentTypes, VerificationStatus } from '@/utils/documents/documentVerification';

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
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Registration Summary</h2>
      <p className="text-muted-foreground mb-4">
        Review your information before submitting your registration.
      </p>
      
      {(!hasAllRequiredDocs || !termsAccepted || !formData.companyName) && (
        <Alert className="mb-4 bg-amber-50 text-amber-900 border-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registration incomplete</AlertTitle>
          <AlertDescription>
            <p>The following items are missing from your registration:</p>
            <ul className="list-disc pl-5 mt-2">
              {!formData.companyName && (
                <li>Company information is incomplete</li>
              )}
              {!hasAllRequiredDocs && (
                <li>Required document(s) are missing</li>
              )}
              {!termsAccepted && (
                <li>Terms & Conditions have not been accepted</li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <User className="mr-2 h-5 w-5" /> Company Information
          </h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Company Name</TableCell>
                <TableCell>{formData.companyName || '—'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Contact Person</TableCell>
                <TableCell>{formData.contactName || '—'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" /> Email
                  </span>
                </TableCell>
                <TableCell>{formData.email || '—'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <span className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" /> Phone
                  </span>
                </TableCell>
                <TableCell>{formData.phone || '—'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <MapPin className="mr-2 h-5 w-5" /> Location & Address
          </h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Address</TableCell>
                <TableCell>{formData.address || '—'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">City</TableCell>
                <TableCell>{formData.city || '—'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Region</TableCell>
                <TableCell>{formData.region || '—'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Postcode</TableCell>
                <TableCell>{formData.postcode || '—'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <Truck className="mr-2 h-5 w-5" /> Fleet Information
          </h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Fleet Size</TableCell>
                <TableCell>{formData.fleetSize || '—'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fleet Type</TableCell>
                <TableCell>{formData.fleetType || '—'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          {formData.capabilities && formData.capabilities.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Selected Capabilities:</h4>
              <div className="flex flex-wrap gap-2">
                {formData.capabilities.map((capability: string) => (
                  <Badge key={capability} variant="outline" className="bg-muted/50">
                    {capability.replace(/-/g, ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <MapIcon className="mr-2 h-5 w-5" /> Regional Coverage
          </h3>
          
          {formData.regionalCoverage && formData.regionalCoverage.length > 0 ? (
            <div>
              <div className="flex flex-wrap gap-2">
                {formData.regionalCoverage.map((region: string) => (
                  <Badge key={region} variant="outline" className="bg-muted/50">
                    {region.replace(/-/g, ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No regional coverage specified</p>
          )}
        </Card>
      </div>
      
      <Card className="p-4 mb-6">
        <h3 className="font-medium text-lg mb-3 flex items-center">
          <FileText className="mr-2 h-5 w-5" /> Documents
        </h3>
        
        {documents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    {getRequiredDocumentTypes().find(t => t.type === doc.type)?.label || doc.type}
                  </TableCell>
                  <TableCell>{formatDocumentDate(doc.dateUploaded)}</TableCell>
                  <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      Pending Verification
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No documents uploaded</p>
          </div>
        )}
        
        {!hasAllRequiredDocs && (
          <div className="mt-4 text-sm text-amber-600">
            <span className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" /> 
              Missing required documents. Please upload all required documents before submitting.
            </span>
          </div>
        )}
      </Card>
      
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
    </div>
  );
}
