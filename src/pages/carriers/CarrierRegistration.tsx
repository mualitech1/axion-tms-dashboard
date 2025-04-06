
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Upload, FileCheck } from 'lucide-react';
import RegistrationForm from './components/registration/RegistrationForm';
import DocumentUploadSection from './components/registration/DocumentUploadSection';
import TermsAndConditions from './components/registration/TermsAndConditions';
import RegistrationSummary from './components/registration/RegistrationSummary';

export default function CarrierRegistration() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postcode: '',
    fleetSize: '',
    fleetType: '',
    capabilities: [] as string[],
    regionalCoverage: [] as string[],
  });
  const [documents, setDocuments] = useState<any[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleDocumentUpload = (doc: any) => {
    setDocuments(prev => [...prev, doc]);
  };
  
  const handleDocumentRemove = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    // Validate all required information is provided
    if (!formData.companyName || !termsAccepted) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields and accept the terms & conditions.",
        variant: "destructive"
      });
      setSubmitting(false);
      return;
    }

    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Registration submitted",
      description: "The carrier registration has been submitted for review.",
    });
    
    setSubmitting(false);
    navigate('/carriers');
  };

  const isFormComplete = () => {
    return (
      !!formData.companyName &&
      !!formData.contactName &&
      !!formData.email &&
      documents.length >= 3 &&
      termsAccepted
    );
  };

  return (
    <MainLayout title="Carrier Registration">
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/carriers')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="text-2xl font-semibold">New Carrier Registration</h1>
          </div>
          
          <div>
            <Button
              onClick={handleSubmit}
              disabled={!isFormComplete() || submitting}
              className="bg-tms-blue hover:bg-tms-blue/90"
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </div>
        </div>

        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="details">
                <span className="flex items-center">1. Company Details</span>
              </TabsTrigger>
              <TabsTrigger value="documents">
                <span className="flex items-center">2. Required Documents</span>
              </TabsTrigger>
              <TabsTrigger value="terms">
                <span className="flex items-center">3. Terms & Conditions</span>
              </TabsTrigger>
              <TabsTrigger value="summary">
                <span className="flex items-center">4. Review & Submit</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="p-6">
              <RegistrationForm formData={formData} onChange={handleFormDataChange} />
              
              <div className="flex justify-end mt-6 space-x-2">
                <Button onClick={() => setActiveTab('documents')}>
                  Next: Documents <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="p-6">
              <DocumentUploadSection 
                documents={documents}
                onUpload={handleDocumentUpload}
                onRemove={handleDocumentRemove}
              />
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setActiveTab('details')}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous: Details
                </Button>
                <Button onClick={() => setActiveTab('terms')}>
                  Next: Terms & Conditions <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="terms" className="p-6">
              <TermsAndConditions 
                accepted={termsAccepted} 
                onAcceptChange={setTermsAccepted} 
              />
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setActiveTab('documents')}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous: Documents
                </Button>
                <Button onClick={() => setActiveTab('summary')}>
                  Next: Review <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="summary" className="p-6">
              <RegistrationSummary 
                formData={formData} 
                documents={documents} 
                termsAccepted={termsAccepted} 
              />
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setActiveTab('terms')}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous: Terms
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!isFormComplete() || submitting}
                  className="bg-tms-blue hover:bg-tms-blue/90"
                >
                  {submitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}
