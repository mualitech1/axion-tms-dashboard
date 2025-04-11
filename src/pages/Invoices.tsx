
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceSummaryCards } from "@/components/invoices/InvoiceSummaryCards";
import { InvoiceStatusTabs } from "@/components/invoices/InvoiceStatusTabs";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { CreateJobDialog } from "@/components/invoices/CreateJobDialog";
import { CreateInvoiceDialog } from "@/components/invoices/CreateInvoiceDialog";
import { invoices as mockInvoices } from "@/components/invoices/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [invoicesList, setInvoicesList] = useState(mockInvoices);
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
            onCreateInvoice={() => setCreateInvoiceOpen(true)}
          />
          
          <InvoiceTable invoices={filteredInvoices} />
        </CardContent>
      </Card>

      <CreateJobDialog 
        open={createJobOpen}
        onOpenChange={setCreateJobOpen}
      />

      <CreateInvoiceDialog 
        open={createInvoiceOpen}
        onOpenChange={setCreateInvoiceOpen}
        onInvoiceCreated={handleInvoiceCreated}
      />
    </MainLayout>
  );
}
