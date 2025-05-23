import React from "react";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Filter, Zap, Network, Search, FileText, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InvoiceFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateJob: () => void;
  onCreateInvoice: () => void;
}

export function InvoiceFilters({ 
  searchQuery, 
  setSearchQuery, 
  onCreateJob, 
  onCreateInvoice 
}: InvoiceFiltersProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <InputWithIcon
          placeholder="Search quantum transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-[300px] bg-aximo-darker border-aximo-border text-aximo-text"
          icon={<Search className="h-4 w-4" />}
        />
        <div className="flex gap-3 w-full sm:w-auto justify-end">
          <Button 
            variant="outline"
            size="icon"
            className="w-10 h-10 border-aximo-border hover:bg-aximo-primary/10"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            className="gap-2 border-aximo-border hover:bg-aximo-primary/10"
            onClick={onCreateJob}
          >
            <Network className="h-4 w-4" />
            <span className="hidden sm:inline">Create Operation</span>
          </Button>
          <Button 
            className="gap-2 bg-gradient-to-r from-aximo-primary to-aximo-light text-white hover:opacity-90"
            onClick={onCreateInvoice}
          >
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">New Transaction</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 w-full justify-end">
        <Button
          variant="outline"
          className="gap-2 border-aximo-border hover:bg-aximo-primary/10"
          onClick={() => navigate('/invoices/job-to-invoice')}
        >
          <FileText className="h-4 w-4" />
          <span>Job to Invoice</span>
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-aximo-border hover:bg-aximo-primary/10"
          onClick={() => navigate('/invoices/carrier-self-invoicing')}
        >
          <Truck className="h-4 w-4" />
          <span>Carrier Self-Invoicing</span>
        </Button>
      </div>
    </div>
  );
}
