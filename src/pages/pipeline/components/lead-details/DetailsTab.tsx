
import React from 'react';
import { Lead } from '../../data/pipelineTypes';
import { UseFormReturn } from 'react-hook-form';
import LeadContactInfo from './LeadContactInfo';
import LeadDealInfo from './LeadDealInfo';
import LeadNotesCard from './LeadNotesCard';

interface DetailsTabProps {
  form: UseFormReturn<Lead>;
  lead: Lead;
  onSave: (data: Lead) => void;
}

export default function DetailsTab({ form, lead, onSave }: DetailsTabProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <LeadContactInfo form={form} onSave={onSave} />
      <LeadDealInfo lead={lead} />
      <LeadNotesCard 
        form={form} 
        tags={lead.tags} 
        onSave={() => form.handleSubmit(onSave)()} 
      />
    </div>
  );
}
