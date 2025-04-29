
import { Driver } from '../types/driverTypes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BellRing, Calendar, AlertTriangle, Eye, PhoneCall, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

interface DriversTableProps {
  drivers: Driver[];
}

export default function DriversTable({ drivers }: DriversTableProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'On Leave':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Inactive':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getLicenseExpiryBadge = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
      return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Expired</Badge>;
    } else if (daysLeft <= 30) {
      return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1"><Calendar className="h-3 w-3" /> {daysLeft} days left</Badge>;
    } else if (daysLeft <= 90) {
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 flex items-center gap-1"><Calendar className="h-3 w-3" /> {daysLeft} days left</Badge>;
    }
    
    return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDistanceToNow(new Date(expiryDate), { addSuffix: true })}</Badge>;
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
            <TableHead className="text-aximo-text font-semibold">Name</TableHead>
            <TableHead className="text-aximo-text font-semibold">Status</TableHead>
            <TableHead className="text-aximo-text font-semibold">National Insurance</TableHead>
            <TableHead className="text-aximo-text font-semibold">License Expiry</TableHead>
            <TableHead className="text-aximo-text font-semibold">CPC Expiry</TableHead>
            <TableHead className="text-aximo-text font-semibold">Performance</TableHead>
            <TableHead className="text-aximo-text font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <motion.tbody
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {drivers.length > 0 ? (
            drivers.map((driver, index) => (
              <motion.tr 
                key={driver.id}
                variants={rowVariants}
                className="group cursor-pointer hover:bg-aximo-darker/70 border-aximo-border"
                onClick={() => navigate(`/drivers/${driver.id}`)}
              >
                <TableCell className="font-medium p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-aximo-primary/20 text-aximo-primary p-1.5 rounded-full">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-aximo-text">{driver.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(driver.status)}`}>
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-aximo-text">{driver.nationalInsurance}</TableCell>
                <TableCell>{getLicenseExpiryBadge(driver.license.expiryDate)}</TableCell>
                <TableCell>{getLicenseExpiryBadge(driver.cpc.expiryDate)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          driver.kpi.onTimeDeliveries > 90 ? 'bg-green-500' : 
                          driver.kpi.onTimeDeliveries > 80 ? 'bg-amber-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${driver.kpi.onTimeDeliveries}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-aximo-text-secondary">{driver.kpi.onTimeDeliveries}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text hover:bg-aximo-primary/10 hover:text-aximo-primary" onClick={(e) => {
                      e.stopPropagation();
                      // Action to view driver details
                    }}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text hover:bg-aximo-primary/10 hover:text-aximo-primary" onClick={(e) => {
                      e.stopPropagation();
                      // Action to call driver
                    }}>
                      <PhoneCall className="h-4 w-4" />
                      <span className="sr-only">Call</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text hover:bg-aximo-primary/10 hover:text-aximo-primary" onClick={(e) => {
                      e.stopPropagation();
                      // Action to email driver
                    }}>
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow className="border-aximo-border">
              <TableCell colSpan={7} className="h-24 text-center text-aximo-text-secondary">
                No drivers found.
              </TableCell>
            </TableRow>
          )}
        </motion.tbody>
      </Table>
    </div>
  );
}
