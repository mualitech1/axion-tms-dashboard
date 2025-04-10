
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, ChevronDown, Download, Eye, FileText, Filter, MessageSquare, Search, Calendar, Check, ArrowUp, DollarSign, Link as LinkIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import MainLayout from '@/components/layout/MainLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock dispute data - this would come from an API in a real scenario
const disputeData = [
  {
    id: "IKB-DISP-001",
    invoiceId: "IKB-INV-2024-001",
    jobRef: "IKB1234",
    entityName: "Acme Corp",
    type: "customer",
    dateRaised: "2024-04-20",
    reason: "Late delivery, goods damaged on arrival. Customer requesting partial refund due to business impact.",
    amount: 150.00,
    status: "open",
    assignedTo: "John Doe"
  },
  {
    id: "IKB-DISP-002",
    invoiceId: "IKB-SINV-2024-005",
    jobRef: "IKB5678",
    entityName: "Carrier X",
    type: "carrier",
    dateRaised: "2024-04-15",
    reason: "Discrepancy in mileage calculation. Carrier claims additional 50 miles traveled.",
    amount: 75.00,
    status: "pending",
    assignedTo: "Jane Smith"
  },
  {
    id: "IKB-DISP-003",
    invoiceId: "IKB-INV-2024-012",
    jobRef: "IKB2345",
    entityName: "TechCorp Ltd",
    type: "customer",
    dateRaised: "2024-04-10",
    reason: "Invoice amount does not match agreed rate. Customer referring to quote #TQ-2023-456.",
    amount: 220.00,
    status: "resolved",
    assignedTo: "Mike Johnson"
  },
  {
    id: "IKB-DISP-004",
    invoiceId: "IKB-SINV-2024-008",
    jobRef: "IKB6789",
    entityName: "FastTrucks Ltd",
    type: "carrier",
    dateRaised: "2024-04-05",
    reason: "Waiting time not accounted for. Carrier claims 2 hours additional waiting time.",
    amount: 120.00,
    status: "open",
    assignedTo: "Sarah Williams"
  },
  {
    id: "IKB-DISP-005",
    invoiceId: "IKB-INV-2024-020",
    jobRef: "IKB3456",
    entityName: "Global Retail Inc",
    type: "customer",
    dateRaised: "2024-03-28",
    reason: "Service did not include unloading as agreed. Customer requesting adjustment.",
    amount: 85.00,
    status: "pending",
    assignedTo: "John Doe"
  }
];

// Mock dispute history data
const mockDisputeHistory = [
  {
    id: 1,
    disputeId: "IKB-DISP-001",
    timestamp: "2024-04-20T10:00:00",
    user: "John Doe",
    action: "Dispute Created",
    description: "Initial dispute raised due to late delivery and damaged goods."
  },
  {
    id: 2,
    disputeId: "IKB-DISP-001",
    timestamp: "2024-04-21T14:00:00",
    user: "Jane Smith",
    action: "Note Added",
    description: "Contacted Acme Corp for clarification on the damage extent."
  },
  {
    id: 3,
    disputeId: "IKB-DISP-001",
    timestamp: "2024-04-22T09:30:00",
    user: "Mike Johnson",
    action: "Evidence Uploaded",
    description: "Photos of damaged goods received from customer."
  },
  {
    id: 4,
    disputeId: "IKB-DISP-002",
    timestamp: "2024-04-15T11:20:00",
    user: "Jane Smith",
    action: "Dispute Created",
    description: "Initial dispute raised regarding mileage calculation."
  },
  {
    id: 5,
    disputeId: "IKB-DISP-002",
    timestamp: "2024-04-16T16:45:00",
    user: "John Doe",
    action: "Note Added",
    description: "Reviewing route data from tracking system."
  }
];

interface DisputeHistoryItem {
  id: number;
  disputeId: string;
  timestamp: string;
  user: string;
  action: string;
  description: string;
}

