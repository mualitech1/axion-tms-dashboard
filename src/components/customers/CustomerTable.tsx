
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

interface CustomerTableProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
}

const CustomerTable = ({ customers, onViewDetails }: CustomerTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to customer details page instead of opening dialog
  const handleRowClick = (customer: Customer) => {
    navigate(`/customers/${customer.id}`);
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

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-indigo-100/50">
      <div className="p-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
            <Input
              placeholder="Search customers..."
              className="pl-10 w-full border-indigo-200 focus:border-indigo-400 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:border-indigo-300 bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9 border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:border-indigo-300 bg-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <TableRow>
              <TableHead className="w-[250px] text-indigo-900 font-medium">Customer</TableHead>
              <TableHead className="text-indigo-900 font-medium">Contact</TableHead>
              <TableHead className="text-indigo-900 font-medium">Status</TableHead>
              <TableHead className="text-right text-indigo-900 font-medium">Credit Limit</TableHead>
              <TableHead className="text-indigo-900 font-medium">Last Order</TableHead>
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
                  className="group"
                >
                  <TableRow
                    className="hover:bg-indigo-50/50 cursor-pointer group border-b border-indigo-100/50"
                    onClick={() => handleRowClick(customer)}
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-indigo-100 to-purple-200 h-10 w-10 rounded-full flex items-center justify-center mr-3 group-hover:from-indigo-200 group-hover:to-purple-300 transition-all duration-300">
                            <Building className="h-5 w-5 text-indigo-600" />
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="absolute -top-1 -right-1 p-0.5 rounded-full bg-white"
                            onClick={(e) => toggleFavorite(e, customer.id)}
                          >
                            <Heart 
                              className={`h-3.5 w-3.5 ${favorites.includes(customer.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} 
                            />
                          </motion.button>
                        </div>
                        <div>
                          <div className="font-medium text-indigo-900 flex items-center">
                            {customer.name}
                            {favorites.includes(customer.id) && (
                              <span className="ml-2 text-xs text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded-full">
                                Favorite
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-indigo-500">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="text-indigo-800 font-medium">{customer.contact}</div>
                        <div className="flex items-center space-x-2 text-xs text-indigo-400 mt-1">
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
                    <TableCell>
                      <Badge 
                        className={`${
                          customer.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                          customer.status === 'On Hold' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-indigo-900">
                      £{customer.creditLimit.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-indigo-700">
                      {new Date(customer.lastOrder).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-indigo-200">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/customers/${customer.id}`);
                          }}
                          className="text-indigo-700 focus:text-indigo-900 focus:bg-indigo-50">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/customers/${customer.id}/documents`);
                          }}
                          className="text-indigo-700 focus:text-indigo-900 focus:bg-indigo-50">
                            Documents
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/customers/${customer.id}/portal`);
                          }}
                          className="text-indigo-700 focus:text-indigo-900 focus:bg-indigo-50">
                            Portal Access
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(e, customer.id);
                          }}
                          className="text-pink-600 focus:text-pink-700 focus:bg-pink-50">
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
                  </TableRow>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-indigo-500 bg-indigo-50/30">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="h-10 w-10 text-indigo-300 mb-3" />
                    <p className="text-lg font-medium text-indigo-700 mb-1">No customers found</p>
                    <p className="text-indigo-500">Try adjusting your search or filter to find what you're looking for.</p>
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
