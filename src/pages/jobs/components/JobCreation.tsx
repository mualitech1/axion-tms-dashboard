
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
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
import { CalendarIcon, MapPin, Truck, User, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      jobTitle: "",
      vehicleType: "",
      priority: "medium",
      collection: {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: ""
      },
      delivery: {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: ""
      }
    }
  });

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
                  <Input {...field} placeholder="Enter company name" />
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
                  <Input {...field} placeholder="Enter contact name" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`${prefix}.addressLine1`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} placeholder="Enter address" className="pl-10" />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
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
      <div key={index} className="p-4 border rounded-md mb-4">
        <div className="flex justify-between mb-3">
          <h4 className="font-medium">Additional Stop {index + 1}</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => removeStop(index)}
            className="h-7 w-7 p-0"
          >
            <Trash className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input 
              value={stop.companyName}
              onChange={(e) => updateAdditionalStop(index, "companyName", e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Contact Name</Label>
            <Input 
              value={stop.contactName}
              onChange={(e) => updateAdditionalStop(index, "contactName", e.target.value)}
              placeholder="Enter contact name"
            />
          </div>
          
          <div className="col-span-2 space-y-2">
            <Label>Address Line 1</Label>
            <div className="relative">
              <Input 
                value={stop.addressLine1}
                onChange={(e) => updateAdditionalStop(index, "addressLine1", e.target.value)}
                placeholder="Enter address"
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
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

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle>Create New Job</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter job title" required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
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
                        <SelectTrigger>
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
            </div>
            
            <div className="border-t pt-6">
              <Tabs defaultValue="collection" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="collection">Collection Details</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="collection">
                  <AddressForm prefix="collection" label="Collection Details" />
                </TabsContent>
                
                <TabsContent value="delivery">
                  <AddressForm prefix="delivery" label="Delivery Details" />
                </TabsContent>
              </Tabs>
            </div>
            
            {additionalStops.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-md font-medium mb-4">Additional Stops</h3>
                {additionalStops.map((stop, index) => renderAdditionalStop(stop, index))}
              </div>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={addStop}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Additional Stop
            </Button>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" type="button" onClick={onComplete}>
                Cancel
              </Button>
              <Button type="submit">
                Create Job
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
