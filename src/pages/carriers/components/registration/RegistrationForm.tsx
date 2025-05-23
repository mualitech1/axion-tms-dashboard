import { Form } from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { registrationFormSchema, RegistrationFormValues } from "./RegistrationFormSchema";
import { CompanyInfoSection } from "./sections/CompanyInfoSection";
import { AddressSection } from "./sections/AddressSection";
import { FleetSection } from "./sections/FleetSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { RegionalCoverageSection } from "./sections/RegionalCoverageSection";
import { NotesSection } from "./sections/NotesSection";

interface RegistrationFormProps {
  formData: Partial<z.infer<typeof registrationFormSchema>>;
  onChange: (data: Partial<z.infer<typeof registrationFormSchema>>) => void;
  errors?: Record<string, string[]>;
}

export default function RegistrationForm({ formData, onChange, errors = {} }: RegistrationFormProps) {
  // Initialize form with existing data
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: formData as RegistrationFormValues,
  });

  // Submit handler - just updates parent's state
  const onSubmit = (data: RegistrationFormValues) => {
    onChange(data);
  };

  // Update parent's state on form changes
  const handleFieldChange = (field: string, value: unknown) => {
    const updatedData = { [field]: value };
    onChange(updatedData);
  };

  return (
    <div>
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          All fields marked with * are required. Carrier accounts will not be activated until all required documents are received and verified.
        </AlertDescription>
      </Alert>

      {/* Show validation errors summary if needed */}
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 mt-2">
              {Object.entries(errors).map(([field, messages]) => (
                <li key={field}>
                  {field}: {messages.join(', ')}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onChange={() => form.handleSubmit(onSubmit)()} className="space-y-6">
          <CompanyInfoSection 
            form={form} 
            onChange={handleFieldChange} 
          />
          <AddressSection 
            form={form} 
            onChange={handleFieldChange} 
          />
          <FleetSection 
            form={form} 
            onChange={handleFieldChange} 
          />
          <CapabilitiesSection 
            form={form} 
            onChange={handleFieldChange} 
          />
          <RegionalCoverageSection 
            form={form} 
            onChange={handleFieldChange} 
          />
          <NotesSection 
            form={form} 
            onChange={handleFieldChange} 
          />
        </form>
      </Form>
    </div>
  );
}
