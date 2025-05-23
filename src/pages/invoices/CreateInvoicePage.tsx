import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";

// Define the form data structure to match our CreateInvoiceForm
interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceFormData {
  customerId: string;
  customerName?: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  terms?: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
  items: InvoiceItem[];
}

export default function CreateInvoicePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { customerId: paramsCustomerId } = useParams<{ customerId?: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryCustomerId = queryParams.get('customerId');
  
  // Use either the path parameter or query parameter for customerId
  const customerId = paramsCustomerId || queryCustomerId || undefined;
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbItems = [
    { label: "Dashboard", path: "/" },
    { label: "Invoices", path: "/invoices" },
    { label: "Create New Invoice", path: "/invoices/new" }
  ];

  const handleSubmit = async (formData: InvoiceFormData) => {
    setIsSubmitting(true);
    try {
      // This would be your actual invoice creation logic
      console.log("Creating invoice with data:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Success",
        description: "Invoice created successfully.",
        variant: "default",
      });
      
      // Navigate back to invoices list
      navigate("/invoices");
    } catch (error) {
      console.error("Failed to create invoice:", error);
      toast({
        title: "Error",
        description: "There was a problem creating the invoice.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // For now, we're using a placeholder text instead of the real component
  // until we've fully implemented and fixed the CreateInvoiceForm
  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold tracking-tight mt-2">Create New Invoice</h1>
          <p className="text-muted-foreground">Generate a professional invoice for your customer</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => navigate("/invoices")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <Button 
            onClick={() => {
              // Temporary placeholder function
              toast({
                title: "Success",
                description: "This feature is being implemented. Check back soon!",
                variant: "default",
              });
            }}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Invoice</span>
          </Button>
        </div>
      </div>

      <Card className="bg-aximo-card border-aximo-border shadow-aximo">
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center">
            <h3 className="text-xl font-medium mb-2">Invoice Creation Form</h3>
            <p className="text-muted-foreground mb-4">
              The invoice creation form is currently being finalized. Check back soon for the full functionality.
            </p>
            {customerId && (
              <p className="p-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-md">
                Creating invoice for customer ID: {customerId}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 