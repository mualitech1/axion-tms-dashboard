
import { User, Mail, Phone } from 'lucide-react';
import ContactDetailsForm from '../ContactDetailsForm';
import { ContactPerson } from '@/types/customer';
import { FormNavButtons } from './FormNavButtons';

interface ContactsTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  primaryContact: ContactPerson | null;
  setPrimaryContact: (contact: ContactPerson) => void;
  invoiceContact: ContactPerson | null;
  setInvoiceContact: (contact: ContactPerson) => void;
  operationsContact: ContactPerson | null;
  setOperationsContact: (contact: ContactPerson) => void;
}

export const ContactsTab = ({
  activeTab,
  setActiveTab,
  primaryContact,
  setPrimaryContact,
  invoiceContact,
  setInvoiceContact,
  operationsContact,
  setOperationsContact
}: ContactsTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Primary Contact</h3>
          </div>
          <span className="bg-red-50 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full border border-red-100 flex items-center">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-1.5"></span>
            Required
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">This contact will be the main point of contact for this customer</p>
        <ContactDetailsForm
          onSave={(contact) => setPrimaryContact(contact)}
          existingContact={primaryContact}
          contactType="primary"
        />
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold mb-0">Invoice Contact</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">This contact will receive invoices and payment requests</p>
        <ContactDetailsForm
          onSave={(contact) => setInvoiceContact(contact)}
          existingContact={invoiceContact}
          contactType="invoice"
        />
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold mb-0">Operations Contact</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">This contact will handle day-to-day operational matters</p>
        <ContactDetailsForm
          onSave={(contact) => setOperationsContact(contact)}
          existingContact={operationsContact}
          contactType="operations"
        />
      </div>

      <FormNavButtons 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        prevStep="general"
        nextStep="terms"
      />
    </div>
  );
};
