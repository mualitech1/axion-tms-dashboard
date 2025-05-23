import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { DocumentTypeSelect } from "./DocumentTypeSelect";
import { FileUploader } from "./FileUploader";
import { VerificationStatus } from '@/utils/documents/documentVerification';
import { Document } from '@/types/customer';

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (document: Document) => void;
  uploadedDocumentTypes: string[];
}

export function DocumentUploadDialog({ 
  open, 
  onOpenChange, 
  onUpload, 
  uploadedDocumentTypes 
}: DocumentUploadDialogProps) {
  const [uploadingDoc, setUploadingDoc] = useState({
    file: null as File | null,
    type: '',
    notes: '',
  });
  
  const handleFileChange = (file: File | null) => {
    setUploadingDoc(prev => ({
      ...prev,
      file
    }));
  };
  
  const handleTypeChange = (type: string) => {
    setUploadingDoc(prev => ({
      ...prev,
      type
    }));
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadingDoc(prev => ({
      ...prev,
      notes: e.target.value
    }));
  };
  
  const handleUpload = () => {
    if (!uploadingDoc.file || !uploadingDoc.type) {
      toast({
        title: "Missing information",
        description: "Please select both a file and document type.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a document object
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      name: uploadingDoc.file.name,
      type: uploadingDoc.type as Document['type'],
      filePath: `/documents/${uploadingDoc.file.name}`,
      fileSize: formatFileSize(uploadingDoc.file.size),
      dateUploaded: new Date().toISOString(),
      verificationStatus: VerificationStatus.PENDING
    };
    
    onUpload(newDoc);
    
    // Reset and close dialog
    setUploadingDoc({
      file: null,
      type: '',
      notes: ''
    });
    onOpenChange(false);
    
    toast({
      title: "Document uploaded",
      description: "Document has been uploaded and is pending verification."
    });
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Required Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <DocumentTypeSelect 
            value={uploadingDoc.type} 
            onChange={handleTypeChange}
            uploadedDocumentTypes={uploadedDocumentTypes}
          />
          
          <div className="space-y-2">
            <Label htmlFor="file-upload">Document File <span className="text-red-500">*</span></Label>
            <FileUploader
              file={uploadingDoc.file}
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input 
              id="notes"
              value={uploadingDoc.notes}
              onChange={handleNotesChange}
              placeholder="Add any relevant notes about this document"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!uploadingDoc.file || !uploadingDoc.type}>
            Upload Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
