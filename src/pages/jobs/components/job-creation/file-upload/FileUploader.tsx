
import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, FileCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
}

export function FileUploader({ onFilesChange }: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const newFiles = [...uploadedFiles, ...acceptedFiles];
    setUploadedFiles(newFiles);
    onFilesChange(newFiles);
  }, [uploadedFiles, onFilesChange]);
  
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    onFilesChange(newFiles);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <div className="space-y-3">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors min-h-[180px] flex flex-col items-center justify-center ${
          isDragActive ? 'border-[#0adeee] bg-[#0adeee]/5' : 'border-[#1a3246] hover:border-[#0a9bdb]'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <motion.div 
            className="p-4 rounded-full bg-[#0a9bdb]/20"
            animate={{ y: isDragActive ? -5 : 0 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <Upload className="h-8 w-8 text-[#0adeee]" />
          </motion.div>
          <motion.p 
            className="text-sm font-medium text-white"
            animate={{ scale: isDragActive ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {isDragActive ? 'Drop files here' : 'Drag & drop or click to upload'}
          </motion.p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-[#6b82a6]">or</span>
            <Button 
              type="button" 
              size="sm" 
              className="h-8 bg-[#162233] text-[#0adeee] border border-[#1a3246] hover:bg-[#0a9bdb]/10 hover:text-white"
            >
              Browse Files
            </Button>
          </div>
          <p className="text-xs text-[#6b82a6] mt-1">
            Supported formats: PDF, Word, Images
          </p>
        </div>
      </div>
      
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <ul className="border border-[#1a3246] rounded-md bg-[#05101b]/40 overflow-hidden divide-y divide-[#1a3246]">
              {uploadedFiles.map((file, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center justify-between p-2 px-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <FileCheck className="h-4 w-4 text-[#0adeee]" />
                    <div>
                      <p className="text-xs font-medium text-white truncate max-w-[150px] sm:max-w-[250px]">
                        {file.name}
                      </p>
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
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
