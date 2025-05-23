import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Database, Plus } from 'lucide-react';
import { setupTestEnvironment } from '@/data/customer-data';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export function SetupButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSetupEnvironment = async () => {
    setIsLoading(true);
    try {
      const result = await setupTestEnvironment();
      toast({
        title: "Environment Setup Complete",
        description: result.message
      });
    } catch (error) {
      console.error("Error setting up environment:", error);
      toast({
        title: "Setup Failed",
        description: "Failed to set up test environment. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex gap-2">
      <Button 
        onClick={handleSetupEnvironment} 
        disabled={isLoading} 
        className="bg-gradient-to-r from-aximo-primary to-aximo-light hover:opacity-90"
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Setting Up...
          </>
        ) : (
          <>
            <Database className="h-4 w-4 mr-2" />
            Setup Test Environment
          </>
        )}
      </Button>
      
      <Link to="/jobs/create">
        <Button className="bg-aximo-primary text-white hover:bg-aximo-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Job
        </Button>
      </Link>
    </div>
  );
} 