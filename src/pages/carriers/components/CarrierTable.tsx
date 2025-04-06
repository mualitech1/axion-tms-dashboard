import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  AlertCircle, 
  CheckCircle, 
  Truck,
  MoreHorizontal,
  Thermometer,
  AlertTriangle,
  Package,
  Globe,
  Boxes
} from 'lucide-react';
import { Carrier } from '../data/carrierData';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CarrierTableProps {
  carriers: Carrier[];
}

// Map capability to icon for display
const capabilityIcons: Record<string, React.ReactNode> = {
  'curtain-side': <Truck size={16} />,
  'temperature-controlled': <Thermometer size={16} />,
  'adr': <AlertTriangle size={16} />,
  'container': <Package size={16} />,
  'traction-only': <Truck size={16} />,
  'rigid': <Boxes size={16} />,
  'eu-transport': <Globe size={16} />,
  'deep-sea': <Globe size={16} />
};

const capabilityLabels: Record<string, string> = {
  'curtain-side': 'Curtain-side',
  'temperature-controlled': 'Temperature Controlled',
  'adr': 'ADR (Hazardous Goods)',
  'container': 'Container Transport',
  'traction-only': 'Traction Only',
  'rigid': 'Rigid Vehicles',
  'eu-transport': 'EU Transport',
  'deep-sea': 'Deep-Sea Capabilities'
};

export default function CarrierTable({ carriers }: CarrierTableProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Carrier Name</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Fleet</TableHead>
              <TableHead>Capabilities</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carriers.length > 0 ? (
              carriers.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell className="w-10">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(carrier.id)}
                    >
                      <Star className={carrier.favorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} size={16} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link 
                      to={`/carriers/details/${carrier.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {carrier.name}
                    </Link>
                  </TableCell>
                  <TableCell>{carrier.region}</TableCell>
                  <TableCell>{carrier.fleet}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      <TooltipProvider>
                        {carrier.capabilities.slice(0, 3).map((capability) => (
                          <Tooltip key={capability}>
                            <TooltipTrigger asChild>
                              <div className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded-md">
                                {capabilityIcons[capability] || <Truck size={16} />}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{capabilityLabels[capability] || capability}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                        
                        {carrier.capabilities.length > 3 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded-md text-xs font-medium">
                                +{carrier.capabilities.length - 3}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-1">
                                {carrier.capabilities.slice(3).map((capability) => (
                                  <p key={capability} className="flex items-center gap-2">
                                    {capabilityIcons[capability] || <Truck size={16} />}
                                    {capabilityLabels[capability] || capability}
                                  </p>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`
                        ${carrier.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 
                          carrier.status === 'Issue' ? 'bg-red-50 text-red-600 border-red-200' : 
                          'bg-gray-50 text-gray-600 border-gray-200'}
                      `}
                    >
                      {carrier.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {carrier.complianceStatus === 'Compliant' ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                      ) : carrier.complianceStatus === 'Action Required' ? (
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500 mr-1.5" />
                      )}
                      <span className="text-sm">{carrier.complianceStatus}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/carriers/details/${carrier.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Carrier</DropdownMenuItem>
                        <DropdownMenuItem>Check Compliance</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Disable Carrier
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Truck size={36} className="mb-2 opacity-30" />
                    <h3 className="font-medium">No carriers found</h3>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
