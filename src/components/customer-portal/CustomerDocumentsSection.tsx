
import { useState } from 'react';
import { Customer, Document } from '@/types/customer';
import { FileText, Download, Calendar, Clock, AlertCircle, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  isDocumentExpiringSoon,
  isDocumentExpired,
  formatFileSize,
  getDocumentStatus,
  formatDocumentDate
} from '@/utils/documentUtils';

interface CustomerDocumentsSectionProps {
  customer: Customer;
}

type DocumentFilter = 'all' | 'expiring' | 'expired' | 'valid';

const CustomerDocumentsSection = ({ customer }: CustomerDocumentsSectionProps) => {
  const [documents, setDocuments] = useState<Document[]>(customer.documents || []);
  const [filter, setFilter] = useState<DocumentFilter>('all');

  const filteredDocuments = documents.filter(doc => {
    switch (filter) {
      case 'expiring':
        return isDocumentExpiringSoon(doc) && !isDocumentExpired(doc);
      case 'expired':
        return isDocumentExpired(doc);
      case 'valid':
        return !isDocumentExpiringSoon(doc) && !isDocumentExpired(doc);
      default:
        return true;
    }
  });

  const handleFilterChange = (value: DocumentFilter) => {
    setFilter(value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Documents</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter documents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="valid">Valid</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredDocuments.length > 0 ? (
          <div className="space-y-4">
            {filteredDocuments.map(doc => {
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
                        <span>Uploaded: {formatDocumentDate(doc.dateUploaded)}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Expires: {formatDocumentDate(doc.expiryDate)}</span>
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground mt-1">
                        {formatFileSize(doc.fileSize)}
                      </div>
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
            <h3 className="text-lg font-medium">No Documents Found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {filter !== 'all' 
                ? `No ${filter === 'expiring' ? 'expiring' : filter === 'expired' ? 'expired' : 'valid'} documents found`
                : 'You haven\'t uploaded any documents yet'}
            </p>
            <Button size="sm" className="mt-4">
              <Plus className="h-4 w-4 mr-1" />
              Upload Document
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerDocumentsSection;
