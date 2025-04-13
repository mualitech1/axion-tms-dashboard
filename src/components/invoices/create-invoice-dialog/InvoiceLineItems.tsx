
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { InvoiceFormValues } from "./hooks/useInvoiceForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileLineItems } from "./line-items/MobileLineItems";
import { DesktopLineItems } from "./line-items/DesktopLineItems";
import { TotalSummary } from "./line-items/TotalSummary";

interface InvoiceLineItemsProps {
  form: UseFormReturn<InvoiceFormValues>;
  handleItemChange: (index: number, field: string, value: string) => void;
  addInvoiceItem: () => void;
  removeInvoiceItem: (index: number) => void;
  calculateTotal: () => number;
}

export function InvoiceLineItems({
  form,
  handleItemChange,
  addInvoiceItem,
  removeInvoiceItem,
  calculateTotal
}: InvoiceLineItemsProps) {
  const items = form.watch("items");
  const formErrors = form.formState.errors;
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-3 md:space-y-4">
      {isMobile ? (
        <MobileLineItems 
          items={items} 
          formErrors={formErrors} 
          handleItemChange={handleItemChange} 
          removeInvoiceItem={removeInvoiceItem} 
        />
      ) : (
        <DesktopLineItems 
          items={items} 
          formErrors={formErrors} 
          handleItemChange={handleItemChange} 
          removeInvoiceItem={removeInvoiceItem} 
        />
      )}

      {formErrors.items?.message && (
        <div className="text-sm text-red-500 mt-1">{formErrors.items.message}</div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addInvoiceItem}
        className="text-blue-600 border-dashed border-blue-300"
      >
        <Plus className="h-4 w-4 mr-1" /> Add Another Line Item
      </Button>

      <TotalSummary total={calculateTotal()} />
    </div>
  );
}
