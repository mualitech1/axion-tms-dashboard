import { useState, useEffect } from 'react';
import { Customer } from '@/types/customer';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCustomers } from '@/hooks/use-customer';

interface CustomerTypeAheadProps {
  onSelectCustomer: (customer: Customer | null) => void;
  selectedCustomer?: Customer | null;
  placeholder?: string;
}

export default function CustomerTypeAhead({
  onSelectCustomer,
  selectedCustomer,
  placeholder = "Select a customer..."
}: CustomerTypeAheadProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { customers, isLoading } = useCustomers();
  
  // Filter customers based on search term
  const filteredCustomers = searchQuery && customers 
    ? customers.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone?.includes(searchQuery)
      )
    : customers || [];
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {selectedCustomer ? (
              <>
                <User className="h-4 w-4 text-indigo-500" />
                <span className="truncate">{selectedCustomer.name}</span>
                {selectedCustomer.email && (
                  <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                    ({selectedCustomer.email})
                  </span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput 
            placeholder="Search customers..." 
            className="h-9"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? 'Loading customers...' : 'No customers found.'}
            </CommandEmpty>
            <CommandGroup>
              {filteredCustomers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.id}
                  onSelect={() => {
                    onSelectCustomer(
                      selectedCustomer?.id === customer.id ? null : customer
                    );
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2 w-full overflow-hidden">
                    <div className="flex-shrink-0">
                      <User className="h-4 w-4 text-indigo-500" />
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <p className="font-medium truncate">{customer.name}</p>
                      {customer.email && (
                        <p className="text-xs text-muted-foreground truncate">
                          {customer.email}
                        </p>
                      )}
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedCustomer?.id === customer.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 