
import { supabase } from "@/integrations/supabase/client";

interface ProcessPaymentParams {
  invoiceId: string;
  amount: number;
  customer: string;
  description: string;
}

/**
 * Process a payment for an invoice using Stripe
 */
export async function processPayment({
  invoiceId,
  amount,
  customer,
  description
}: ProcessPaymentParams) {
  try {
    const { data, error } = await supabase.functions.invoke("process-payment", {
      body: {
        invoiceId,
        amount,
        customer,
        description
      }
    });
    
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Payment processing error:", error);
    throw error;
  }
}

/**
 * Verify the status of a payment
 */
export async function verifyPaymentStatus(paymentIntentId: string) {
  // In a real implementation, this would call a Supabase function to verify the payment status
  // For now, we'll just simulate a successful payment
  return { status: "succeeded" };
}
