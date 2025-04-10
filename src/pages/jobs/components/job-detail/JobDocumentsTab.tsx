import { useState, useRef, useEffect } from "react";
import { UploadCloud, File, Trash2, FileText, FileImage, Loader2, X, FolderOpen, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DocumentCategory = "invoices" | "contracts" | "receipts" | "other";

type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: DocumentCategory;
  url?: string; // For file preview
  progress?: number; // For upload progress
  status?: "uploading" | "complete" | "error";
};

interface JobDocumentsTabProps {
  onDocumentsUploaded: () => void;
  isCompleted: boolean;
}

const mockDocuments: Document[] = [
  {
    id: "doc1",
    name: "Delivery_Receipt_1234.pdf",
    type: "PDF",
    size: "1.2 MB",
    uploadDate: "2023-07-15",
    category: "receipts",
    url: "#"
  },
  {
    id: "doc2",
    name: "Bill_of_Lading_5678.pdf",
    type: "PDF",
    size: "0.8 MB",
    uploadDate: "2023-07-14",
    category: "invoices",
    url: "#"
  },
  {
    id: "doc3",
    name: "Inspection_Report.docx",
    type: "DOCX",
    size: "0.5 MB",
    uploadDate: "2023-07-12",
    category: "other",
    url: "#"
  }
];

