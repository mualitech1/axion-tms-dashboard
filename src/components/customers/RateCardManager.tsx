import React, { useState, useEffect } from 'react';
import { Customer, RateCard } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit,
  BookOpen
} from 'lucide-react';
import { format, isBefore, isAfter, parseISO } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import RateCardDialog from './RateCardDialog';

interface RateCardManagerProps {
  customer: Customer;
}

/**
 * Determine the status of a rate card based on its validity dates
 */
const getRateCardStatus = (rateCard: RateCard) => {
  const today = new Date();
  
  if (!rateCard.validFrom || !rateCard.validTo) {
    return { label: "Draft", variant: "secondary" as const };
  }
  
  const validFrom = parseISO(rateCard.validFrom);
  const validTo = parseISO(rateCard.validTo);
  
  if (isAfter(validFrom, today)) {
    return { label: "Pending", variant: "outline" as const };
  }
  
  if (isBefore(validTo, today)) {
    return { label: "Expired", variant: "destructive" as const };
  }
  
  return { label: "Active", variant: "default" as const };
};

/**
 * Component for managing a customer's rate cards
 */
const RateCardManager = ({ customer }: RateCardManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rateCards, setRateCards] = useState<RateCard[]>(customer.rateCards || []);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRateCard, setEditingRateCard] = useState<RateCard | null>(null);
  const { toast } = useToast();
  
  // Filter rate cards by search term
  const filteredRateCards = rateCards.filter(
    card => card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRateCard = async (rateCard: Omit<RateCard, 'id'>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Create a new rate card object
      const newRateCard: RateCard = {
        id: `rate-${Date.now()}`,
        ...rateCard,
        dateCreated: new Date().toISOString(),
      };
      
      // Add the new rate card to the rate cards array
      setRateCards(prev => [...prev, newRateCard]);
      
      toast({
        title: "Rate card created",
        description: "The rate card has been successfully created.",
        variant: "default",
      });
      
      setDialogOpen(false);
    } catch (error) {
      console.error("Error creating rate card:", error);
      toast({
        title: "Creation failed",
        description: "There was an error creating the rate card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRateCard = async (updatedCard: RateCard) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the rate card in the array
      setRateCards(prev => 
        prev.map(card => card.id === updatedCard.id ? updatedCard : card)
      );
      
      toast({
        title: "Rate card updated",
        description: "The rate card has been successfully updated.",
        variant: "default",
      });
      
      setDialogOpen(false);
      setEditingRateCard(null);
    } catch (error) {
      console.error("Error updating rate card:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating the rate card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRateCard = async (cardId: string) => {
    if (!confirm("Are you sure you want to delete this rate card?")) {
      return;
    }
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Remove the rate card from the array
      setRateCards(prev => prev.filter(card => card.id !== cardId));
      
      toast({
        title: "Rate card deleted",
        description: "The rate card has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was an error deleting the rate card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (rateCard: RateCard) => {
    setEditingRateCard(rateCard);
    setDialogOpen(true);
  };

  const handleSaveRateCard = async (rateCard: Omit<RateCard, 'id'>) => {
    if ('id' in rateCard) {
      await handleEditRateCard(rateCard as RateCard);
    } else {
      await handleAddRateCard(rateCard);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search rate cards..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => { setEditingRateCard(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" />
          Add Rate Card
        </Button>
      </div>
      
      {filteredRateCards.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Valid From</TableHead>
                <TableHead>Valid To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRateCards.map(card => {
                const status = getRateCardStatus(card);
                return (
                  <TableRow key={card.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-tms-blue" />
                      {card.name}
                    </TableCell>
                    <TableCell>
                      {card.dateCreated ? format(new Date(card.dateCreated), 'MMM d, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {card.validFrom ? format(new Date(card.validFrom), 'MMM d, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {card.validTo && (
                          <>
                            {status.label === 'Expired' && (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                            {status.label === 'Active' && (
                              <CheckCircle2 className="h-4 w-4 text-tms-green" />
                            )}
                            {format(new Date(card.validTo), 'MMM d, yyyy')}
                          </>
                        )}
                        {!card.validTo && (
                          <span className="text-muted-foreground">Not set</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => openEditDialog(card)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          onClick={() => handleDeleteRateCard(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-md">
          <BookOpen className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <h4 className="text-muted-foreground font-medium mb-1">No rate cards found</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Create rate cards to define pricing for this customer
          </p>
          <Button size="sm" onClick={() => { setEditingRateCard(null); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-1" />
            Add Rate Card
          </Button>
        </div>
      )}

      <RateCardDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        customerId={customer.id}
        rateCard={editingRateCard}
        onSave={handleSaveRateCard}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RateCardManager; 