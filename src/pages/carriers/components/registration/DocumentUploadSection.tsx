
import { useState } from 'react';
import { Button } from "@/components/ui/button";
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
import { Upload, FileText, XCircle, CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getRequiredDocumentTypes, getDocumentVerificationLabel, VerificationStatus } from '@/utils/documents/documentVerification';
import { formatDocumentDate, formatFileSize } from '@/utils/documents/documentFormat';
import { getFileTypeFromPath } from '@/utils/documents/documentType';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

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
  const [uploadingDoc, setUploadingDoc] = useState({
    file: null as File | null,
    type: '',
    notes: '',
  });

  const requiredDocuments = getRequiredDocumentTypes();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingDoc(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
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
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: uploadingDoc.file.name,
      type: uploadingDoc.type,
      filePath: `/documents/${uploadingDoc.file.name}`,
      fileSize: uploadingDoc.file.size,
      dateUploaded: new Date().toISOString(),
      notes: uploadingDoc.notes,
      verificationStatus: VerificationStatus.PENDING
    };
    
    onUpload(newDoc);
    
    // Reset and close dialog
    setUploadingDoc({
      file: null,
      type: '',
      notes: ''
    });
    setUploadDialogOpen(false);
    
    toast({
      title: "Document uploaded",
      description: "Document has been uploaded and is pending verification."
    });
  };
  
  const handleRemove = (docId: string) => {
    onRemove(docId);
    toast({
      title: "Document removed",
      description: "The document has been removed from your submission."
    });
  };

  // Check which required documents are missing
  const missingDocumentTypes = requiredDocuments.filter(required => 
    !documents.some(doc => doc.type === required.type)
  );

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
        
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-3">Required Documents Checklist:</h3>
          <ul className="space-y-2">
            {requiredDocuments.map(doc => {
              const isUploaded = documents.some(d => d.type === doc.type);
              return (
                <li key={doc.type} className="flex items-center gap-2">
                  {isUploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )}
                  <span className={isUploaded ? "line-through text-muted-foreground" : ""}>
                    {doc.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Uploaded Documents</h3>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Upload className="h-4 w-4 mr-1" /> Upload Document
        </Button>
      </div>

      {documents.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => {
                const status = getDocumentVerificationLabel(doc.verificationStatus);
                return (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getRequiredDocumentTypes().find(t => t.type === doc.type)?.label || doc.type}</TableCell>
                    <TableCell>{formatDocumentDate(doc.dateUploaded)}</TableCell>
                    <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemove(doc.id)}
                        className="h-8 w-8 p-0"
                      >
                        <XCircle className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-md p-8 text-center bg-muted/20">
          <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-1">No documents uploaded yet</h3>
          <p className="text-muted-foreground mb-4">Upload your compliance documents to continue with registration.</p>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-1" /> Upload Document
          </Button>
        </div>
      )}

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Required Document</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="document-type">Document Type <span className="text-red-500">*</span></Label>
              <Select 
                value={uploadingDoc.type} 
                onValueChange={(value) => setUploadingDoc(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {missingDocumentTypes.length > 0 ? (
                    <>
                      {missingDocumentTypes.map(doc => (
                        <SelectItem key={doc.type} value={doc.type}>{doc.label}</SelectItem>
                      ))}
                      {requiredDocuments
                        .filter(doc => !missingDocumentTypes.some(missing => missing.type === doc.type))
                        .map(doc => (
                          <SelectItem key={doc.type} value={doc.type}>{doc.label} (Already Uploaded)</SelectItem>
                        ))
                      }
                    </>
                  ) : (
                    requiredDocuments.map(doc => (
                      <SelectItem key={doc.type} value={doc.type}>{doc.label}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file-upload">Document File <span className="text-red-500">*</span></Label>
              <div 
                className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className="space-y-2 text-center">
                  {uploadingDoc.file ? (
                    <div className="flex flex-col items-center">
                      <FileText className="h-8 w-8 text-tms-blue" />
                      <p className="text-sm font-medium">{uploadingDoc.file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(uploadingDoc.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadingDoc(prev => ({ ...prev, file: null }));
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Change File
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-tms-blue focus-within:outline-none"
                        >
                          <span>Click to upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, JPG up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input 
                id="notes"
                value={uploadingDoc.notes}
                onChange={(e) => setUploadingDoc(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any relevant notes about this document"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!uploadingDoc.file || !uploadingDoc.type}>
              Upload Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
