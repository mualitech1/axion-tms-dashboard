
import { useState, useRef } from 'react';
import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Upload, FileText, X, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Document } from '@/types/customer';
import { toast } from "@/hooks/use-toast";

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  onDocumentUpload: (document: Document) => void;
}

export function DocumentUploadModal({ open, onClose, onDocumentUpload }: DocumentUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState<Document['type']>('other');
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Auto-populate document name if empty
      if (!documentName) {
        setDocumentName(selectedFile.name.split('.')[0]);
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!documentName.trim()) {
      newErrors.name = "Document name is required";
    }
    
    if (!documentType) {
      newErrors.type = "Document type is required";
    }
    
    if (!file) {
      newErrors.file = "Please select a file to upload";
    } else {
      // Validate file type
      const extension = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt', 'xls', 'xlsx'];
      if (!extension || !validExtensions.includes(extension)) {
        newErrors.file = "Invalid file type. Please select a PDF, DOC, DOCX, JPG, PNG, TXT, XLS, or XLSX file";
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        newErrors.file = "File size should be less than 10MB";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;
    
    setIsUploading(true);
    
    try {
      // In a real application, you would upload the file to a server here
      // For now, we'll simulate an upload with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new document object
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        name: documentName,
        type: documentType,
        dateUploaded: new Date().toISOString().split('T')[0],
        expiryDate: expiryDate ? expiryDate.toISOString().split('T')[0] : null,
        filePath: `/documents/${file?.name || 'unknown'}`,
        fileSize: `${(file?.size ? file.size / (1024 * 1024) : 0).toFixed(1)} MB`
      };
      
      onDocumentUpload(newDocument);
      toast({
        title: "Document uploaded",
        description: "Your document has been successfully uploaded.",
      });
      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setDocumentName('');
    setDocumentType('other');
    setExpiryDate(undefined);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload New Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {/* File selection */}
          <div className="space-y-2">
            <Label htmlFor="file-upload">Document File <span className="text-red-500">*</span></Label>
            <div className="mt-1 flex items-center">
              <div 
                className={cn(
                  "flex-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50",
                  errors.file ? "border-red-300" : "border-gray-300"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-2 text-center">
                  {file ? (
                    <div className="flex flex-col items-center">
                      <FileText className="h-8 w-8 text-tms-blue" />
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        <X className="h-4 w-4 mr-1" /> Remove
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
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, JPG, PNG, TXT, XLS up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            {errors.file && (
              <div className="text-red-500 text-xs flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.file}
              </div>
            )}
          </div>
          
          {/* Document name */}
          <div className="space-y-2">
            <Label htmlFor="document-name">Document Name <span className="text-red-500">*</span></Label>
            <Input
              id="document-name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Enter document name"
              className={errors.name ? "border-red-300" : ""}
            />
            {errors.name && (
              <div className="text-red-500 text-xs flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.name}
              </div>
            )}
          </div>
          
          {/* Document type */}
          <div className="space-y-2">
            <Label htmlFor="document-type">Document Type <span className="text-red-500">*</span></Label>
            <Select value={documentType} onValueChange={(value: Document['type']) => setDocumentType(value)}>
              <SelectTrigger className={cn(errors.type ? "border-red-300" : "")}>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="terms">Terms & Conditions</SelectItem>
                <SelectItem value="rate_card">Rate Card</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="pod">Proof of Delivery</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <div className="text-red-500 text-xs flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.type}
              </div>
            )}
          </div>
          
          {/* Expiry date */}
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !expiryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={handleUpload} 
            disabled={isUploading}
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-1" /> Upload Document
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
