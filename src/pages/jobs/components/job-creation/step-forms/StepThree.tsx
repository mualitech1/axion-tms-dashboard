import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Paperclip, Upload, File, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobCreationFormData } from "@/pages/jobs/types/formTypes";
import { z } from "zod";

interface JobFormExtended extends JobCreationFormData {
  additionalStops?: { length: number };
}

interface StepThreeProps {
  form: UseFormReturn<JobCreationFormData, z.ZodType<JobCreationFormData>, undefined>;
  onDocumentsChange: (files: File[]) => void;
}

export function StepThree({ form, onDocumentsChange }: StepThreeProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  
  // Form values for review
  const formValues = form.getValues() as JobFormExtended;
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      onDocumentsChange([...uploadedFiles, ...newFiles]);
    }
  };
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      onDocumentsChange([...uploadedFiles, ...newFiles]);
    }
  };
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  
  // Remove file from list
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    onDocumentsChange(newFiles);
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium text-white">Documents & Review</h3>
      
      {/* Document Upload */}
      <Card className="border-[#1a3246] bg-[#0a253a]">
        <CardHeader className="bg-[#051b2a] rounded-t-lg border-b border-[#1a3246] pb-3">
          <CardTitle className="text-md flex items-center">
            <Paperclip className="h-4 w-4 mr-2 text-[#0adeee]" />
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <div 
            className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
              dragActive 
                ? "border-[#0adeee] bg-[#0adeee]/5" 
                : "border-[#1a3246] hover:border-[#0adeee]/50 hover:bg-[#051b2a]"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              aria-label="Upload document files"
              title="Upload document files"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 rounded-full bg-[#051b2a]">
                <Upload className="h-6 w-6 text-[#0adeee]" />
              </div>
              <div>
                <p className="text-white font-medium">
                  Drag & drop files or click to upload
                </p>
                <p className="text-[#6b82a6] text-sm mt-1">
                  Support for POD, invoices, and related documents
                </p>
              </div>
            </div>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium text-[#0adeee]">Uploaded Files</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                {uploadedFiles.map((file, index) => (
                  <div 
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between bg-[#051b2a] p-2 rounded-md border border-[#1a3246]"
                  >
                    <div className="flex items-center space-x-3">
                      <File className="h-4 w-4 text-[#0adeee]" />
                      <div>
                        <p className="text-white text-sm truncate max-w-[180px] sm:max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-[#6b82a6] text-xs">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-[#6b82a6] hover:text-red-400 hover:bg-red-900/20"
                      onClick={() => removeFile(index)}
                      aria-label={`Remove file ${file.name}`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Order Summary */}
      <Card className="border-[#1a3246] bg-[#0a253a]">
        <CardHeader className="bg-[#051b2a] rounded-t-lg border-b border-[#1a3246] pb-3">
          <CardTitle className="text-md flex items-center">
            <Info className="h-4 w-4 mr-2 text-[#0adeee]" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-[#0adeee] mb-2">Job Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Job Title</span>
                  <span className="text-white text-sm font-medium text-right">
                    {formValues.jobTitle || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Customer</span>
                  <span className="text-white text-sm font-medium text-right">
                    {formValues.customer 
                      ? formValues.customer === "acme" 
                        ? "Acme Corporation" 
                        : formValues.customer === "globex" 
                        ? "Globex Industries"
                        : formValues.customer === "stark"
                        ? "Stark Enterprises"
                        : formValues.customer === "wayne"
                        ? "Wayne Enterprises"
                        : "Oscorp"
                      : "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Vehicle Type</span>
                  <span className="text-white text-sm font-medium text-right">
                    {formValues.vehicleType 
                      ? formValues.vehicleType.charAt(0).toUpperCase() + formValues.vehicleType.slice(1)
                      : "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Product Type</span>
                  <span className="text-white text-sm font-medium text-right">
                    {formValues.productType || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Weight</span>
                  <span className="text-white text-sm font-medium text-right">
                    {formValues.totalWeight ? `${formValues.totalWeight} kg` : "Not specified"}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-[#0adeee] mb-2">Logistics Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Collection</span>
                  <span className="text-white text-sm font-medium text-right">
                    {formValues.collection?.city && formValues.collection?.postCode
                      ? `${formValues.collection.city}, ${formValues.collection.postCode}`
                      : "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Delivery</span>
                  <span className="text-white text-sm font-medium text-right">
                    {formValues.delivery?.city && formValues.delivery?.postCode
                      ? `${formValues.delivery.city}, ${formValues.delivery.postCode}`
                      : "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Additional Stops</span>
                  <Badge className="bg-[#0adeee] text-[#051b2a] hover:bg-[#0adeee]">
                    {formValues.additionalStops?.length || 0}
                  </Badge>
                </div>
                <div className="flex justify-between items-start pb-1 border-b border-[#1a3246]">
                  <span className="text-[#6b82a6] text-sm">Documents</span>
                  <Badge className="bg-[#0adeee] text-[#051b2a] hover:bg-[#0adeee]">
                    {uploadedFiles.length}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {!formValues.collection?.addressLine1 || !formValues.delivery?.addressLine1 ? (
            <Alert className="mt-6 bg-amber-950/30 border-amber-800 text-amber-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please ensure all required address fields are completed before submitting.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mt-6 bg-emerald-950/30 border-emerald-800 text-emerald-300">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Job is ready to be created and assigned to a carrier.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 