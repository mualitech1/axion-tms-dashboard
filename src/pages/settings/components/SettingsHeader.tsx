
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function SettingsHeader() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully saved.",
      variant: "default",
    });
  };
  
  return (
    <div className="flex justify-between items-center mb-8 pt-2">
      <div>
        <h1 className="text-3xl font-light tracking-tight text-tms-blue">
          <span className="font-semibold">System</span> Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure your application settings and personalize your experience
        </p>
      </div>
      
      <Button 
        onClick={handleSave}
        className="bg-gradient-to-r from-tms-blue to-tms-blue/90 hover:from-tms-blue/90 hover:to-tms-blue shadow-md transition-all hover:shadow-lg"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
}
