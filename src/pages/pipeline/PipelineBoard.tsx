
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus, Filter, SortAsc } from 'lucide-react';
import KanbanBoard from './components/kanban/KanbanBoard';
import { pipelineStages, initialLeadsData } from './data/pipelineData';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export default function PipelineBoard() {
  const [leads, setLeads] = useState(initialLeadsData);
  const navigate = useNavigate();
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // Create a copy of the leads
    const updatedLeads = [...leads];
    
    // Find the lead that was dragged
    const movedLead = updatedLeads.find(
      lead => lead.id === result.draggableId
    );
    
    if (movedLead) {
      // Get the original stage
      const originalStage = movedLead.stage;
      
      // Update the stage of the moved lead
      movedLead.stage = destination.droppableId;
      
      // Update leads with the new data
      setLeads(updatedLeads);
      
      console.log('Lead moved:', {
        leadId: movedLead.id,
        from: source.droppableId,
        to: destination.droppableId
      });
      
      // Check if the lead was moved to the "Won" stage (assuming the ID is "won")
      if (destination.droppableId === "won" && originalStage !== "won") {
        // Show success toast
        toast({
          title: "Lead won!",
          description: `${movedLead.company} has been converted to a customer.`,
        });
        
        // Auto-create customer from lead
        createCustomerFromLead(movedLead);
      }
    }
  };
  
  const createCustomerFromLead = (lead: any) => {
    // In a real application, you would make an API call to create a customer
    console.log('Creating customer from lead:', lead);
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, navigate to the newly created customer
      // For now, we'll just show another toast
      toast({
        title: "Customer Created",
        description: `${lead.company} has been added to your customers.`,
      });
      
      // Replace the DOM button creation with a proper React Button component wrapped in a function
      toast({
        title: "Customer Portal Activated",
        description: "The customer can now access their portal.",
        action: (
          <Button variant="outline" size="sm" onClick={() => navigate('/customers')}>
            View Customer
          </Button>
        ),
      });
    }, 1000);
  };

  return (
    <MainLayout title="Pipeline Board">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Board</h1>
          <p className="text-muted-foreground">
            Drag & drop leads between pipeline stages
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <SortAsc className="mr-2 h-4 w-4" />
            Sort
          </Button>
          <Link to="/pipeline/lead/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
          </Link>
        </div>
      </div>

      <KanbanBoard 
        stages={pipelineStages}
        leads={leads}
        onDragEnd={handleDragEnd}
      />
    </MainLayout>
  );
}
