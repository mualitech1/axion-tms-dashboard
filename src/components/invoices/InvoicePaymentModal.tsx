
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, Check } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { supabase } from "@/integrations/supabase/client";

interface InvoicePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: {
    id: string;
    customer: string;
    amount: number;
  } | null;
  onPaymentSuccess?: (invoiceId: string) => void;
}

export function InvoicePaymentModal({
  open,
  onOpenChange,
  invoice,
  onPaymentSuccess
}: InvoicePaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setLoading(false);
      setSuccess(false);
    }
  }, [open]);

  const handleProcessPayment = async () => {
    if (!invoice) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("process-payment", {
        body: {
          invoiceId: invoice.id,
          amount: invoice.amount,
          customer: invoice.customer,
          description: `Payment for invoice ${invoice.id}`
        }
      });

      if (error) throw new Error(error.message);

      // Simulate successful payment process
      // In a production app, you would integrate with Stripe Elements or Checkout
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        
        toast({
          title: "Payment processed successfully",
          description: `Invoice ${invoice.id} has been paid.`,
        });
        
        // Wait a moment to show success state
        setTimeout(() => {
          onOpenChange(false);
          if (onPaymentSuccess) {
            onPaymentSuccess(invoice.id);
          }
        }, 1500);
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Payment processing failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Process Payment</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Invoice ID:</span>
            <span className="font-medium">{invoice.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Customer:</span>
            <span className="font-medium">{invoice.customer}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">{formatCurrency(invoice.amount)}</span>
          </div>
          
          {success ? (
            <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-medium text-green-800">Payment Successful</p>
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-center text-sm text-gray-600 mb-3">
                This is a demo payment interface. In production, this would connect to Stripe Elements or Checkout.
              </p>
              <div className="flex items-center justify-center space-x-2 border rounded p-3 bg-white">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <span className="text-gray-800">**** **** **** 4242</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {!success && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleProcessPayment} disabled={loading || success}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
