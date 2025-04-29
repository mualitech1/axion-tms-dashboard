
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  AlertCircle, 
  CheckCircle, 
  Truck,
  MoreHorizontal,
  Eye,
  PhoneCall,
  Mail
} from 'lucide-react';
import { Carrier, capabilityIcons, capabilityLabels } from '../data/carrierData';
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

export default function CarrierTable({ carriers }: CarrierTableProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id) 
        : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Issue':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getComplianceColor = (status: string) => {
    switch(status) {
      case 'Compliant':
        return 'text-green-500';
      case 'Action Required':
        return 'text-amber-500';
      default:
        return 'text-red-500';
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-aximo-darker">
          <TableRow className="hover:bg-transparent border-aximo-border">
            <TableHead className="text-aximo-text font-semibold w-10"></TableHead>
            <TableHead className="text-aximo-text font-semibold">Carrier Name</TableHead>
            <TableHead className="text-aximo-text font-semibold">Region</TableHead>
            <TableHead className="text-aximo-text font-semibold">Fleet</TableHead>
            <TableHead className="text-aximo-text font-semibold">Capabilities</TableHead>
            <TableHead className="text-aximo-text font-semibold">Status</TableHead>
            <TableHead className="text-aximo-text font-semibold">Compliance</TableHead>
            <TableHead className="text-aximo-text font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carriers.length > 0 ? (
            carriers.map((carrier, i) => (
              <motion.tr
                key={carrier.id}
                className="cursor-pointer hover:bg-aximo-darker/50 border-aximo-border"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={tableRowVariants}
                onClick={() => window.location.href = `/carriers/details/${carrier.id}`}
              >
                <TableCell className="w-10">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-aximo-text p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(carrier.id);
                    }}
                  >
                    <Star className={carrier.favorite ? "fill-yellow-400 text-yellow-400" : "text-aximo-text-secondary"} size={16} />
                  </Button>
                </TableCell>
                <TableCell className="font-medium text-aximo-text">
                  {carrier.name}
                </TableCell>
                <TableCell className="text-aximo-text">{carrier.region}</TableCell>
                <TableCell className="text-aximo-text">{carrier.fleet}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    <TooltipProvider>
                      {carrier.capabilities.slice(0, 3).map((capability) => (
                        <Tooltip key={capability}>
                          <TooltipTrigger asChild>
                            <div className="inline-flex items-center justify-center w-7 h-7 bg-aximo-darker rounded-md text-aximo-text">
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
                            <div className="inline-flex items-center justify-center w-7 h-7 bg-aximo-darker rounded-md text-xs font-medium text-aximo-text">
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
                    className={getStatusColor(carrier.status)}
                  >
                    {carrier.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {carrier.complianceStatus === 'Compliant' ? (
                      <CheckCircle className={`h-4 w-4 mr-1.5 ${getComplianceColor(carrier.complianceStatus)}`} />
                    ) : carrier.complianceStatus === 'Action Required' ? (
                      <AlertCircle className={`h-4 w-4 mr-1.5 ${getComplianceColor(carrier.complianceStatus)}`} />
                    ) : (
                      <AlertCircle className={`h-4 w-4 mr-1.5 ${getComplianceColor(carrier.complianceStatus)}`} />
                    )}
                    <span className="text-sm text-aximo-text">{carrier.complianceStatus}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text" onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/carriers/details/${carrier.id}`;
                  }}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text" onClick={(e) => {
                    e.stopPropagation();
                    // Action to call carrier
                  }}>
                    <PhoneCall className="h-4 w-4" />
                    <span className="sr-only">Call</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text" onClick={(e) => {
                    e.stopPropagation();
                    // Action to email carrier
                  }}>
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow className="border-aximo-border">
              <TableCell colSpan={8} className="h-24 text-center text-aximo-text-secondary">
                <div className="flex flex-col items-center justify-center text-aximo-text-secondary">
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
  );
}
