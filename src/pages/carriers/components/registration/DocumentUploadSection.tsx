
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, AlertCircle } from "lucide-react";
import { getRequiredDocumentTypes } from '@/utils/documents/documentVerification';
import { DocumentUploadDialog } from './documents/DocumentUploadDialog';
import { DocumentsList } from './documents/DocumentsList';
import { EmptyDocumentState } from './documents/EmptyDocumentState';
import { RequiredDocumentsChecklist } from './documents/RequiredDocumentsChecklist';

interface DocumentUploadSectionProps {
  documents: any[];
  onUpload: (document: any) => void;
  onRemove: (docId: string) => void;
}

export default function DocumentUploadSection({ 
  documents, 
  onUpload, 
  onRemove 
}: DocumentUploadSectionProps) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const uploadedDocumentTypes = documents.map(doc => doc.type);
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Required Documents</h2>
        <p className="text-muted-foreground mb-4">
          The following documents are required to complete carrier registration. All documents must be verified before your account can be activated.
        </p>
        
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Carrier accounts will not be activated until all required documents are received, verified, and signed Terms & Conditions are returned.
          </AlertDescription>
        </Alert>
        
        <RequiredDocumentsChecklist uploadedDocumentTypes={uploadedDocumentTypes} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Uploaded Documents</h3>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Upload className="h-4 w-4 mr-1" /> Upload Document
        </Button>
      </div>

      {documents.length > 0 ? (
        <DocumentsList documents={documents} onRemove={onRemove} />
      ) : (
        <EmptyDocumentState onUploadClick={() => setUploadDialogOpen(true)} />
      )}

      <DocumentUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={onUpload}
        uploadedDocumentTypes={uploadedDocumentTypes}
      />
    </div>
  );
}
