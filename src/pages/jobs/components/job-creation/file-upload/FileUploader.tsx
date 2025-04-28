
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export function FileUploader({ onFilesChange, maxFiles = 5 }: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newFiles = [...uploadedFiles, ...filesArray].slice(0, maxFiles);
      setUploadedFiles(newFiles);
      onFilesChange(newFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    
    if (event.dataTransfer.files) {
      const filesArray = Array.from(event.dataTransfer.files);
      const newFiles = [...uploadedFiles, ...filesArray].slice(0, maxFiles);
      setUploadedFiles(newFiles);
      onFilesChange(newFiles);
    }
  };

  const removeFile = (fileIndex: number) => {
    const newFiles = uploadedFiles.filter((_, index) => index !== fileIndex);
    setUploadedFiles(newFiles);
    onFilesChange(newFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 bg-aximo-darker",
          dragOver ? "border-aximo-primary bg-aximo-primary/5" : "border-aximo-border hover:border-aximo-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <UploadCloud className="h-8 w-8 text-aximo-primary/70" />
          <p className="text-sm text-aximo-text">
            <span className="font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-aximo-text-secondary">
            PDF, Word, Excel, or image files (max {maxFiles} files)
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-2 bg-aximo-dark border border-aximo-border rounded-md"
            >
              <div className="flex items-center space-x-2 truncate">
                <File className="h-4 w-4 text-aximo-primary" />
                <span className="text-sm text-aximo-text truncate" title={file.name}>
                  {file.name}
                </span>
                <span className="text-xs text-aximo-text-secondary">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="h-6 w-6 p-0 text-aximo-text-secondary hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
