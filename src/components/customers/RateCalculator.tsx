import React, { useState, useEffect } from 'react';
import { Customer, RateCard } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { 
  Calculator, 
  Truck, 
  Route, 
  ArrowRight,
  Clock,
  CalendarClock,
  CircleDollarSign,
  AlertTriangle
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, parseISO, isAfter, isBefore } from 'date-fns';
import { cn } from '@/lib/utils';

interface RateCalculatorProps {
  customer: Customer;
}

type ServiceType = 'standard' | 'express' | 'same_day';
type VehicleType = 'van' | 'truck' | 'lorry';

interface RateCalculation {
  baseRate: number;
  distanceCost: number;
  serviceFee: number;
  totalCost: number;
}

const RateCalculator = ({ customer }: RateCalculatorProps) => {
  const [selectedRateCardId, setSelectedRateCardId] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);
  const [serviceType, setServiceType] = useState<ServiceType>('standard');
  const [vehicleType, setVehicleType] = useState<VehicleType>('van');
  const [calculation, setCalculation] = useState<RateCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Get active rate cards (those that are currently valid)
  const activeRateCards = customer.rateCards?.filter(card => {
    if (!card.validFrom || !card.validTo) return false;
    
    const now = new Date();
    const validFrom = parseISO(card.validFrom);
    const validTo = parseISO(card.validTo);
    
    return !isBefore(now, validFrom) && !isAfter(now, validTo);
  }) || [];

  // Set first active rate card as default when component mounts
  useEffect(() => {
    if (activeRateCards.length > 0 && !selectedRateCardId) {
      setSelectedRateCardId(activeRateCards[0].id);
    }
  }, [activeRateCards, selectedRateCardId]);

  const selectedRateCard = customer.rateCards?.find(card => card.id === selectedRateCardId);
  
  const calculateRate = () => {
    if (!selectedRateCard || distance <= 0) return;
    
    setIsCalculating(true);
    
    // In a real application, these rates would be fetched from the rate card
    // Here we're using dummy values based on service type and vehicle type
    setTimeout(() => {
      let baseRate = 20; // Default base rate
      let pricePerMile = 1.5; // Default price per mile
      
      // Adjust based on service type
      if (serviceType === 'express') {
        baseRate += 10;
        pricePerMile *= 1.25;
      } else if (serviceType === 'same_day') {
        baseRate += 25;
        pricePerMile *= 1.5;
      }
      
      // Adjust based on vehicle type
      if (vehicleType === 'truck') {
        baseRate += 15;
        pricePerMile += 0.5;
      } else if (vehicleType === 'lorry') {
        baseRate += 30;
        pricePerMile += 1.0;
      }
      
      // Calculate costs
      const distanceCost = pricePerMile * distance;
      const serviceFee = baseRate * 0.1; // 10% service fee
      const totalCost = baseRate + distanceCost + serviceFee;
      
      setCalculation({
        baseRate,
        distanceCost,
        serviceFee,
        totalCost
      });
      
      setIsCalculating(false);
    }, 800); // Simulate API delay
  };

  return (
    <Card className="border-indigo-100 dark:border-indigo-800/30 bg-white dark:bg-indigo-950/20">
      <CardHeader className="bg-white dark:bg-transparent">
        <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
          <Calculator className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          Rate Calculator
        </CardTitle>
        <CardDescription className="text-indigo-500 dark:text-indigo-400">
          Calculate job costs based on this customer's rate cards
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rate-card" className="text-indigo-700 dark:text-indigo-300">Rate Card</Label>
          <Select 
            value={selectedRateCardId} 
            onValueChange={setSelectedRateCardId}
            disabled={activeRateCards.length === 0}
          >
            <SelectTrigger id="rate-card" className="border-indigo-200 dark:border-indigo-800 bg-white dark:bg-indigo-900/30">
              <SelectValue placeholder="Select a rate card" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-indigo-900 border-indigo-100 dark:border-indigo-800">
              {activeRateCards.length > 0 ? (
                activeRateCards.map(card => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No active rate cards available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {activeRateCards.length === 0 && (
            <p className="text-sm text-amber-500 dark:text-amber-400 flex items-center gap-1 mt-1">
              <AlertTriangle className="h-3 w-3" />
              No active rate cards found for this customer
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="distance" className="text-indigo-700 dark:text-indigo-300">Distance (miles)</Label>
          <Input
            id="distance"
            type="number"
            min={0}
            step={0.1}
            value={distance || ''}
            onChange={e => setDistance(parseFloat(e.target.value) || 0)}
            placeholder="Enter distance in miles"
            className="border-indigo-200 dark:border-indigo-800 bg-white dark:bg-indigo-900/30"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-indigo-700 dark:text-indigo-300">Service Type</Label>
          <div className="flex flex-wrap gap-4 p-3 bg-slate-50 dark:bg-indigo-900/30 rounded-md border border-indigo-100 dark:border-indigo-800/50">
            <RadioGroup 
              value={serviceType} 
              onValueChange={value => setServiceType(value as ServiceType)}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" className="text-indigo-600 dark:text-indigo-400" />
                <Label htmlFor="standard" className="cursor-pointer text-indigo-700 dark:text-indigo-300">Standard</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="express" id="express" className="text-indigo-600 dark:text-indigo-400" />
                <Label htmlFor="express" className="cursor-pointer text-indigo-700 dark:text-indigo-300">Express</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="same_day" id="same_day" className="text-indigo-600 dark:text-indigo-400" />
                <Label htmlFor="same_day" className="cursor-pointer text-indigo-700 dark:text-indigo-300">Same Day</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-indigo-700 dark:text-indigo-300">Vehicle Type</Label>
          <Tabs 
            defaultValue="van" 
            value={vehicleType} 
            onValueChange={value => setVehicleType(value as VehicleType)}
            className="border border-indigo-100 dark:border-indigo-800/50 rounded-md overflow-hidden"
          >
            <TabsList className="grid w-full grid-cols-3 bg-slate-50 dark:bg-indigo-900/30">
              <TabsTrigger 
                value="van" 
                className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800"
              >
                <Truck className="h-3 w-3" />
                Van
              </TabsTrigger>
              <TabsTrigger 
                value="truck" 
                className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800"
              >
                <Truck className="h-3 w-3" />
                Truck
              </TabsTrigger>
              <TabsTrigger 
                value="lorry" 
                className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800"
              >
                <Truck className="h-3 w-3" />
                Lorry
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Button 
          onClick={calculateRate} 
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
          disabled={!selectedRateCardId || distance <= 0 || isCalculating}
        >
          {isCalculating ? 'Calculating...' : 'Calculate Price'}
        </Button>
        
        {calculation && (
          <div className="mt-4 p-4 border rounded-md bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/70">
            <h3 className="font-medium text-lg mb-2 text-indigo-700 dark:text-indigo-300">Price Calculation</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-indigo-600/70 dark:text-indigo-400/70">Base Rate:</span>
                <span className="font-medium text-indigo-900 dark:text-indigo-200">£{calculation.baseRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600/70 dark:text-indigo-400/70">Distance Cost ({distance} miles):</span>
                <span className="font-medium text-indigo-900 dark:text-indigo-200">£{calculation.distanceCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600/70 dark:text-indigo-400/70">Service Fee:</span>
                <span className="font-medium text-indigo-900 dark:text-indigo-200">£{calculation.serviceFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-indigo-200 dark:bg-indigo-700 my-2" />
              <div className="flex justify-between text-lg">
                <span className="font-medium text-indigo-900 dark:text-indigo-200">Total:</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-300">
                  £{calculation.totalCost.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-indigo-500/70 dark:text-indigo-400/70 border-t border-indigo-100 dark:border-indigo-800/30 pt-2 mt-4">
          <div className="flex items-center gap-1">
            <span>Using rates from: {selectedRateCard ? selectedRateCard.name : 'No rate card selected'}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>Prices exclude VAT</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RateCalculator; 