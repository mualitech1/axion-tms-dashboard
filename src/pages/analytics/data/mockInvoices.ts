
import { InvoiceData } from '@/components/invoices/create-invoice-dialog/types';

// Mock invoice data for the demo
export const mockInvoices: InvoiceData[] = [
  { 
    id: "INV-001", 
    customer: 'Acme Corp', 
    date: '2023-04-05', 
    dueDate: '2023-04-20', 
    amount: 2500, 
    status: 'paid',
    items: [{ description: "Consulting Services", quantity: "5", rate: "500", amount: "2500" }]
  },
  { 
    id: "INV-002", 
    customer: 'Globex', 
    date: '2023-04-12', 
    dueDate: '2023-04-27', 
    amount: 1750, 
    status: 'paid',
    items: [{ description: "Web Development", quantity: "5", rate: "350", amount: "1750" }]
  },
  { 
    id: "INV-003", 
    customer: 'Stark Industries', 
    date: '2023-04-18', 
    dueDate: '2023-05-03', 
    amount: 3200, 
    status: 'pending',
    items: [{ description: "Technical Support", quantity: "8", rate: "400", amount: "3200" }]
  },
  { 
    id: "INV-004", 
    customer: 'Wayne Enterprises', 
    date: '2023-04-25', 
    dueDate: '2023-05-10', 
    amount: 4100, 
    status: 'paid',
    items: [{ description: "Security Systems", quantity: "1", rate: "4100", amount: "4100" }]
  },
  { 
    id: "INV-005", 
    customer: 'Oscorp', 
    date: '2023-05-03', 
    dueDate: '2023-05-18', 
    amount: 2800, 
    status: 'pending',
    items: [{ description: "Research Services", quantity: "4", rate: "700", amount: "2800" }]
  },
  { 
    id: "INV-006", 
    customer: 'Umbrella Corp', 
    date: '2023-05-10', 
    dueDate: '2023-05-25', 
    amount: 1950, 
    status: 'paid',
    items: [{ description: "Laboratory Equipment", quantity: "3", rate: "650", amount: "1950" }]
  },
  { 
    id: "INV-007", 
    customer: 'LexCorp', 
    date: '2023-05-17', 
    dueDate: '2023-06-01', 
    amount: 3600, 
    status: 'paid',
    items: [{ description: "Data Analysis", quantity: "12", rate: "300", amount: "3600" }]
  },
  { 
    id: "INV-008", 
    customer: 'Cyberdyne Systems', 
    date: '2023-05-24', 
    dueDate: '2023-06-08', 
    amount: 2250, 
    status: 'pending',
    items: [{ description: "AI Implementation", quantity: "1", rate: "2250", amount: "2250" }]
  },
  { 
    id: "INV-009", 
    customer: 'Massive Dynamic', 
    date: '2023-06-01', 
    dueDate: '2023-06-16', 
    amount: 4300, 
    status: 'paid',
    items: [{ description: "Advanced Technology", quantity: "2", rate: "2150", amount: "4300" }]
  },
  { 
    id: "INV-010", 
    customer: 'Soylent Corp', 
    date: '2023-06-08', 
    dueDate: '2023-06-23', 
    amount: 1850, 
    status: 'pending',
    items: [{ description: "Food Processing", quantity: "1", rate: "1850", amount: "1850" }]
  },
];
