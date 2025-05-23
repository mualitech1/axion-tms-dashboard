import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Clock, AlertCircle, Printer, Mail, FileText, Download, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  jobTitle?: string;
  jobId?: string;
  customerName?: string;
  carrierName?: string;
}

export function OrderConfirmationModal({
  isOpen,
  onClose,
  onComplete,
  jobTitle = "Transport Operation",
  jobId = "JOB-01234",
  customerName = "IKB Transport Customer",
  carrierName = "FastTrack Logistics"
}: OrderConfirmationModalProps) {
  const [stage, setStage] = useState<"preparing" | "sending" | "complete">("preparing");
  const [customerSent, setCustomerSent] = useState(false);
  const [carrierSent, setCarrierSent] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      // Reset states when modal opens
      setStage("preparing");
      setCustomerSent(false);
      setCarrierSent(false);
      setProgress(0);
      
      // Simulate document preparation
      const timer = setTimeout(() => {
        setProgress(100);
        setStage("sending");
        
        // Simulate sending to customer
        setTimeout(() => {
          setCustomerSent(true);
          
          // Simulate sending to carrier
          setTimeout(() => {
            setCarrierSent(true);
            setStage("complete");
          }, 1800);
        }, 1500);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (stage === "complete") {
      onComplete();
    }
    onClose();
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Order Confirmation Downloaded",
      description: "The document has been saved to your downloads folder",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Preparing Print",
      description: "Document has been sent to your printer",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#0f1629] to-[#0c101f] border-[#1a3246] text-[#e1eefb]">
        <DialogHeader>
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-[#0a9bdb] to-[#0adeee] p-1.5 rounded-md mr-3 shadow-glow">
              <FileText className="h-5 w-5 text-[#030619]" />
            </div>
            <DialogTitle className="text-xl bg-gradient-to-r from-[#0adeee] to-[#0a9bdb] bg-clip-text text-transparent">
              Quantum Order Confirmation
            </DialogTitle>
          </div>
          <p className="text-[#6b82a6] text-sm">
            Automated confirmation for <span className="text-[#0adeee] font-medium">{jobTitle}</span>
          </p>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {stage === "preparing" && (
            <div className="space-y-4">
              <div className="relative h-2 w-full bg-[#162233] rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-gradient-to-r from-[#0a9bdb] to-[#0adeee]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 2 }}
                />
              </div>
              
              <div className="flex justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="bg-[#162233] p-4 rounded-lg inline-flex items-center justify-center mb-3">
                      <Sparkles className="h-8 w-8 text-[#0adeee]" />
                    </div>
                  </motion.div>
                  <h3 className="text-[#e1eefb] font-medium">Preparing Documents</h3>
                  <p className="text-[#6b82a6] text-sm mt-1">
                    Generating quantum-encoded order confirmations
                  </p>
                </div>
              </div>
              
              <div className="bg-[#162233] rounded-md p-3 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#6b82a6]" />
                    <span>Customer Confirmation</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-[#5a7194]" />
                    <span className="text-[#5a7194]">Preparing...</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#6b82a6]" />
                    <span>Carrier Confirmation</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-[#5a7194]" />
                    <span className="text-[#5a7194]">Preparing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stage === "sending" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      x: [0, 3, -3, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="bg-[#162233] p-4 rounded-lg inline-flex items-center justify-center mb-3">
                      <Mail className="h-8 w-8 text-[#0adeee]" />
                    </div>
                  </motion.div>
                  <h3 className="text-[#e1eefb] font-medium">Sending Confirmations</h3>
                  <p className="text-[#6b82a6] text-sm mt-1">
                    Dispatching to customer and carrier
                  </p>
                </div>
              </div>
              
              <div className="bg-[#162233] rounded-md p-3 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#6b82a6]" />
                    <span>To: {customerName}</span>
                  </div>
                  {customerSent ? (
                    <div className="flex items-center">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-400" />
                      <span className="text-green-400">Sent</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="h-3.5 w-3.5 mr-1 text-blue-400" />
                      </motion.div>
                      <span className="text-blue-400">Sending...</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#6b82a6]" />
                    <span>To: {carrierName}</span>
                  </div>
                  {carrierSent ? (
                    <div className="flex items-center">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-400" />
                      <span className="text-green-400">Sent</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {customerSent ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="h-3.5 w-3.5 mr-1 text-blue-400" />
                          </motion.div>
                          <span className="text-blue-400">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3.5 w-3.5 mr-1 text-[#5a7194]" />
                          <span className="text-[#5a7194]">Queued</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {stage === "complete" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <div className="bg-[#172e3f] p-4 rounded-lg inline-flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-8 w-8 text-green-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-[#e1eefb] font-medium">Order Confirmations Complete</h3>
                  <p className="text-[#6b82a6] text-sm mt-1">
                    All confirmations have been successfully delivered
                  </p>
                </div>
              </div>
              
              <div className="bg-[#162233] rounded-md p-3 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#6b82a6]" />
                    <span>{customerName}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-400" />
                    <span className="text-green-400">Delivered</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#6b82a6]" />
                    <span>{carrierName}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-400" />
                    <span className="text-green-400">Delivered</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-[#1a3246] mt-2">
                  <div className="flex justify-between gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-[#1a3246] bg-[#162233] text-[#6b82a6] hover:bg-[#1a3246] hover:text-[#e1eefb] h-8"
                      onClick={handlePrint}
                    >
                      <Printer className="h-3.5 w-3.5 mr-1" />
                      Print
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-[#1a3246] bg-[#162233] text-[#6b82a6] hover:bg-[#1a3246] hover:text-[#e1eefb] h-8"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#172e3f] rounded-md p-3 border border-green-500/20">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-[#e1eefb] font-medium text-sm">Job #{jobId} is Ready</h4>
                    <p className="text-[#6b82a6] text-xs mt-1">
                      This job has been successfully booked with the carrier and confirmation has been sent to the customer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          {stage === "complete" ? (
            <Button 
              onClick={handleClose}
              className="flex-1 sm:flex-none bg-gradient-to-r from-[#0a9bdb] to-[#0adeee] text-[#030619] font-medium hover:from-[#0adeee] hover:to-[#0a9bdb]"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Continue
            </Button>
          ) : (
            <Button 
              disabled
              className="flex-1 sm:flex-none bg-[#162233] text-[#5a7194] cursor-not-allowed"
            >
              <Clock className="h-4 w-4 mr-2" />
              Processing...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 