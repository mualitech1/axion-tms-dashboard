import { Routes, Route, Navigate } from 'react-router-dom';
import FleetPage from './fleet/FleetPage';
import VehicleDetailPage from './fleet/VehicleDetailPage';

export default function Fleet() {
  return (
    <Routes>
      <Route index element={<FleetPage />} />
      <Route path=":id" element={<VehicleDetailPage />} />
      <Route path="*" element={<Navigate to="/fleet" replace />} />
    </Routes>
  );
}
