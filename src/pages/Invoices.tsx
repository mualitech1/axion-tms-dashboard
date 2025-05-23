import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { BarChart3, Zap, Network } from "lucide-react";
import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

// Import the CreateInvoicePage
import CreateInvoicePage from "./invoices/CreateInvoicePage";
import InvoiceDetails from "./invoices/InvoiceDetails";
import { JobToInvoiceConverter } from "@/components/invoices/JobToInvoiceConverter";
import CarrierSelfInvoicingPage from "./invoices/CarrierSelfInvoicingPage";

// Main component that handles routing
export default function Invoices() {
  return (
    <Routes>
      <Route path="/" element={<InvoicesListing />} />
      <Route path="/new" element={<CreateInvoicePage />} />
      <Route path="/:invoiceId" element={<InvoiceDetails />} />
      <Route path="/job-to-invoice" element={<JobToInvoiceConverter />} />
      <Route path="/carrier-self-invoicing" element={<CarrierSelfInvoicingPage />} />
    </Routes>
  );
}

// The original invoices listing component
function InvoicesListing() {
  const [invoicesList, setInvoicesList] = useState<InvoiceData[]>(mockInvoices);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const navigate = useNavigate();

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
    { label: "Quantum Hub", path: "/" },
    { label: "Financial Matrix", path: "/invoices" }
  ];

  // Modified handler to use router navigation instead of dialog
  const handleCreateInvoice = () => {
    navigate('/invoices/new');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border"
      >
        <Breadcrumb items={breadcrumbItems} />
        <DashboardHeader
          title="Quantum Financial Matrix"
          subtitle="Manage energy transactions and value exchange across the quantum network"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <InvoiceSummaryCards
          totals={{
            all: totalAmount,
            pending: pendingAmount,
            paid: paidAmount
          }}
        />
      </motion.div>
      
      <Sheet>
        <div className="mb-6 flex justify-end">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10 transition-all shadow-sm"
              onClick={() => setShowAnalytics(true)}
            >
              <Network className="h-4 w-4" />
              <span>Quantum Analytics</span>
            </Button>
          </SheetTrigger>
        </div>
        
        <SheetContent className="w-[90%] sm:max-w-[800px] overflow-y-auto custom-scrollbar bg-aximo-darker border-l border-aximo-border">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl text-aximo-text">Financial Entanglement Patterns</SheetTitle>
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
              <h2 className="text-xl font-semibold text-aximo-text">Quantum Transaction Matrix</h2>
              <InvoiceStatusTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            <InvoiceFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCreateJob={() => setCreateJobOpen(true)}
              onCreateInvoice={handleCreateInvoice}
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
    </div>
  );
}
