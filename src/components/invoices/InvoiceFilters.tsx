
import React from "react";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Filter, Briefcase, PlusCircle, Search } from "lucide-react";

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
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <InputWithIcon
        placeholder="Search invoices..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-[300px] bg-aximo-darker border-aximo-border text-aximo-text"
        icon={Search}
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
          <Briefcase className="h-4 w-4" />
          <span className="hidden sm:inline">Create Job</span>
        </Button>
        <Button 
          className="gap-2 bg-aximo-primary hover:bg-aximo-primary/90"
          onClick={onCreateInvoice}
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">New Invoice</span>
        </Button>
      </div>
    </div>
  );
}
