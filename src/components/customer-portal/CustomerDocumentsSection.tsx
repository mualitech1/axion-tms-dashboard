
import { useState } from 'react';
import { Customer, Document } from '@/types/customer';
import { FileText, Download, Calendar, Clock, AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CustomerDocumentsSectionProps {
  customer: Customer;
}

// Define document status type for better type safety
type DocumentStatus = {
  label: string;
  variant: 'destructive' | 'warning' | 'outline';
};

const CustomerDocumentsSection = ({ customer }: CustomerDocumentsSectionProps) => {
  const [documents, setDocuments] = useState<Document[]>(customer.documents || []);

  // Helper function to check if a document is expiring soon (within 30 days)
  const isExpiringSoon = (expiryDate: string | null | undefined): boolean => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return expiry <= thirtyDaysFromNow && expiry >= today;
  };

  // Helper function to check if a document is expired
  const isExpired = (expiryDate: string | null | undefined): boolean => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  // Get document status
  const getDocumentStatus = (doc: Document): DocumentStatus => {
    if (isExpired(doc.expiryDate)) {
      return { label: 'Expired', variant: 'destructive' };
    }
    if (isExpiringSoon(doc.expiryDate)) {
      return { label: 'Expiring Soon', variant: 'warning' };
    }
    return { label: 'Valid', variant: 'outline' };
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Documents</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent>
        {documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map(doc => {
              const status = getDocumentStatus(doc);
              return (
                <div key={doc.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                  <div className="flex items-start space-x-3">
                    <div className="bg-tms-gray-100 p-2 rounded">
                      <FileText className="h-6 w-6 text-tms-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Uploaded: {doc.dateUploaded}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Expires: {doc.expiryDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant={status.variant}>
                      {status.label}
                    </Badge>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <h3 className="text-lg font-medium">No Documents</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven't uploaded any documents yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerDocumentsSection;
