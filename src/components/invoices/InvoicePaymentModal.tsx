import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, Check, Sparkles } from "lucide-react";
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
          description: `Quantum entanglement for operation ${invoice.id}`
        }
      });

      if (error) throw new Error(error.message);

      // Simulate successful payment process
      // In a production app, you would integrate with Stripe Elements or Checkout
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        
        toast({
          title: "Quantum entanglement complete",
          description: `Transaction ${invoice.id} has been successfully entangled.`,
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
        title: "Entanglement process failed",
        description: error instanceof Error ? error.message : "A quantum anomaly occurred",
        variant: "destructive",
      });
    }
  };

  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-aximo-darker border-aximo-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-aximo-text">Quantum Entanglement Process</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-aximo-text-secondary">Quantum ID:</span>
            <span className="font-medium text-aximo-text">{invoice.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-aximo-text-secondary">Entity:</span>
            <span className="font-medium text-aximo-text">{invoice.customer}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-aximo-text-secondary">Energy Units:</span>
            <span className="font-medium text-aximo-text">{formatCurrency(invoice.amount)}</span>
          </div>
          
          {success ? (
            <div className="flex flex-col items-center justify-center p-4 bg-green-950/30 border border-green-500/20 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-green-950/50 flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-green-400" />
              </div>
              <p className="font-medium text-green-400">Quantum Entanglement Successful</p>
            </div>
          ) : (
            <div className="border border-aximo-border rounded-lg p-4 bg-aximo-card">
              <p className="text-center text-sm text-aximo-text-secondary mb-3">
                Initiating quantum entanglement protocol. Stabilizing energy field for transaction processing.
              </p>
              <div className="flex items-center justify-center space-x-2 border border-aximo-border rounded p-3 bg-aximo-darker">
                <Zap className="h-5 w-5 text-aximo-primary" />
                <span className="text-aximo-text">Quantum Key: ****-****-****-4242</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {!success && (
            <>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                disabled={loading}
                className="border-aximo-border text-aximo-text hover:bg-aximo-darker/80"
              >
                Cancel Process
              </Button>
              <Button 
                onClick={handleProcessPayment} 
                disabled={loading || success}
                className="bg-gradient-to-r from-aximo-primary to-purple-600 hover:from-aximo-primary/90 hover:to-purple-700"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Entangling...' : 'Initiate Entanglement'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
