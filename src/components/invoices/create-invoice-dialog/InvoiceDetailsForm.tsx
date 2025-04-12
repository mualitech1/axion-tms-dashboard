
import { Building2, Calendar, PoundSterling } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { InvoiceFormValues } from "./hooks/useInvoiceForm";
import { useIsMobile } from "@/hooks/use-mobile";

interface InvoiceDetailsFormProps {
  form: UseFormReturn<InvoiceFormValues>;
  handlePaymentTermsChange: (value: string) => void;
}

export function InvoiceDetailsForm({
  form,
  handlePaymentTermsChange
}: InvoiceDetailsFormProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Customer</FormLabel>
              <div className="relative">
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full pl-9">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Globex Industries">Globex Industries</SelectItem>
                    <SelectItem value="Acme Corporation">Acme Corporation</SelectItem>
                    <SelectItem value="Wayne Enterprises">Wayne Enterprises</SelectItem>
                    <SelectItem value="Stark Industries">Stark Industries</SelectItem>
                    <SelectItem value="Umbrella Corporation">Umbrella Corporation</SelectItem>
                  </SelectContent>
                </Select>
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className={`grid grid-cols-1 ${isMobile ? '' : 'sm:grid-cols-2'} gap-4`}>
        <FormField
          control={form.control}
          name="issueDate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Issue Date</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type="date"
                    className="pl-9"
                    {...field}
                  />
                </FormControl>
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="paymentTerms"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Payment Terms</FormLabel>
              <div className="relative">
                <Select 
                  value={field.value} 
                  onValueChange={(value) => {
                    field.onChange(value);
                    handlePaymentTermsChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full pl-9">
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="net15">Net 15 days</SelectItem>
                    <SelectItem value="net30">Net 30 days</SelectItem>
                    <SelectItem value="net60">Net 60 days</SelectItem>
                  </SelectContent>
                </Select>
                <PoundSterling className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className={`grid grid-cols-1 ${isMobile ? '' : 'sm:grid-cols-2'} gap-4`}>
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Due Date</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type="date"
                    className="pl-9"
                    {...field}
                  />
                </FormControl>
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Notes (Optional)</FormLabel>
            <FormControl>
              <Input
                placeholder="Add any additional notes here..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
