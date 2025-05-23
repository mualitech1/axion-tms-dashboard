import { Zap, Sparkles } from "lucide-react";
import { DialogHeader as UIDialogHeader, DialogTitle } from "@/components/ui/dialog";

interface InvoiceDialogHeaderProps {
  isEditMode?: boolean;
}

export function InvoiceDialogHeader({ isEditMode = false }: InvoiceDialogHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-aximo-primary to-purple-600 p-6 text-white">
      <UIDialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center">
          {isEditMode ? (
            <>
              <Sparkles className="mr-2 h-6 w-6" />
              Recalibrate Quantum Transaction
            </>
          ) : (
            <>
              <Zap className="mr-2 h-6 w-6" />
              Initialize New Quantum Transaction
            </>
          )}
        </DialogTitle>
        <p className="text-blue-100 mt-2">
          {isEditMode 
            ? "Adjust quantum parameters of existing transaction matrix" 
            : "Configure spatio-temporal properties for new energy transaction"}
        </p>
      </UIDialogHeader>
    </div>
  );
}
