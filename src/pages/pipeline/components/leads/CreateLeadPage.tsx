
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateLeadForm from './CreateLeadForm';
import { pipelineStages } from '../../data/pipelineData';
import { toast } from '@/hooks/use-toast';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

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
    toast({
      title: "Lead created successfully",
      description: "Your new lead has been added to the pipeline",
    });
    navigate('/pipeline/board');
  };
  
  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: 'Pipeline', path: '/pipeline' },
    { label: 'Create Lead', path: '/pipeline/lead/new' }
  ];
  
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-2xl font-bold text-aximo-text bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent mb-2">
          Create New Lead
        </h1>
        <p className="text-aximo-text-secondary">
          Add a new lead to your sales pipeline
        </p>
      </div>
      
      <CreateLeadForm 
        stages={pipelineStages} 
        onLeadCreated={handleLeadCreated} 
      />
    </div>
  );
}
