import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, AlertCircle, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DocumentUploadDialog } from '../../components/registration/documents/DocumentUploadDialog';
import { getDocumentVerificationLabel, VerificationStatus } from '@/utils/documents/documentVerification';
import { toast } from '@/hooks/use-toast';
import { Document } from '@/types/customer';

interface CarrierDocumentUploadProps {
  carrierName: string;
}

export default function CarrierDocumentUpload({ carrierName }: CarrierDocumentUploadProps) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc1',
      name: 'Insurance_Policy_2023.pdf',
      type: 'insurance_git',
      filePath: '/documents/insurance_policy.pdf',
      fileSize: '1.4 MB',
      dateUploaded: '2023-09-15T10:30:00Z',
      verificationStatus: VerificationStatus.VERIFIED,
    },
    {
      id: 'doc2',
      name: 'Vehicle_Registration_Certificate.pdf',
      type: 'license',
      filePath: '/documents/vehicle_registration.pdf',
      fileSize: '890 KB',
      dateUploaded: '2023-09-16T14:20:00Z',
      verificationStatus: VerificationStatus.PENDING,
    }
  ]);

  const handleUploadDocument = (document: Document) => {
    setDocuments(prev => [...prev, document]);
    toast({
      title: "Document uploaded",
      description: "Your document has been submitted and is pending review.",
    });
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast({
      title: "Document removed",
      description: "The document has been removed successfully.",
    });
  };

  const getStatusIcon = (status: VerificationStatus | undefined) => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return <Check className="h-4 w-4 text-green-500" />;
      case VerificationStatus.REJECTED:
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Document Management</CardTitle>
          <CardDescription>
            Upload and manage your required documents for compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Keep your documents up to date</AlertTitle>
            <AlertDescription>
              Please ensure all your documentation is current. Expired documents can affect your ability to accept jobs.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-medium">Required Documents</h3>
              <p className="text-sm text-muted-foreground">Upload all required documentation for compliance verification</p>
            </div>
            <Button onClick={() => setUploadDialogOpen(true)}>
              <UploadCloud className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
          
          {documents.length > 0 ? (
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Document</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Date Uploaded</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-3 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => {
                    const status = getDocumentVerificationLabel(doc.verificationStatus);
                    return (
                      <tr key={doc.id} className="border-b last:border-b-0">
                        <td className="p-3">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="font-medium text-sm">{doc.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm">{doc.type}</td>
                        <td className="p-3 text-sm">
                          {new Date(doc.dateUploaded).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            {getStatusIcon(doc.verificationStatus)}
                            <Badge variant={status.variant} className="ml-2">
                              {status.label}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDocument(doc.id)}
                            disabled={doc.verificationStatus === VerificationStatus.VERIFIED}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border rounded-md p-8 text-center">
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-2" />
                <p>No documents uploaded yet</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setUploadDialogOpen(true)}>
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Upload your first document
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <DocumentUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={handleUploadDocument}
        uploadedDocumentTypes={documents.map(doc => doc.type)}
      />
    </>
  );
}
