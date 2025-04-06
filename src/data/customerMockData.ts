
import { Customer } from '@/types/customer';

// Enhanced mock data for customers
export const customerData: Customer[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    contact: 'John Smith',
    email: 'john@acmecorp.com',
    phone: '+44 1234 567890',
    status: 'Active',
    creditLimit: 25000,
    lastOrder: '2023-06-15',
    address: {
      street: '123 Main Street',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom'
    },
    contacts: [
      {
        id: '1-1',
        name: 'John Smith',
        role: 'Primary',
        email: 'john@acmecorp.com',
        phone: '+44 1234 567890',
        isPrimary: true
      },
      {
        id: '1-2',
        name: 'Sarah Johnson',
        role: 'Invoice',
        email: 'sarah@acmecorp.com',
        phone: '+44 1234 567891'
      },
      {
        id: '1-3',
        name: 'Robert Brown',
        role: 'Operations',
        email: 'robert@acmecorp.com',
        phone: '+44 1234 567892'
      }
    ],
    documents: [
      {
        id: '1-1',
        name: 'Terms and Conditions',
        type: 'terms',
        dateUploaded: '2023-01-15',
        expiryDate: '2024-01-15',
        filePath: '/documents/acme-terms.pdf',
        fileSize: '1.2 MB'
      },
      {
        id: '1-2',
        name: 'Service Contract',
        type: 'contract',
        dateUploaded: '2023-01-20',
        expiryDate: '2024-01-20',
        filePath: '/documents/acme-contract.pdf',
        fileSize: '2.5 MB'
      }
    ],
    rateCards: [
      {
        id: '1-1',
        name: 'Standard Rate Card 2023',
        dateCreated: '2023-01-01',
        validFrom: '2023-01-01',
        validTo: '2023-12-31',
        status: 'active'
      }
    ],
    jobs: [
      {
        id: '1-1',
        reference: 'JOB-2023-001',
        date: '2023-06-15',
        from: 'London',
        to: 'Manchester',
        status: 'Completed',
        value: 1250
      },
      {
        id: '1-2',
        reference: 'JOB-2023-002',
        date: '2023-05-22',
        from: 'Birmingham',
        to: 'London',
        status: 'Completed',
        value: 950
      }
    ],
    acceptedTerms: true,
    notes: 'Key account with regular shipments to Manchester.'
  },
  {
    id: 2,
    name: 'Globex Industries',
    contact: 'Jane Cooper',
    email: 'jane@globex.com',
    phone: '+44 2345 678901',
    status: 'Active',
    creditLimit: 15000,
    lastOrder: '2023-06-02',
    contacts: [
      {
        id: '2-1',
        name: 'Jane Cooper',
        role: 'Primary',
        email: 'jane@globex.com',
        phone: '+44 2345 678901',
        isPrimary: true
      }
    ],
    jobs: [
      {
        id: '2-1',
        reference: 'JOB-2023-015',
        date: '2023-06-02',
        from: 'Liverpool',
        to: 'Leeds',
        status: 'Completed',
        value: 875
      }
    ]
  },
  {
    id: 3,
    name: 'Wayne Enterprises',
    contact: 'Bruce Wayne',
    email: 'bruce@wayne.com',
    phone: '+44 3456 789012',
    status: 'Active',
    creditLimit: 50000,
    lastOrder: '2023-05-28',
  },
  {
    id: 4,
    name: 'Stark Industries',
    contact: 'Tony Stark',
    email: 'tony@stark.com',
    phone: '+44 4567 890123',
    status: 'On Hold',
    creditLimit: 30000,
    lastOrder: '2023-05-20',
  },
  {
    id: 5,
    name: 'Daily Planet',
    contact: 'Clark Kent',
    email: 'clark@dailyplanet.com',
    phone: '+44 5678 901234',
    status: 'Inactive',
    creditLimit: 10000,
    lastOrder: '2023-04-15',
    acceptedTerms: false
  },
];
