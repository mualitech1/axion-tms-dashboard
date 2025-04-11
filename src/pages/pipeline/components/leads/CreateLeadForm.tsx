
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Building, User, Mail, Phone, DollarSign, Percent, Tag } from 'lucide-react';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { toast } from '@/hooks/use-toast';
import { LeadSource, LeadStatus } from '../../data/pipelineTypes';
import { StepIndicator } from '@/pages/jobs/components/job-creation/StepIndicator';

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
  
  // Form sections based on current step
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Company & Contact Information</h2>
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name*</FormLabel>
                  <FormControl>
                    <InputWithIcon icon={Building} {...field} placeholder="Enter company name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name*</FormLabel>
                  <FormControl>
                    <InputWithIcon icon={User} {...field} placeholder="Enter contact name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter job title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={Mail} {...field} placeholder="Enter email address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={Phone} {...field} placeholder="Enter phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Opportunity Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potential Value (£)</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={DollarSign} {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="probability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Win Probability (%)</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={Percent} {...field} type="number" min="0" max="100" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Source</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lead source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(LeadSource).map((source) => (
                          <SelectItem key={source} value={source}>
                            {source.replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pipeline Stage</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pipeline stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage.id} value={stage.id}>
                            {stage.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Additional Information</h2>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Enter any additional notes about this lead"
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <InputWithIcon 
                      icon={Tag} 
                      {...field} 
                      placeholder="Enter tags separated by commas (e.g., urgent, high-value)" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl px-6 py-4 text-white">
          <h1 className="text-xl font-bold">Create New Lead</h1>
          <p className="text-blue-100 mt-1">Add a new lead to your sales pipeline</p>
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      <Card>
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderFormStep()}
              
              <div className="flex justify-between pt-4 border-t mt-6">
                {currentStep > 1 ? (
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={prevStep}
                    className="flex items-center gap-2"
                  >
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" type="button" onClick={() => navigate('/sales-pipeline/board')}>
                    Cancel
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-200"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Lead...
                      </>
                    ) : (
                      <>
                        Create Lead
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
