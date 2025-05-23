import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, Search, Filter, Download, MoreHorizontal, Star, Heart, Phone, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Customer } from '@/types/customer';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { createCustomerUrl } from '@/utils/slug-utils';

interface CustomerTableProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
  viewMode: 'list' | 'cards';
  onDeleteCustomer?: (id: string) => void;
  onEditCustomer?: (customer: Customer) => void;
}

const CustomerTable = ({ customers, onViewDetails, viewMode, onDeleteCustomer, onEditCustomer }: CustomerTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.contact && customer.contact.toLowerCase().includes(searchTerm.toLowerCase())) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to customer details page instead of opening dialog
  const handleRowClick = (customer: Customer) => {
    if (onEditCustomer) {
      onEditCustomer(customer);
    } else {
      navigate(createCustomerUrl(customer.id, customer.name));
    }
  };

  // Toggle favorite status
  const toggleFavorite = (e: React.MouseEvent, customerId: string) => {
    e.stopPropagation();
    const isFavorite = favorites.includes(customerId);
    
    if (isFavorite) {
      setFavorites(favorites.filter(id => id !== customerId));
      toast({
        title: "Removed from favorites",
        description: "Customer has been removed from your favorites",
        variant: "default",
      });
    } else {
      setFavorites([...favorites, customerId]);
      toast({
        title: "Added to favorites",
        description: "Customer has been added to your favorites",
        variant: "default",
      });
    }
  };

  // Handle safe display of last order date
  const formatLastOrderDate = (dateString?: string) => {
    if (!dateString) return 'No orders yet';
    
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="bg-aximo-card shadow-sm mb-6 overflow-hidden border-t border-aximo-border">
      <div className="p-4 bg-aximo-darker/30 border-b border-aximo-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aximo-text-secondary" />
            <Input
              placeholder="Filter customers..."
              className="pl-10 w-full border-aximo-border focus:border-aximo-primary bg-aximo-darker text-aximo-text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 border-aximo-border text-aximo-text hover:bg-aximo-primary/10 bg-aximo-darker">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9 border-aximo-border text-aximo-text hover:bg-aximo-primary/10 bg-aximo-darker">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-aximo-darker/50">
            <TableRow className="border-b border-aximo-border">
              <TableHead className="w-[280px] text-aximo-text font-medium">Customer</TableHead>
              <TableHead className="text-aximo-text font-medium">Contact</TableHead>
              <TableHead className="text-aximo-text font-medium">Status</TableHead>
              <TableHead className="text-right text-aximo-text font-medium">Credit Limit</TableHead>
              <TableHead className="text-aximo-text font-medium">Last Order</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <motion.tr 
                  key={customer.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleRowClick(customer)}
                  className="hover:bg-aximo-darker/60 cursor-pointer group group-hover:ring-1 group-hover:ring-aximo-primary/70 group-hover:shadow-[0_0_12px_rgba(var(--color-aximo-primary-rgb),0.4)] transition-all duration-300 border-b border-aximo-border"
                >
                  <TableCell className="text-aximo-text">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="bg-gradient-to-br from-aximo-dark to-aximo-darker h-10 w-10 rounded-full flex items-center justify-center mr-3 group-hover:from-aximo-dark/80 group-hover:to-aximo-darker/70 transition-all duration-300 shadow-sm border border-aximo-border">
                          <Building className="h-5 w-5 text-aximo-primary" />
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="absolute -top-1 -right-1 p-0.5 rounded-full bg-aximo-card shadow-sm border border-aximo-border"
                          onClick={(e) => toggleFavorite(e, customer.id)}
                        >
                          <Heart 
                            className={`h-3.5 w-3.5 ${favorites.includes(customer.id) ? 'fill-pink-500 text-pink-500' : 'text-aximo-text-secondary'}`} 
                          />
                        </motion.button>
                      </div>
                      <div>
                        <div className="font-medium text-aximo-text flex items-center">
                          {customer.name}
                          {favorites.includes(customer.id) && (
                            <span className="ml-2 text-xs text-pink-500 bg-pink-950/30 border border-pink-500/20 px-1.5 py-0.5 rounded-full">
                              Favorite
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-aximo-text-secondary">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-aximo-text">
                    <div className="flex flex-col">
                      <div className="font-medium">{customer.contact || 'No contact'}</div>
                      <div className="flex items-center space-x-2 text-xs text-aximo-text-secondary mt-1">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email.split('@')[0].substring(0, 5)}...
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-aximo-text">
                    <Badge 
                      className={`border ${
                        customer.status === 'Active' ? 'bg-green-950/30 text-green-400 border-green-500/20' :
                        customer.status === 'On Hold' ? 'bg-amber-950/30 text-amber-400 border-amber-500/20' :
                        'bg-aximo-dark/50 text-aximo-text-secondary border-aximo-border'
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-aximo-text">
                    £{customer.creditLimit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-aximo-text">
                    {formatLastOrderDate(customer.lastOrder)}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()} className="text-aximo-text">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-aximo-text-secondary hover:text-aximo-primary hover:bg-aximo-primary/10">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-aximo-darker border-aximo-border shadow-lg rounded-xl">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(customer);
                        }}
                        className="text-aximo-text-secondary focus:text-aximo-text focus:bg-aximo-primary/10 cursor-pointer">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          if (onEditCustomer) {
                            onEditCustomer(customer);
                          } else {
                            navigate(createCustomerUrl(customer.id, customer.name));
                          }
                        }}
                        className="text-aximo-text-secondary focus:text-aximo-text focus:bg-aximo-primary/10 cursor-pointer">
                          Edit Customer
                        </DropdownMenuItem>
                        {onDeleteCustomer && (
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
                              onDeleteCustomer(customer.id);
                            }
                          }}
                          className="text-red-400 focus:text-red-300 focus:bg-red-900/30 cursor-pointer">
                            Delete Customer
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(e, customer.id);
                        }}
                        className="text-pink-400 focus:text-pink-300 focus:bg-pink-900/30 cursor-pointer">
                          {favorites.includes(customer.id) ? (
                            <>
                              <Heart className="h-4 w-4 mr-2 fill-pink-500" />
                              Remove Favorite
                            </>
                          ) : (
                            <>
                              <Heart className="h-4 w-4 mr-2" />
                              Add to Favorites
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-aximo-text-secondary bg-aximo-dark/50">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="h-10 w-10 text-aximo-text-secondary mb-3" />
                    <p className="text-lg font-medium text-aximo-text">{'No customers found'}</p>
                    <p className="text-aximo-text-secondary">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerTable;
