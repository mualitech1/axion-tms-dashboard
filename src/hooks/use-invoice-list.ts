
import { useState } from "react";
import { InvoiceData } from "@/components/invoices/create-invoice-dialog/types";

export function useInvoiceList(initialInvoices: InvoiceData[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortColumn, setSortColumn] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortAndFilterInvoices = () => {
    let result = [...initialInvoices];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(invoice => 
        invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter(invoice => invoice.status === activeTab);
    }
    
    // Sort
    result.sort((a, b) => {
      let valueA: any = a[sortColumn as keyof InvoiceData];
      let valueB: any = b[sortColumn as keyof InvoiceData];
      
      // Handle numeric sorts
      if (sortColumn === "amount") {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }
      
      // String comparison
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      // Number comparison
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    });
    
    return result;
  };

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    sortColumn,
    sortDirection,
    handleSort,
    sortAndFilterInvoices
  };
}
