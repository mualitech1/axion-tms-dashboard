
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { FileText, Upload, X, FileCheck } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface DocumentUploaderProps {
  onDocumentsChange?: (files: File[]) => void;
}

export function DocumentUploader({ onDocumentsChange }: DocumentUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  // Effect to notify parent component when files change
  useEffect(() => {
    if (onDocumentsChange) {
      onDocumentsChange(files);
    }
  }, [files, onDocumentsChange]);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter for PDF and Word documents
    const validFiles = acceptedFiles.filter(file => {
      const isValid = file.type === 'application/pdf' || 
                      file.type === 'application/msword' || 
                      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      if (!isValid) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a PDF or Word document`,
          variant: "destructive"
        });
      }
      
      return isValid;
    });
    
    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      
      toast({
        title: "Files uploaded",
        description: `${validFiles.length} document${validFiles.length === 1 ? "" : "s"} added successfully`,
      });
    }
  }, [files, toast]);
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });
  
  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50/10' : 'border-gray-600 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium">
            {isDragActive ? 'Drop the files here' : 'Drag & drop order confirmation files here'}
          </p>
          <p className="text-xs text-gray-500">or</p>
          <Button type="button" size="sm" variant="outline">
            Browse Files
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, Word (.doc, .docx)
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Documents</p>
          <ul className="border rounded-md divide-y">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {file.type === 'application/pdf' ? 'PDF' : 'Word'} · {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
