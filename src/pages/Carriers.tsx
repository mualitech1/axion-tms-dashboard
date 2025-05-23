import { Routes, Route, Navigate } from 'react-router-dom';
import CarriersPage from './carriers/CarriersPage';
import CarrierDetails from './carriers/CarrierDetails';
import CarrierCompliance from './carriers/CarrierCompliance';
import CarrierPayments from './carriers/CarrierPayments';
import CarrierRegistration from './carriers/CarrierRegistration';
import CarrierMessaging from './carriers/CarrierMessaging';
import BroadcastMessaging from './carriers/BroadcastMessaging';
import CarrierMatching from './carriers/CarrierMatching';
import CarrierReports from './carriers/CarrierReports';
import CarrierPortal from './carriers/CarrierPortal';

export default function Carriers() {
  return (
    <Routes>
      <Route index element={<CarriersPage />} />
      <Route path="details/:id" element={<CarrierDetails />} />
      <Route path="compliance" element={<CarrierCompliance />} />
      <Route path="payments" element={<CarrierPayments />} />
      <Route path="register" element={<CarrierRegistration />} />
      <Route path="messaging" element={<CarrierMessaging />} />
      <Route path="broadcast" element={<BroadcastMessaging />} />
      <Route path="matching" element={<CarrierMatching />} />
      <Route path="reports" element={<CarrierReports />} />
      <Route path="portal" element={<CarrierPortal />} />
      <Route path="*" element={<Navigate to="/carriers" replace />} />
    </Routes>
  );
}
