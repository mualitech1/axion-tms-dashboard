import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCreationFormData, AdditionalStop } from "@/pages/jobs/types/formTypes";
import { z } from "zod";
import { useEffect } from "react";

interface StepTwoProps {
  form: UseFormReturn<JobCreationFormData>;
  additionalStops: AdditionalStop[];
  onAddStop: () => void;
  onRemoveStop: (index: number) => void;
  onUpdateStop: (index: number, data: AdditionalStop) => void;
}

export function StepTwo({
  form,
  additionalStops,
  onAddStop,
  onRemoveStop,
  onUpdateStop
}: StepTwoProps) {
  // Debug: Log form values whenever they change
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("🔄 Step Two Form Values:", value);
      
      // Specifically check origin/destination values
      if (value.collection) {
        console.log("📍 Collection Address:", {
          addressLine1: value.collection.addressLine1,
          city: value.collection.city,
          postCode: value.collection.postCode
        });
      }
      
      if (value.delivery) {
        console.log("📍 Delivery Address:", {
          addressLine1: value.delivery.addressLine1,
          city: value.delivery.city,
          postCode: value.delivery.postCode
        });
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium text-white">Addresses & Contact Details</h3>
      
      {/* Collection Address */}
      <Card className="border-[#1a3246] bg-[#0a253a]">
        <CardHeader className="bg-[#051b2a] rounded-t-lg border-b border-[#1a3246] pb-3">
          <CardTitle className="text-md flex items-center">
            <div className="mr-2 w-6 h-6 rounded-full bg-[#0adeee]/10 flex items-center justify-center">
              <MapPin className="h-3 w-3 text-[#0adeee]" />
            </div>
            Collection Address
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="collection.addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Address Line 1*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter address line 1"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log("📝 Collection addressLine1 updated:", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="collection.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">City*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log("📝 Collection city updated:", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="collection.postCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Post Code*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post code"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log("📝 Collection postCode updated:", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="collection.companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter company name"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="collection.contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Contact Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter contact name"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="collection.reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Reference</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter reference"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="collection.instructions"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-white">Collection Instructions</FormLabel>
                <FormControl>
                  <textarea
                    rows={2}
                    placeholder="Any special instructions for collection"
                    className="flex min-h-[60px] w-full rounded-md border border-[#1a3246] bg-[#051b2a] px-3 py-2 text-sm text-white placeholder:text-[#6b82a6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0adeee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#051b2a] disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Additional Stops */}
      {additionalStops.map((stop, index) => (
        <Card key={`stop-${index}`} className="border-[#1a3246] bg-[#0a253a]">
          <CardHeader className="bg-[#051b2a] rounded-t-lg border-b border-[#1a3246] pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-md flex items-center">
              <div className="mr-2 w-6 h-6 rounded-full bg-[#0adeee]/10 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-[#0adeee]" />
              </div>
              Additional Stop {index + 1}
            </CardTitle>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-8 w-8 p-0" 
              onClick={() => onRemoveStop(index)}
              aria-label={`Remove stop ${index + 1}`}
            >
              <MinusCircle className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4 pb-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormItem>
                <FormLabel className="text-white">Address Line 1*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter address line 1"
                    className="bg-[#051b2a] border-[#1a3246] text-white"
                    defaultValue=""
                    value={stop.addressLine1 || ''}
                    onChange={(e) => 
                      onUpdateStop(index, { ...stop, addressLine1: e.target.value })
                    }
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel className="text-white">City*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter city"
                    className="bg-[#051b2a] border-[#1a3246] text-white"
                    defaultValue=""
                    value={stop.city || ''}
                    onChange={(e) => 
                      onUpdateStop(index, { ...stop, city: e.target.value })
                    }
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel className="text-white">Post Code*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter post code"
                    className="bg-[#051b2a] border-[#1a3246] text-white"
                    defaultValue=""
                    value={stop.postCode || ''}
                    onChange={(e) => 
                      onUpdateStop(index, { ...stop, postCode: e.target.value })
                    }
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel className="text-white">Instructions</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Any special instructions"
                    className="bg-[#051b2a] border-[#1a3246] text-white"
                    defaultValue=""
                    value={stop.instructions || ''}
                    onChange={(e) => 
                      onUpdateStop(index, { ...stop, instructions: e.target.value })
                    }
                  />
                </FormControl>
              </FormItem>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={onAddStop}
          className="bg-[#051b2a] border-[#1a3246] text-[#0adeee] hover:bg-[#0a253a] hover:text-[#0adeee]"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Stop
        </Button>
      </div>

      {/* Delivery Address */}
      <Card className="border-[#1a3246] bg-[#0a253a]">
        <CardHeader className="bg-[#051b2a] rounded-t-lg border-b border-[#1a3246] pb-3">
          <CardTitle className="text-md flex items-center">
            <div className="mr-2 w-6 h-6 rounded-full bg-[#0adeee]/10 flex items-center justify-center">
              <MapPin className="h-3 w-3 text-[#0adeee]" />
            </div>
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="delivery.addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Address Line 1*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter address line 1"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log("📝 Delivery addressLine1 updated:", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="delivery.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">City*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log("📝 Delivery city updated:", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="delivery.postCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Post Code*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post code"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log("📝 Delivery postCode updated:", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="delivery.companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter company name"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="delivery.contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Contact Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter contact name"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="delivery.reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Reference</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter reference"
                      className="bg-[#051b2a] border-[#1a3246] text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="delivery.instructions"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-white">Delivery Instructions</FormLabel>
                <FormControl>
                  <textarea
                    rows={2}
                    placeholder="Any special instructions for delivery"
                    className="flex min-h-[60px] w-full rounded-md border border-[#1a3246] bg-[#051b2a] px-3 py-2 text-sm text-white placeholder:text-[#6b82a6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0adeee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#051b2a] disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
} 