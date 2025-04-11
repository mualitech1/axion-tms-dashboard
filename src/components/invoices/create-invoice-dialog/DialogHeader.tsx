
import { FileText } from "lucide-react";
import { DialogHeader as UIDialogHeader, DialogTitle } from "@/components/ui/dialog";

export function InvoiceDialogHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
      <UIDialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6" />
          Create New Invoice
        </DialogTitle>
        <p className="text-blue-100 mt-2">Enter the details to generate a new invoice</p>
      </UIDialogHeader>
    </div>
  );
}
