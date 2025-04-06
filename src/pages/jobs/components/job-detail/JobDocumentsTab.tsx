
import { useState } from "react";
import { UploadCloud, File, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
};

const mockDocuments: Document[] = [
  {
    id: "doc1",
    name: "Delivery_Receipt_1234.pdf",
    type: "PDF",
    size: "1.2 MB",
    uploadDate: "2023-07-15"
  },
  {
    id: "doc2",
    name: "Bill_of_Lading_5678.pdf",
    type: "PDF",
    size: "0.8 MB",
    uploadDate: "2023-07-14"
  },
  {
    id: "doc3",
    name: "Inspection_Report.docx",
    type: "DOCX",
    size: "0.5 MB",
    uploadDate: "2023-07-12"
  }
];

export function JobDocumentsTab() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Here you would normally upload the file to a server
    // For now, we'll just add it to our local state
    const files = Array.from(e.dataTransfer.files);
    
    const newDocuments = files.map(file => ({
      id: `doc${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0]
    }));
    
    setDocuments([...documents, ...newDocuments]);
  };
  
  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Documents</h3>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <UploadCloud className="h-4 w-4" />
          <span>Upload</span>
        </Button>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">Drag and drop your files here</p>
        <p className="text-xs text-muted-foreground mt-1">
          or click to browse (PDF, DOC, DOCX, JPG, PNG)
        </p>
        <input
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>
      
      <div className="space-y-2 mt-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">
                  {doc.type} • {doc.size} • Uploaded on {doc.uploadDate}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
            </Button>
          </Card>
        ))}
      </div>
      
      {documents.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No documents uploaded yet
        </p>
      )}
    </div>
  );
}
