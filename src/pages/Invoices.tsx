
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceSummaryCards } from "@/components/invoices/InvoiceSummaryCards";
import { InvoiceStatusTabs } from "@/components/invoices/InvoiceStatusTabs";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { InvoiceAnalytics } from "@/components/invoices/InvoiceAnalytics";
import { CreateJobDialog } from "@/components/invoices/CreateJobDialog";
import { CreateInvoiceDialog, InvoiceData } from "@/components/invoices/create-invoice-dialog/CreateInvoiceDialog";
import { invoices as mockInvoices } from "@/components/invoices/mockData";
import { useToast } from "@/hooks/use-toast";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [invoicesList, setInvoicesList] = useState<InvoiceData[]>(mockInvoices);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceData | null>(null);
  const [sortColumn, setSortColumn] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { toast } = useToast();
  
  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  
  // Apply sorting and filtering
  const sortAndFilterInvoices = () => {
    let result = [...invoicesList];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(invoice => 
        invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter(invoice => invoice.status === activeTab);
    }
    
    // Sort
    result.sort((a, b) => {
      let valueA: any = a[sortColumn as keyof InvoiceData];
      let valueB: any = b[sortColumn as keyof InvoiceData];
      
      // Handle numeric sorts
      if (sortColumn === "amount") {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }
      
      // String comparison
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      // Number comparison
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    });
    
    return result;
  };
  
  const filteredInvoices = sortAndFilterInvoices();

  const handleInvoiceCreated = (newInvoice: InvoiceData) => {
    // Add the new invoice to the list
    setInvoicesList(current => [newInvoice, ...current]);
    
    toast({
      title: "Invoice created",
      description: `Invoice ${newInvoice.id} has been created successfully.`,
    });
  };
  
  const handleInvoiceUpdated = (updatedInvoice: InvoiceData) => {
    // Update the invoice in the list
    setInvoicesList(current => 
      current.map(invoice => 
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
    
    toast({
      title: "Invoice updated",
      description: `Invoice ${updatedInvoice.id} has been updated successfully.`,
    });
  };
  
  const handleInvoiceDeleted = (id: string) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoicesList(current => current.filter(invoice => invoice.id !== id));
      
      toast({
        title: "Invoice deleted",
        description: `Invoice ${id} has been deleted successfully.`,
      });
    }
  };
  
  const handleStatusChange = (id: string, newStatus: "pending" | "paid") => {
    setInvoicesList(current => 
      current.map(invoice => {
        if (invoice.id === id) {
          return { ...invoice, status: newStatus };
        }
        return invoice;
      })
    );
    
    toast({
      title: `Invoice marked as ${newStatus}`,
      description: `Invoice ${id} has been updated to ${newStatus}.`,
    });
  };
  
  const handleEditInvoice = (invoice: InvoiceData) => {
    setEditingInvoice(invoice);
    setCreateInvoiceOpen(true);
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

      <InvoiceSummaryCards
        invoices={invoicesList}
        totalAmount={totalAmount}
        pendingAmount={pendingAmount}
        paidAmount={paidAmount}
      />
      
      <Sheet>
        <div className="mb-6 flex justify-end">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowAnalytics(true)}
            >
              <BarChart3 className="h-4 w-4" />
              <span>View Analytics</span>
            </Button>
          </SheetTrigger>
        </div>
        
        <SheetContent className="w-[90%] sm:max-w-[800px] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl">Invoice Analytics</SheetTitle>
          </SheetHeader>
          <InvoiceAnalytics invoices={invoicesList} />
        </SheetContent>
      </Sheet>
      
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice Management</CardTitle>
          <InvoiceStatusTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </CardHeader>

        <CardContent>
          <InvoiceFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onCreateJob={() => setCreateJobOpen(true)}
            onCreateInvoice={() => {
              setEditingInvoice(null);
              setCreateInvoiceOpen(true);
            }}
          />
          
          <InvoiceTable 
            invoices={filteredInvoices}
            onEditInvoice={handleEditInvoice}
            onDeleteInvoice={handleInvoiceDeleted}
            onStatusChange={handleStatusChange}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </CardContent>
      </Card>

      <CreateJobDialog 
        open={createJobOpen}
        onOpenChange={setCreateJobOpen}
      />

      <CreateInvoiceDialog 
        open={createInvoiceOpen}
        onOpenChange={(isOpen) => {
          setCreateInvoiceOpen(isOpen);
          if (!isOpen) {
            setEditingInvoice(null);
          }
        }}
        onInvoiceCreated={handleInvoiceCreated}
        onInvoiceUpdated={handleInvoiceUpdated}
        editInvoice={editingInvoice}
      />
    </MainLayout>
  );
}
