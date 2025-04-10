import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, CheckCircle, Download, Eye, Filter, FileText, HelpCircle, Search, X } from "lucide-react";
import { DateRange } from "react-day-picker";

// Mock data for self-invoices
const mockSelfInvoices = [
  {
    id: "IKB-SINV-2025-0001",
    carrierName: "Fast Logistics Ltd",
    periodStart: "2025-04-01",
    periodEnd: "2025-04-30",
    generationDate: "2025-05-01",
    totalAmount: 4750.00,
    vatAmount: 950.00,
    status: "Pending Review"
  },
  {
    id: "IKB-SINV-2025-0002",
    carrierName: "Express Haulage Co",
    periodStart: "2025-04-01",
    periodEnd: "2025-04-30",
    generationDate: "2025-05-01",
    totalAmount: 6235.50,
    vatAmount: 1247.10,
    status: "Approved for Payment"
  },
  {
    id: "IKB-SINV-2025-0003",
    carrierName: "Reliable Freight Services",
    periodStart: "2025-04-01",
    periodEnd: "2025-04-30",
    generationDate: "2025-05-01",
    totalAmount: 3890.25,
    vatAmount: 778.05,
    status: "Payment Scheduled"
  },
  {
    id: "IKB-SINV-2025-0004",
    carrierName: "County Carriers Ltd",
    periodStart: "2025-04-01",
    periodEnd: "2025-04-30",
    generationDate: "2025-05-01",
    totalAmount: 5125.75,
    vatAmount: 1025.15,
    status: "Paid"
  },
  {
    id: "IKB-SINV-2025-0005",
    carrierName: "Swift Transport Solutions",
    periodStart: "2025-04-01",
    periodEnd: "2025-04-30",
    generationDate: "2025-05-01",
    totalAmount: 4100.00,
    vatAmount: 820.00,
    status: "Query Raised"
  },
  {
    id: "IKB-SINV-2025-0006",
    carrierName: "Horizon Haulage",
    periodStart: "2025-04-01",
    periodEnd: "2025-04-30",
    generationDate: "2025-05-01",
    totalAmount: 2980.50,
    vatAmount: 596.10,
    status: "On Hold"
  },
  {
    id: "IKB-SINV-2025-0007",
    carrierName: "Northern Logistics Ltd",
    periodStart: "2025-03-01", 
    periodEnd: "2025-03-31",
    generationDate: "2025-04-01",
    totalAmount: 5450.25,
    vatAmount: 1090.05,
    status: "Paid"
  },
];

// Mock data for jobs linked to an invoice
const mockLinkedJobs = [
  {
    jobRef: "IKB1234",
    jobDate: "2025-04-05",
    loadDetails: "Manchester, UK - London, UK",
    rate: 850.00,
    notes: "Curtain-side"
  },
  {
    jobRef: "IKB1245",
    jobDate: "2025-04-08",
    loadDetails: "Liverpool, UK - Birmingham, UK",
    rate: 720.00,
    notes: "Refrigerated"
  },
  {
    jobRef: "IKB1267",
    jobDate: "2025-04-12",
    loadDetails: "London, UK - Glasgow, UK",
    rate: 1240.00,
    notes: "Express delivery"
  },
  {
    jobRef: "IKB1289",
    jobDate: "2025-04-18",
    loadDetails: "Bristol, UK - Newcastle, UK",
    rate: 980.00,
    notes: "Hazardous materials"
  },
  {
    jobRef: "IKB1312",
    jobDate: "2025-04-22",
    loadDetails: "Edinburgh, UK - Cardiff, UK",
    rate: 1100.00,
    notes: "Oversized load"
  },
];

