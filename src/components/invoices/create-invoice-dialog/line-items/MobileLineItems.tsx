
import { X, PoundSterling } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";

interface MobileLineItemsProps {
  items: any[];
  formErrors: any;
  handleItemChange: (index: number, field: string, value: string) => void;
  removeInvoiceItem: (index: number) => void;
}

export function MobileLineItems({
  items,
  formErrors,
  handleItemChange,
  removeInvoiceItem
}: MobileLineItemsProps) {
  return (
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
  );
}
