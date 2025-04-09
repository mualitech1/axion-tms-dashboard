
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Upload, FileText, Search, Filter, Download } from 'lucide-react';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CustomerDocumentsPage() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // In a real app, this would be an API call
    // Convert the string ID from URL params to a number for comparison
    const numericId = customerId ? parseInt(customerId, 10) : -1;
    const foundCustomer = customerData.find(c => c.id === numericId);
    setCustomer(foundCustomer || null);
  }, [customerId]);
  
  const handleUpload = () => {
    setIsUploadModalOpen(false);
    toast({
      title: "Document Uploaded",
      description: "Your document has been successfully uploaded.",
    });
  };

  const getFilteredDocuments = () => {
    if (!customer?.documents) return [];
    
    return customer.documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType ? doc.type === filterType : true;
      const matchesStatus = activeTab === 'all' || 
                           (activeTab === 'verified' && doc.verificationStatus === 'verified') || 
                           (activeTab === 'pending' && doc.verificationStatus === 'pending');
      
      return matchesSearch && matchesType && matchesStatus;
    });
  };
  
  const filteredDocuments = getFilteredDocuments();

  if (!customer) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold">Customer not found</h2>
        <p className="mt-2 text-gray-500">The customer you're looking for doesn't exist.</p>
        <Button className="mt-4" onClick={() => navigate('/customers')}>
          Back to Customers
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(`/customers/${customerId}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customer
          </Button>
          <h1 className="text-2xl font-bold">{customer.name} Documents</h1>
        </div>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Select onValueChange={(value) => setFilterType(value === "all" ? null : value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contract">Contracts</SelectItem>
                    <SelectItem value="terms">Terms & Conditions</SelectItem>
                    <SelectItem value="rate_card">Rate Cards</SelectItem>
                    <SelectItem value="invoice">Invoices</SelectItem>
                    <SelectItem value="pod">Proof of Delivery</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="license">Licenses</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="pending">Pending Verification</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center bg-gray-100 h-32 relative">
                    <FileText className="h-12 w-12 text-gray-400" />
                    {doc.verificationStatus && (
                      <Badge 
                        className={`absolute top-2 right-2 ${
                          doc.verificationStatus === 'verified' 
                            ? 'bg-tms-green-light text-tms-green' 
                            : doc.verificationStatus === 'pending' 
                            ? 'bg-tms-yellow-light text-tms-yellow'
                            : 'bg-tms-gray-200 text-tms-gray-600'
                        }`}
                      >
                        {doc.verificationStatus === 'verified' ? 'Verified' : 
                         doc.verificationStatus === 'pending' ? 'Pending' : 'Rejected'}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium text-tms-gray-800 truncate pr-2">{doc.name}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.fileSize}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Uploaded on {new Date(doc.dateUploaded).toLocaleDateString()}
                    </div>
                    {doc.expiryDate && (
                      <div className="text-xs text-muted-foreground mb-3">
                        Expires on {new Date(doc.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {doc.type.replace('_', ' ')}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterType ? 
                  "No documents match your search criteria." : 
                  "Upload documents to get started."}
              </p>
              <Button onClick={() => setIsUploadModalOpen(true)} className="mt-4">
                <Upload className="h-4 w-4 mr-2" /> Upload Document
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload a document for {customer.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="document" className="text-sm font-medium">
                Document Type
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="terms">Terms & Conditions</SelectItem>
                  <SelectItem value="rate_card">Rate Card</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="pod">Proof of Delivery</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="license">License</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="document-name" className="text-sm font-medium">
                Document Name
              </label>
              <Input id="document-name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="expiry" className="text-sm font-medium">
                Expiry Date (if applicable)
              </label>
              <Input type="date" id="expiry" />
            </div>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to select a file or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, PNG, JPG up to 10MB</p>
              <input id="file-upload" type="file" className="hidden" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload}>Upload</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
