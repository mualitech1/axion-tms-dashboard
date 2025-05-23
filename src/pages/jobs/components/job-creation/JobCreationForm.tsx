import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FormContent } from "./FormContent";
import { useJobCreationForm } from "./hooks/useJobCreationForm";
import { useAdditionalStops } from "./hooks/useAdditionalStops";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Check, Mail, Send, Truck, Loader2, ExternalLink } from "lucide-react";
import { JobCreationFormData, AdditionalStop } from "../../types/formTypes";
import { jobService } from '@/services/job-service';

// Define carrier interface
interface Carrier {
  id: string;
  name: string;
  rating?: number;
  onTimeDelivery?: number;
  status?: string;
  type?: string;
}

interface JobCreationFormProps {
  onComplete?: (formData: JobCreationFormData) => void;
}

export function JobCreationForm({ onComplete }: JobCreationFormProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // State for loading/processing
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  
  // Form progress calculation
  const [formProgress, setFormProgress] = useState(0);

  // Confirmation dialog states
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCarrierAllocated, setIsCarrierAllocated] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(""); 
  const [isOrderSent, setIsOrderSent] = useState(false);
  
  // Carriers data state
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [loadingCarriers, setLoadingCarriers] = useState(true);
  
  // Load real carriers on component mount
  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        setLoadingCarriers(true);
        const carrierData = await jobService.getAvailableCarriers();
        setCarriers(carrierData);
      } catch (error) {
        console.error("Error loading carriers:", error);
        toast.error("Failed to load carriers", {
          description: "Could not retrieve carrier data. Using default carriers.",
        });
        // Fallback to demo carriers if API fails
        setCarriers([
          { id: "quantum_logistics", name: "Quantum Logistics", rating: 5.0, onTimeDelivery: 98 },
          { id: "swift_transport", name: "Swift Transport", rating: 4.8, onTimeDelivery: 95 },
          { id: "nexus_carriers", name: "Nexus Carriers", rating: 4.6, onTimeDelivery: 92 }
        ]);
      } finally {
        setLoadingCarriers(false);
      }
    };
    
    fetchCarriers();
  }, []);
  
  // Initialize form with hooks
  const {
    form,
    date,
    setDate,
    currentStep,
    nextStep: goToNextStep,
    prevStep: goToPrevStep,
    uploadedDocuments,
    setUploadedDocuments,
    templates,
    loadTemplate,
    deleteTemplate,
    handleSubmit: hookHandleSubmit
  } = useJobCreationForm({
    onComplete: (data) => {
      console.log("🚀 Job creation completed successfully:", data);
      // Show carrier allocation confirmation dialog
      setIsConfirmationOpen(true);
    }
  });

  // Enhanced submit handler with validation
  const handleSubmit = () => {
    // Get current form values for validation
    const formData = form.getValues();
    console.log("✨ SUBMITTING QUANTUM JOB - Form data:", formData);
    
    // Pre-submission validation
    if (!formData.pickupDate) {
      console.error("⚠️ Missing pickup date:", formData.pickupDate);
      toast.error("Missing Pickup Date", {
        description: "Temporal coordinates must be specified for pickup.",
      });
      return;
    }
    
    if (!formData.collection?.addressLine1 || !formData.collection?.city || !formData.collection?.postCode) {
      console.error("⚠️ Missing collection address data:", formData.collection);
      toast.error("Missing Collection Address", {
        description: "Please complete all required collection address fields.",
      });
      return;
    }
    
    if (!formData.delivery?.addressLine1 || !formData.delivery?.city || !formData.delivery?.postCode) {
      console.error("⚠️ Missing delivery address data:", formData.delivery);
      toast.error("Missing Delivery Address", {
        description: "Please complete all required delivery address fields.",
      });
      return;
    }
    
    console.log("🧪 All validations passed, submitting form...");
    // All validations passed, proceed with submission
    form.handleSubmit(async (data) => {
      try {
        await hookHandleSubmit(data);
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Submission Failed", {
          description: "An error occurred while creating the job.",
        });
      }
    })();
  };

  // Handle job submission after carrier allocation
  const completeJobSubmission = () => {
    // Handle completion with custom loading states
    // Generate a job ID in the format job_[timestamp]_[random] to match our text-based ID convention
    const mockData = { 
      id: `job_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}` 
    };
    setIsLoading(true);
    setLoadingMsg("Establishing quantum transport link...");
    
    // Simulate processing with sequential messages
    setTimeout(() => {
      setLoadingMsg("Calculating optimal spacetime route...");
      
      setTimeout(() => {
        setLoadingMsg("Finalizing job entanglement...");
        
        setTimeout(() => {
          // Final step - send order confirmation
          setLoadingMsg("Sending order confirmation to customer and carrier...");
          
          setTimeout(() => {
            setIsLoading(false);
            
            toast.success("Quantum Job Created & Order Sent", {
              description: "Job has been successfully registered and confirmation sent to all parties.",
              action: {
                label: "View Job",
                onClick: () => navigate(`/jobs/${mockData.id}`),
              },
            });
            
            if (onComplete) {
              onComplete(form.getValues() as JobCreationFormData);
            } else {
              navigate("/jobs");
            }
          }, 800);
        }, 800);
      }, 1000);
    }, 800);
  };
  
  // Handle carrier allocation confirmation
  const handleCarrierAllocation = () => {
    setIsCarrierAllocated(true);
    
    // Allocate carrier in the database (in a real implementation)
    // This would call the job service to update the job with the carrier ID
    console.log(`Allocating carrier: ${selectedCarrier} to job`);
    
    // Simulate sending order to carrier
    setTimeout(() => {
      setIsOrderSent(true);
      // Automatically proceed after showing success
      setTimeout(() => {
        setIsConfirmationOpen(false);
        completeJobSubmission();
      }, 1500);
    }, 1000);
  };
  
  // Calculate form progress based on completed fields
  const computeProgress = () => {
    const formData = form.getValues();
    const requiredFields = [
      'jobTitle', 
      'vehicleType', 
      'customer', 
      'collection.addressLine1', 
      'collection.city', 
      'collection.postCode',
      'delivery.addressLine1', 
      'delivery.city', 
      'delivery.postCode'
    ];
    
    const additionalFields = [
      'product', 
      'weight',
      'collection.contactName', 
      'collection.contactPhone', 
      'collection.instructions',
      'delivery.contactName', 
      'delivery.contactPhone', 
      'delivery.instructions'
    ];
    
    // Count completed required fields
    const completedRequired = requiredFields.filter(field => {
      const parts = field.split('.');
      const value = parts.length > 1 
        ? formData[parts[0] as keyof typeof formData]?.[parts[1]]
        : formData[field as keyof typeof formData];
      return value && String(value).trim() !== '';
    }).length;
    
    // Count completed additional fields
    const completedAdditional = additionalFields.filter(field => {
      const parts = field.split('.');
      const value = parts.length > 1 
        ? formData[parts[0] as keyof typeof formData]?.[parts[1]]
        : formData[field as keyof typeof formData];
      return value && String(value).trim() !== '';
    }).length;
    
    // Calculate progress percentage
    const requiredWeight = (completedRequired / requiredFields.length) * 70;
    const additionalWeight = (completedAdditional / additionalFields.length) * 30;
    
    return Math.round(requiredWeight + additionalWeight);
  };
  
  // Update progress when form values change
  useEffect(() => {
    const updateProgress = () => {
      setFormProgress(computeProgress());
    };
    
    const subscription = form.watch(updateProgress);
    return () => subscription.unsubscribe();
  }, [form, computeProgress]);
  
  // Additional stops handling
  const { 
    additionalStops, 
    addStop, 
    removeStop, 
    updateAdditionalStop: updateStopField 
  } = useAdditionalStops();
  
  // Create a wrapper function that matches the expected signature
  const updateAdditionalStop = (index: number, data: AdditionalStop) => {
    // Update each field in the stop
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        updateStopField(index, { [key]: value } as Partial<AdditionalStop>);
      }
    });
  };
  
  const handleCancel = () => {
    toast("Operation Aborted", {
      description: "Job creation process terminated without saving.",
    });
    navigate("/jobs");
  };
  
  const handleDocumentsChange = (files: File[]) => {
    setUploadedDocuments(files);
  };

  const handleTemplateLoad = (templateId: string) => {
    loadTemplate(templateId);
    toast("Quantum Template Loaded", {
      description: "Job configuration restored from saved template.",
    });
  };
  
  const handleTemplateSave = () => {
    const templateName = prompt("Enter a name for this template:");
    if (templateName) {
      const formData = form.getValues();
      saveAsTemplate(templateName, formData as unknown as Record<string, unknown>);
      toast("Configuration Preserved", {
        description: "Job template saved to your quantum nexus.",
      });
    }
  };
  
  // Save form as template
  const saveAsTemplate = (name: string, data: Record<string, unknown>) => {
    const id = `template-${Date.now()}`;
    const newTemplate = {
      id,
      name,
      data,
      createdAt: new Date().toISOString()
    };
    // Would typically save to localStorage or database here
    console.log("Template saved:", newTemplate);
  };

  return (
    <>
      <Card className="bg-[#051b2a] border-[#1a3246] shadow-lg">
        <CardContent className={`p-0 ${isMobile ? 'pb-20' : ''}`}>
          <FormContent
            form={form}
            currentStep={currentStep}
            totalSteps={3}
            formProgress={formProgress}
            date={date}
            setDate={setDate}
            onDocumentsChange={handleDocumentsChange}
            additionalStops={additionalStops}
            addStop={addStop}
            removeStop={removeStop}
            updateAdditionalStop={updateAdditionalStop}
            nextStep={goToNextStep}
            prevStep={goToPrevStep}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            handleTemplateSave={handleTemplateSave}
            templates={templates}
            handleTemplateLoad={handleTemplateLoad}
            handleTemplateDelete={deleteTemplate}
            isLoading={isLoading}
            loadingMsg={loadingMsg}
          />
        </CardContent>
      </Card>

      {/* Carrier Allocation and Order Confirmation Dialog */}
      <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <AlertDialogContent className="bg-[#051b2a] border-[#1a3246] text-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl bg-gradient-to-r from-[#0adeee] to-[#0a9bdb] bg-clip-text text-transparent">
              {!isCarrierAllocated ? "Allocate Carrier" : "Order Confirmation"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6b82a6]">
              {!isCarrierAllocated 
                ? "Select a carrier to allocate for this transport job."
                : isOrderSent 
                  ? "Order confirmation has been sent to the customer and carrier."
                  : "Sending order confirmation to all parties..."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>

          {!isCarrierAllocated ? (
            <div className="py-4">
              {loadingCarriers ? (
                <div className="flex items-center justify-center p-6">
                  <Loader2 className="h-6 w-6 animate-spin text-[#0adeee] mr-2" />
                  <p>Loading available carriers...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {carriers.map((carrier) => (
                    <div 
                      key={carrier.id}
                      className="flex items-center justify-between p-3 bg-[#0a253a] rounded-md border border-[#1a3246] cursor-pointer hover:bg-[#0f3151] transition-colors" 
                      onClick={() => setSelectedCarrier(carrier.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#0a9bdb]/20 flex items-center justify-center mr-3">
                          <Truck className="h-5 w-5 text-[#0adeee]" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{carrier.name}</p>
                          <p className="text-xs text-[#6b82a6]">
                            {carrier.onTimeDelivery 
                              ? `${carrier.onTimeDelivery}% on-time delivery` 
                              : 'Performance data loading...'} • 
                            {carrier.rating 
                              ? `${carrier.rating} ★` 
                              : 'Rating pending'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link 
                          to={`/carriers/details/${carrier.id}`}
                          className="text-[#0adeee] mr-3 p-1 rounded-full hover:bg-[#0adeee]/10"
                          onClick={(e) => e.stopPropagation()} // Prevent triggering carrier selection
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <div className={`w-5 h-5 rounded-full border ${selectedCarrier === carrier.id ? "bg-[#0adeee] border-[#0adeee]" : "border-[#1a3246]"} flex items-center justify-center`}>
                          {selectedCarrier === carrier.id && <Check className="h-3 w-3 text-[#051b2a]" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center">
              {isOrderSent ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-white font-medium">Order confirmation sent successfully!</p>
                  <p className="text-sm text-[#6b82a6] mt-2">Job #{Date.now().toString().slice(-6)}</p>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center text-[#0adeee]">
                      <Mail className="h-4 w-4 mr-1" />
                      <span className="text-xs">Customer Notified</span>
                    </div>
                    <div className="flex items-center text-[#0adeee]">
                      <Truck className="h-4 w-4 mr-1" />
                      <span className="text-xs">Carrier Assigned</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full border-2 border-[#0adeee] border-t-transparent animate-spin"></div>
                  <p className="text-[#0adeee]">Sending order confirmation...</p>
                </div>
              )}
            </div>
          )}

          <AlertDialogFooter className="flex gap-3">
            {!isCarrierAllocated ? (
              <>
                <AlertDialogCancel className="bg-transparent border-[#1a3246] text-white hover:bg-[#0a253a] hover:text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleCarrierAllocation}
                  disabled={!selectedCarrier}
                  className={`bg-[#0adeee] text-[#051b2a] hover:bg-[#0adeee]/90 ${!selectedCarrier && 'opacity-50 cursor-not-allowed'}`}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Order
                </AlertDialogAction>
              </>
            ) : (
              isOrderSent && (
                <AlertDialogAction className="bg-[#0adeee] text-[#051b2a] hover:bg-[#0adeee]/90 mx-auto">
                  Continue
                </AlertDialogAction>
              )
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
