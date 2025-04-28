
import { Plus, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface JobsHeaderProps {
  onCreateJob: () => void;
  onRefresh: () => void;
}

export function JobsHeader({ onCreateJob, onRefresh }: JobsHeaderProps) {
  const { toast } = useToast();

  const handleRefresh = () => {
    onRefresh();
    toast({
      title: "Refreshing jobs",
      description: "The jobs list is being refreshed."
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div className="relative">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aximo-primary via-blue-400 to-purple-500 mb-1 animate-text">
          Jobs Dashboard
        </h1>
        <p className="text-aximo-text-secondary">
          Manage and track all your transportation jobs in one place
        </p>
        <div className="absolute -inset-1 bg-gradient-to-r from-aximo-primary/20 to-transparent blur-lg opacity-50 -z-10" />
      </div>
      
      <div className="flex flex-col md:flex-row gap-2 w-full lg:w-auto">
        <Button 
          onClick={onCreateJob}
          className="bg-gradient-to-r from-aximo-primary to-blue-600 hover:from-blue-600 hover:to-aximo-primary text-white transition-all duration-300 shadow-lg hover:shadow-aximo-primary/20"
          size="lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Job
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleRefresh} 
          size="icon" 
          className="border-aximo-border hover:border-aximo-primary hover:bg-aximo-primary/10 transition-all duration-300"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
