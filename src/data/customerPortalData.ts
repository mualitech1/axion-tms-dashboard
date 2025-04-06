
import { Customer, Document } from '@/types/customer';
import { isDocumentExpiringSoon } from '@/utils/documentUtils';

// Set current date to match document expiry dates for demo purposes
const currentDate = new Date('2023-12-15');

// Override Date constructor for demo purposes using window instead of global
const OriginalDate = Date;
window.Date = class extends OriginalDate {
  constructor(...args: any[]) {
    if (args.length === 0) {
      super(currentDate);
    } else if (args.length === 1) {
      super(args[0]);
    } else {
      super(...args);
    }
  }
};

// Mock data for the customer portal
export const customerPortalData: Customer = {
  id: 1001,
  name: "Acme Logistics Ltd",
  contact: "Jane Smith",
  email: "jane@acmelogistics.com",
  phone: "+44 7700 900123",
  status: "Active",
  creditLimit: 50000,
  lastOrder: "2023-04-01",
  documents: [
    { 
      id: "1", 
      name: "Insurance Certificate", 
      type: "contract" as const, 
      dateUploaded: "2023-01-15", 
      expiryDate: "2023-12-31",
      filePath: "/documents/insurance.pdf",
      fileSize: "1.2 MB"
    },
    { 
      id: "2", 
      name: "VAT Registration", 
      type: "terms" as const, 
      dateUploaded: "2023-02-20", 
      expiryDate: "2024-02-20",
      filePath: "/documents/vat.pdf",
      fileSize: "0.8 MB"
    },
    { 
      id: "3", 
      name: "Terms Agreement", 
      type: "terms" as const, 
      dateUploaded: "2023-03-01", 
      expiryDate: null,
      filePath: "/documents/terms.docx",
      fileSize: "0.5 MB"
    }
  ],
  jobs: [
    { id: "JOB-1001", reference: "DEL-5678", from: "London", to: "Manchester", value: 1250, date: "2023-03-28", status: "Completed" },
    { id: "JOB-1002", reference: "DEL-5679", from: "Birmingham", to: "Leeds", value: 950, date: "2023-03-15", status: "Completed" },
    { id: "JOB-1003", reference: "DEL-5680", from: "Glasgow", to: "Edinburgh", value: 650, date: "2023-03-10", status: "Completed" }
  ],
  address: {
    street: "123 Logistics Way",
    city: "Birmingham",
    postcode: "B1 1AA",
    country: "United Kingdom"
  }
};

// Helper function to check if documents are expiring soon
export const hasExpiringDocuments = (customer: Customer): boolean => {
  return customer.documents?.some(doc => isDocumentExpiringSoon(doc)) || false;
};

// Get document counts by status
export const getDocumentCounts = (customer: Customer): {
  total: number;
  expired: number;
  expiringSoon: number;
  valid: number;
} => {
  const documents = customer.documents || [];
  const expired = documents.filter(doc => 
    doc.expiryDate && new Date(doc.expiryDate) < new Date()
  ).length;
  
  const expiringSoon = documents.filter(doc => 
    isDocumentExpiringSoon(doc) && 
    !(doc.expiryDate && new Date(doc.expiryDate) < new Date())
  ).length;
  
  const valid = documents.length - expired - expiringSoon;
  
  return {
    total: documents.length,
    expired,
    expiringSoon,
    valid
  };
};
