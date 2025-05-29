import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, Building2, CreditCard, Clock, FileText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useInvoiceContext } from "./InvoiceContext";
import { useCustomers } from "@/hooks/use-customer";

export function InvoiceDetailsForm() {
  const { form, handlePaymentTermsChange } = useInvoiceContext();
  const { customers, isLoading: customersLoading } = useCustomers();

  const calculateDueDate = (invoiceDate: string, paymentTerms: string) => {
    if (!invoiceDate) return "";
    
    const date = new Date(invoiceDate);
    let days = 30; // default
    
    // Extract days from payment terms
    if (paymentTerms.includes("15")) days = 15;
    else if (paymentTerms.includes("30")) days = 30;
    else if (paymentTerms.includes("60")) days = 60;
    
    date.setDate(date.getDate() + days);
    return format(date, "yyyy-MM-dd");
  };

  // Watch for changes to auto-calculate due date
  const issueDate = form.watch("issueDate");
  const paymentTerms = form.watch("paymentTerms");

  useEffect(() => {
    if (issueDate && paymentTerms) {
      const dueDate = calculateDueDate(issueDate, paymentTerms);
      form.setValue("dueDate", dueDate);
    }
  }, [issueDate, paymentTerms, form]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Quantum Transaction Details</h3>
          <p className="text-sm text-gray-400">Configure the fundamental parameters of your energy exchange</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Selection */}
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-white flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Quantum Entity (Customer)
              </FormLabel>
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
                disabled={customersLoading}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50">
                    <SelectValue placeholder={customersLoading ? "Loading entities..." : "Select dimensional entity"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {customersLoading ? (
                    <SelectItem value="__loading__" disabled>Loading quantum entities...</SelectItem>
                  ) : customers.length === 0 ? (
                    <SelectItem value="__none__" disabled>No entities found</SelectItem>
                  ) : (
                    customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.company_name}>
                        {customer.company_name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Invoice Number (Display Only) */}
        <FormItem className="space-y-2">
          <FormLabel className="text-white flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Transaction Reference
          </FormLabel>
          <Input
            value="Auto-generated"
            disabled
            className="bg-gray-800/30 border-gray-600 text-gray-400"
            placeholder="Will be generated automatically"
          />
          <p className="text-xs text-gray-400">Reference will be assigned upon creation</p>
        </FormItem>

        {/* Invoice Date */}
        <FormField
          control={form.control}
          name="issueDate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-white flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Transaction Date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50",
                        !field.value && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Select transaction date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                    initialFocus
                    className="bg-gray-800 text-white"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment Terms */}
        <FormField
          control={form.control}
          name="paymentTerms"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-white flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Payment Terms
              </FormLabel>
              <Select 
                value={field.value} 
                onValueChange={(value) => {
                  field.onChange(value);
                  handlePaymentTermsChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="net15">Net 15 days</SelectItem>
                  <SelectItem value="net30">Net 30 days</SelectItem>
                  <SelectItem value="net60">Net 60 days</SelectItem>
                  <SelectItem value="net90">Net 90 days</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due Date (Auto-calculated) */}
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-white flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Due Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ? format(new Date(field.value), "PPP") : ""}
                  disabled
                  className="bg-gray-800/30 border-gray-600 text-gray-400"
                  placeholder="Auto-calculated based on terms"
                />
              </FormControl>
              <p className="text-xs text-gray-400">Automatically calculated from transaction date + payment terms</p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status Field */}
        <FormItem className="space-y-2">
          <FormLabel className="text-white flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Transaction Status
          </FormLabel>
          <Select defaultValue="Draft">
            <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400">Status will be set to Draft initially</p>
        </FormItem>
      </div>

      {/* Notes Section */}
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-white flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Quantum Flux Notes (Optional)
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Add any additional quantum parameters or special instructions..."
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Financial Summary Preview */}
      <div className="mt-8 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Quantum Energy Calculations
        </h4>
        <div className="text-sm text-gray-400">
          Financial calculations will be computed automatically based on line items added in the next step.
        </div>
      </div>
    </div>
  );
}
