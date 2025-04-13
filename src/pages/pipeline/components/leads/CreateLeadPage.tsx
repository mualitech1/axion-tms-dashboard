
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CreateLeadForm from './CreateLeadForm';
import { pipelineStages } from '../../data/pipelineData';
import { toast } from '@/hooks/use-toast';

/**
 * CreateLeadPage component for creating new leads in the sales pipeline
 * It provides the main container and layout for the lead creation process
 */
export default function CreateLeadPage() {
  const navigate = useNavigate();
  
  /**
   * Handles successful lead creation
   * Navigates back to the pipeline board
   */
  const handleLeadCreated = () => {
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
