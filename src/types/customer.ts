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
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  creditLimit: number;
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
