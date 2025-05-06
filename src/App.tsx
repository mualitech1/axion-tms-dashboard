
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomersPage from './pages/customers/CustomersPage';
import CustomerDetails from './pages/customers/CustomerDetails';
import Jobs from './pages/Jobs';
import Settings from './pages/Settings';
import Carriers from './pages/Carriers';
import Analytics from './pages/Analytics';
import Pipeline from './pages/Pipeline';
import ComplianceManager from './pages/ComplianceManager';
import CustomerPortal from './components/customer-portal/CustomerPortal';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tms-theme">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/carriers" element={<Carriers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/compliance" element={<ComplianceManager />} />
        <Route path="/customer-portal/*" element={<CustomerPortal />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
