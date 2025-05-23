import { InvoiceData } from "./create-invoice-dialog/types";

// Mock invoice data
export const invoices: InvoiceData[] = [
  { 
    id: "INV-2023-156", 
    customer: "Globex Industries", 
    date: "2023-11-30", 
    dueDate: "2023-12-15", 
    amount: 7850, 
    status: "pending",
    items: [{ description: "Consulting Services", quantity: "10", rate: "785", amount: "7850" }]
  },
  { 
    id: "INV-2023-148", 
    customer: "Acme Corporation", 
    date: "2023-11-25", 
    dueDate: "2023-12-10", 
    amount: 5400, 
    status: "pending",
    items: [{ description: "Web Development", quantity: "12", rate: "450", amount: "5400" }]
  },
  { 
    id: "INV-2023-142", 
    customer: "Wayne Enterprises", 
    date: "2023-11-20", 
    dueDate: "2023-12-05", 
    amount: 12300, 
    status: "pending",
    items: [{ description: "Security Services", quantity: "5", rate: "2460", amount: "12300" }]
  },
  { 
    id: "INV-2023-136", 
    customer: "Stark Industries", 
    date: "2023-11-15", 
    dueDate: "2023-11-30", 
    amount: 9600, 
    status: "paid",
    items: [{ description: "Technology Consulting", quantity: "16", rate: "600", amount: "9600" }]
  },
  { 
    id: "INV-2023-128", 
    customer: "Umbrella Corporation", 
    date: "2023-11-10", 
    dueDate: "2023-11-25", 
    amount: 8300, 
    status: "paid",
    items: [{ description: "Research Services", quantity: "8", rate: "1037.5", amount: "8300" }]
  },
  { 
    id: "INV-2023-124", 
    customer: "Oscorp Industries", 
    date: "2023-11-05", 
    dueDate: "2023-11-20", 
    amount: 6750, 
    status: "paid",
    items: [{ description: "Technical Support", quantity: "15", rate: "450", amount: "6750" }]
  },
];
