
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Pipeline from './pages/Pipeline';
import PipelineBoard from './pages/pipeline/PipelineBoard';
import PipelineDashboard from './pages/pipeline/PipelineDashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pipeline/dashboard" replace />} />
        
        <Route path="/pipeline" element={<Pipeline />}>
          <Route index element={<Navigate to="/pipeline/dashboard" replace />} />
          <Route 
            path="dashboard" 
            element={
              <MainLayout title="Pipeline Dashboard">
                <PipelineDashboard />
              </MainLayout>
            } 
          />
          <Route 
            path="board" 
            element={
              <MainLayout title="Pipeline Board">
                <PipelineBoard />
              </MainLayout>
            } 
          />
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
