
import { InvoiceItem } from "./hooks/useInvoiceForm";

export interface InvoiceData {
  id: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "pending" | "paid";
  notes?: string;
  items: InvoiceItem[];
}

export interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvoiceCreated: (invoice: InvoiceData) => void;
  onInvoiceUpdated?: (invoice: InvoiceData) => void;
  editInvoice?: InvoiceData | null;
}

export interface InvoiceFormContextType {
  form: any;
  handleItemChange: (index: number, field: string, value: string) => void;
  addInvoiceItem: () => void;
  removeInvoiceItem: (index: number) => void;
  calculateTotal: () => number;
  handlePaymentTermsChange: (value: string) => void;
  resetForm: () => void;
  setFormValues: (values: any) => void;
  isEditMode: boolean;
}
