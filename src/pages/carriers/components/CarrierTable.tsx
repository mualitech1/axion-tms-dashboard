
import { Truck, Search, Filter, Download, MoreHorizontal } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Carrier } from '../data/carrierData';

interface CarrierTableProps {
  carriers: Carrier[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function CarrierTable({ carriers, searchTerm, onSearchChange }: CarrierTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-card mb-6">
      <div className="p-4 border-b border-tms-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tms-gray-500" />
            <Input
              placeholder="Search carriers..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
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
            {carriers.length > 0 ? (
              carriers.map((carrier) => (
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
  );
}