export default function DisputeManagement() {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { toast } = useToast();
  
  // Filter disputes based on filters and search query
  const filteredDisputes = disputeData.filter(dispute => {
    // Status filter
    if (statusFilter !== "all" && dispute.status !== statusFilter) {
      return false;
    }
    
    // Type filter
    if (typeFilter !== "all" && dispute.type !== typeFilter) {
      return false;
    }
    
    // Date range filter
    if (dateRange?.from) {
      const disputeDate = new Date(dispute.dateRaised);
      if (dateRange.from && disputeDate < dateRange.from) {
        return false;
      }
      if (dateRange.to && disputeDate > dateRange.to) {
        return false;
      }
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        dispute.id.toLowerCase().includes(query) ||
        dispute.invoiceId.toLowerCase().includes(query) ||
        dispute.jobRef.toLowerCase().includes(query) ||
        dispute.entityName.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Get dispute history for a specific dispute
  const getDisputeHistory = (disputeId: string): DisputeHistoryItem[] => {
    return mockDisputeHistory.filter(item => item.disputeId === disputeId);
  };
  
  // Handle opening dispute details
  const handleViewDetails = (dispute: any) => {
    setSelectedDispute(dispute);
    setIsDetailModalOpen(true);
  };
  
  // Handle adding a new note
  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast({
        title: "Note cannot be empty",
        description: "Please enter a note before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Note added",
      description: "Your note has been added to the dispute record."
    });
    
    setNewNote("");
    // In a real app, we would add this note to the dispute history
  };
  
  // Handle resolving a dispute
  const handleResolveDispute = () => {
    toast({
      title: "Dispute resolved",
      description: `Dispute ${selectedDispute?.id} has been marked as resolved.`
    });
    
    setIsDetailModalOpen(false);
    // In a real app, we would update the dispute status in the database
  };
  
  // Handle escalating a dispute
  const handleEscalateDispute = () => {
    toast({
      title: "Dispute escalated",
      description: `Dispute ${selectedDispute?.id} has been escalated to management.`
    });
    
    // In a real app, we would update the dispute status and notify management
  };
  
  // Handle adjusting an invoice
  const handleAdjustInvoice = () => {
    toast({
      title: "Invoice adjustment initiated",
      description: "You will be redirected to the invoice adjustment screen."
    });
    
    // In a real app, we would redirect to the invoice adjustment form
  };
  
  // Render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Open</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Resolution Pending</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <MainLayout title="Invoice Disputes">
      <div className="space-y-6">
        {/* Back button header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="mb-2 flex items-center"
            >
              <Link to="/finance">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Finance
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Invoice Disputes</h1>
            <p className="text-muted-foreground mt-1">
              Manage and resolve customer and carrier invoice disputes
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2 text-muted-foreground" />
              Dispute Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div className="space-y-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="pending">Resolution Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Type Filter */}
              <div className="space-y-2">
                <Label htmlFor="type-filter">Type</Label>
                <Select 
                  value={typeFilter} 
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger id="type-filter">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="customer">Customer Invoice</SelectItem>
                    <SelectItem value="carrier">Carrier Self-Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Date Range Filter */}
              <div className="space-y-2">
                <Label htmlFor="date-filter">Date Raised</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-filter"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Search Box */}
              <div className="space-y-2">
                <Label htmlFor="search-disputes">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-disputes"
                    placeholder="Search by ID, invoice, job..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disputes Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                Dispute Records
              </div>
              <Button size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispute ID</TableHead>
                  <TableHead>Related Invoice</TableHead>
                  <TableHead className="hidden md:table-cell">Job Ref</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Date Raised</TableHead>
                  <TableHead className="hidden lg:table-cell">Reason</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDisputes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-10 text-muted-foreground">
                      No disputes match your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDisputes.map((dispute) => (
                    <TableRow key={dispute.id}>
                      <TableCell className="font-medium">{dispute.id}</TableCell>
                      <TableCell>{dispute.invoiceId}</TableCell>
                      <TableCell className="hidden md:table-cell">{dispute.jobRef}</TableCell>
                      <TableCell>{dispute.entityName}</TableCell>
                      <TableCell className="hidden md:table-cell">{dispute.dateRaised}</TableCell>
                      <TableCell className="hidden lg:table-cell max-w-[200px] truncate">
                        {dispute.reason}
                      </TableCell>
                      <TableCell>£{dispute.amount.toFixed(2)}</TableCell>
                      <TableCell>{renderStatusBadge(dispute.status)}</TableCell>
                      <TableCell className="hidden lg:table-cell">{dispute.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="icon" onClick={() => handleViewDetails(dispute)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Dispute Details Modal */}
      {selectedDispute && (
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Dispute Details ({selectedDispute.id})
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Dispute information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Related Invoice</p>
                    <p className="font-medium">{selectedDispute.invoiceId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Job Reference</p>
                    <p className="font-medium">{selectedDispute.jobRef}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {selectedDispute.type === 'customer' ? 'Customer' : 'Carrier'}
                    </p>
                    <p className="font-medium">{selectedDispute.entityName}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date Raised</p>
                    <p className="font-medium">{selectedDispute.dateRaised}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount in Query</p>
                    <p className="font-medium">£{selectedDispute.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div>{renderStatusBadge(selectedDispute.status)}</div>
                  </div>
                </div>
              </div>
              
              {/* Dispute reason */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Reason</p>
                <div className="p-3 bg-muted rounded-md">
                  <p>{selectedDispute.reason}</p>
                </div>
              </div>
              
              {/* Dispute history */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">History</p>
                  <Badge variant="outline">{getDisputeHistory(selectedDispute.id).length} entries</Badge>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getDisputeHistory(selectedDispute.id).map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>
                            {new Date(entry.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>{entry.user}</TableCell>
                          <TableCell>{entry.action}</TableCell>
                          <TableCell>{entry.description}</TableCell>
                        </TableRow>
                      ))}
                      {getDisputeHistory(selectedDispute.id).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                            No history entries found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Add note form */}
              <div className="space-y-2">
                <Label htmlFor="add-note">Add Note</Label>
                <Textarea
                  id="add-note"
                  placeholder="Enter your note here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button size="sm" className="gap-1" onClick={handleAddNote}>
                  <MessageSquare className="h-4 w-4" />
                  Add Note
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                  Close
                </Button>
                
                <Button 
                  variant="outline" 
                  className="gap-1 border-amber-500 text-amber-700 hover:bg-amber-50"
                  onClick={handleEscalateDispute}
                >
                  <ArrowUp className="h-4 w-4" />
                  Escalate
                </Button>
                
                <Button 
                  variant="outline" 
                  className="gap-1 border-blue-500 text-blue-700 hover:bg-blue-50"
                  onClick={handleAdjustInvoice}
                >
                  <DollarSign className="h-4 w-4" />
                  Adjust Invoice
                </Button>
                
                <Button 
                  className="gap-1 bg-green-600 hover:bg-green-700"
                  onClick={handleResolveDispute}
                >
                  <Check className="h-4 w-4" />
                  Mark as Resolved
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
}
