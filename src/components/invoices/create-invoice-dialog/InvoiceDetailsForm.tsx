
import { useState } from "react";
import { Building2, Calendar, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceDetailsFormProps {
  invoiceDetails: {
    customer: string;
    issueDate: string;
    dueDate: string;
    paymentTerms: string;
    notes: string;
  };
  handleCustomerChange: (value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentTermsChange: (value: string) => void;
}

export function InvoiceDetailsForm({
  invoiceDetails,
  handleCustomerChange,
  handleInputChange,
  handlePaymentTermsChange
}: InvoiceDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer" className="text-sm font-medium">
            Customer
          </Label>
          <div className="relative">
            <Select 
              value={invoiceDetails.customer} 
              onValueChange={handleCustomerChange}
            >
              <SelectTrigger className="w-full pl-9">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="issueDate" className="text-sm font-medium">
            Issue Date
          </Label>
          <div className="relative">
            <Input
              id="issueDate"
              name="issueDate"
              type="date"
              value={invoiceDetails.issueDate}
              onChange={handleInputChange}
              className="pl-9"
            />
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="paymentTerms" className="text-sm font-medium">
            Payment Terms
          </Label>
          <div className="relative">
            <Select 
              value={invoiceDetails.paymentTerms} 
              onValueChange={handlePaymentTermsChange}
            >
              <SelectTrigger className="w-full pl-9">
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="net15">Net 15 days</SelectItem>
                <SelectItem value="net30">Net 30 days</SelectItem>
                <SelectItem value="net60">Net 60 days</SelectItem>
              </SelectContent>
            </Select>
            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dueDate" className="text-sm font-medium">
            Due Date
          </Label>
          <div className="relative">
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={invoiceDetails.dueDate}
              onChange={handleInputChange}
              className="pl-9"
            />
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm font-medium">
          Notes (Optional)
        </Label>
        <Input
          id="notes"
          name="notes"
          placeholder="Add any additional notes here..."
          value={invoiceDetails.notes}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
