
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, MapPin, Truck, User, Plus, Trash, Briefcase, Building, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

interface Address {
  companyName: string;
  contactName: string;
  addressLine1: string;
  city: string;
  postCode: string;
}

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreation({ onComplete }: JobCreationProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [additionalStops, setAdditionalStops] = useState<Address[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formCompletion, setFormCompletion] = useState<number>(25);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      jobTitle: "",
      vehicleType: "",
      priority: "medium",
      customer: "",
      rate: "",
      productType: "",
      totalWeight: "",
      additionalInformation: "",
      saveTemplate: false,
      collection: {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: "",
        reference: ""
      },
      delivery: {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: "",
        reference: ""
      }
    }
  });

  const totalSteps = 3;
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setFormCompletion((currentStep + 1) * (100 / totalSteps));
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFormCompletion((currentStep - 1) * (100 / totalSteps));
    }
  };

  const addStop = () => {
    setAdditionalStops([...additionalStops, {
      companyName: "",
      contactName: "",
      addressLine1: "",
      city: "",
      postCode: ""
    }]);
  };

  const removeStop = (index: number) => {
    const newStops = [...additionalStops];
    newStops.splice(index, 1);
    setAdditionalStops(newStops);
  };

  const updateAdditionalStop = (index: number, field: keyof Address, value: string) => {
    const newStops = [...additionalStops];
    newStops[index] = { ...newStops[index], [field]: value };
    setAdditionalStops(newStops);
  };

  const handleSubmit = (data: any) => {
    // In a real app, we would save this to a database
    const fullJobData = {
      ...data,
      date,
      additionalStops
    };
    
    console.log("Saving job:", fullJobData);
    
    // Save addresses for future use
    const newAddresses = [];
    if (!savedAddresses.some(addr => addr.addressLine1 === data.collection.addressLine1)) {
      newAddresses.push(data.collection);
    }
    if (!savedAddresses.some(addr => addr.addressLine1 === data.delivery.addressLine1)) {
      newAddresses.push(data.delivery);
    }
    
    if (newAddresses.length > 0) {
      setSavedAddresses([...savedAddresses, ...newAddresses]);
    }
    
    toast({
      title: "Job Created",
      description: `${data.jobTitle} has been scheduled for ${date ? format(date, "PPP") : "unspecified date"}`,
    });
    
    onComplete();
  };

  const AddressForm = ({ prefix, label }: { prefix: "collection" | "delivery", label: string }) => {
    return (
      <div className="space-y-4">
        <h3 className="text-md font-medium">{label}</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`${prefix}.companyName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <InputWithIcon icon={Building} placeholder="Enter company name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`${prefix}.contactName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <InputWithIcon icon={User} placeholder="Enter contact name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`${prefix}.reference`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{prefix === "collection" ? "Collection Reference" : "Delivery Reference"}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={`Enter ${prefix === "collection" ? "collection" : "delivery"} reference`} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <Label htmlFor={`${prefix}-date`}>Date & Time Window</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={`${prefix}-date`}
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="specific">Specific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name={`${prefix}.addressLine1`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <InputWithIcon icon={MapPin} placeholder="Enter address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`${prefix}.city`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter city" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`${prefix}.postCode`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter post code" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };

  const renderAdditionalStop = (stop: Address, index: number) => {
    return (
      <div key={index} className="p-6 border rounded-lg mb-5 shadow-sm bg-slate-50/50">
        <div className="flex justify-between mb-3">
          <h4 className="font-medium text-base flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            Additional Stop {index + 1}
          </h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeStop(index)}
                  className="h-8 w-8 p-0 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove this stop</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <InputWithIcon 
              icon={Building}
              value={stop.companyName}
              onChange={(e) => updateAdditionalStop(index, "companyName", e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Contact Name</Label>
            <InputWithIcon 
              icon={User}
              value={stop.contactName}
              onChange={(e) => updateAdditionalStop(index, "contactName", e.target.value)}
              placeholder="Enter contact name"
            />
          </div>
          
          <div className="col-span-2 space-y-2">
            <Label>Address Line 1</Label>
            <InputWithIcon 
              icon={MapPin}
              value={stop.addressLine1}
              onChange={(e) => updateAdditionalStop(index, "addressLine1", e.target.value)}
              placeholder="Enter address"
            />
          </div>
          
          <div className="space-y-2">
            <Label>City</Label>
            <Input 
              value={stop.city}
              onChange={(e) => updateAdditionalStop(index, "city", e.target.value)}
              placeholder="Enter city"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Post Code</Label>
            <Input 
              value={stop.postCode}
              onChange={(e) => updateAdditionalStop(index, "postCode", e.target.value)}
              placeholder="Enter post code"
            />
          </div>
        </div>
      </div>
    );
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={Briefcase} placeholder="Enter job title" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-10">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="acme">Acme Corp</SelectItem>
                        <SelectItem value="globex">Globex Corporation</SelectItem>
                        <SelectItem value="stark">Stark Industries</SelectItem>
                        <SelectItem value="wayne">Wayne Enterprises</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Job Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-10">
                          <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="flatbed">Flatbed</SelectItem>
                        <SelectItem value="refrigerated">Refrigerated</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate (£)</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={DollarSign} type="number" placeholder="Enter rate" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter product type" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Weight (KG)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter total weight" type="number" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-6">
              <Tabs defaultValue="collection" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="collection">Collection Details</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="collection" className="bg-white p-6 rounded-lg border shadow-sm">
                  <AddressForm prefix="collection" label="Collection Details" />
                </TabsContent>
                
                <TabsContent value="delivery" className="bg-white p-6 rounded-lg border shadow-sm">
                  <AddressForm prefix="delivery" label="Delivery Details" />
                </TabsContent>
              </Tabs>
            </div>
            
            {additionalStops.length > 0 && (
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  Additional Stops
                </h3>
                {additionalStops.map((stop, index) => renderAdditionalStop(stop, index))}
              </div>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={addStop}
              className="w-full mt-4 py-6 border-dashed border-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Additional Stop
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <FormField
                control={form.control}
                name="additionalInformation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Enter any additional information about this job"
                        className="min-h-[150px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Include any special instructions or requirements for this job
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-4">Job Summary</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Job Title</h4>
                    <p className="font-medium">{form.watch('jobTitle') || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Customer</h4>
                    <p className="font-medium">{form.watch('customer') || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Vehicle Type</h4>
                    <p className="font-medium">{form.watch('vehicleType') || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                    <p className="font-medium capitalize">{form.watch('priority') || 'Not specified'}</p>
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="saveTemplate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Save as template
                        </FormLabel>
                        <FormDescription>
                          Use these settings for future jobs
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600/90 to-indigo-600 text-white">
        <CardTitle className="text-xl flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Create New Job
        </CardTitle>
        <Progress value={formCompletion} className="h-2 mt-2" indicatorClassName="bg-white/90" />
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {renderCurrentStep()}
            
            <div className="flex justify-between pt-4 border-t mt-6">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  Back
                </Button>
              ) : (
                <Button variant="outline" type="button" onClick={onComplete}>
                  Cancel
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-200"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-200"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Job...
                    </>
                  ) : (
                    <>
                      Create Job
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
