
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Check, 
  CheckCircle, 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  Info, 
  PlusCircle, 
  Search, 
  XCircle 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for payment batches
const mockPaymentBatches = [
  {
    id: "PAY-2025-0001",
    creationDate: "2025-04-05",
    paymentDate: "2025-04-20",
    totalAmount: 14850.75,
    invoiceCount: 6,
    status: "Pending Approval"
  },
  {
    id: "PAY-2025-0002",
    creationDate: "2025-04-03",
    paymentDate: "2025-04-15",
    totalAmount: 23425.50,
    invoiceCount: 9,
    status: "Approved"
  },
  {
    id: "PAY-2025-0003",
    creationDate: "2025-04-01",
    paymentDate: "2025-04-10",
    totalAmount: 18765.25,
    invoiceCount: 7,
    status: "Exported"
  },
  {
    id: "PAY-2025-0004",
    creationDate: "2025-03-25",
    paymentDate: "2025-04-05",
    totalAmount: 32450.00,
    invoiceCount: 12,
    status: "Paid"
  },
  {
    id: "PAY-2025-0005",
    creationDate: "2025-03-20",
    paymentDate: "2025-04-01",
    totalAmount: 8675.50,
    invoiceCount: 4,
    status: "Paid"
  }
];

// Mock data for available invoices to include in a new payment batch
const availableInvoices = [
  {
    id: "IKB-SINV-2025-0012",
    carrierName: "Fast Logistics Ltd",
    dueDate: "2025-04-25",
    amount: 2350.00,
    vatAmount: 470.00,
    totalAmount: 2820.00,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0014",
    carrierName: "Express Haulage Co",
    dueDate: "2025-04-28",
    amount: 3150.75,
    vatAmount: 630.15,
    totalAmount: 3780.90,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0016",
    carrierName: "Reliable Freight Services",
    dueDate: "2025-04-30",
    amount: 1875.25,
    vatAmount: 375.05,
    totalAmount: 2250.30,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0018",
    carrierName: "County Carriers Ltd",
    dueDate: "2025-05-02",
    amount: 4250.00,
    vatAmount: 850.00,
    totalAmount: 5100.00,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0020",
    carrierName: "Swift Transport Solutions",
    dueDate: "2025-05-05",
    amount: 3680.50,
    vatAmount: 736.10,
    totalAmount: 4416.60,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0022",
    carrierName: "Horizon Haulage",
    dueDate: "2025-05-07",
    amount: 2985.25,
    vatAmount: 597.05,
    totalAmount: 3582.30,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0024",
    carrierName: "Northern Logistics Ltd",
    dueDate: "2025-05-10",
    amount: 3475.00,
    vatAmount: 695.00,
    totalAmount: 4170.00,
    selected: false
  }
];

// Mock data for invoices included in an existing batch
const batchInvoices = [
  {
    id: "IKB-SINV-2025-0001",
    carrierName: "Fast Logistics Ltd",
    dueDate: "2025-04-15",
    amount: 2750.00,
    vatAmount: 550.00,
    totalAmount: 3300.00
  },
  {
    id: "IKB-SINV-2025-0003",
    carrierName: "Express Haulage Co",
    dueDate: "2025-04-16",
    amount: 3250.75,
    vatAmount: 650.15,
    totalAmount: 3900.90
  },
  {
    id: "IKB-SINV-2025-0005",
    carrierName: "Reliable Freight Services",
    dueDate: "2025-04-18",
    amount: 1950.25,
    vatAmount: 390.05,
    totalAmount: 2340.30
  },
  {
    id: "IKB-SINV-2025-0007",
    carrierName: "County Carriers Ltd",
    dueDate: "2025-04-20",
    amount: 4150.00,
    vatAmount: 830.00,
    totalAmount: 4980.00
  },
  {
    id: "IKB-SINV-2025-0009",
    carrierName: "Swift Transport Solutions",
    dueDate: "2025-04-22",
    amount: 3550.50,
    vatAmount: 710.10,
    totalAmount: 4260.60
  },
  {
    id: "IKB-SINV-2025-0011",
    carrierName: "Horizon Haulage",
    dueDate: "2025-04-23",
    amount: 2950.25,
    vatAmount: 590.05,
    totalAmount: 3540.30
  }
];

