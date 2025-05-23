import { Routes, Route, Navigate } from 'react-router-dom';
import KnowledgeBase from './KnowledgeBase';

// These will be implemented later
const KnowledgeEntryPage = () => <div>Knowledge Entry Detail Page</div>;
const KnowledgeCreatePage = () => <div>Create Knowledge Entry Page</div>;
const KnowledgeSettingsPage = () => <div>Knowledge Settings Page</div>;

export default function KnowledgeRoutes() {
  return (
    <Routes>
      <Route index element={<KnowledgeBase />} />
      <Route path="entry/:id" element={<KnowledgeEntryPage />} />
      <Route path="create" element={<KnowledgeCreatePage />} />
      <Route path="settings" element={<KnowledgeSettingsPage />} />
      <Route path="*" element={<Navigate to="/knowledge" replace />} />
    </Routes>
  );
} 