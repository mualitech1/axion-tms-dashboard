
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Filter, PlusCircle, Search, Briefcase, Calendar, ArrowUpDown } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateInvoiceDialog } from "@/components/invoices/CreateInvoiceDialog";

// Mock invoice data
const invoices = [
  { 
    id: "INV-2023-156", 
    customer: "Globex Industries", 
    date: "2023-11-30", 
    dueDate: "2023-12-15", 
    amount: 7850, 
    status: "pending" 
  },
  { 
    id: "INV-2023-148", 
    customer: "Acme Corporation", 
    date: "2023-11-25", 
    dueDate: "2023-12-10", 
    amount: 5400, 
    status: "pending" 
  },
  { 
    id: "INV-2023-142", 
    customer: "Wayne Enterprises", 
    date: "2023-11-20", 
    dueDate: "2023-12-05", 
    amount: 12300, 
    status: "pending" 
  },
  { 
    id: "INV-2023-136", 
    customer: "Stark Industries", 
    date: "2023-11-15", 
    dueDate: "2023-11-30", 
    amount: 9600, 
    status: "paid" 
  },
  { 
    id: "INV-2023-128", 
    customer: "Umbrella Corporation", 
    date: "2023-11-10", 
    dueDate: "2023-11-25", 
    amount: 8300, 
    status: "paid" 
  },
  { 
    id: "INV-2023-124", 
    customer: "Oscorp Industries", 
    date: "2023-11-05", 
    dueDate: "2023-11-20", 
    amount: 6750, 
    status: "paid" 
  },
];

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobClient, setJobClient] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [invoicesList, setInvoicesList] = useState(invoices);
  const { toast } = useToast();
  
  const filteredInvoices = invoicesList
    .filter(invoice => 
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(invoice => {
      if (activeTab === "all") return true;
      if (activeTab === "pending") return invoice.status === "pending";
      if (activeTab === "paid") return invoice.status === "paid";
      return true;
    });

  const handleCreateJob = () => {
    // Simple validation
    if (!jobTitle.trim() || !jobClient.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here we would typically send the data to an API
    toast({
      title: "Job created",
      description: `Job '${jobTitle}' for ${jobClient} has been created successfully.`,
      variant: "default"
    });

    // Reset form and close dialog
    setJobTitle("");
    setJobClient("");
    setCreateJobOpen(false);
  };

  const handleInvoiceCreated = (newInvoice: any) => {
    // Add the new invoice to the list
    setInvoicesList(current => [newInvoice, ...current]);
  };

  // Calculate summary statistics
  const totalAmount = invoicesList.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoicesList
    .filter(inv => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoicesList
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <MainLayout title="Invoices">
      <DashboardHeader
        title="Invoices Management"
        subtitle="Track, manage, and create customer invoices"
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">{invoicesList.length}</span>
              </div>
              <span className="text-lg font-semibold">${totalAmount.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 12 months</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">{invoicesList.filter(inv => inv.status === "pending").length}</span>
              </div>
              <span className="text-lg font-semibold text-amber-500">${pendingAmount.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Outstanding amount</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">{invoicesList.filter(inv => inv.status === "paid").length}</span>
              </div>
              <span className="text-lg font-semibold text-green-500">${paidAmount.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Collected amount</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice Management</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Tabs 
              value={activeTab}
              onValueChange={setActiveTab}
              className="hidden sm:flex"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="sm:hidden w-full">
              <Select 
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <InputWithIcon
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[250px]"
              icon={Search}
            />
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                className="gap-1"
                onClick={() => setCreateJobOpen(true)}
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Create Job</span>
              </Button>
              <Button 
                className="gap-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => setCreateInvoiceOpen(true)}
              >
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">New Invoice</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-700">Invoice #</TableHead>
                  <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700 hidden md:table-cell">
                    <div className="flex items-center">
                      Issue Date
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 hidden lg:table-cell">
                    <div className="flex items-center">
                      Due Date
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    <div className="flex items-center">
                      Amount
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{invoice.customer}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-3.5 w-3.5 text-gray-500" />
                          {invoice.date}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-3.5 w-3.5 text-gray-500" />
                          {invoice.dueDate}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={`${
                          invoice.status === "paid" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}>
                          {invoice.status === "paid" ? "Paid" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                      No invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={createJobOpen} onOpenChange={setCreateJobOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="job-title" className="text-right">
                Job Title
              </Label>
              <Input
                id="job-title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter job title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">
                Client
              </Label>
              <Input
                id="client"
                value={jobClient}
                onChange={(e) => setJobClient(e.target.value)}
                className="col-span-3"
                placeholder="Enter client name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateJobOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateJob}>
              Create Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CreateInvoiceDialog 
        open={createInvoiceOpen}
        onOpenChange={setCreateInvoiceOpen}
        onInvoiceCreated={handleInvoiceCreated}
      />
    </MainLayout>
  );
}
