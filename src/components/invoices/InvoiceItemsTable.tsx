import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  onChange: (items: InvoiceItem[]) => void;
}

export function InvoiceItemsTable({ items, onChange }: InvoiceItemsTableProps) {
  const [localItems, setLocalItems] = useState<InvoiceItem[]>(items);

  // Update local items when prop changes
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  // Update parent when local items change
  useEffect(() => {
    onChange(localItems);
  }, [localItems, onChange]);

  // Add a new empty item
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0
    };
    
    setLocalItems([...localItems, newItem]);
  };

  // Remove an item by id
  const handleRemoveItem = (id: string) => {
    setLocalItems(localItems.filter(item => item.id !== id));
  };

  // Update an item property
  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = localItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate amount when quantity or rate changes
        if (field === 'quantity' || field === 'rate') {
          const quantity = field === 'quantity' ? Number(value) : item.quantity;
          const rate = field === 'rate' ? Number(value) : item.rate;
          updatedItem.amount = quantity * rate;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setLocalItems(updatedItems);
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md border-aximo-border overflow-hidden">
        <Table>
          <TableHeader className="bg-aximo-darker">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-1/3">Description</TableHead>
              <TableHead className="w-1/6 text-right">Quantity</TableHead>
              <TableHead className="w-1/6 text-right">Rate</TableHead>
              <TableHead className="w-1/6 text-right">Amount</TableHead>
              <TableHead className="w-1/12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-aximo-darker/30">
                <TableCell>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                    className="border-none bg-transparent focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                    className="w-20 ml-auto border-none bg-transparent focus-visible:ring-0 text-right"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span className="mr-1">£</span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => handleItemChange(item.id, 'rate', Number(e.target.value))}
                      className="w-20 border-none bg-transparent focus-visible:ring-0 text-right"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  £{item.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={localItems.length <= 1}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-100/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddItem}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        <span>Add Item</span>
      </Button>
    </div>
  );
} 