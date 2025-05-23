import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Document } from '@/types/customer';
import { FileUp, X, File, UploadCloud } from 'lucide-react';
import { format } from 'date-fns';

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadDocument: (doc: Omit<Document, 'id'>) => Promise<void>;
  customerId: string;
  isUploading?: boolean;
}

// Document types available for upload
const DOCUMENT_TYPES = [
  { value: 'contract', label: 'Contract' },
  { value: 'terms', label: 'Terms & Conditions' },
  { value: 'rate_card', label: 'Rate Card' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'pod', label: 'Proof of Delivery' },
  { value: 'insurance', label: 'Insurance Certificate' },
  { value: 'license', label: 'License' },
  { value: 'other', label: 'Other Document' },
];

export default function DocumentUploadDialog({
  open,
  onOpenChange,
  onUploadDocument,
  customerId,
  isUploading = false
}: DocumentUploadDialogProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docType, setDocType] = useState<string>('other');
  const [docName, setDocName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Function to handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Triggers when file is dropped
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Triggers when file is selected with click
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Handle the selected file
  const handleFile = (file: File) => {
    setSelectedFile(file);
    if (!docName) {
      setDocName(file.name);
    }
  };

  // Removes the selected file
  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Reset the form
  const resetForm = () => {
    setDocType('other');
    setDocName('');
    setExpiryDate('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !docName || !docType) {
      toast({
        title: "Validation Error",
        description: "Please provide all required information and select a file.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create a file path for the document (in a real app, this would be a server-side URL)
      const filePath = `customers/${customerId}/documents/${Date.now()}_${selectedFile.name}`;
      
      const newDocument: Omit<Document, 'id'> = {
        name: docName,
        type: docType as any, // Cast to match the type
        dateUploaded: new Date().toISOString(),
        expiryDate: expiryDate ? new Date(expiryDate).toISOString() : undefined,
        filePath: filePath,
        fileSize: selectedFile.size.toString(),
        verificationStatus: 'pending',
      };
      
      await onUploadDocument(newDocument);
      
      // Reset form
      resetForm();
      
      // Close dialog
      onOpenChange(false);
      
      toast({
        title: "Document Uploaded",
        description: "Document has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Error",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Upload Document</DialogTitle>
          <DialogDescription>
            Upload a document for this customer. All documents will be securely stored.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="docName" className="font-medium">
              Document Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="docName"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="Enter a name for this document"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="docType" className="font-medium">
              Document Type <span className="text-red-500">*</span>
            </Label>
            <Select value={docType} onValueChange={setDocType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="font-medium">
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              placeholder="Document expiry date (if applicable)"
            />
            <p className="text-xs text-muted-foreground">
              Leave blank if the document does not expire
            </p>
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium">
              Upload File <span className="text-red-500">*</span>
            </Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                dragActive ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-700'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <div className="space-y-2 py-4">
                  <UploadCloud className="h-10 w-10 text-indigo-500 mx-auto" />
                  <div className="text-sm font-medium">
                    Drag and drop your file here or click to browse
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, Word, Excel, and image files up to 10MB
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2"
                  >
                    <FileUp className="h-4 w-4 mr-2" />
                    Select File
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 border rounded bg-muted">
                  <div className="flex items-center gap-2">
                    <File className="h-6 w-6 text-indigo-500" />
                    <div className="text-left">
                      <div className="font-medium text-sm truncate max-w-[200px]">
                        {selectedFile.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                aria-label="File upload"
                title="Upload document file"
              />
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              disabled={isUploading || isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isUploading || isSubmitting || !selectedFile}
            >
              {isUploading || isSubmitting ? "Uploading..." : "Upload Document"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 