
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InputWithIcon } from "@/components/ui/input-with-icon";

// Types
export interface Invoice {
  id: string;
  carrierName: string;
  dueDate: string;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  selected?: boolean;
}

interface CreateBatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentDate: Date | undefined;
  setPaymentDate: (date: Date | undefined) => void;
  availableInvoices: Invoice[];
  selectedInvoices: string[];
  onInvoiceSelection: (invoiceId: string) => void;
  onSelectAll: () => void;
  calculateSelectedTotal: () => number;
  onCreateBatch: () => void;
}

export function CreateBatchModal({
  open,
  onOpenChange,
  paymentDate,
  setPaymentDate,
  availableInvoices,
  selectedInvoices,
  onInvoiceSelection,
  onSelectAll,
  calculateSelectedTotal,
  onCreateBatch
}: CreateBatchModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Prepare New Payment Run</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Payment Date</p>
              <p className="text-xs text-muted-foreground">
                Select the date when this batch will be paid
              </p>
            </div>
            
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {paymentDate ? format(paymentDate, "dd/MM/yyyy") : "Select payment date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={paymentDate}
                    onSelect={setPaymentDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Available Approved Invoices</p>
                <p className="text-sm text-muted-foreground">
                  Select invoices to include in this payment batch
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onSelectAll}
                >
                  {selectedInvoices.length === availableInvoices.length ? "Deselect All" : "Select All"}
                </Button>
                
                <InputWithIcon
                  placeholder="Search invoices..."
                  className="w-[200px]"
                  icon={Search}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>

            <div className="border rounded-md max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Select</TableHead>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Net Amount (£)</TableHead>
                    <TableHead>VAT (£)</TableHead>
                    <TableHead>Total (£)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedInvoices.includes(invoice.id)}
                          onCheckedChange={() => onInvoiceSelection(invoice.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.carrierName}</TableCell>
                      <TableCell>{format(new Date(invoice.dueDate), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        £{invoice.amount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </TableCell>
                      <TableCell>
                        £{invoice.vatAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </TableCell>
                      <TableCell>
                        £{invoice.totalAmount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </TableCell>
                    </TableRow>
                  ))}
                  {availableInvoices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No approved invoices available for payment
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="border-t pt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Batch Summary</p>
              <div className="mt-1 space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">Invoices Selected:</span>{" "}
                  <span className="font-medium">{selectedInvoices.length}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Total Amount:</span>{" "}
                  <span className="font-medium">
                    £{calculateSelectedTotal().toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={onCreateBatch}>Create Payment Batch</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
