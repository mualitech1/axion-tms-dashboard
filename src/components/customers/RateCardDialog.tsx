import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { DatePicker } from '@/components/ui/date-picker';
import { RateCard } from '@/types/customer';
import { Trash2, PlusCircle, Save, Loader2 } from 'lucide-react';
import { format, addDays, addMonths } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface RateEntry {
  id: string;
  serviceType: string;
  vehicleType: string;
  baseRate: number;
  pricePerMile: number;
  minimumDistance: number;
}

interface RateCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rateCard?: RateCard;
  onSave: (rateCard: Omit<RateCard, 'id'>) => Promise<void>;
  isLoading: boolean;
  customerId: string;
}

export default function RateCardDialog({
  open,
  onOpenChange,
  rateCard,
  onSave,
  isLoading,
  customerId
}: RateCardDialogProps) {
  const { toast } = useToast();
  const [name, setName] = useState(rateCard?.name || '');
  const [validFrom, setValidFrom] = useState<Date>(
    rateCard?.validFrom ? new Date(rateCard.validFrom) : new Date()
  );
  const [validTo, setValidTo] = useState<Date>(
    rateCard?.validTo ? new Date(rateCard.validTo) : addMonths(new Date(), 12)
  );
  const [notes, setNotes] = useState(rateCard?.notes || '');
  const [rateEntries, setRateEntries] = useState<RateEntry[]>([
    {
      id: '1',
      serviceType: 'Standard Delivery',
      vehicleType: 'Van',
      baseRate: 25,
      pricePerMile: 1.2,
      minimumDistance: 5
    }
  ]);

  // Set initial values when editing
  useEffect(() => {
    if (rateCard) {
      setName(rateCard.name);
      setValidFrom(new Date(rateCard.validFrom));
      setValidTo(new Date(rateCard.validTo));
      setNotes(rateCard.notes || '');
      
      // In a real app, we would load rate entries from the database
      // For now, we'll set a dummy entry if none exists
      if (!rateEntries.length) {
        setRateEntries([
          {
            id: '1',
            serviceType: 'Standard Delivery',
            vehicleType: 'Van',
            baseRate: 25,
            pricePerMile: 1.2,
            minimumDistance: 5
          }
        ]);
      }
    }
  }, [rateCard]);

  const handleAddRateEntry = () => {
    const newEntry: RateEntry = {
      id: `entry-${Date.now()}`,
      serviceType: '',
      vehicleType: '',
      baseRate: 0,
      pricePerMile: 0,
      minimumDistance: 0
    };
    
    setRateEntries([...rateEntries, newEntry]);
  };

  const handleRemoveRateEntry = (entryId: string) => {
    setRateEntries(rateEntries.filter(entry => entry.id !== entryId));
  };

  const updateRateEntry = (id: string, field: keyof RateEntry, value: string | number) => {
    setRateEntries(
      rateEntries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !validFrom || !validTo) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if there are any incomplete rate entries
    const hasIncompleteEntries = rateEntries.some(
      entry => !entry.serviceType || !entry.vehicleType
    );
    
    if (hasIncompleteEntries) {
      toast({
        title: "Incomplete Rate Entries",
        description: "Please complete all rate entries or remove incomplete ones.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const rateCardData: Omit<RateCard, 'id'> = {
        name,
        validFrom: validFrom.toISOString(),
        validTo: validTo.toISOString(),
        dateCreated: new Date().toISOString(),
        status: 'active',
        notes
      };
      
      await onSave(rateCardData);
      
      // Dialog will be closed by the parent component
    } catch (error) {
      console.error('Error saving rate card:', error);
      toast({
        title: "Error",
        description: "There was a problem saving the rate card. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{rateCard ? 'Edit Rate Card' : 'Create Rate Card'}</DialogTitle>
          <DialogDescription>
            {rateCard 
              ? 'Update the details for this rate card' 
              : 'Create a new rate card for this customer'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">
              Rate Card Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Standard Rates 2023"
              disabled={isLoading}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-medium">
                Valid From <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                date={validFrom}
                onSelect={(date) => date && setValidFrom(date)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">
                Valid To <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                date={validTo}
                onSelect={(date) => date && setValidTo(date)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Rate Entries</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddRateEntry}
                disabled={isLoading}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Entry
              </Button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[25%]">Service Type</TableHead>
                    <TableHead className="w-[20%]">Vehicle Type</TableHead>
                    <TableHead className="w-[15%]">Base Rate</TableHead>
                    <TableHead className="w-[15%]">Price/Mile</TableHead>
                    <TableHead className="w-[15%]">Min Distance</TableHead>
                    <TableHead className="w-[10%]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rateEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <Input
                          value={entry.serviceType}
                          onChange={(e) => updateRateEntry(entry.id, 'serviceType', e.target.value)}
                          placeholder="Service Type"
                          className="w-full"
                          disabled={isLoading}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={entry.vehicleType}
                          onChange={(e) => updateRateEntry(entry.id, 'vehicleType', e.target.value)}
                          placeholder="Vehicle Type"
                          className="w-full"
                          disabled={isLoading}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={entry.baseRate}
                          onChange={(e) => updateRateEntry(entry.id, 'baseRate', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          className="w-full"
                          disabled={isLoading}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          value={entry.pricePerMile}
                          onChange={(e) => updateRateEntry(entry.id, 'pricePerMile', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          className="w-full"
                          disabled={isLoading}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={entry.minimumDistance}
                          onChange={(e) => updateRateEntry(entry.id, 'minimumDistance', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className="w-full"
                          disabled={isLoading}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveRateEntry(entry.id)}
                          disabled={isLoading || rateEntries.length === 1}
                          className="h-8 w-8 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="font-medium">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional information or terms for this rate card"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {rateCard ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {rateCard ? 'Update Rate Card' : 'Create Rate Card'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 