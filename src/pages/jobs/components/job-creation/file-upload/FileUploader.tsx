
import { useDropzone } from "react-dropzone";
import { Upload, X, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
}

export function FileUploader({ onFilesChange }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter for valid document types
    const validFiles = acceptedFiles.filter(file => {
      const isValid = 
        file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type.includes('image/');
      
      if (!isValid) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported document format`,
          variant: "destructive"
        });
      }
      
      return isValid;
    });
    
    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      onFilesChange(newFiles);
      
      toast({
        title: "File uploaded",
        description: `${validFiles.length} document${validFiles.length === 1 ? "" : "s"} added successfully`,
      });
    }
  }, [files, onFilesChange]);
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] transition-all duration-300 ${
          isDragActive ? 'border-[#0adeee] bg-[#0a9bdb]/10' : 'border-[#1a3246] hover:border-[#0a9bdb]/60'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="w-12 h-12 rounded-full bg-[#0a9bdb]/10 flex items-center justify-center mb-1">
            <Upload className="h-5 w-5 text-[#0adeee]" />
          </div>
          <p className="text-sm font-medium text-white">
            {isDragActive ? 'Drop files here' : 'Drag & drop or click to upload'}
          </p>
          <p className="text-xs text-[#6b82a6]">
            Supported formats: PDF, Word, Images
          </p>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="mt-1 border-[#1a3246] bg-[#081427] text-[#0adeee] hover:bg-[#0c1e3a] hover:text-white"
          >
            Browse Files
          </Button>
        </div>
        
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="absolute inset-0 bg-[#0a9bdb]/10 rounded-lg flex items-center justify-center"
          >
            <div className="bg-[#05101b] p-3 rounded-lg">
              <Upload className="h-8 w-8 text-[#0adeee]" />
            </div>
          </motion.div>
        )}
      </div>
      
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div 
            className="space-y-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-sm font-medium text-[#0adeee]">Uploaded Documents</p>
            <ul className="border rounded-md divide-y divide-[#1a3246] border-[#1a3246] bg-[#081427] max-h-[200px] overflow-y-auto">
              {files.map((file, index) => (
                <motion.li 
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#0a9bdb]/10 p-1.5 rounded">
                      <FileCheck className="h-4 w-4 text-[#0adeee]" />
                    </div>
                    <div>
                      <p className="text-sm text-white truncate max-w-[180px] sm:max-w-[300px]">{file.name}</p>
                      <p className="text-xs text-[#6b82a6]">
                        {file.type.includes('pdf') ? 'PDF' : 
                         file.type.includes('word') || file.type.includes('doc') ? 'Word' : 
                         file.type.includes('image') ? 'Image' : 'Document'} · 
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full hover:bg-red-950/40 hover:text-red-400"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
