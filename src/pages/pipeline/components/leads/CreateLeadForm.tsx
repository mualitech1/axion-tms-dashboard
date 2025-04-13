
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { LeadSource, LeadStatus } from '../../data/pipelineTypes';

// Import step components
import CompanyContactStep from './form-steps/CompanyContactStep';
import OpportunityDetailsStep from './form-steps/OpportunityDetailsStep';
import AdditionalInfoStep from './form-steps/AdditionalInfoStep';
import FormNavigation from './form-steps/FormNavigation';
import FormHeader from './form-steps/FormHeader';

// Lead form schema
const leadFormSchema = z.object({
  company: z.string().min(2, { message: 'Company name is required' }),
  contact: z.string().min(2, { message: 'Contact name is required' }),
  title: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
  value: z.coerce.number().min(0, { message: 'Value must be a positive number' }),
  probability: z.coerce.number().min(0).max(100, { message: 'Probability must be between 0 and 100' }),
  source: z.nativeEnum(LeadSource),
  stage: z.string(),
  notes: z.string().optional(),
  tags: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface CreateLeadFormProps {
  stages: { id: string; name: string }[];
  onLeadCreated: () => void;
}

export default function CreateLeadForm({ stages, onLeadCreated }: CreateLeadFormProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      company: '',
      contact: '',
      title: '',
      email: '',
      phone: '',
      value: 0,
      probability: 50,
      source: LeadSource.WEBSITE,
      stage: stages[0]?.id || 'lead-identified',
      notes: '',
      tags: '',
    },
  });
  
  const nextStep = () => {
    if (currentStep === 1) {
      const { company, contact, email, phone } = form.getValues();
      if (!company || !contact || !email || !phone) {
        form.trigger(['company', 'contact', 'email', 'phone']);
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Process tags into an array
      const tagsArray = data.tags 
        ? data.tags.split(',').map(tag => tag.trim())
        : [];
      
      // Create the lead object
      const newLead = {
        id: `lead-${Date.now()}`,
        company: data.company,
        contact: data.contact,
        title: data.title || '',
        email: data.email,
        phone: data.phone,
        value: data.value,
        probability: data.probability,
        source: data.source,
        stage: data.stage,
        created: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        status: LeadStatus.ACTIVE,
        notes: data.notes || '',
        tags: tagsArray,
        assignedTo: 'user-1', // Default assignment
      };
      
      console.log('Creating new lead:', newLead);
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Lead created!",
        description: `${data.company} has been added to your pipeline.`,
      });
      
      onLeadCreated();
      navigate('/sales-pipeline/board');
    } catch (error) {
      console.error('Error creating lead:', error);
      toast({
        title: "Error",
        description: "Failed to create lead. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render the current step
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyContactStep form={form} />;
      case 2:
        return <OpportunityDetailsStep form={form} stages={stages} />;
      case 3:
        return <AdditionalInfoStep form={form} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <FormHeader currentStep={currentStep} totalSteps={totalSteps} />

      <Card>
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderFormStep()}
              
              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                isSubmitting={isSubmitting}
                onPrevious={prevStep}
                onNext={nextStep}
                onCancel={() => navigate('/sales-pipeline/board')}
              />
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
