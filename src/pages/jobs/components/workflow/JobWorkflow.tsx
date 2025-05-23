import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobCreationForm } from '../job-creation/JobCreationForm';
import { CarrierAllocation } from './CarrierAllocation';
import { OrderConfirmation } from './OrderConfirmation';
import { Steps, Step } from '@/components/ui/steps';
import { useToast } from '@/hooks/use-toast';
import { jobService } from '@/services/job-service';
import { notifyByEmail, generateOrderConfirmationPDF } from '@/services/notification-service';
import { JobCreationFormData } from '@/pages/jobs/types/formTypes';

export type WorkflowStep = 'job-creation' | 'carrier-allocation' | 'order-confirmation' | 'completed';

export function JobWorkflow() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('job-creation');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [jobData, setJobData] = useState<JobCreationFormData | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [carrierId, setCarrierId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleJobCreationComplete = async (data: JobCreationFormData) => {
    try {
      setIsProcessing(true);
      setJobData(data);
      
      // Create the job in the database
      const result = await jobService.createJob(data);
      if (result.success && result.jobId) {
        setJobId(result.jobId);
      } else {
        throw new Error(result.error || "Failed to create job");
      }
      
      toast({
        title: "Job created successfully",
        description: `Job "${data.jobTitle}" has been created and is ready for carrier allocation.`,
      });
      
      setCurrentStep('carrier-allocation');
    } catch (error) {
      console.error("Error in job creation workflow:", error);
      toast({
        title: "Error creating job",
        description: "There was an error creating the job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCarrierAllocationComplete = async (selectedCarrierId: string) => {
    try {
      setIsProcessing(true);
      setCarrierId(selectedCarrierId);
      
      if (!jobId) {
        throw new Error("Job ID is missing");
      }
      
      // Update the job with the allocated carrier
      const result = await jobService.allocateCarrier(jobId, selectedCarrierId);
      if (!result.success) {
        throw new Error(result.error || "Failed to allocate carrier");
      }
      
      toast({
        title: "Carrier allocated successfully",
        description: "The carrier has been allocated to the job and is ready for order confirmation.",
      });
      
      setCurrentStep('order-confirmation');
    } catch (error) {
      console.error("Error in carrier allocation workflow:", error);
      toast({
        title: "Error allocating carrier",
        description: "There was an error allocating the carrier. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOrderConfirmationComplete = async () => {
    try {
      setIsProcessing(true);
      
      if (!jobId || !carrierId || !jobData) {
        throw new Error("Missing required data for order confirmation");
      }
      
      // Update the job status to confirmed
      const result = await jobService.confirmOrder(jobId);
      if (!result.success) {
        throw new Error(result.error || "Failed to confirm order");
      }
      
      // Generate order confirmation document
      const pdfBlob = await generateOrderConfirmationPDF(jobData);
      if (!pdfBlob) {
        throw new Error("Failed to generate order confirmation document");
      }
      
      // Send email notification with the order confirmation
      const emailSent = await notifyByEmail(
        "customer@example.com", // This would come from the customer data
        `Order Confirmation: ${jobData.jobTitle}`,
        `Your order ${jobData.jobTitle} has been confirmed and assigned to a carrier.`,
        [
          {
            name: 'order-confirmation.pdf',
            content: pdfBlob
          }
        ]
      );
      
      if (!emailSent) {
        console.warn("Failed to send email notification");
      }
      
      toast({
        title: "Order confirmed successfully",
        description: "The order has been confirmed and the customer has been notified.",
      });
      
      setCurrentStep('completed');
    } catch (error) {
      console.error("Error in order confirmation workflow:", error);
      toast({
        title: "Error confirming order",
        description: "There was an error confirming the order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetWorkflow = () => {
    setCurrentStep('job-creation');
    setJobData(null);
    setJobId(null);
    setCarrierId(null);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="mb-8">
          <Steps
            currentStep={
              currentStep === 'job-creation' ? 0 :
              currentStep === 'carrier-allocation' ? 1 :
              currentStep === 'order-confirmation' ? 2 : 3
            }
          >
            <Step title="Job Creation" />
            <Step title="Carrier Allocation" />
            <Step title="Order Confirmation" />
            <Step title="Completed" />
          </Steps>
        </div>

        {currentStep === 'job-creation' && (
          <JobCreationForm onComplete={handleJobCreationComplete} />
        )}

        {currentStep === 'carrier-allocation' && jobId && (
          <CarrierAllocation
            jobId={jobId}
            onComplete={handleCarrierAllocationComplete}
            isProcessing={isProcessing}
          />
        )}

        {currentStep === 'order-confirmation' && jobId && carrierId && (
          <OrderConfirmation
            jobId={jobId}
            carrierId={carrierId}
            onComplete={handleOrderConfirmationComplete}
            isProcessing={isProcessing}
          />
        )}

        {currentStep === 'completed' && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Workflow Completed Successfully</h2>
            <p className="mb-6">The job has been created, a carrier has been allocated, and the order has been confirmed.</p>
            <Button onClick={resetWorkflow}>
              Start New Job
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 