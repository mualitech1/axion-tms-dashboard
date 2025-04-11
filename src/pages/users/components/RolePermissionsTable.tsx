
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check } from 'lucide-react';

export default function RolePermissionsTable() {
  const roles = ['Senior Management', 'Operations', 'Accounts', 'Sales'];
  const modules = ['Dashboard', 'Customers', 'Carriers', 'Jobs', 'Finance'];
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium text-sm text-gray-600">MODULE</TableHead>
            {roles.map(role => (
              <TableHead key={role} className="font-medium text-sm text-gray-600 text-center uppercase">
                {role}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map(module => (
            <TableRow key={module} className="hover:bg-gray-50">
              <TableCell className="font-medium">{module}</TableCell>
              {roles.map(role => (
                <TableCell key={`${module}-${role}`} className="text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
