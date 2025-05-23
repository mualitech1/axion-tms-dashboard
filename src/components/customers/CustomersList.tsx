import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Customer } from '@/types/customer';
import { formatCurrency } from '@/lib/formatters';
import { MoreHorizontal, ExternalLink, Edit, Trash, Check, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface CustomersListProps {
  customers: Customer[];
  onCustomerDelete: (id: string) => void;
  onViewCustomerDetails: (customer: Customer) => void;
}

export const CustomersList = ({
  customers,
  onCustomerDelete,
  onViewCustomerDetails,
}: CustomersListProps) => {
  const navigate = useNavigate();
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>, index: number, customer: Customer) => {
    if (e.key === 'Enter') {
      onViewCustomerDetails(customer);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedRowIndex(Math.min(index + 1, customers.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedRowIndex(Math.max(index - 1, 0));
    }
  };

  useEffect(() => {
    // Focus on the row when focusedRowIndex changes
    if (focusedRowIndex !== null) {
      const row = document.getElementById(`customer-row-${focusedRowIndex}`);
      if (row) row.focus();
    }
  }, [focusedRowIndex]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-indigo-50">
            <TableHead className="font-medium">Company</TableHead>
            <TableHead className="font-medium">Primary Contact</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Credit Limit</TableHead>
            <TableHead className="font-medium">Recent Activity</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, index) => (
            <TableRow 
              key={customer.id}
              id={`customer-row-${index}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index, customer)}
              onClick={() => onViewCustomerDetails(customer)}
              className="cursor-pointer hover:bg-indigo-50/50 focus:bg-indigo-100 focus:outline-none transition-colors"
              aria-label={`Customer: ${customer.name}`}
              as={motion.tr}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <TableCell>
                <div className="font-medium text-indigo-700">{customer.name}</div>
                <div className="text-sm text-gray-500">
                  {customer.address?.city && customer.address?.country && (
                    <>
                      {customer.address.city}, {customer.address.country}
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{customer.contacts?.primary?.name || "Not specified"}</span>
                  {customer.contacts?.primary?.email && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Mail className="h-3.5 w-3.5" />
                      <a
                        href={`mailto:${customer.contacts.primary.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-indigo-600 hover:underline"
                      >
                        {customer.contacts.primary.email}
                      </a>
                    </div>
                  )}
                  {customer.contacts?.primary?.phone && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Phone className="h-3.5 w-3.5" />
                      <a
                        href={`tel:${customer.contacts.primary.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-indigo-600 hover:underline"
                      >
                        {customer.contacts.primary.phone}
                      </a>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`${getStatusColor(customer.status || 'active')} capitalize`}
                >
                  {customer.status || 'Active'}
                </Badge>
              </TableCell>
              <TableCell>
                {customer.creditLimit ? (
                  formatCurrency(customer.creditLimit)
                ) : (
                  <span className="text-gray-500">No limit</span>
                )}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {customer.lastActive ? customer.lastActive : 'Never'}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      aria-label="Open menu"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewCustomerDetails(customer);
                      }}
                      className="cursor-pointer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/customers/edit/${customer.id}`);
                      }}
                      className="cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomerDelete(customer.id);
                      }}
                      className="cursor-pointer text-red-600 focus:text-red-500"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <p className="mb-2">No customers found</p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/customers/new')}
                    className="mt-2"
                  >
                    Add New Customer
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}; 