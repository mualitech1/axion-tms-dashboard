
import React from "react";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Filter, Briefcase, PlusCircle, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
      <InputWithIcon
        placeholder="Search invoices..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-[250px]"
        icon={Search}
      />
      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline"
          className="gap-1"
          onClick={onCreateJob}
        >
          <Briefcase className="h-4 w-4" />
          <span className="hidden sm:inline">Create Job</span>
        </Button>
        <Button 
          className="gap-1 bg-blue-600 hover:bg-blue-700"
          onClick={onCreateInvoice}
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">New Invoice</span>
        </Button>
      </div>
    </div>
  );
}
