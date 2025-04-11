
import { useState } from "react";
import { X, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

interface InvoiceItem {
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

interface InvoiceLineItemsProps {
  items: InvoiceItem[];
  handleItemChange: (index: number, field: string, value: string) => void;
  addInvoiceItem: () => void;
  removeInvoiceItem: (index: number) => void;
  calculateTotal: () => number;
}

export function InvoiceLineItems({
  items,
  handleItemChange,
  addInvoiceItem,
  removeInvoiceItem,
  calculateTotal
}: InvoiceLineItemsProps) {
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
                    className="border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    type="number"
                    min="1"
                    className="border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
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
                      className="pl-5 border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
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

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addInvoiceItem}
        className="text-blue-600 border-dashed border-blue-300"
      >
        + Add Another Line Item
      </Button>

      <div className="flex justify-between p-4 bg-gray-50 rounded-md mt-4">
        <span className="font-medium">Total Amount:</span>
        <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
      </div>
    </div>
  );
}
