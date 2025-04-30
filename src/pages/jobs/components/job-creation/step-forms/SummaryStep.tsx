
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { JobCreationFormData } from "@/pages/jobs/types/formTypes";

interface SummaryStepProps {
  form: UseFormReturn<JobCreationFormData>;
  date?: Date;
}

export function SummaryStep({ form, date }: SummaryStepProps) {
  const { getValues } = form;
  const values = getValues();
  
  const SummaryField = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="grid grid-cols-2 gap-2 py-2 border-b border-[#1a3246] last:border-0">
      <div className="text-[#6b82a6] font-medium">{label}:</div>
      <div className="text-white">{value || "Not provided"}</div>
    </div>
  );
  
  const SummarySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-[#0adeee] font-semibold text-md mb-2 border-b border-[#1a3246] pb-1">
        {title}
      </h3>
      {children}
    </div>
  );
  
  return (
    <div className="space-y-6 text-white pb-4">
      <div className="bg-[#162233] p-4 rounded-md border border-[#1a3246]">
        <h2 className="font-bold text-lg text-[#0adeee] mb-4">Job Summary</h2>
        
        <SummarySection title="General Information">
          <SummaryField label="Job Title" value={values.jobTitle} />
          <SummaryField label="Customer" value={values.customer} />
          <SummaryField label="Vehicle Type" value={values.vehicleType} />
          <SummaryField label="Priority" value={values.priority} />
          <SummaryField label="Pickup Date" value={date ? format(date, "PPP") : undefined} />
          <SummaryField label="Rate" value={values.rate ? `£${values.rate}` : undefined} />
          <SummaryField label="Product Type" value={values.productType} />
          <SummaryField label="Total Weight" value={values.totalWeight ? `${values.totalWeight} kg` : undefined} />
        </SummarySection>
        
        <SummarySection title="Collection Address">
          <SummaryField label="Company" value={values.collection.companyName} />
          <SummaryField label="Contact" value={values.collection.contactName} />
          <SummaryField label="Address" value={values.collection.addressLine1} />
          <SummaryField label="City" value={values.collection.city} />
          <SummaryField label="Post Code" value={values.collection.postCode} />
          <SummaryField label="Time" value={values.collection.time} />
          <SummaryField label="Reference" value={values.collection.reference} />
        </SummarySection>
        
        <SummarySection title="Delivery Address">
          <SummaryField label="Company" value={values.delivery.companyName} />
          <SummaryField label="Contact" value={values.delivery.contactName} />
          <SummaryField label="Address" value={values.delivery.addressLine1} />
          <SummaryField label="City" value={values.delivery.city} />
          <SummaryField label="Post Code" value={values.delivery.postCode} />
          <SummaryField label="Time" value={values.delivery.time} />
          <SummaryField label="Reference" value={values.delivery.reference} />
        </SummarySection>
        
        {values.additionalInformation && (
          <SummarySection title="Additional Information">
            <div className="p-2 bg-[#05101b] rounded border border-[#1a3246]">
              {values.additionalInformation}
            </div>
          </SummarySection>
        )}
      </div>
      
      <div className="bg-[#162233] p-4 rounded-md border border-[#1a3246]">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <span className="text-green-400">The job will be created with status: <strong>Booked</strong></span>
        </div>
        <p className="text-xs mt-2 text-[#6b82a6]">
          Click the "Create Job" button below to submit this job to the system. You'll be redirected back to the jobs list after it's created.
        </p>
      </div>
    </div>
  );
}