// Helper function to get status badge styling
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending Approval":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">{status}</Badge>;
    case "Approved":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">{status}</Badge>;
    case "Exported":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100">{status}</Badge>;
    case "Paid":
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function PaymentRuns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);
  const [createBatchOpen, setCreateBatchOpen] = useState(false);
  const [viewBatchOpen, setViewBatchOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const { toast } = useToast();

  // Filter payment batches based on search query and status
  const filteredBatches = mockPaymentBatches.filter(batch => {
    const matchesSearch = 
      batch.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleInvoiceSelection = (invoiceId: string) => {
    setSelectedInvoices(prev => {
      if (prev.includes(invoiceId)) {
        return prev.filter(id => id !== invoiceId);
      } else {
        return [...prev, invoiceId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === availableInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(availableInvoices.map(invoice => invoice.id));
    }
  };

  const calculateSelectedTotal = () => {
    return availableInvoices
      .filter(invoice => selectedInvoices.includes(invoice.id))
      .reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  };

  const handleCreateBatch = () => {
    if (!paymentDate) {
      toast({
        title: "Missing payment date",
        description: "Please select a payment date for this batch",
        variant: "destructive"
      });
      return;
    }

    if (selectedInvoices.length === 0) {
      toast({
        title: "No invoices selected",
        description: "Please select at least one invoice to include in the batch",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Batch Created",
      description: `Batch with ${selectedInvoices.length} invoices totaling £${calculateSelectedTotal().toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})} has been created`,
      variant: "default"
    });

    // Reset form and close dialog
    setPaymentDate(undefined);
    setSelectedInvoices([]);
    setCreateBatchOpen(false);
  };

  const handleViewBatch = (batchId: string) => {
    setSelectedBatch(batchId);
    setViewBatchOpen(true);
  };

  const handleApproveBatch = (batchId: string) => {
    toast({
      title: "Batch Approved",
      description: `Payment batch ${batchId} has been approved`,
      variant: "default"
    });
  };

  const handleExportBatch = (batchId: string) => {
    toast({
      title: "Batch Exported",
      description: `Payment batch ${batchId} has been exported`,
      variant: "default"
    });
  };

  const handleMarkAsPaid = (batchId: string) => {
    toast({
      title: "Batch Marked as Paid",
      description: `Payment batch ${batchId} has been marked as paid`,
      variant: "default"
    });
  };

  return (
    <MainLayout title="Payment Runs">
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
            <h1 className="text-2xl font-semibold">Payment Runs</h1>
            <p className="text-muted-foreground mt-1">
              Prepare, approve and track batches of payments to carriers
            </p>
          </div>
          
          <Button onClick={() => setCreateBatchOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Prepare New Payment Run
          </Button>
        </div>

        {/* Filter card */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-auto">
                <InputWithIcon
                  placeholder="Search by batch ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-[250px]"
                  icon={Search}
                />
              </div>

              <div className="w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Exported">Exported</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment batches table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment Batches</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Total Amount (£)</TableHead>
                  <TableHead>No. of Invoices</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell className="font-medium">{batch.id}</TableCell>
                    <TableCell>{format(new Date(batch.creationDate), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(new Date(batch.paymentDate), "dd/MM/yyyy")}</TableCell>
                    <TableCell>£{batch.totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                    <TableCell>{batch.invoiceCount}</TableCell>
                    <TableCell>{getStatusBadge(batch.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="View Invoices" 
                          onClick={() => handleViewBatch(batch.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {batch.status === "Pending Approval" && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Approve Batch" 
                            onClick={() => handleApproveBatch(batch.id)}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        
                        {batch.status === "Approved" && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Export Batch" 
                            onClick={() => handleExportBatch(batch.id)}
                          >
                            <FileText className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                        
                        {(batch.status === "Approved" || batch.status === "Exported") && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Mark as Paid" 
                            onClick={() => handleMarkAsPaid(batch.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-purple-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBatches.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No payment batches found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modal for creating a new payment batch */}
        <Dialog open={createBatchOpen} onOpenChange={setCreateBatchOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Prepare New Payment Run</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Payment Date</p>
                  <p className="text-xs text-muted-foreground">
                    Select the date when this batch will be paid
                  </p>
                </div>
                
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {paymentDate ? format(paymentDate, "dd/MM/yyyy") : "Select payment date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={paymentDate}
                        onSelect={setPaymentDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">Available Approved Invoices</p>
                    <p className="text-sm text-muted-foreground">
                      Select invoices to include in this payment batch
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSelectAll}
                    >
                      {selectedInvoices.length === availableInvoices.length ? "Deselect All" : "Select All"}
                    </Button>
                    
                    <InputWithIcon
                      placeholder="Search invoices..."
                      className="w-[200px]"
                      icon={Search}
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Select</TableHead>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Net Amount (£)</TableHead>
                        <TableHead>VAT (£)</TableHead>
                        <TableHead>Total (£)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedInvoices.includes(invoice.id)}
                              onCheckedChange={() => handleInvoiceSelection(invoice.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.carrierName}</TableCell>
                          <TableCell>{format(new Date(invoice.dueDate), "dd/MM/yyyy")}</TableCell>
                          <TableCell>
                            £{invoice.amount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </TableCell>
                          <TableCell>
                            £{invoice.vatAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </TableCell>
                          <TableCell>
                            £{invoice.totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </TableCell>
                        </TableRow>
                      ))}
                      {availableInvoices.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No approved invoices available for payment
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Batch Summary</p>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Invoices Selected:</span>{" "}
                      <span className="font-medium">{selectedInvoices.length}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Total Amount:</span>{" "}
                      <span className="font-medium">
                        £{calculateSelectedTotal().toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setCreateBatchOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateBatch}>Create Payment Batch</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal for viewing an existing payment batch */}
        <Dialog open={viewBatchOpen} onOpenChange={setViewBatchOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Payment Batch: {selectedBatch}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-3">
                  <p className="text-xs text-muted-foreground">Payment Date</p>
                  <p className="font-medium">20/04/2025</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-xs text-muted-foreground">Total Invoices</p>
                  <p className="font-medium">6</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="font-medium">£22,322.10</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium mb-4">Invoices in Batch</p>
                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Net Amount (£)</TableHead>
                        <TableHead>VAT (£)</TableHead>
                        <TableHead>Total (£)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {batchInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.carrierName}</TableCell>
                          <TableCell>{format(new Date(invoice.dueDate), "dd/MM/yyyy")}</TableCell>
                          <TableCell>
                            £{invoice.amount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </TableCell>
                          <TableCell>
                            £{invoice.vatAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </TableCell>
                          <TableCell>
                            £{invoice.totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <div>
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-amber-500" />
                    <span className="text-sm">This batch is pending approval</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setViewBatchOpen(false)}>Close</Button>
                  <Button>Approve Batch</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}

