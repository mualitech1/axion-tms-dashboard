
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UserPageHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-tms-gray-800">User Management</h1>
        <p className="text-tms-gray-600">Manage system users and permissions</p>
      </div>
      
      <Button className="bg-tms-blue hover:bg-tms-blue/90">
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>
  );
}
