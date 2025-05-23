import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  AlertCircle, 
  CheckCircle, 
  Truck,
  Eye,
  PhoneCall,
  Mail,
  User,
  Orbit,
  Zap,
  Network
} from 'lucide-react';
import { Carrier } from '../data/types/carrierTypes';
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

interface CarrierTableProps {
  carriers: Carrier[];
}

export default function CarrierTable({ carriers }: CarrierTableProps) {
  const navigate = useNavigate();
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

  // Map status to quantum-themed term
  const statusMap: Record<string, string> = {
    'Active': 'Stabilized',
    'Issue': 'Fluctuating',
    'Inactive': 'Dormant'
  };

  // Map compliance to quantum-themed term
  const complianceMap: Record<string, string> = {
    'Compliant': 'Coherent',
    'Action Required': 'Calibration Needed',
    'Non-compliant': 'Decoherent'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-aximo-darker">
          <TableRow className="hover:bg-transparent border-aximo-border">
            <TableHead className="text-aximo-text font-semibold w-10"></TableHead>
            <TableHead className="text-aximo-text font-semibold">Conduit Entity</TableHead>
            <TableHead className="text-aximo-text font-semibold">Quantum Sector</TableHead>
            <TableHead className="text-aximo-text font-semibold">Particles</TableHead>
            <TableHead className="text-aximo-text font-semibold">Capabilities</TableHead>
            <TableHead className="text-aximo-text font-semibold">Quantum State</TableHead>
            <TableHead className="text-aximo-text font-semibold">Coherence</TableHead>
            <TableHead className="text-aximo-text font-semibold text-right">Controls</TableHead>
          </TableRow>
        </TableHeader>
        <motion.tbody
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {carriers.length > 0 ? (
            carriers.map((carrier, i) => (
              <motion.tr
                key={carrier.id}
                variants={rowVariants}
                className="group cursor-pointer hover:bg-aximo-darker/60 group-hover:ring-1 group-hover:ring-aximo-primary/70 group-hover:shadow-[0_0_12px_rgba(var(--color-aximo-primary-rgb),0.4)] transition-all duration-300 border-aximo-border"
                onClick={() => navigate(`/carriers/details/${carrier.id}`)}
              >
                <TableCell className="w-10 text-aximo-text">
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
                  <div className="flex items-center gap-3">
                    <div className="bg-aximo-primary/20 text-aximo-primary p-1.5 rounded-full">
                      <Orbit className="w-4 h-4" />
                    </div>
                    <span>{carrier.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-aximo-text">{carrier.region}</TableCell>
                <TableCell className="text-aximo-text">{carrier.fleet}</TableCell>
                <TableCell className="text-aximo-text">
                  <div className="flex gap-1 flex-wrap">
                    <TooltipProvider>
                      {carrier.capabilities.slice(0, 3).map((capability, idx) => (
                        <Tooltip key={`${carrier.id}-${capability}-${idx}`}>
                          <TooltipTrigger asChild>
                            <div className="inline-flex items-center justify-center w-7 h-7 bg-aximo-darker rounded-md text-aximo-text">
                              <Zap size={16} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{capability}</p>
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
                              {carrier.capabilities.slice(3).map((capability, idx) => (
                                <p key={`${carrier.id}-${capability}-extra-${idx}`} className="flex items-center gap-2">
                                  <Zap size={16} />
                                  {capability}
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
                    {statusMap[carrier.status] || carrier.status}
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
                    <span className="text-sm text-aximo-text">{complianceMap[carrier.complianceStatus] || carrier.complianceStatus}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-1 text-aximo-text">
                  <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text hover:bg-aximo-primary/10 hover:text-aximo-primary" onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/carriers/details/${carrier.id}`);
                    }}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text hover:bg-aximo-primary/10 hover:text-aximo-primary" onClick={(e) => {
                      e.stopPropagation();
                      // Action to call carrier
                    }}>
                      <Network className="h-4 w-4" />
                      <span className="sr-only">Connect</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text hover:bg-aximo-primary/10 hover:text-aximo-primary" onClick={(e) => {
                      e.stopPropagation();
                      // Action to email carrier
                    }}>
                      <Zap className="h-4 w-4" />
                      <span className="sr-only">Calibrate</span>
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow className="border-aximo-border">
              <TableCell colSpan={8} className="h-24 text-center text-aximo-text-secondary">
                <div className="flex flex-col items-center justify-center text-aximo-text-secondary">
                  <Orbit size={36} className="mb-2 opacity-30" />
                  <h3 className="font-medium">No quantum conduits found</h3>
                  <p className="text-sm">Recalibrate your quantum search parameters</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </motion.tbody>
      </Table>
    </div>
  );
}
