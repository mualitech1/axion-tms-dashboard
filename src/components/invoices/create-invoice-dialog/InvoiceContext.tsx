
import React, { createContext, useContext, ReactNode } from "react";
import { InvoiceFormContextValues } from "./InvoiceFormProvider";

interface InvoiceContextType extends InvoiceFormContextValues {
  isEditMode: boolean;
}

// Create context with a default value
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function useInvoiceContext() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoiceContext must be used within an InvoiceContextProvider");
  }
  return context;
}

interface InvoiceContextProviderProps {
  children: ReactNode;
  value: InvoiceContextType;
}

export function InvoiceContextProvider({ children, value }: InvoiceContextProviderProps) {
  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
}
