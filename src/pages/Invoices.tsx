
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceSummaryCards } from "@/components/invoices/InvoiceSummaryCards";
import { InvoiceStatusTabs } from "@/components/invoices/InvoiceStatusTabs";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { CreateJobDialog } from "@/components/invoices/CreateJobDialog";
import { CreateInvoiceDialog, InvoiceData } from "@/components/invoices/create-invoice-dialog/CreateInvoiceDialog";
import { invoices as mockInvoices } from "@/components/invoices/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [invoicesList, setInvoicesList] = useState<InvoiceData[]>(mockInvoices);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceData | null>(null);
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

  const handleInvoiceCreated = (newInvoice: InvoiceData) => {
    // Add the new invoice to the list
    setInvoicesList(current => [newInvoice, ...current]);
  };
  
  const handleInvoiceUpdated = (updatedInvoice: InvoiceData) => {
    // Update the invoice in the list
    setInvoicesList(current => 
      current.map(invoice => 
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
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
