
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, PlusCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { PaymentRunsFilters } from "./components/PaymentRunsFilters";
import { PaymentRunsTable, PaymentBatch } from "./components/PaymentRunsTable";
import { CreateBatchModal } from "./components/CreateBatchModal";
import { ViewBatchModal } from "./components/ViewBatchModal";
import { mockPaymentBatches, availableInvoices, batchInvoices } from "./data/mockData";

export default function PaymentRunsPage() {
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

        {/* Filters component */}
        <PaymentRunsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Payment batches table */}
        <PaymentRunsTable
          filteredBatches={filteredBatches}
          onViewBatch={handleViewBatch}
          onApproveBatch={handleApproveBatch}
          onExportBatch={handleExportBatch}
          onMarkAsPaid={handleMarkAsPaid}
        />

        {/* Create batch modal */}
        <CreateBatchModal
          open={createBatchOpen}
          onOpenChange={setCreateBatchOpen}
          paymentDate={paymentDate}
          setPaymentDate={setPaymentDate}
          availableInvoices={availableInvoices}
          selectedInvoices={selectedInvoices}
          onInvoiceSelection={handleInvoiceSelection}
          onSelectAll={handleSelectAll}
          calculateSelectedTotal={calculateSelectedTotal}
          onCreateBatch={handleCreateBatch}
        />

        {/* View batch modal */}
        <ViewBatchModal
          open={viewBatchOpen}
          onOpenChange={setViewBatchOpen}
          selectedBatch={selectedBatch}
          batchInvoices={batchInvoices}
          onApproveBatch={() => {
            if (selectedBatch) {
              handleApproveBatch(selectedBatch);
              setViewBatchOpen(false);
            }
          }}
        />
      </div>
    </MainLayout>
  );
}
