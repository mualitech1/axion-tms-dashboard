import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, Search, Filter, Download, MoreHorizontal, Star, Heart, Phone, Mail,
  User, MapPin, Calendar, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Customer } from '@/types/customer';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface CustomerListProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
  onDeleteCustomer?: (id: string) => void;
  onEditCustomer?: (customer: Customer) => void;
}

export default function CustomerList({ 
  customers, 
  onViewDetails, 
  onDeleteCustomer, 
  onEditCustomer 
}: CustomerListProps) {
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

  // Navigate to customer details page
  const handleCardClick = (customer: Customer) => {
    if (onEditCustomer) {
      onEditCustomer(customer);
    } else {
      navigate(`/customers/${customer.id}`);
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
    <div className="space-y-4">
      <div className="p-4 bg-slate-50/50 dark:bg-indigo-900/20 border border-slate-100 dark:border-indigo-800/30 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
            <Input
              placeholder="Search customers..."
              className="pl-10 w-full border-indigo-100 focus:border-indigo-300 bg-white dark:bg-indigo-900/30 dark:border-indigo-700/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:border-indigo-300 bg-white dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-800/50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9 border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:border-indigo-300 bg-white dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-800/50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
      
      {filteredCustomers.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-slate-200 dark:border-indigo-800/30 rounded-xl">
          <User className="h-10 w-10 mx-auto mb-2 text-slate-300 dark:text-indigo-700" />
          <h3 className="text-lg font-medium text-slate-700 dark:text-indigo-300 mb-1">No customers found</h3>
          <p className="text-slate-500 dark:text-indigo-400 mb-4">Try adjusting your search or filters</p>
          <Button onClick={() => setSearchTerm('')}>Clear search</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
              onClick={() => handleCardClick(customer)}
            >
              <Card className="cursor-pointer h-full border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/30 dark:hover:border-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden flex flex-col">
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-800 dark:to-purple-900 h-12 w-12 rounded-full flex items-center justify-center mr-3 transition-all duration-300 shadow-sm">
                      <Building className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="absolute -top-1 -right-1 p-0.5 rounded-full bg-white dark:bg-indigo-900 shadow-sm"
                      onClick={(e) => toggleFavorite(e, customer.id)}
                    >
                      <Heart 
                        className={`h-3.5 w-3.5 ${favorites.includes(customer.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400 dark:text-gray-500'}`} 
                      />
                    </motion.button>
                  </div>
                  <div>
                    <Badge 
                      className={`${
                        customer.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        customer.status === 'On Hold' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pb-2">
                  <CardTitle className="mb-1 text-indigo-900 dark:text-indigo-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-100 transition-colors">
                    {customer.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-1">
                    {customer.contact || 'No primary contact'}
                  </CardDescription>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                      <Mail className="h-3.5 w-3.5 mr-2 text-indigo-500 dark:text-indigo-400" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                      <Phone className="h-3.5 w-3.5 mr-2 text-indigo-500 dark:text-indigo-400" />
                      <span>{customer.phone || 'No phone'}</span>
                    </div>
                    
                    {customer.address?.city && (
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-indigo-500 dark:text-indigo-400" />
                        <span>
                          {customer.address.city}
                          {customer.address.country && `, ${customer.address.country}`}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                      <DollarSign className="h-3.5 w-3.5 mr-2 text-indigo-500 dark:text-indigo-400" />
                      <span>£{customer.creditLimit?.toLocaleString() || 0}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                      <Calendar className="h-3.5 w-3.5 mr-2 text-indigo-500 dark:text-indigo-400" />
                      <span>Last order: {formatLastOrderDate(customer.lastOrder)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <Button 
                    variant="default" 
                    className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 border-none dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(customer);
                    }}
                  >
                    View Details
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="ml-2 px-2 h-9 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        if (onEditCustomer) {
                          onEditCustomer(customer);
                        } else {
                          navigate(`/customers/${customer.id}`);
                        }
                      }}>
                        Edit Customer
                      </DropdownMenuItem>
                      {onDeleteCustomer && (
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-700 focus:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
                              onDeleteCustomer(customer.id);
                            }
                          }}
                        >
                          Delete Customer
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 