// Helper function to get status badge styling
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending Review":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">{status}</Badge>;
    case "Approved for Payment":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">{status}</Badge>;
    case "Payment Scheduled":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100">{status}</Badge>;
    case "Paid":
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">{status}</Badge>;
    case "Query Raised":
      return <Badge className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100">{status}</Badge>;
    case "On Hold":
      return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function CarrierSelfInvoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
  const { toast } = useToast();

  // Filter invoices based on search query and status
  const filteredInvoices = mockSelfInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      invoice.carrierName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || invoice.status === statusFilter;
    
    let matchesDate = true;
    if (dateRange.from && dateRange.to) {
      const invoiceStartDate = new Date(invoice.periodStart);
      const invoiceEndDate = new Date(invoice.periodEnd);
      matchesDate = 
        (invoiceStartDate >= dateRange.from && invoiceStartDate <= dateRange.to) ||
        (invoiceEndDate >= dateRange.from && invoiceEndDate <= dateRange.to);
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleViewJobs = (invoiceId: string) => {
    setSelectedInvoice(invoiceId);
    setIsJobsModalOpen(true);
  };

  const handleApprovePayment = (invoiceId: string) => {
    toast({
      title: "Invoice Approved",
      description: `Self-invoice ${invoiceId} has been approved for payment.`,
      variant: "default"
    });
  };

  const handleRaiseQuery = (invoiceId: string) => {
    toast({
      title: "Query Raised",
      description: `A query has been raised for self-invoice ${invoiceId}.`,
      variant: "default"
    });
  };

  const handleDownloadPdf = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading PDF for self-invoice ${invoiceId}.`,
      variant: "default"
    });
  };

  // Function to format the date range for display
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`;
    }
    return "Select date range";
  };

  return (
    <MainLayout title="Carrier Self-Invoices">
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
            <h1 className="text-2xl font-semibold">Carrier Self-Invoices</h1>
            <p className="text-muted-foreground mt-1">
              View and manage automatically generated self-billing statements for carriers
            </p>
          </div>
          
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate New Statement
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
                  placeholder="Search by invoice # or carrier"
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
                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                    <SelectItem value="Approved for Payment">Approved for Payment</SelectItem>
                    <SelectItem value="Payment Scheduled">Payment Scheduled</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Query Raised">Query Raised</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-[240px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateRange()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button variant="outline" size="icon" onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
                setDateRange({ from: undefined, to: undefined });
              }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Self-Invoice Statements</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>Generate New Statement</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Statement #</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Period Covered</TableHead>
                  <TableHead>Generation Date</TableHead>
                  <TableHead>Total Amount (£)</TableHead>
                  <TableHead>VAT (£)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.carrierName}</TableCell>
                    <TableCell>
                      {format(new Date(invoice.periodStart), "dd/MM/yyyy")} - {format(new Date(invoice.periodEnd), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{format(new Date(invoice.generationDate), "dd/MM/yyyy")}</TableCell>
                    <TableCell>£{invoice.totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                    <TableCell>£{invoice.vatAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="View Statement PDF" onClick={() => handleDownloadPdf(invoice.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {invoice.status === "Pending Review" && (
                          <Button variant="ghost" size="icon" title="Approve for Payment" onClick={() => handleApprovePayment(invoice.id)}>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="icon" title="Raise Query" onClick={() => handleRaiseQuery(invoice.id)}>
                          <HelpCircle className="h-4 w-4 text-amber-600" />
                        </Button>
                        
                        <Button variant="ghost" size="icon" title="View Linked Jobs" onClick={() => handleViewJobs(invoice.id)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="ghost" size="icon" title="Download PDF">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modal for viewing linked jobs */}
        <Dialog open={isJobsModalOpen} onOpenChange={setIsJobsModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Linked Jobs for Statement {selectedInvoice}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Ref</TableHead>
                    <TableHead>Job Date</TableHead>
                    <TableHead>Load Details</TableHead>
                    <TableHead>Rate (£)</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLinkedJobs.map((job) => (
                    <TableRow key={job.jobRef}>
                      <TableCell className="font-medium">
                        <Button variant="link" className="p-0" asChild>
                          <a href={`/jobs/${job.jobRef}`}>{job.jobRef}</a>
                        </Button>
                      </TableCell>
                      <TableCell>{job.jobDate}</TableCell>
                      <TableCell>{job.loadDetails}</TableCell>
                      <TableCell>£{job.rate.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                      <TableCell>{job.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Jobs: {mockLinkedJobs.length}</span>
                  <span>Total Value: £{mockLinkedJobs.reduce((sum, job) => sum + job.rate, 0).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
