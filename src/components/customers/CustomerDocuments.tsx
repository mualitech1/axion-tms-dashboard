
import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Download, 
  Search, 
  Plus, 
  Calendar,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface CustomerDocumentsProps {
  customer: Customer;
}

const CustomerDocuments = ({ customer }: CustomerDocumentsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState(customer.documents || []);
  
  // Filter documents by search term
  const filteredDocuments = documents.filter(
    doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDocumentExpiring = (doc: any) => {
    if (!doc.expiryDate) return false;
    const expiryDate = new Date(doc.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isDocumentExpired = (doc: any) => {
    if (!doc.expiryDate) return false;
    const expiryDate = new Date(doc.expiryDate);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Upload Document
        </Button>
      </div>
      
      {filteredDocuments.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-tms-blue" />
                    {doc.name}
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{doc.type.replace('_', ' ')}</span>
                  </TableCell>
                  <TableCell>
                    {new Date(doc.dateUploaded).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {doc.expiryDate && (
                        <>
                          {isDocumentExpired(doc) && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          {isDocumentExpiring(doc) && (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                          {!isDocumentExpired(doc) && !isDocumentExpiring(doc) && (
                            <CheckCircle2 className="h-4 w-4 text-tms-green" />
                          )}
                          {new Date(doc.expiryDate).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </>
                      )}
                      {!doc.expiryDate && (
                        <span className="text-muted-foreground">No expiry</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{doc.fileSize}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-md">
          <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <h4 className="text-muted-foreground font-medium mb-1">No documents found</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Upload documents such as contracts, terms & conditions, or other related files
          </p>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Upload Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerDocuments;
