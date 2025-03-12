
import { useState } from 'react';
import { 
  Truck, FileCheck, AlertTriangle, Calendar, 
  Search, Filter, Download, MoreHorizontal, PlusCircle, 
  MapPin, Boxes, Package,
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
import { Progress } from '@/components/ui/progress';
import DashboardCard from '@/components/dashboard/DashboardCard';

// Mock data for carriers
const carrierData = [
  {
    id: 1,
    name: 'Express Logistics',
    fleet: 'Mixed Fleet',
    region: 'National',
    complianceStatus: 'Compliant',
    insuranceExpiry: '2023-12-15',
    licenseExpiry: '2024-02-28',
  },
  {
    id: 2,
    name: 'Swift Transport',
    fleet: 'HGV Only',
    region: 'North & Midlands',
    complianceStatus: 'Compliant',
    insuranceExpiry: '2023-09-20',
    licenseExpiry: '2024-01-15',
  },
  {
    id: 3,
    name: 'Global Freight Services',
    fleet: 'Multimodal',
    region: 'International',
    complianceStatus: 'Action Required',
    insuranceExpiry: '2023-07-10',
    licenseExpiry: '2023-08-05',
  },
  {
    id: 4,
    name: 'Regional Haulage',
    fleet: 'Vans & Rigids',
    region: 'South East',
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-01-30',
    licenseExpiry: '2024-03-15',
  },
  {
    id: 5,
    name: 'City Distribution Ltd',
    fleet: 'LGV Only',
    region: 'London & Home Counties',
    complianceStatus: 'Non-Compliant',
    insuranceExpiry: '2023-06-05',
    licenseExpiry: '2023-05-31',
  },
];

export default function Carriers() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter carriers based on search term
  const filteredCarriers = carrierData.filter(
    carrier => 
      carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carrier.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carrier.fleet.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <MainLayout title="Carriers">
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">Carrier Management</h1>
            <p className="text-tms-gray-600">Manage your carrier network and compliance</p>
          </div>
          
          <Button className="bg-tms-blue hover:bg-tms-blue/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Carrier
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-card mb-6">
          <div className="p-4 border-b border-tms-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tms-gray-500" />
                <Input
                  placeholder="Search carriers..."
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
                  <TableHead className="w-[250px]">Carrier</TableHead>
                  <TableHead>Fleet Type</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Compliance Status</TableHead>
                  <TableHead>Key Expiry Dates</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCarriers.length > 0 ? (
                  filteredCarriers.map((carrier) => (
                    <TableRow key={carrier.id} className="hover:bg-tms-gray-100">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="bg-tms-blue-light h-9 w-9 rounded-full flex items-center justify-center mr-3">
                            <Truck className="h-4 w-4 text-tms-blue" />
                          </div>
                          <div className="font-medium text-tms-gray-800">{carrier.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{carrier.fleet}</TableCell>
                      <TableCell>{carrier.region}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            carrier.complianceStatus === 'Compliant' ? 'bg-tms-green-light text-tms-green' :
                            carrier.complianceStatus === 'Action Required' ? 'bg-tms-yellow-light text-tms-yellow' :
                            'bg-tms-red-light text-tms-red'
                          }`}
                        >
                          {carrier.complianceStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-xs">
                            <span className="w-24 text-tms-gray-500">Insurance:</span>
                            <span className={`${
                              new Date(carrier.insuranceExpiry) < new Date() ? 'text-tms-red font-medium' :
                              new Date(carrier.insuranceExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 
                              'text-tms-yellow font-medium' : 'text-tms-gray-800'
                            }`}>
                              {new Date(carrier.insuranceExpiry).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            <span className="w-24 text-tms-gray-500">License:</span>
                            <span className={`${
                              new Date(carrier.licenseExpiry) < new Date() ? 'text-tms-red font-medium' :
                              new Date(carrier.licenseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 
                              'text-tms-yellow font-medium' : 'text-tms-gray-800'
                            }`}>
                              {new Date(carrier.licenseExpiry).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                        </div>
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
                            <DropdownMenuItem>Update Compliance</DropdownMenuItem>
                            <DropdownMenuItem>Performance History</DropdownMenuItem>
                            <DropdownMenuItem className="text-tms-red">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-tms-gray-500">
                      No carriers found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardCard title="Carrier Overview">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-tms-blue-light p-2 rounded-full mr-3">
                  <Truck className="h-4 w-4 text-tms-blue" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">124</div>
                  <div className="text-sm text-tms-gray-500">Total Carriers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-green-light p-2 rounded-full mr-3">
                  <FileCheck className="h-4 w-4 text-tms-green" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">98</div>
                  <div className="text-sm text-tms-gray-500">Fully Compliant</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-red-light p-2 rounded-full mr-3">
                  <AlertTriangle className="h-4 w-4 text-tms-red" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-tms-gray-800">8</div>
                  <div className="text-sm text-tms-gray-500">Compliance Issues</div>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Fleet Distribution">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-tms-gray-700">HGV Fleet</span>
                  <span className="text-sm font-medium text-tms-gray-700">42%</span>
                </div>
                <Progress value={42} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-blue" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-tms-gray-700">LGV Fleet</span>
                  <span className="text-sm font-medium text-tms-gray-700">28%</span>
                </div>
                <Progress value={28} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-green" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-tms-gray-700">Mixed Fleet</span>
                  <span className="text-sm font-medium text-tms-gray-700">18%</span>
                </div>
                <Progress value={18} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-yellow" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-tms-gray-700">Multimodal</span>
                  <span className="text-sm font-medium text-tms-gray-700">12%</span>
                </div>
                <Progress value={12} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-red" />
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Upcoming Expirations">
            <div className="space-y-4">
              <div className="border-l-2 border-tms-red pl-4 py-1">
                <p className="text-sm text-tms-gray-800">City Distribution Ltd</p>
                <div className="flex items-center text-xs text-tms-red mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>Insurance expired 2 days ago</span>
                </div>
              </div>
              
              <div className="border-l-2 border-tms-red pl-4 py-1">
                <p className="text-sm text-tms-gray-800">Global Freight Services</p>
                <div className="flex items-center text-xs text-tms-red mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Insurance expires in 7 days</span>
                </div>
              </div>
              
              <div className="border-l-2 border-tms-yellow pl-4 py-1">
                <p className="text-sm text-tms-gray-800">Global Freight Services</p>
                <div className="flex items-center text-xs text-tms-yellow mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>License expires in 24 days</span>
                </div>
              </div>
              
              <div className="border-l-2 border-tms-yellow pl-4 py-1">
                <p className="text-sm text-tms-gray-800">Swift Transport</p>
                <div className="flex items-center text-xs text-tms-yellow mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Insurance expires in 28 days</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </MainLayout>
  );
}
