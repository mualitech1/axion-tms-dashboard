
import { X, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { InvoiceFormValues } from "./hooks/useInvoiceForm";
import { FormMessage } from "@/components/ui/form";

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
  
  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-left w-20">Qty</th>
              <th className="px-4 py-3 text-left w-24">Rate</th>
              <th className="px-4 py-3 text-left w-24">Amount</th>
              <th className="px-4 py-3 text-left w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    placeholder="Item description"
                    className={`border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                      formErrors.items?.[index]?.description ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.items?.[index]?.description && (
                    <div className="text-xs text-red-500 mt-1 px-1">
                      {formErrors.items[index]?.description?.message}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">
                  <Input
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    type="number"
                    min="1"
                    className={`border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                      formErrors.items?.[index]?.quantity ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.items?.[index]?.quantity && (
                    <div className="text-xs text-red-500 mt-1 px-1">
                      {formErrors.items[index]?.quantity?.message}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="relative">
                    <DollarSign className="absolute left-0 top-2.5 h-3.5 w-3.5 text-gray-500" />
                    <Input
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                      type="number"
                      min="0"
                      step="0.01"
                      className={`pl-5 border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                        formErrors.items?.[index]?.rate ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.items?.[index]?.rate && (
                      <div className="text-xs text-red-500 mt-1 px-1">
                        {formErrors.items[index]?.rate?.message}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 font-medium">
                  ${parseFloat(item.amount || "0").toFixed(2)}
                </td>
                <td className="p-2 text-center">
                  {items.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => removeInvoiceItem(index)}
                      type="button"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      <div className="flex justify-between p-4 bg-gray-50 rounded-md mt-4">
        <span className="font-medium">Total Amount:</span>
        <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
      </div>
    </div>
  );
}
