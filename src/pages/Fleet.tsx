
import { Routes, Route, Navigate } from 'react-router-dom';
import FleetPage from './fleet/FleetPage';

export default function Fleet() {
  return (
    <Routes>
      <Route index element={<FleetPage />} />
      <Route path="*" element={<Navigate to="/fleet" replace />} />
    </Routes>
  );
}
