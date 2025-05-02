
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus, Filter, SortAsc } from 'lucide-react';
import KanbanBoard from './components/kanban/KanbanBoard';
import { pipelineStages, initialLeadsData } from './data/pipelineData';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <motion.h1 
              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-aximo-text to-aximo-primary bg-clip-text text-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Pipeline Board
            </motion.h1>
            <motion.p 
              className="text-aximo-text-secondary"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Drag & drop leads between pipeline stages
            </motion.p>
          </div>
          <motion.div 
            className="flex gap-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="outline" className="border-aximo-border bg-aximo-dark hover:bg-aximo-primary/10 hover:text-aximo-primary transition-all">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="border-aximo-border bg-aximo-dark hover:bg-aximo-primary/10 hover:text-aximo-primary transition-all">
              <SortAsc className="mr-2 h-4 w-4" />
              Sort
            </Button>
            <Link to="/pipeline/lead/new">
              <Button className="bg-aximo-primary hover:bg-aximo-primary/90 text-white shadow-aximo">
                <Plus className="mr-2 h-4 w-4" />
                Add New Lead
              </Button>
            </Link>
          </motion.div>
        </div>

        <KanbanBoard 
          stages={pipelineStages}
          leads={leads}
          onDragEnd={handleDragEnd}
        />
      </motion.div>
    </MainLayout>
  );
}