export function JobDocumentsTab({ onDocumentsUploaded, isCompleted }: JobDocumentsTabProps) {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | "all">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const simulateFileUpload = (file: File, category: DocumentCategory): Promise<Document> => {
    const newDoc: Document = {
      id: `doc${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      category,
      progress: 0,
      status: "uploading"
    };
    
    setDocuments(prev => [...prev, newDoc]);
    
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setDocuments(prev => prev.map(doc => {
          if (doc.id === newDoc.id) {
            const newProgress = (doc.progress || 0) + Math.random() * 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { 
                ...doc, 
                progress: 100, 
                status: "complete",
                url: URL.createObjectURL(file)
              };
            }
            return { ...doc, progress: newProgress };
          }
          return doc;
        }));
      }, 500);
      
      setTimeout(() => {
        clearInterval(interval);
        resolve({
          ...newDoc,
          progress: 100,
          status: "complete",
          url: URL.createObjectURL(file)
        });
      }, 3000);
    });
  };
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processFiles(files, activeCategory === "all" ? "other" : activeCategory);
    }
  };
  
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      await processFiles(files, activeCategory === "all" ? "other" : activeCategory);
      e.target.value = '';
    }
  };
  
  const processFiles = async (files: File[], category: DocumentCategory) => {
    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt', 'xls', 'xlsx'];
      return extension && validExtensions.includes(extension);
    });
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, DOC, DOCX, JPG, PNG, TXT, XLS, XLSX files are allowed.",
        variant: "destructive"
      });
    }
    
    if (validFiles.length === 0) return;
    
    try {
      const uploadPromises = validFiles.map(file => simulateFileUpload(file, category));
      await Promise.all(uploadPromises);
      
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${validFiles.length} file${validFiles.length > 1 ? 's' : ''}.`,
      });
      
      onDocumentsUploaded();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleDelete = (id: string) => {
    const docToDelete = documents.find(doc => doc.id === id);
    
    if (docToDelete?.url && docToDelete.url.startsWith('blob:')) {
      URL.revokeObjectURL(docToDelete.url);
    }
    
    setDocuments(documents.filter(doc => doc.id !== id));
    
    toast({
      title: "Document deleted",
      description: "The document has been removed."
    });
  };

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (type: string) => {
    const imageTypes = ['JPG', 'JPEG', 'PNG', 'GIF'];
    if (imageTypes.includes(type)) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    }
    return <FileText className="h-5 w-5 text-blue-500" />;
  };

  const filteredDocuments = activeCategory === "all" 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Documents</h3>
        <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleSelectFiles}>
          <UploadCloud className="h-4 w-4" />
          <span>Upload</span>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx"
          onChange={handleFileInput}
        />
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setActiveCategory(value as DocumentCategory | "all")}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleSelectFiles}
          >
            <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag and drop your files here</p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse (PDF, DOC, DOCX, JPG, PNG, TXT, XLS, XLSX)
            </p>
          </div>
          
          <div className="space-y-2 mt-4">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm">No documents found</p>
                <Button variant="outline" size="sm" onClick={handleSelectFiles} className="mt-2">
                  <UploadCloud className="h-4 w-4 mr-1" /> Upload documents
                </Button>
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <Card key={doc.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.size}</span>
                          <span className="mx-1">•</span>
                          <span>Uploaded on {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {doc.status === "uploading" ? (
                        <div className="mr-2">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      ) : doc.status === "complete" ? (
                        <div className="mr-2">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                      ) : null}
                      
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {doc.status === "uploading" && doc.progress !== undefined && (
                    <div className="mt-2">
                      <Progress 
                        value={doc.progress} 
                        className="h-1" 
                        indicatorClassName="bg-blue-500"
                      />
                      <p className="text-xs text-right mt-1 text-muted-foreground">
                        {Math.round(doc.progress)}%
                      </p>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="invoices" className="mt-0">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleSelectFiles}
          >
            <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag and drop invoices here</p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
          <div className="space-y-2 mt-4">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm">No invoices found</p>
                <Button variant="outline" size="sm" onClick={handleSelectFiles} className="mt-2">
                  <UploadCloud className="h-4 w-4 mr-1" /> Upload invoices
                </Button>
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <Card key={doc.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.size}</span>
                          <span className="mx-1">•</span>
                          <span>Uploaded on {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {doc.status === "uploading" ? (
                        <div className="mr-2">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      ) : doc.status === "complete" ? (
                        <div className="mr-2">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                      ) : null}
                      
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {doc.status === "uploading" && doc.progress !== undefined && (
                    <div className="mt-2">
                      <Progress 
                        value={doc.progress} 
                        className="h-1" 
                        indicatorClassName="bg-blue-500"
                      />
                      <p className="text-xs text-right mt-1 text-muted-foreground">
                        {Math.round(doc.progress)}%
                      </p>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="contracts" className="mt-0">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleSelectFiles}
          >
            <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag and drop contracts here</p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
          <div className="space-y-2 mt-4">
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm">No contracts found</p>
                <Button variant="outline" size="sm" onClick={handleSelectFiles} className="mt-2">
                  <UploadCloud className="h-4 w-4 mr-1" /> Upload contracts
                </Button>
              </div>
            )}
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.size}</span>
                          <span className="mx-1">•</span>
                          <span>Uploaded on {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {doc.status === "uploading" ? (
                        <div className="mr-2">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      ) : doc.status === "complete" ? (
                        <div className="mr-2">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                      ) : null}
                      
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {doc.status === "uploading" && doc.progress !== undefined && (
                    <div className="mt-2">
                      <Progress 
                        value={doc.progress} 
                        className="h-1" 
                        indicatorClassName="bg-blue-500"
                      />
                      <p className="text-xs text-right mt-1 text-muted-foreground">
                        {Math.round(doc.progress)}%
                      </p>
                    </div>
                  )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="receipts" className="mt-0">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleSelectFiles}
          >
            <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag and drop receipts here</p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
          <div className="space-y-2 mt-4">
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm">No receipts found</p>
                <Button variant="outline" size="sm" onClick={handleSelectFiles} className="mt-2">
                  <UploadCloud className="h-4 w-4 mr-1" /> Upload receipts
                </Button>
              </div>
            )}
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.size}</span>
                          <span className="mx-1">•</span>
                          <span>Uploaded on {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {doc.status === "uploading" ? (
                        <div className="mr-2">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      ) : doc.status === "complete" ? (
                        <div className="mr-2">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                      ) : null}
                      
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {doc.status === "uploading" && doc.progress !== undefined && (
                    <div className="mt-2">
                      <Progress 
                        value={doc.progress} 
                        className="h-1" 
                        indicatorClassName="bg-blue-500"
                      />
                      <p className="text-xs text-right mt-1 text-muted-foreground">
                        {Math.round(doc.progress)}%
                      </p>
                    </div>
                  )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="other" className="mt-0">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleSelectFiles}
          >
            <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag and drop other documents here</p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
          <div className="space-y-2 mt-4">
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm">No documents found</p>
                <Button variant="outline" size="sm" onClick={handleSelectFiles} className="mt-2">
                  <UploadCloud className="h-4 w-4 mr-1" /> Upload documents
                </Button>
              </div>
            )}
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.size}</span>
                          <span className="mx-1">•</span>
                          <span>Uploaded on {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {doc.status === "uploading" ? (
                        <div className="mr-2">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      ) : doc.status === "complete" ? (
                        <div className="mr-2">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                      ) : null}
                      
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {doc.status === "uploading" && doc.progress !== undefined && (
                    <div className="mt-2">
                      <Progress 
                        value={doc.progress} 
                        className="h-1" 
                        indicatorClassName="bg-blue-500"
                      />
                      <p className="text-xs text-right mt-1 text-muted-foreground">
                        {Math.round(doc.progress)}%
                      </p>
                    </div>
                  )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
