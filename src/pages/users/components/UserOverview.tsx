import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, Check, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserOverviewProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
}

export default function UserOverview({ 
  totalUsers, 
  activeUsers, 
  inactiveUsers, 
  adminUsers 
}: UserOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <UsersIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-semibold">{totalUsers}</p>
            <p className="text-gray-500 text-sm">Total Users</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-semibold">{activeUsers}</p>
            <p className="text-gray-500 text-sm">Active Users</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="bg-red-100 p-3 rounded-full">
            <X className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-semibold">{inactiveUsers}</p>
            <p className="text-gray-500 text-sm">Inactive Users</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full">
            <ShieldCheck className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-semibold">{adminUsers}</p>
            <p className="text-gray-500 text-sm">Admin Users</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
