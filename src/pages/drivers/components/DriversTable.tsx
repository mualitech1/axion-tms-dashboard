
import { Driver } from '../types/driverTypes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BellRing, Calendar, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface DriversTableProps {
  drivers: Driver[];
}

export default function DriversTable({ drivers }: DriversTableProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'On Leave':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLicenseExpiryBadge = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
      return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Expired</Badge>;
    } else if (daysLeft <= 30) {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"><Calendar className="h-3 w-3" /> {daysLeft} days left</Badge>;
    } else if (daysLeft <= 90) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1"><Calendar className="h-3 w-3" /> {daysLeft} days left</Badge>;
    }
    
    return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{formatDistanceToNow(new Date(expiryDate))} left</Badge>;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>National Insurance</TableHead>
            <TableHead>License Expiry</TableHead>
            <TableHead>CPC Expiry</TableHead>
            <TableHead>Performance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <TableRow 
                key={driver.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/drivers/${driver.id}`)}
              >
                <TableCell className="font-medium">{driver.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(driver.status)}`}>
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>{driver.nationalInsurance}</TableCell>
                <TableCell>{getLicenseExpiryBadge(driver.license.expiryDate)}</TableCell>
                <TableCell>{getLicenseExpiryBadge(driver.cpc.expiryDate)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          driver.kpi.onTimeDeliveries > 90 ? 'bg-green-500' : 
                          driver.kpi.onTimeDeliveries > 80 ? 'bg-amber-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${driver.kpi.onTimeDeliveries}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{driver.kpi.onTimeDeliveries}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No drivers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
