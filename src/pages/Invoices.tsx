
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceSummaryCards } from "@/components/invoices/InvoiceSummaryCards";
import { InvoiceStatusTabs } from "@/components/invoices/InvoiceStatusTabs";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { InvoiceAnalytics } from "@/components/invoices/InvoiceAnalytics";
import { CreateJobDialog } from "@/components/invoices/CreateJobDialog";
import { CreateInvoiceDialog } from "@/components/invoices/create-invoice-dialog/CreateInvoiceDialog";
import { InvoiceData } from "@/components/invoices/create-invoice-dialog/types";
import { invoices as mockInvoices } from "@/components/invoices/mockData";
import { useInvoiceList } from "@/hooks/use-invoice-list";
import { useInvoiceActions } from "@/hooks/use-invoice-actions";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function Invoices() {
  const [invoicesList, setInvoicesList] = useState<InvoiceData[]>(mockInvoices);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    sortColumn,
    sortDirection,
    handleSort,
    sortAndFilterInvoices
  } = useInvoiceList(invoicesList);

  const {
    editingInvoice,
    createDialogOpen,
    createJobOpen,
    setCreateDialogOpen,
    setCreateJobOpen,
    handleInvoiceCreated,
    handleInvoiceUpdated,
    handleInvoiceDeleted,
    handleStatusChange,
    handleEditInvoice,
  } = useInvoiceActions(setInvoicesList);

  const filteredInvoices = sortAndFilterInvoices();

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
              setCreateDialogOpen(true);
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
        open={createDialogOpen}
        onOpenChange={(isOpen) => {
          setCreateDialogOpen(isOpen);
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
