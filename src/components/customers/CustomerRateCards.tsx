
import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Plus, 
  Calendar,
  MoreHorizontal,
  ClipboardCheck,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface CustomerRateCardsProps {
  customer: Customer;
}

const CustomerRateCards = ({ customer }: CustomerRateCardsProps) => {
  const [rateCards, setRateCards] = useState(customer.rateCards || []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-tms-green-light text-tms-green';
      case 'pending':
        return 'bg-tms-yellow-light text-tms-yellow';
      case 'expired':
        return 'bg-tms-gray-200 text-tms-gray-600';
      default:
        return 'bg-tms-gray-200 text-tms-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Rate Cards</h3>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Add Rate Card
        </Button>
      </div>
      
      {rateCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rateCards.map(card => (
            <Card key={card.id} className="overflow-hidden">
              <div className={`h-1.5 ${getStatusColor(card.status)}`}></div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="bg-tms-gray-100 rounded-lg p-2">
                      <FileText className="h-5 w-5 text-tms-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{card.name}</h4>
                      <div className="flex items-center mt-1">
                        <Badge className={getStatusColor(card.status)}>
                          {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 gap-1 mt-3 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          Valid from {new Date(card.validFrom).toLocaleDateString('en-GB')} to {new Date(card.validTo).toLocaleDateString('en-GB')}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          Created on {new Date(card.dateCreated).toLocaleDateString('en-GB')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ClipboardCheck className="h-4 w-4 mr-2" />
                        Extend Validity
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-md">
          <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <h4 className="text-muted-foreground font-medium mb-1">No rate cards found</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Add rate cards to make pricing calculations easier during job creation
          </p>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Rate Card
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerRateCards;
