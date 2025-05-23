import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomerTypeAhead from "@/components/customers/CustomerTypeAhead";
import { InvoiceItemsTable } from "./InvoiceItemsTable";

// Define InvoiceItem interface to match what we use in InvoiceItemsTable
interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// Create a simple adapter for CustomerTypeAhead to match our needs
// This bridges the gap between the existing component and our form requirements
const CustomerTypeAheadAdapter = ({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (id: string, name: string | undefined) => void 
}) => {
  const handleSelectCustomer = (customer: any) => {
    if (customer) {
      onChange(customer.id, customer.name);
    } else {
      onChange("", undefined);
    }
  };

  // Get the selected customer (in a real app, this would fetch by ID)
  const selectedCustomer = value ? { id: value, name: "Selected Customer" } : null;

  return (
    <CustomerTypeAhead
      onSelectCustomer={handleSelectCustomer}
      selectedCustomer={selectedCustomer}
      placeholder="Select a customer..."
    />
  );
};

const invoiceSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  customerName: z.string().optional(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  date: z.date({
    required_error: "Invoice date is required",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  terms: z.string().optional(),
  status: z.enum(["draft", "pending", "paid", "overdue", "cancelled"]),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string(),
      description: z.string().min(1, "Description is required"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      rate: z.number().min(0, "Rate cannot be negative"),
      amount: z.number(),
    })
  ).min(1, "At least one item is required"),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

interface CreateInvoiceFormProps {
  id?: string;
  customerId?: string;
  onSubmit: (data: InvoiceFormValues) => void;
  isSubmitting?: boolean;
}

export function CreateInvoiceForm({ 
  id, 
  customerId, 
  onSubmit, 
  isSubmitting = false 
}: CreateInvoiceFormProps) {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 }
  ]);
  
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customerId: customerId || "",
      customerName: "",
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      terms: "Net 30",
      status: "draft",
      notes: "",
      items: items,
    },
  });

  // Update form when items change
  useEffect(() => {
    form.setValue("items", items);
  }, [form, items]);

  // Handle form submission
  const handleFormSubmit = (data: InvoiceFormValues) => {
    onSubmit(data);
  };

  // Handle changes to invoice items
  const handleItemChange = (updatedItems: InvoiceItem[]) => {
    setItems(updatedItems);
  };

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  
  // Calculate tax (example: 10%)
  const taxRate = 0.10;
  const tax = subtotal * taxRate;
  
  // Calculate total
  const total = subtotal + tax;

  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Customer</FormLabel>
                  <CustomerTypeAheadAdapter
                    value={field.value}
                    onChange={(value, name) => {
                      field.onChange(value);
                      form.setValue("customerName", name || "");
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Number</FormLabel>
                  <FormControl>
                    <Input placeholder="INV-000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invoice Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Invoice Items</h3>
          <InvoiceItemsTable items={items} onChange={handleItemChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional notes or payment instructions..."
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-aximo-border">
              <span>Subtotal:</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-aximo-border">
              <span>Tax (10%):</span>
              <span>£{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total:</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
} 