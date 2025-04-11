
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CreateLeadForm from './CreateLeadForm';
import { pipelineStages } from '../../data/pipelineData';
import { useNavigate } from 'react-router-dom';

export default function CreateLeadPage() {
  const navigate = useNavigate();
  
  const handleLeadCreated = () => {
    // Navigate back to the pipeline board after successful creation
    navigate('/sales-pipeline/board');
  };
  
  return (
    <MainLayout title="Create Lead">
      <CreateLeadForm 
        stages={pipelineStages} 
        onLeadCreated={handleLeadCreated} 
      />
    </MainLayout>
  );
}
