
import { useState } from "react";

interface InvoiceItem {
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

interface InvoiceDetails {
  customer: string;
  amount: string;
  issueDate: string;
  dueDate: string;
  notes: string;
  items: InvoiceItem[];
  paymentTerms: string;
}

export function useInvoiceForm() {
  // Helper functions for dates
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getDefaultDueDate() {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15); // Default to 15 days from now
    return dueDate.toISOString().split('T')[0];
  }

  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
    customer: "",
    amount: "",
    issueDate: getTodayDate(),
    dueDate: getDefaultDueDate(),
    notes: "",
    items: [{ description: "", quantity: "1", rate: "", amount: "0" }],
    paymentTerms: "net15",
  });

  const handleCustomerChange = (value: string) => {
    setInvoiceDetails(prev => ({ ...prev, customer: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...invoiceDetails.items];
    
    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: value 
    };
    
    // Calculate amount if we have both quantity and rate
    if ((field === 'quantity' || field === 'rate') && 
        updatedItems[index].quantity && 
        updatedItems[index].rate) {
      const quantity = parseFloat(updatedItems[index].quantity);
      const rate = parseFloat(updatedItems[index].rate);
      updatedItems[index].amount = (quantity * rate).toFixed(2);
    }
    
    setInvoiceDetails(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addInvoiceItem = () => {
    setInvoiceDetails(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: "1", rate: "", amount: "0" }]
    }));
  };

  const removeInvoiceItem = (index: number) => {
    if (invoiceDetails.items.length > 1) {
      const updatedItems = [...invoiceDetails.items];
      updatedItems.splice(index, 1);
      setInvoiceDetails(prev => ({
        ...prev,
        items: updatedItems
      }));
    }
  };

  const calculateTotal = () => {
    return invoiceDetails.items.reduce((sum, item) => {
      return sum + parseFloat(item.amount || "0");
    }, 0);
  };

  const handlePaymentTermsChange = (value: string) => {
    let newDueDate = new Date(invoiceDetails.issueDate);
    
    switch(value) {
      case "net15":
        newDueDate.setDate(newDueDate.getDate() + 15);
        break;
      case "net30":
        newDueDate.setDate(newDueDate.getDate() + 30);
        break;
      case "net60":
        newDueDate.setDate(newDueDate.getDate() + 60);
        break;
    }
    
    setInvoiceDetails(prev => ({
      ...prev,
      paymentTerms: value,
      dueDate: newDueDate.toISOString().split('T')[0]
    }));
  };

  const resetForm = () => {
    setInvoiceDetails({
      customer: "",
      amount: "",
      issueDate: getTodayDate(),
      dueDate: getDefaultDueDate(),
      notes: "",
      items: [{ description: "", quantity: "1", rate: "", amount: "0" }],
      paymentTerms: "net15",
    });
  };

  return {
    invoiceDetails,
    handleCustomerChange,
    handleInputChange,
    handleItemChange,
    addInvoiceItem,
    removeInvoiceItem,
    calculateTotal,
    handlePaymentTermsChange,
    resetForm
  };
}
