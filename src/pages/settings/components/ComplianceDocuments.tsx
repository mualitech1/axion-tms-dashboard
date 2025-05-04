
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, Download, Eye, FileText, Loader2, Plus, Shield, Upload } from "lucide-react";
import { ComplianceDocument, complianceService } from "@/services/compliance-service";

export default function ComplianceDocuments() {
  const [documents, setDocuments] = useState<ComplianceDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<ComplianceDocument | null>(null);
  const [documentAcknowledged, setDocumentAcknowledged] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      let filter = {};
      if (activeTab === "active") {
        filter = { status: "approved" };
      } else if (activeTab === "pending") {
        filter = { status: "pending_approval" };
      } else if (activeTab === "expired") {
        filter = { status: "expired" };
      }

      const docs = await complianceService.getComplianceDocuments(filter);
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to load compliance documents:", error);
      toast({
        title: "Error",
        description: "Failed to load compliance documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending_approval': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'revoked': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleViewDocument = async (document: ComplianceDocument) => {
    setSelectedDocument(document);
    try {
      // Check if the user has already acknowledged this document
      const acknowledged = await complianceService.hasUserAcknowledged(document.id!);
      setDocumentAcknowledged(acknowledged);
      setViewDialogOpen(true);
    } catch (error) {
      console.error("Error checking document acknowledgement:", error);
      // Show the document anyway, just set acknowledged to false
      setDocumentAcknowledged(false);
      setViewDialogOpen(true);
    }
  };

  const handleAcknowledgeDocument = async () => {
    if (!selectedDocument) return;
    
    try {
      await complianceService.acknowledgeDocument(selectedDocument.id!);
      setDocumentAcknowledged(true);
      toast({
        title: "Document Acknowledged",
        description: "You have successfully acknowledged this document"
      });
    } catch (error) {
      console.error("Failed to acknowledge document:", error);
      toast({
        title: "Error",
        description: "Failed to acknowledge document",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" /> Compliance Documents
        </CardTitle>
        <CardDescription>
          Access and manage regulatory and compliance documentation
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>

            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Document
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            {renderDocumentsList()}
          </TabsContent>
          <TabsContent value="active" className="mt-0">
            {renderDocumentsList()}
          </TabsContent>
          <TabsContent value="pending" className="mt-0">
            {renderDocumentsList()}
          </TabsContent>
          <TabsContent value="expired" className="mt-0">
            {renderDocumentsList()}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* View Document Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
            <DialogDescription>
              {selectedDocument?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Document Type:</span>
              <span>{selectedDocument?.documentType}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Version:</span>
              <span>{selectedDocument?.version}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Status:</span>
              <Badge className={getStatusColor(selectedDocument?.status || '')}>
                {selectedDocument?.status.replace('_', ' ')}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Effective Date:</span>
              <span>{selectedDocument?.effectiveDate ? format(new Date(selectedDocument.effectiveDate), 'MMM d, yyyy') : 'N/A'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Expiry Date:</span>
              <span>{selectedDocument?.expiryDate ? format(new Date(selectedDocument.expiryDate), 'MMM d, yyyy') : 'N/A'}</span>
            </div>

            {/* Document Preview Placeholder */}
            <div className="border rounded-md p-4 h-40 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Document Preview</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            {!documentAcknowledged && selectedDocument?.status === 'approved' && (
              <Button onClick={handleAcknowledgeDocument}>
                <CheckCircle className="h-4 w-4 mr-2" /> Acknowledge Document
              </Button>
            )}
            {documentAcknowledged && (
              <div className="flex items-center text-sm text-green-600 mr-auto">
                <CheckCircle className="h-4 w-4 mr-1" /> You have acknowledged this document
              </div>
            )}
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Document Dialog - Simplified for demo */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Compliance Document</DialogTitle>
            <DialogDescription>
              Upload a new compliance document to the system
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Document Title</Label>
              <Input id="title" placeholder="Enter document title" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter document description" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Document Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                    <SelectItem value="regulation">Regulation</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="version">Version</Label>
                <Input id="version" placeholder="e.g. 1.0" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Effective Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Pick a date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label>Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Pick a date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Upload Document</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload or drag and drop<br />
                  PDF, DOCX, or TXT (max 10MB)
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setCreateDialogOpen(false);
              toast({
                title: "Document Added",
                description: "The document has been added successfully and is pending approval."
              });
            }}>
              Add Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );

  function renderDocumentsList() {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (documents.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
          <p>No documents found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold truncate">{doc.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{doc.description}</p>
              </div>
              <Badge className={getStatusColor(doc.status)}>
                {doc.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="mt-4 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span>Type: {doc.documentType}</span>
                <span>v{doc.version}</span>
              </div>
              {doc.effectiveDate && (
                <div className="text-xs text-gray-500 mt-1">
                  Effective: {format(new Date(doc.effectiveDate), 'MMM d, yyyy')}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc)}>
                <Eye className="h-4 w-4 mr-2" /> View
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
