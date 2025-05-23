import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '@/types/customer';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { useToast } from '@/components/ui/use-toast';
import { 
  Download, 
  Plus, 
  Trash2, 
  FileText, 
  Send, 
  Save, 
  PenTool 
} from 'lucide-react';
import { format } from 'date-fns';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceFormData {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  customer: Customer | null;
  customerId: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  terms: string;
}

interface InvoiceCreatorProps {
  customerId?: string;
}

const TAX_RATES = [
  { label: 'No Tax (0%)', value: 0 },
  { label: 'VAT (20%)', value: 20 },
  { label: 'Sales Tax (5%)', value: 5 },
  { label: 'Custom', value: 'custom' }
];

const TERMS = [
  'Payment due within 30 days.',
  'Payment due within 14 days.',
  'Payment due upon receipt.',
  'Custom terms...'
];

const calculateItemAmount = (quantity: number, rate: number): number => {
  return quantity * rate;
};

const calculateSubtotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + item.amount, 0);
};

const calculateTaxAmount = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

const calculateTotal = (subtotal: number, taxAmount: number): number => {
  return subtotal + taxAmount;
};

export default function InvoiceCreator({ customerId }: InvoiceCreatorProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customTaxRate, setCustomTaxRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCustomTerms, setIsCustomTerms] = useState<boolean>(false);
  
  const [invoice, setInvoice] = useState<InvoiceFormData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    customer: null,
    customerId: customerId || '',
    items: [
      {
        id: '1',
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    notes: '',
    terms: TERMS[0]
  });
  
  // Load customer data if customerId is provided
  useEffect(() => {
    if (customerId) {
      fetchCustomerData(customerId);
    }
  }, [customerId]);
  
  // Recalculate totals when items or tax rate changes
  useEffect(() => {
    const subtotal = calculateSubtotal(invoice.items);
    const taxAmount = calculateTaxAmount(subtotal, invoice.taxRate);
    const total = calculateTotal(subtotal, taxAmount);
    
    setInvoice(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  }, [invoice.items, invoice.taxRate]);
  
  const fetchCustomerData = async (id: string) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // For now, we'll simulate a fetch with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock customer data
      const mockCustomer: Customer = {
        id,
        name: 'Acme Corporation',
        contact: 'John Doe',
        email: 'john@acme.com',
        phone: '123-456-7890',
        status: 'active',
        creditLimit: 5000,
        address: {
          street: '123 Business Ave',
          city: 'Commerce City',
          postcode: '12345',
          country: 'United States'
        }
      };
      
      setCustomer(mockCustomer);
      setInvoice(prev => ({
        ...prev,
        customer: mockCustomer,
        customerId: id
      }));
    } catch (error) {
      console.error('Error fetching customer:', error);
      toast({
        title: 'Error',
        description: 'Failed to load customer data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const addInvoiceItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };
  
  const removeInvoiceItem = (itemId: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };
  
  const updateInvoiceItem = (
    itemId: string, 
    field: keyof InvoiceItem, 
    value: string | number
  ) => {
    setInvoice(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          
          // If quantity or rate changes, recalculate amount
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = calculateItemAmount(
              field === 'quantity' ? Number(value) : item.quantity,
              field === 'rate' ? Number(value) : item.rate
            );
          }
          
          return updatedItem;
        }
        return item;
      });
      
      return {
        ...prev,
        items: updatedItems
      };
    });
  };
  
  const handleTaxRateChange = (value: string) => {
    if (value === 'custom') {
      setInvoice(prev => ({
        ...prev,
        taxRate: customTaxRate
      }));
    } else {
      setInvoice(prev => ({
        ...prev,
        taxRate: Number(value)
      }));
    }
  };
  
  const handleCustomTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCustomTaxRate(isNaN(value) ? 0 : value);
    setInvoice(prev => ({
      ...prev,
      taxRate: isNaN(value) ? 0 : value
    }));
  };
  
  const handleTermsChange = (value: string) => {
    if (value === 'Custom terms...') {
      setIsCustomTerms(true);
    } else {
      setIsCustomTerms(false);
      setInvoice(prev => ({
        ...prev,
        terms: value
      }));
    }
  };
  
  const handleCustomTermsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInvoice(prev => ({
      ...prev,
      terms: e.target.value
    }));
  };
  
  const handleInvoiceDateChange = (date: Date | undefined) => {
    if (date) {
      setInvoice(prev => ({
        ...prev,
        invoiceDate: date
      }));
    }
  };
  
  const handleDueDateChange = (date: Date | undefined) => {
    if (date) {
      setInvoice(prev => ({
        ...prev,
        dueDate: date
      }));
    }
  };
  
  const handleSaveInvoice = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Invoice Saved',
        description: `Invoice ${invoice.invoiceNumber} has been saved successfully.`,
        variant: 'default'
      });
      
      // In a real app, we would save the invoice and then redirect
      // navigate(`/invoices/${newInvoiceId}`);
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast({
        title: 'Error',
        description: 'Failed to save invoice. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePreviewInvoice = () => {
    // This would open a modal or new tab with the invoice preview
    toast({
      title: 'Invoice Preview',
      description: 'This feature is coming soon!',
      variant: 'default'
    });
  };
  
  const handleSendInvoice = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Invoice Sent',
        description: `Invoice ${invoice.invoiceNumber} has been sent to ${customer?.email}.`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Error sending invoice:', error);
      toast({
        title: 'Error',
        description: 'Failed to send invoice. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Invoice</h1>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handlePreviewInvoice}
          >
            <FileText className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveInvoice}
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Invoice
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>
                Enter the details for this invoice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoice.invoiceNumber}
                    onChange={(e) => setInvoice(prev => ({
                      ...prev,
                      invoiceNumber: e.target.value
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Tax Rate</Label>
                  <div className="flex gap-2">
                    <Select 
                      onValueChange={handleTaxRateChange}
                      defaultValue="0"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select tax rate" />
                      </SelectTrigger>
                      <SelectContent>
                        {TAX_RATES.map(rate => (
                          <SelectItem key={rate.label} value={rate.value.toString()}>
                            {rate.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {invoice.taxRate === customTaxRate && (
                      <Input 
                        type="number"
                        placeholder="Custom %"
                        value={customTaxRate}
                        onChange={handleCustomTaxRateChange}
                        className="w-24"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Invoice Date</Label>
                  <DatePicker
                    date={invoice.invoiceDate}
                    onSelect={handleInvoiceDateChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <DatePicker
                    date={invoice.dueDate}
                    onSelect={handleDueDateChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
              <CardDescription>
                {customer ? `Invoice to ${customer.name}` : 'Select a customer for this invoice'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer ? (
                <div className="space-y-4 p-4 border rounded-md">
                  <div className="font-medium text-lg">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {customer.address?.street}<br />
                    {customer.address?.city}, {customer.address?.postcode}<br />
                    {customer.address?.country}
                  </div>
                  <div className="text-sm">
                    <div>{customer.contact}</div>
                    <div>{customer.email}</div>
                    <div>{customer.phone}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed rounded-md">
                  {isLoading ? (
                    <div>Loading customer information...</div>
                  ) : (
                    <div>
                      <p className="mb-2">No customer selected</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/customers')}
                      >
                        Select Customer
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Invoice Items</CardTitle>
                <CardDescription>
                  Add items to your invoice
                </CardDescription>
              </div>
              <Button 
                onClick={addInvoiceItem} 
                variant="outline" 
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Item Headers */}
                <div className="grid grid-cols-12 gap-2 font-medium text-sm px-4 pb-2">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Rate</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-1"></div>
                </div>
                
                {/* Invoice Items */}
                <div className="space-y-3">
                  {invoice.items.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-5">
                        <Input 
                          value={item.description}
                          onChange={(e) => updateInvoiceItem(item.id, 'description', e.target.value)}
                          placeholder="Item description"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input 
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateInvoiceItem(
                            item.id, 
                            'quantity', 
                            parseInt(e.target.value) || 0
                          )}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input 
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateInvoiceItem(
                            item.id, 
                            'rate', 
                            parseFloat(e.target.value) || 0
                          )}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input 
                          type="number"
                          readOnly
                          value={item.amount.toFixed(2)}
                          className="bg-muted"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeInvoiceItem(item.id)}
                          disabled={invoice.items.length === 1}
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-end space-y-2 border-t p-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm w-full max-w-xs">
                <div className="text-muted-foreground">Subtotal:</div>
                <div className="text-right font-medium">
                  ${invoice.subtotal.toFixed(2)}
                </div>
                
                <div className="text-muted-foreground">Tax ({invoice.taxRate}%):</div>
                <div className="text-right font-medium">
                  ${invoice.taxAmount.toFixed(2)}
                </div>
                
                <div className="text-base font-semibold pt-2">Total:</div>
                <div className="text-right text-base font-bold pt-2">
                  ${invoice.total.toFixed(2)}
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes to display on the invoice"
                  value={invoice.notes}
                  onChange={(e) => setInvoice(prev => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="terms">Terms & Conditions</Label>
                <div className="space-y-2">
                  <Select 
                    onValueChange={handleTermsChange}
                    defaultValue={TERMS[0]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select terms" />
                    </SelectTrigger>
                    <SelectContent>
                      {TERMS.map(term => (
                        <SelectItem key={term} value={term}>
                          {term}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {isCustomTerms && (
                    <Textarea
                      placeholder="Enter custom terms and conditions"
                      value={invoice.terms}
                      onChange={handleCustomTermsChange}
                      rows={3}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                onClick={handleSaveInvoice}
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Invoice
              </Button>
              
              <Button 
                className="w-full" 
                variant="outline"
                onClick={handlePreviewInvoice}
              >
                <FileText className="h-4 w-4 mr-2" />
                Preview Invoice
              </Button>
              
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate(`/invoices/design/${invoice.invoiceNumber}`)}
              >
                <PenTool className="h-4 w-4 mr-2" />
                Customize Design
              </Button>
              
              <Separator />
              
              <Button 
                className="w-full" 
                disabled={!customer || isLoading}
                onClick={handleSendInvoice}
              >
                <Send className="h-4 w-4 mr-2" />
                Send to Customer
              </Button>
              
              <Button 
                className="w-full" 
                variant="outline"
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Invoice Number:</dt>
                  <dd className="font-medium">{invoice.invoiceNumber}</dd>
                </div>
                
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Date:</dt>
                  <dd className="font-medium">
                    {format(invoice.invoiceDate, 'dd MMM yyyy')}
                  </dd>
                </div>
                
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Due Date:</dt>
                  <dd className="font-medium">
                    {format(invoice.dueDate, 'dd MMM yyyy')}
                  </dd>
                </div>
                
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Customer:</dt>
                  <dd className="font-medium">{customer?.name || 'Not selected'}</dd>
                </div>
                
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Items:</dt>
                  <dd className="font-medium">{invoice.items.length}</dd>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal:</dt>
                  <dd className="font-medium">${invoice.subtotal.toFixed(2)}</dd>
                </div>
                
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tax ({invoice.taxRate}%):</dt>
                  <dd className="font-medium">${invoice.taxAmount.toFixed(2)}</dd>
                </div>
                
                <div className="flex justify-between text-base font-bold mt-4">
                  <dt>Total:</dt>
                  <dd>${invoice.total.toFixed(2)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 