
import { Route, Routes } from 'react-router-dom';
import Customers from './pages/Customers';
import CustomersPage from './pages/customers/CustomersPage';
import CustomerDetails from './pages/customers/CustomerDetails';
import Jobs from './pages/Jobs';
import Settings from './pages/Settings';
import Carriers from './pages/Carriers';
import Analytics from './pages/Analytics';
import Pipeline from './pages/Pipeline';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tms-theme">
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/carriers" element={<Carriers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
