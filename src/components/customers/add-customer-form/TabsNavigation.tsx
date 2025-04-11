
import { cn } from '@/lib/utils';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User, FileText, AlertCircle } from 'lucide-react';

interface TabsNavigationProps {
  activeTab: string;
  form: any; // Using any here as we only need form.formState.errors
  primaryContact: any | null;
}

export const TabsNavigation = ({ activeTab, form, primaryContact }: TabsNavigationProps) => {
  const getTabIndicatorClass = (tabName: string) => {
    // Return appropriate indicator based on tab validation status
    if (tabName === 'general') {
      return form.formState.errors.name || 
            form.formState.errors.address?.street ||
            form.formState.errors.address?.city ||
            form.formState.errors.address?.postcode ||
            form.formState.errors.address?.country ? 
              <AlertCircle className="ml-2 h-4 w-4 text-destructive animate-pulse" /> : null;
    }
    if (tabName === 'contacts') {
      return !primaryContact ? <AlertCircle className="ml-2 h-4 w-4 text-destructive animate-pulse" /> : null;
    }
    return null;
  };

  return (
    <TabsList className="grid grid-cols-3 mb-8 p-1 bg-muted/50 rounded-xl">
      <TabsTrigger 
        value="general" 
        className={cn(
          "data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-lg py-3 transition-all duration-300",
          "flex items-center gap-2"
        )}
      >
        <Building className="h-4 w-4" />
        <span>Company Information</span>
        {getTabIndicatorClass('general')}
      </TabsTrigger>
      <TabsTrigger 
        value="contacts"
        className={cn(
          "data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-lg py-3 transition-all duration-300",
          "flex items-center gap-2"
        )}
      >
        <User className="h-4 w-4" />
        <span>Contact Details</span>
        {getTabIndicatorClass('contacts')}
      </TabsTrigger>
      <TabsTrigger 
        value="terms"
        className={cn(
          "data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-lg py-3 transition-all duration-300",
          "flex items-center gap-2"
        )}
      >
        <FileText className="h-4 w-4" />
        <span>Terms & Credit</span>
      </TabsTrigger>
    </TabsList>
  );
};
