import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Trash2, Zap, Package, Calculator } from "lucide-react";
import { useInvoiceContext } from "./InvoiceContext";
import { motion, AnimatePresence } from "framer-motion";

export function InvoiceLineItems() {
  const { 
    form, 
    addInvoiceItem, 
    removeInvoiceItem, 
    handleItemChange, 
    calculateTotal 
  } = useInvoiceContext();

  const items = form.watch("items") || [];
  const subtotal = calculateTotal();
  const vatRate = 0.2; // 20% VAT
  const vatAmount = subtotal * vatRate;
  const totalAmount = subtotal + vatAmount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-cyan-600 rounded-lg">
          <Package className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Quantum Service Matrix</h3>
          <p className="text-sm text-gray-400">Define the services and their energy requirements</p>
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-4 bg-gray-800/50 border-gray-600 hover:border-gray-500 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  {/* Description */}
                  <div className="md:col-span-5">
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Service Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter quantum service details..."
                              className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                              rows={2}
                              onChange={(e) => {
                                field.onChange(e);
                                handleItemChange(index, "description", e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Quantity</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="1"
                              step="1"
                              placeholder="1"
                              className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400"
                              onChange={(e) => {
                                field.onChange(e);
                                handleItemChange(index, "quantity", e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Unit Price */}
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.rate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Unit Price (£)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400"
                              onChange={(e) => {
                                field.onChange(e);
                                handleItemChange(index, "rate", e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Line Total */}
                  <div className="md:col-span-2">
                    <Label className="text-white text-sm">Line Total</Label>
                    <div className="h-9 px-3 py-2 bg-gray-900/30 border border-gray-600 rounded-md flex items-center text-gray-400">
                      £{((parseFloat(item.quantity || "1") * parseFloat(item.rate || "0")) || 0).toFixed(2)}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="md:col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInvoiceItem(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20 mt-6"
                      disabled={items.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add New Item Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={addInvoiceItem}
            className="w-full border-dashed border-gray-600 text-gray-400 hover:border-cyan-500 hover:text-cyan-400 hover:bg-cyan-900/10 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Quantum Service Line
          </Button>
        </motion.div>
      </div>

      {/* Financial Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="h-5 w-5 text-purple-400" />
          <h4 className="text-white font-medium">Energy Transaction Summary</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">Subtotal:</span>
            <span className="text-white font-mono">£{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">VAT (20%):</span>
            <span className="text-white font-mono">£{vatAmount.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-600 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total Amount:</span>
              <span className="text-xl font-bold text-cyan-400 font-mono">£{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Quantum Energy Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-gray-400">
              Quantum Energy Level: {items.length === 0 ? 'Dormant' : items.length === 1 ? 'Stable' : items.length <= 3 ? 'Active' : 'Supercharged'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
