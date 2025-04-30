
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
    <div className="space-y-3">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-[#0adeee] bg-[#0adeee]/5' : 'border-[#1a3246] hover:border-[#0a9bdb]'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-1">
          <Upload className="h-6 w-6 text-[#0a9bdb]" />
          <p className="text-sm font-medium text-white">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6b82a6]">or</span>
            <Button type="button" size="sm" variant="outline" className="h-7 text-xs bg-[#162233] border-[#1a3246] hover:bg-[#243855] hover:text-white">
              Browse Files
            </Button>
          </div>
          <p className="text-xs text-[#6b82a6] mt-1">
            PDF, Word (.doc, .docx)
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-2">
          <ul className="border border-[#1a3246] rounded-md bg-[#05101b] overflow-hidden divide-y divide-[#1a3246]">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-4 w-4 text-[#0adeee]" />
                  <div>
                    <p className="text-xs font-medium text-white">{file.name}</p>
                    <p className="text-xs text-[#6b82a6]">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-[#6b82a6] hover:text-red-400 hover:bg-transparent" 
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
