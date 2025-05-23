import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jobService } from '@/services/job-service';
import { Loader2 } from 'lucide-react';

interface CarrierAllocationProps {
  jobId: string;
  onComplete: (carrierId: string) => void;
  isProcessing: boolean;
}

interface Carrier {
  id: string;
  name: string;
  rating?: number;
  vehicleTypes?: string[];
}

export function CarrierAllocation({ jobId, onComplete, isProcessing }: CarrierAllocationProps) {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [selectedCarrierId, setSelectedCarrierId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCarriers() {
      try {
        setLoading(true);
        const carriersData = await jobService.getAvailableCarriers();
        // Transform the data to the Carrier interface
        const formattedCarriers = carriersData.map((carrier: any) => ({
          id: carrier.id,
          name: carrier.name,
          rating: carrier.metadata?.rating || 0,
          vehicleTypes: carrier.metadata?.vehicleTypes || []
        }));
        setCarriers(formattedCarriers);
      } catch (error) {
        console.error("Error loading carriers:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCarriers();
  }, []);

  const handleCarrierSelect = (carrierId: string) => {
    setSelectedCarrierId(carrierId);
  };

  const handleConfirm = () => {
    if (selectedCarrierId) {
      onComplete(selectedCarrierId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3">Loading available carriers...</span>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select a Carrier</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {carriers.length === 0 ? (
            <p>No carriers available at the moment.</p>
          ) : (
            carriers.map((carrier) => (
              <div 
                key={carrier.id}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedCarrierId === carrier.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleCarrierSelect(carrier.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{carrier.name}</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      {carrier.rating && (
                        <span className="mr-3">
                          Rating: {carrier.rating}/5
                        </span>
                      )}
                      {carrier.vehicleTypes && carrier.vehicleTypes.length > 0 && (
                        <span>
                          Vehicles: {carrier.vehicleTypes.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div 
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedCarrierId === carrier.id 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedCarrierId || isProcessing}
            className="w-full md:w-auto"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Allocating Carrier...
              </>
            ) : (
              'Allocate Carrier'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 