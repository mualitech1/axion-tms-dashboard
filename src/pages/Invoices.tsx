
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
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
import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

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

  const totalAmount = invoicesList.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoicesList
    .filter(inv => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoicesList
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const breadcrumbItems = [
    { label: "Dashboard", path: "/" },
    { label: "Invoices", path: "/invoices" }
  ];

  return (
    <MainLayout title="Invoices">
      <div className="space-y-6 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-aximo-primary/10 to-transparent p-6 rounded-lg border border-aximo-border"
        >
          <Breadcrumb items={breadcrumbItems} />
          <DashboardHeader
            title="Invoices Management"
            subtitle="Track, manage, and create customer invoices"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <InvoiceSummaryCards
            invoices={invoicesList}
            totalAmount={totalAmount}
            pendingAmount={pendingAmount}
            paidAmount={paidAmount}
          />
        </motion.div>
        
        <Sheet>
          <div className="mb-6 flex justify-end">
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 hover:bg-aximo-primary/10 transition-all shadow-sm"
                onClick={() => setShowAnalytics(true)}
              >
                <BarChart3 className="h-4 w-4" />
                <span>View Analytics</span>
              </Button>
            </SheetTrigger>
          </div>
          
          <SheetContent className="w-[90%] sm:max-w-[800px] overflow-y-auto custom-scrollbar bg-aximo-darker border-l border-aximo-border">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl text-aximo-text">Invoice Analytics</SheetTitle>
            </SheetHeader>
            <InvoiceAnalytics invoices={invoicesList} />
          </SheetContent>
        </Sheet>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-aximo-card border-aximo-border shadow-aximo">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-aximo-text">Invoice Management</h2>
                <InvoiceStatusTabs 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>

              <InvoiceFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onCreateJob={() => setCreateJobOpen(true)}
                onCreateInvoice={() => {
                  handleEditInvoice(null);
                  setCreateDialogOpen(true);
                }}
              />
              
              <div className="overflow-x-auto custom-scrollbar">
                <InvoiceTable 
                  invoices={filteredInvoices}
                  onEditInvoice={handleEditInvoice}
                  onDeleteInvoice={handleInvoiceDeleted}
                  onStatusChange={handleStatusChange}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <CreateJobDialog 
        open={createJobOpen}
        onOpenChange={setCreateJobOpen}
      />

      <CreateInvoiceDialog 
        open={createDialogOpen}
        onOpenChange={(isOpen) => {
          setCreateDialogOpen(isOpen);
          if (!isOpen) {
            handleEditInvoice(null);
          }
        }}
        onInvoiceCreated={handleInvoiceCreated}
        onInvoiceUpdated={handleInvoiceUpdated}
        editInvoice={editingInvoice}
      />
    </MainLayout>
  );
}
