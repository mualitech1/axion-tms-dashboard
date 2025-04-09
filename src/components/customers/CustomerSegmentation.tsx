
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Customer } from '@/types/customer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TagIcon, Users, UserPlus, Search, X } from 'lucide-react';

interface CustomerSegmentationProps {
  customers: Customer[];
}

type Segment = {
  id: string;
  name: string;
  color: string;
  customers: number[];
};

const CustomerSegmentation: React.FC<CustomerSegmentationProps> = ({ customers }) => {
  const [segments, setSegments] = useState<Segment[]>([
    { 
      id: 'key-accounts', 
      name: 'Key Accounts', 
      color: 'bg-blue-500', 
      customers: [1, 3] 
    },
    { 
      id: 'new-customers', 
      name: 'New Customers', 
      color: 'bg-green-500', 
      customers: [2, 4] 
    },
    { 
      id: 'at-risk', 
      name: 'At Risk', 
      color: 'bg-red-500', 
      customers: [5] 
    },
  ]);
  
  const [activeSegment, setActiveSegment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filter customers based on active segment and search term
  const filteredCustomers = customers.filter(customer => {
    const matchesSegment = 
      activeSegment === 'all' || 
      segments.find(s => s.id === activeSegment)?.customers.includes(customer.id);
    
    const matchesSearch = 
      searchTerm === '' ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSegment && matchesSearch;
  });

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TagIcon className="h-5 w-5 text-muted-foreground" />
              Customer Segmentation
            </CardTitle>
            <CardDescription>
              Organize customers into targeted segments
            </CardDescription>
          </div>
          
          <Button size="sm" className="gap-2 self-start">
            <UserPlus className="h-4 w-4" />
            Create Segment
          </Button>
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-6 pb-4">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-64 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search segments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs
              orientation="vertical"
              value={activeSegment}
              onValueChange={setActiveSegment}
              className="w-full"
            >
              <TabsList className="flex flex-col items-stretch h-auto bg-transparent space-y-1">
                <TabsTrigger
                  value="all"
                  className="justify-start px-3 data-[state=active]:bg-muted"
                >
                  <Users className="h-4 w-4 mr-2" />
                  All Customers
                  <Badge variant="outline" className="ml-auto">
                    {customers.length}
                  </Badge>
                </TabsTrigger>
                
                {segments.map((segment) => (
                  <TabsTrigger
                    key={segment.id}
                    value={segment.id}
                    className="justify-start px-3 data-[state=active]:bg-muted flex items-center"
                  >
                    <div className={`h-3 w-3 rounded-full ${segment.color} mr-2`} />
                    {segment.name}
                    <Badge variant="outline" className="ml-auto">
                      {segment.customers.length}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="w-full md:border-l md:pl-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {activeSegment === 'all' 
                  ? 'All Customers' 
                  : segments.find(s => s.id === activeSegment)?.name}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredCustomers.length})
                </span>
              </h3>
              
              {searchTerm && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSearchTerm('')}
                  className="h-8 gap-1"
                >
                  <X className="h-4 w-4" />
                  Clear search
                </Button>
              )}
            </div>
            
            <div className="border rounded-md">
              <div className="grid grid-cols-1 divide-y">
                {filteredCustomers.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No customers found in this segment
                  </div>
                ) : (
                  filteredCustomers.map(customer => (
                    <div key={customer.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                      <div className="flex gap-2">
                        {segments.filter(s => s.customers.includes(customer.id)).map(segment => (
                          <div 
                            key={segment.id} 
                            className={`px-2 py-1 rounded-full text-xs text-white ${segment.color}`}
                          >
                            {segment.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentation;
