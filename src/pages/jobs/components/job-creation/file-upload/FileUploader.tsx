
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { FileUp, FileCheck, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploaderProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
}

export const FileUploader = ({ 
  onFilesChange, 
  maxFiles = 5,
  maxSize = 5242880, // 5MB
  accept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png']
  }
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Check for max files
    if (files.length + acceptedFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive"
      });
      return;
    }

    // Filter out any files that are too large or invalid types
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the ${maxSize / 1024 / 1024}MB limit`,
          variant: "destructive"
        });
        return false;
      }
      return true;
    });
    
    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      
      if (onFilesChange) {
        onFilesChange(newFiles);
      }
      
      toast({
        title: "Files uploaded",
        description: `${validFiles.length} file${validFiles.length === 1 ? "" : "s"} added`,
      });
    }
  }, [files, maxFiles, maxSize, onFilesChange, toast]);

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ 
    onDrop,
    maxFiles,
    maxSize,
    accept
  });

  return (
    <div className="space-y-3">
      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-lg p-4 sm:p-6 transition-all duration-200 cursor-pointer group",
          isDragActive && !isDragReject && "border-[#0adeee] bg-[#0adeee]/5",
          isDragReject && "border-red-500 bg-red-500/5",
          !isDragActive && !isDragReject && "border-[#162233] hover:border-[#0a9bdb] hover:bg-[#0a9bdb]/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="p-2 rounded-full bg-[#162233] group-hover:bg-[#0a9bdb]/20 transition-colors">
            <FileUp className={cn(
              "h-6 w-6 text-[#6b82a6] group-hover:text-[#0adeee] transition-colors",
              isDragActive && !isDragReject && "text-[#0adeee]",
              isDragReject && "text-red-500"
            )} />
          </div>
          
          {isDragReject ? (
            <div className="flex items-center text-red-500 space-x-1">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm font-medium">Some files are not allowed</p>
            </div>
          ) : isDragActive ? (
            <p className="text-sm font-medium text-[#0adeee]">Drop files to upload</p>
          ) : (
            <p className="text-sm font-medium text-[#6b82a6] group-hover:text-white transition-colors">
              Drag & drop or click to upload
            </p>
          )}
          
          <p className="text-xs text-[#6b82a6]">
            Supported formats: PDF, Word, Images
          </p>
          
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="mt-2 border-[#1a3246] bg-[#05101b] hover:bg-[#162233] text-[#6b82a6] hover:text-white"
          >
            Browse Files
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div 
            className="mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className="text-xs font-medium text-[#6b82a6] uppercase tracking-wide mb-2">
              Uploads ({files.length}/{maxFiles})
            </p>
            <div className="space-y-2">
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-[#05101b] border border-[#1a3246] rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-full bg-[#162233] text-[#0adeee]">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <div className="max-w-[200px]">
                      <p className="text-xs font-medium text-white truncate">{file.name}</p>
                      <p className="text-xs text-[#6b82a6]">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFile(index)} 
                    className="h-7 w-7 p-0 text-[#6b82a6] hover:text-red-400 hover:bg-[#330c0c]"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
