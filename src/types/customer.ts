
export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'terms' | 'rate_card' | 'invoice' | 'pod' | 'other';
  dateUploaded: string;
  expiryDate?: string;
  filePath: string;
  fileSize: string;
}

export interface RateCard {
  id: string;
  name: string;
  dateCreated: string;
  validFrom: string;
  validTo: string;
  status: 'active' | 'pending' | 'expired';
}

export interface JobRecord {
  id: string;
  reference: string;
  date: string;
  from: string;
  to: string;
  status: string;
  value: number;
}

export interface Customer {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  creditLimit: number;
  lastOrder: string;
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
