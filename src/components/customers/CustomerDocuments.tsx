import React, { useState } from 'react';
import { Customer, Document } from '@/types/customer';
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
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Search, 
  Plus, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import {
  isDocumentExpiringSoon,
  isDocumentExpired,
  formatFileSize,
  getDocumentStatus,
  formatDocumentDate,
  getFileTypeFromPath
} from '@/utils/documentUtils';
import DocumentUploadDialog from './DocumentUploadDialog';
import { useToast } from '@/components/ui/use-toast';

interface CustomerDocumentsProps {
  customer: Customer;
}

interface DocumentUploadData {
  name: string;
  type: 'contract' | 'terms' | 'rate_card' | 'invoice' | 'pod' | 'insurance' | 'license' | 'other';
  dateUploaded: string;
  expiryDate?: string;
  filePath: string;
  fileSize: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

const CustomerDocuments = ({ customer }: CustomerDocumentsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState<Document[]>(customer.documents || []);
  const [isUploading, setIsUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Filter documents by search term
  const filteredDocuments = documents.filter(
    doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadDocument = async (documentData: Omit<Document, 'id'>) => {
    setIsUploading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a new document object
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        ...documentData
      };
      
      // Add the new document to the documents array
      setDocuments(prev => [...prev, newDocument]);
      
      toast({
        title: "Document uploaded",
        description: "The document has been successfully uploaded.",
        variant: "default",
      });
      
      setDialogOpen(false);
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Remove the document from the documents array
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      
      toast({
        title: "Document deleted",
        description: "The document has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was an error deleting the document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadDocument = (doc: Document) => {
    toast({
      title: "Download started",
      description: `Downloading ${doc.name}...`,
      variant: "default",
    });
    
    // In a real application, this would trigger an actual download
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
        <Button onClick={() => setDialogOpen(true)}>
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
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map(doc => {
                const status = getDocumentStatus(doc);
                return (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-tms-blue" />
                      {doc.name}
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{doc.type.replace('_', ' ')}</span>
                    </TableCell>
                    <TableCell>
                      {formatDocumentDate(doc.dateUploaded)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {doc.expiryDate && (
                          <>
                            {isDocumentExpired(doc) && (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                            {isDocumentExpiringSoon(doc) && !isDocumentExpired(doc) && (
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            )}
                            {!isDocumentExpired(doc) && !isDocumentExpiringSoon(doc) && (
                              <CheckCircle2 className="h-4 w-4 text-tms-green" />
                            )}
                            {formatDocumentDate(doc.expiryDate)}
                          </>
                        )}
                        {!doc.expiryDate && (
                          <span className="text-muted-foreground">No expiry</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Upload Document
          </Button>
        </div>
      )}

      <DocumentUploadDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUploadDocument={handleUploadDocument}
        customerId={customer.id}
        isUploading={isUploading}
      />
    </div>
  );
};

export default CustomerDocuments;
