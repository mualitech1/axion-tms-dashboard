import { Routes, Route, Navigate } from 'react-router-dom';
import CustomersPage from './customers/CustomersPage';
import CustomerDetailPage from './customers/CustomerDetailPage';
import NewCustomerPage from './customers/NewCustomerPage';

export default function Customers() {
  return (
    <Routes>
      <Route index element={<CustomersPage />} />
      <Route path=":id" element={<CustomerDetailPage />} />
      <Route path=":slug" element={<CustomerDetailPage />} />
      <Route path="new" element={<NewCustomerPage />} />
      <Route path="*" element={<Navigate to="/customers" replace />} />
    </Routes>
  );
} 