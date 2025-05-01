
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, AlertTriangle, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export function FileUploader({ 
  onFilesChange, 
  maxFiles = 5, 
  maxSizeMB = 10
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: maxSize,
    onDrop: (acceptedFiles) => {
      // Check for max files
      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`You can upload a maximum of ${maxFiles} files`);
        return;
      }
      
      // Reset error
      setError(null);
      
      // Add new files
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
    },
    onDropRejected: (rejectedFiles) => {
      // Set error message based on why files were rejected
      if (rejectedFiles.some(file => file.file.size > maxSize)) {
        setError(`Files must be smaller than ${maxSizeMB}MB`);
      } else {
        setError('Invalid file type. Please upload PDF, DOCX, or image files only');
      }
    }
  });
  
  // Notify parent component when files change
  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);
  
  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
    setError(null);
  };

  // Get file icon based on file type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return <File className="h-5 w-5 text-red-400" />;
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <File className="h-5 w-5 text-blue-400" />;
    } else if (['doc', 'docx'].includes(extension || '')) {
      return <File className="h-5 w-5 text-blue-600" />;
    }
    return <File className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div className="space-y-3">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-4 transition-colors duration-200 text-center cursor-pointer hover:bg-[#080f19] ${
          isDragActive ? 'border-[#0adeee] bg-[#0adeee]/5' : 'border-[#1a3246]'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className={`h-10 w-10 mb-2 ${isDragActive ? 'text-[#0adeee]' : 'text-[#6b82a6]'}`} />
          <p className="text-sm text-[#6b82a6] mb-1">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here or click to browse'}
          </p>
          <p className="text-xs text-[#4a5a74]">
            Supported formats: PDF, DOCX, JPEG, PNG (Max {maxSizeMB}MB)
          </p>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center bg-red-900/20 text-red-300 text-xs p-2 rounded"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          {error}
        </motion.div>
      )}

      {files.length > 0 && (
        <div className="bg-[#080f19] border border-[#1a3246] rounded-lg p-2 max-h-36 overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between bg-[#05101b] p-2 rounded mb-1 last:mb-0"
              >
                <div className="flex items-center truncate mr-2">
                  {getFileIcon(file.name)}
                  <span className="ml-2 text-xs text-[#c5d3eb] truncate">
                    {file.name}
                  </span>
                </div>
                <Button
                  onClick={() => removeFile(index)}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 min-w-6 rounded-full hover:bg-red-900/30 hover:text-red-400"
                  type="button"
                >
                  <X className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
