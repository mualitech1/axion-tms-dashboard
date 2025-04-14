
import { Vehicle } from '../types/fleetTypes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Tool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface VehiclesTableProps {
  vehicles: Vehicle[];
}

export default function VehiclesTable({ vehicles }: VehiclesTableProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Out of Service':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExpiryBadge = (expiryDate: string) => {
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
            <TableHead>Registration</TableHead>
            <TableHead>Vehicle Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>MOT Expiry</TableHead>
            <TableHead>Service Due</TableHead>
            <TableHead>Mileage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <TableRow 
                key={vehicle.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/fleet/${vehicle.id}`)}
              >
                <TableCell className="font-medium">{vehicle.registration}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                    <div className="text-xs text-muted-foreground">{vehicle.year} • {vehicle.type}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell>{getExpiryBadge(vehicle.motExpiryDate)}</TableCell>
                <TableCell>
                  {new Date(vehicle.nextServiceDate) <= new Date() ? (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                      <Tool className="h-3 w-3" /> Overdue
                    </Badge>
                  ) : (
                    getExpiryBadge(vehicle.nextServiceDate)
                  )}
                </TableCell>
                <TableCell>{vehicle.currentMileage.toLocaleString()} miles</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No vehicles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
