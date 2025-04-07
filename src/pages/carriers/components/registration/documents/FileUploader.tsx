
import { FileText, Upload, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export function FileUploader({ file, onChange }: FileUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div 
        className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
        onClick={() => document.getElementById('file-upload')?.click()}
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
                  onChange(null);
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
  );
}
