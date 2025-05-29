import { Routes, Route } from 'react-router-dom';

// Finance Module Components
import FinanceDashboard from './finance/FinanceDashboard';
import InvoicesModule from './finance/InvoicesModule';
import PaymentsModule from './finance/PaymentsModule';
import FinanceAnalytics from './finance/FinanceAnalytics';

// Legacy invoice components for backward compatibility
import CreateInvoicePage from './invoices/CreateInvoicePage';
import InvoiceDetails from './invoices/InvoiceDetails';
import { JobToInvoiceConverter } from '@/components/invoices/JobToInvoiceConverter';
import CarrierSelfInvoicingPage from './invoices/CarrierSelfInvoicingPage';

/**
 * 🌀 QUANTUM FINANCE MODULE - UNIFIED FINANCIAL POWERHOUSE
 * 
 * The ultimate fusion of Finance + Invoices + Payments + Analytics
 * Built with SPACETOON PRODUCTION QUALITY! 🔥
 * 
 * Routes:
 * /finance                    - Financial Matrix Dashboard
 * /finance/invoices           - Quantum Invoices List
 * /finance/invoices/new       - Create New Invoice
 * /finance/invoices/:id       - Invoice Details
 * /finance/payments           - Payment Portal
 * /finance/analytics          - Financial Analytics
 */
export default function QuantumFinanceModule() {
  return (
    <Routes>
      {/* Main Finance Dashboard - The Quantum Treasury */}
      <Route path="/" element={<FinanceDashboard />} />
      
      {/* Invoices Module */}
      <Route path="/invoices" element={<InvoicesModule />} />
      <Route path="/invoices/new" element={<CreateInvoicePage />} />
      <Route path="/invoices/:invoiceId" element={<InvoiceDetails />} />
      <Route path="/invoices/job-to-invoice" element={<JobToInvoiceConverter />} />
      <Route path="/invoices/carrier-self-invoicing" element={<CarrierSelfInvoicingPage />} />
      
      {/* Payments Module */}
      <Route path="/payments" element={<PaymentsModule />} />
      
      {/* Financial Analytics */}
      <Route path="/analytics" element={<FinanceAnalytics />} />
      
      {/* Legacy Routes - Redirect old /invoices paths */}
      <Route path="/legacy-invoices/*" element={<InvoicesModule />} />
    </Routes>
  );
}

// Export the original Finance page as FinanceDashboard for the main route
export { default as FinanceDashboard } from './finance/FinanceDashboard';
