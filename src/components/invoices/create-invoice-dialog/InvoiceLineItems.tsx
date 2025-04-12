
import { X, PoundSterling, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { InvoiceFormValues } from "./hooks/useInvoiceForm";
import { FormMessage } from "@/components/ui/form";
import { useIsMobile } from "@/hooks/use-mobile";

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
        // Mobile view - stack items vertically
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border rounded-md p-3 bg-white relative">
              {items.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 absolute top-2 right-2" 
                  onClick={() => removeInvoiceItem(index)}
                  type="button"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              )}
              
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Item</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    placeholder="Item description"
                    className={`mt-1 ${
                      formErrors.items?.[index]?.description ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.items?.[index]?.description && (
                    <div className="text-xs text-red-500 mt-1">
                      {formErrors.items[index]?.description?.message}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Qty</Label>
                    <Input
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      type="number"
                      min="1"
                      className={`mt-1 ${
                        formErrors.items?.[index]?.quantity ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.items?.[index]?.quantity && (
                      <div className="text-xs text-red-500 mt-1">
                        {formErrors.items[index]?.quantity?.message}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-xs">Rate</Label>
                    <div className="relative mt-1">
                      <PoundSterling className="absolute left-2 top-2.5 h-3.5 w-3.5 text-gray-500" />
                      <Input
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                        type="number"
                        min="0"
                        step="0.01"
                        className={`pl-8 ${
                          formErrors.items?.[index]?.rate ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors.items?.[index]?.rate && (
                        <div className="text-xs text-red-500 mt-1">
                          {formErrors.items[index]?.rate?.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs">Amount</Label>
                  <div className="bg-gray-50 p-2 rounded-md mt-1 font-medium text-right">
                    £{parseFloat(item.amount || "0").toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop view - table layout
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
                      <PoundSterling className="absolute left-0 top-2.5 h-3.5 w-3.5 text-gray-500" />
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
                    £{parseFloat(item.amount || "0").toFixed(2)}
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

      <div className="flex justify-between p-3 md:p-4 bg-gray-50 rounded-md mt-3 md:mt-4">
        <span className="font-medium text-sm md:text-base">Total Amount:</span>
        <span className="text-base md:text-lg font-bold">{formatCurrency(calculateTotal())}</span>
      </div>
    </div>
  );
}
