import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select-with-icon';
import { Textarea } from '@/components/ui/textarea';
import { Building, Map, Briefcase, ChevronsRight, Globe, Network, Server, Activity, DollarSign, Factory, Home, Mail, FileText, MapPin, Info, HelpCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CustomerFormValues } from './types';
import { FormNavButtons } from './FormNavButtons';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RequiredIndicator } from '@/components/ui/required-indicator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Building2 } from 'lucide-react';

interface CompanyInfoTabProps {
  form: UseFormReturn<CustomerFormValues>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CompanyInfoTab = ({ form, activeTab, setActiveTab }: CompanyInfoTabProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <motion.div
      className="p-4 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="name" className="flex items-center gap-1">
                Company Name
                <RequiredIndicator />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The official registered name of the company</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <FormControl>
                <InputWithIcon
                  id="name"
                  icon={<Building className="h-4 w-4 text-indigo-400" />}
                  error={form.formState.errors.name?.message}
                  {...field}
                  className="w-full"
                  placeholder="Acme Corporation"
                  onBlur={() => {
                    field.onBlur();
                    form.trigger("name");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="status" className="flex items-center gap-1">
                Status
                <RequiredIndicator />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The current operational status of this customer account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <FormControl>
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("status");
                  }}
                >
                  <SelectTrigger
                    id="status"
                    icon={<Activity className="h-4 w-4 text-indigo-400" />}
                    error={form.formState.errors.status?.message ? String(form.formState.errors.status?.message) : undefined}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Customer Status</SelectLabel>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creditLimit"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="creditLimit" className="flex items-center gap-1">
                Credit Limit
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Maximum credit extended to this customer (in USD)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <FormControl>
                <InputWithIcon
                  id="creditLimit"
                  icon={<DollarSign className="h-4 w-4 text-indigo-400" />}
                  error={form.formState.errors.creditLimit?.message}
                  {...field}
                  className="w-full"
                  placeholder="10000"
                  type="number"
                  onBlur={() => {
                    field.onBlur();
                    form.trigger("creditLimit");
                  }}
                />
              </FormControl>
              <p className="text-xs text-indigo-600">Leave empty for no limit</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="industry" className="flex items-center gap-1">
                Industry
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The primary business sector of this customer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <FormControl>
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("industry");
                  }}
                >
                  <SelectTrigger
                    id="industry"
                    icon={<Factory className="h-4 w-4 text-indigo-400" />}
                    error={form.formState.errors.industry?.message ? String(form.formState.errors.industry?.message) : undefined}
                  >
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Primary Industry</SelectLabel>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="financial">Financial Services</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <h3 className="text-md font-medium mb-3 text-indigo-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Address Information
          </h3>
          <Separator className="mb-4" />
        </div>

        <FormField
          control={form.control}
          name="address.street"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="street" className="flex items-center gap-1">
                Street Address
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Physical location street address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <InputWithIcon
                id="street"
                icon={<Home className="h-4 w-4 text-indigo-400" />}
                error={form.formState.errors.address?.street?.message}
                {...field}
                className="w-full"
                placeholder="123 Business Ave"
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="address.city"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-1">
                City
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>City of the business address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <InputWithIcon
                id="city"
                icon={<Building2 className="h-4 w-4 text-indigo-400" />}
                error={form.formState.errors.address?.city?.message}
                {...field}
                className="w-full"
                placeholder="Techville"
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="address.postcode"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="postcode" className="flex items-center gap-1">
                Postal/ZIP Code
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Postal or ZIP code for the address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <InputWithIcon
                id="postcode"
                icon={<Mail className="h-4 w-4 text-indigo-400" />}
                error={form.formState.errors.address?.postcode?.message}
                {...field}
                className="w-full"
                placeholder="12345"
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="address.country"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center gap-1">
                Country
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Country where the business is located</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <InputWithIcon
                id="country"
                icon={<Globe className="h-4 w-4 text-indigo-400" />}
                error={form.formState.errors.address?.country?.message}
                {...field}
                className="w-full"
                placeholder="United States"
              />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-full">
          <h3 className="text-md font-medium mb-3 text-indigo-700 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Additional Information
          </h3>
          <Separator className="mb-4" />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-1">
                Notes & Special Requirements
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Any additional information or special requirements for this customer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional notes or special requirements..."
                className="w-full min-h-[100px]"
                {...field}
              />
              {form.formState.errors.notes?.message && (
                <p className="text-xs text-red-500">{String(form.formState.errors.notes.message)}</p>
              )}
            </div>
          )}
        />
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <FormNavButtons 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          nextStep="contacts"
        />
      </motion.div>
    </motion.div>
  );
};
