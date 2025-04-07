
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Share2, Link2, ExternalLink } from "lucide-react";
import { shareDocumentWithCustomer, syncDocumentToCustomer } from "@/utils/documents/documentIntegration";
import { toast } from "@/hooks/use-toast";

interface DocumentSharingPanelProps {
  documentId: string;
  documentName: string;
  documentType: string;
}

export default function DocumentSharingPanel({
  documentId,
  documentName,
  documentType
}: DocumentSharingPanelProps) {
  const [selectedSystem, setSelectedSystem] = useState<string>('customer');
  const [recipientId, setRecipientId] = useState<string>('');
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  
  const handleShare = async () => {
    if (!recipientId) {
      toast({
        title: "Missing information",
        description: "Please enter a recipient ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsSharing(true);
    
    try {
      if (selectedSystem === 'customer') {
        const result = await shareDocumentWithCustomer(documentId, recipientId);
        if (result) {
          setShareUrl(`https://example.com/shared/doc/${documentId}?recipient=${recipientId}`);
        }
      } else if (selectedSystem === 'carrier') {
        // Similar function for carriers could be implemented here
        toast({
          title: "Document shared",
          description: `Document shared with carrier ${recipientId}`
        });
        setShareUrl(`https://example.com/shared/carrier-doc/${documentId}?recipient=${recipientId}`);
      }
    } catch (error) {
      toast({
        title: "Error sharing document",
        description: "An error occurred while sharing the document",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };
  
  const handleSync = async () => {
    if (!recipientId) {
      toast({
        title: "Missing information",
        description: "Please enter a recipient ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsSharing(true);
    
    try {
      const result = await syncDocumentToCustomer(documentId, recipientId, documentType);
      if (result.success) {
        toast({
          title: "Document synced",
          description: `Document has been synced with ID: ${result.newDocumentId}`
        });
      }
    } catch (error) {
      toast({
        title: "Error syncing document",
        description: "An error occurred while syncing the document",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };
  
  const copyShareLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied",
        description: "Share link has been copied to clipboard"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Document Integration</span>
        </CardTitle>
        <CardDescription>Share documents across systems</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Document Information</p>
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-medium">{documentName}</p>
            <p className="text-xs text-muted-foreground">ID: {documentId}</p>
            <p className="text-xs text-muted-foreground">Type: {documentType}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Share With</label>
          <Select
            value={selectedSystem}
            onValueChange={(value) => setSelectedSystem(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Customer Portal</SelectItem>
              <SelectItem value="carrier">Carrier Portal</SelectItem>
              <SelectItem value="accounting">Accounting System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Recipient ID</label>
          <Input
            placeholder={`Enter ${selectedSystem} ID...`}
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          />
        </div>
        
        {shareUrl && (
          <div className="bg-muted p-3 rounded-md flex items-center justify-between">
            <div className="truncate flex-1">
              <p className="text-xs font-medium">Share Link:</p>
              <p className="text-xs text-muted-foreground truncate">{shareUrl}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={copyShareLink}>
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        <Button 
          variant="outline" 
          className="flex-1" 
          disabled={isSharing} 
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Document
        </Button>
        <Button 
          className="flex-1" 
          disabled={isSharing} 
          onClick={handleSync}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Sync to {selectedSystem}
        </Button>
      </CardFooter>
    </Card>
  );
}
