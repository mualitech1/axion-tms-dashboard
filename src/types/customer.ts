import { VerificationStatus } from '@/utils/documents/documentVerification';

export interface ContactPerson {
  id: string; // Text format ID (previously UUID)
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
}

export interface Document {
  id: string; // Text format ID (previously UUID)
  name: string;
  type: 'contract' | 'terms' | 'rate_card' | 'invoice' | 'pod' | 'insurance' | 'insurance_git' | 'insurance_fleet' | 'license' | 'other';
  dateUploaded: string;
  expiryDate?: string;
  filePath: string;
  fileSize: string;
  verificationStatus?: VerificationStatus;
}

export interface RateCard {
  id: string; // Text format ID (previously UUID)
  name: string;
  dateCreated: string;
  validFrom: string;
  validTo: string;
  status: 'active' | 'pending' | 'expired';
  notes?: string;
}

export interface JobRecord {
  id: string; // Text format ID (previously UUID)
  reference: string;
  date: string;
  from: string;
  to: string;
  status: string;
  value: number;
}

export interface Customer {
  id: string; // Text format ID (previously UUID)
  company_name: string;
  status: string;
  currency_type?: string;
  credit_limit_gbp?: number;
  billing_cycle_agreement?: string;
  restrictions_limitations?: string;
  overdue_invoice_reminder_days?: number;
  main_address?: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  finance_contact?: {
    name: string;
    email: string;
    phone: string;
  };
  operations_contact?: {
    name: string;
    email: string;
    phone: string;
  };
  pod_agreement_contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  banking_details?: {
    bank_name?: string;
    account_name?: string;
    sort_code?: string;
    account_number?: string;
    iban?: string;
  };
  created_at?: string;
  updated_at?: string;
  
  // Legacy fields for backward compatibility
  name?: string;
  contact?: string;
  email?: string;
  phone?: string;
  creditLimit?: number;
  lastOrder?: string;
  createdAt?: string;
  address?: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  contacts?: ContactPerson[];
  documents?: Document[];
  rateCards?: RateCard[];
  jobs?: JobRecord[];
  acceptedTerms?: boolean;
  notes?: string;
}
