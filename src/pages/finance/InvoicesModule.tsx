import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useInvoices } from "@/hooks/use-invoices";
import { useInvoiceList } from "@/hooks/use-invoice-list";
import { useInvoiceActions } from "@/hooks/use-invoice-actions";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Network, Plus, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

// Data adapter to transform Supabase invoice data to InvoiceData format
function transformSupabaseToInvoiceData(supabaseInvoices: any): InvoiceData[] {
  if (!supabaseInvoices || !Array.isArray(supabaseInvoices)) {
    return [];
  }

  return supabaseInvoices.map((invoice: any) => ({
    id: invoice.id,
    customer: invoice.customer?.company_name || "Unknown Customer",
    date: invoice.invoice_date || invoice.created_at,
    dueDate: invoice.due_date || invoice.invoice_date,
    amount: invoice.total_amount_gbp || 0,
    status: (invoice.status?.toLowerCase() === "paid" ? "paid" : "pending") as "pending" | "paid",
    notes: invoice.notes || "",
    items: (invoice.invoice_line_items || []).map((item: any) => ({
      description: item.description || "",
      quantity: String(item.quantity || 1),
      rate: String(item.unit_price_gbp || 0),
      amount: String(item.line_total_gbp || 0)
    }))
  }));
}

/**
 * 🧾 QUANTUM INVOICES MODULE - ENHANCED INVOICE MANAGEMENT
 * 
 * Professional invoice creation, management, and tracking
 * Features auto-calculations, PDF export, and payment status tracking
 * 
 * SPACETOON PRODUCTION QUALITY! 🔥⚡
 */
export default function InvoicesModule() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const navigate = useNavigate();

  // Use real Supabase data
  const { invoices: supabaseInvoices, isLoading } = useInvoices();
  
  // Transform Supabase data to InvoiceData format
  const invoicesList = transformSupabaseToInvoiceData(supabaseInvoices);

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
  } = useInvoiceActions(() => {}); // Empty setter since we're using real data

  const filteredInvoices = sortAndFilterInvoices();

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Network className="h-12 w-12 mx-auto mb-4 text-aximo-primary animate-pulse" />
              <h3 className="text-lg font-medium text-aximo-text">Synchronizing Quantum Invoice Matrix...</h3>
              <p className="text-aximo-text-secondary">Entangling transaction patterns</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = invoicesList.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoicesList
    .filter(inv => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoicesList
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const breadcrumbItems = [
    { label: "Quantum Hub", path: "/" },
    { label: "Financial Matrix", path: "/finance" },
    { label: "Quantum Invoices", path: "/finance/invoices" }
  ];

  // Enhanced handler for creating invoices
  const handleCreateInvoice = () => {
    navigate('/finance/invoices/new');
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
        <div className="flex items-center justify-between">
          <DashboardHeader
            title="Quantum Invoice Matrix"
            subtitle="Professional invoice creation with auto-calculations and quantum-level precision"
          />
          <Button 
            onClick={handleCreateInvoice}
            className="bg-gradient-to-r from-aximo-primary to-purple-600 hover:from-aximo-primary/90 hover:to-purple-700 shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Quantum Invoice
          </Button>
        </div>
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
              <BarChart3 className="h-4 w-4" />
              <span>Financial Analytics</span>
            </Button>
          </SheetTrigger>
        </div>
        
        <SheetContent className="w-[90%] sm:max-w-[800px] overflow-y-auto custom-scrollbar bg-aximo-darker border-l border-aximo-border">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl text-aximo-text">Quantum Financial Entanglement Patterns</SheetTitle>
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