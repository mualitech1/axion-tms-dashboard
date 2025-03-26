
import { UserPlus, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserPageHeader() {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-tms-gray-800">User Management</h1>
          <p className="text-tms-gray-600">Manage system users and permissions</p>
        </div>
        
        <Button className="bg-tms-blue hover:bg-tms-blue/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-full max-w-md">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="hidden md:flex space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            User Settings
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Permissions
          </Button>
        </div>
      </div>
    </div>
  );
}
