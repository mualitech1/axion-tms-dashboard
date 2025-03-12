
import { useState } from 'react';
import { 
  Building, Users, Phone, Mail, Plus, 
  Search, Filter, Download, MoreHorizontal, PlusCircle,
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DashboardCard from '@/components/dashboard/DashboardCard';

// Mock data for customers
const customerData = [
  {
    id: 1,
    name: 'Acme Corporation',
    contact: 'John Smith',
    email: 'john@acmecorp.com',
    phone: '+44 1234 567890',
    status: 'Active',
    creditLimit: 25000,
    lastOrder: '2023-06-15',
  },
  {
    id: 2,
    name: 'Globex Industries',
    contact: 'Jane Cooper',
    email: 'jane@globex.com',
    phone: '+44 2345 678901',
    status: 'Active',
    creditLimit: 15000,
    lastOrder: '2023-06-02',
  },
  {
    id: 3,
    name: 'Wayne Enterprises',
    contact: 'Bruce Wayne',
    email: 'bruce@wayne.com',
    phone: '+44 3456 789012',
    status: 'Active',
    creditLimit: 50000,
    lastOrder: '2023-05-28',
  },
  {
    id: 4,
    name: 'Stark Industries',
    contact: 'Tony Stark',
    email: 'tony@stark.com',
    phone: '+44 4567 890123',
    status: 'On Hold',
    creditLimit: 30000,
    lastOrder: '2023-05-20',
  },
  {
    id: 5,
    name: 'Daily Planet',
    contact: 'Clark Kent',
    email: 'clark@dailyplanet.com',
    phone: '+44 5678 901234',
    status: 'Inactive',
    creditLimit: 10000,
    lastOrder: '2023-04-15',
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter customers based on search term
  const filteredCustomers = customerData.filter(
    customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <MainLayout title="Customers">
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">Customer Management</h1>
            <p className="text-tms-gray-600">Manage your customer database and relationships</p>
          </div>
          
          <Button className="bg-tms-blue hover:bg-tms-blue/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-card mb-6">
          <div className="p-4 border-b border-tms-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tms-gray-500" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Credit Limit</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-tms-gray-100">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="bg-tms-blue-light h-9 w-9 rounded-full flex items-center justify-center mr-3">
                            <Building className="h-4 w-4 text-tms-blue" />
                          </div>
                          <div>
                            <div className="font-medium text-tms-gray-800">{customer.name}</div>
                            <div className="text-sm text-tms-gray-500">{customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="text-tms-gray-800">{customer.contact}</div>
                          <div className="text-sm text-tms-gray-500 ml-1">{customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            customer.status === 'Active' ? 'bg-tms-green-light text-tms-green' :
                            customer.status === 'On Hold' ? 'bg-tms-yellow-light text-tms-yellow' :
                            'bg-tms-gray-200 text-tms-gray-600'
                          }`}
                        >
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        £{customer.creditLimit.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(customer.lastOrder).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                            <DropdownMenuItem>View Orders</DropdownMenuItem>
                            <DropdownMenuItem className="text-tms-red">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-tms-gray-500">
                      No customers found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardCard title="Customer Overview">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-tms-blue-light p-2 rounded-full mr-3">
                  <Users className="h-4 w-4 text-tms-blue" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">158</div>
                  <div className="text-sm text-tms-gray-500">Total Customers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-green-light p-2 rounded-full mr-3">
                  <Building className="h-4 w-4 text-tms-green" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">142</div>
                  <div className="text-sm text-tms-gray-500">Active Customers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
                  <Plus className="h-4 w-4 text-tms-yellow" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">24</div>
                  <div className="text-sm text-tms-gray-500">New (Last 30 Days)</div>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Contact Metrics">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-tms-blue-light p-2 rounded-full mr-3">
                  <Phone className="h-4 w-4 text-tms-blue" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">68</div>
                  <div className="text-sm text-tms-gray-500">Calls This Week</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-green-light p-2 rounded-full mr-3">
                  <Mail className="h-4 w-4 text-tms-green" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">173</div>
                  <div className="text-sm text-tms-gray-500">Emails This Week</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
                  <Users className="h-4 w-4 text-tms-yellow" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">12</div>
                  <div className="text-sm text-tms-gray-500">Meetings Scheduled</div>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Recent Activity">
            <div className="space-y-4">
              <div className="border-l-2 border-tms-blue pl-4 py-1">
                <p className="text-sm text-tms-gray-800">New customer added: Oscorp Industries</p>
                <p className="text-xs text-tms-gray-500">Today, 10:30 AM</p>
              </div>
              
              <div className="border-l-2 border-tms-green pl-4 py-1">
                <p className="text-sm text-tms-gray-800">Credit limit updated: Wayne Enterprises</p>
                <p className="text-xs text-tms-gray-500">Yesterday, 3:15 PM</p>
              </div>
              
              <div className="border-l-2 border-tms-yellow pl-4 py-1">
                <p className="text-sm text-tms-gray-800">Customer status changed: Daily Planet</p>
                <p className="text-xs text-tms-gray-500">Yesterday, 11:45 AM</p>
              </div>
              
              <div className="border-l-2 border-tms-gray-400 pl-4 py-1">
                <p className="text-sm text-tms-gray-800">Contact details updated: Stark Industries</p>
                <p className="text-xs text-tms-gray-500">Jun 14, 2023, 2:30 PM</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </MainLayout>
  );
}
