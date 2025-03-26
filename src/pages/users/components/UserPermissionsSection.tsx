
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { rolePermissions } from '../data/rolePermissions';

interface UserPermissionsSectionProps {
  userId: number;
  userRole: string;
}

export default function UserPermissionsSection({ userId, userRole }: UserPermissionsSectionProps) {
  const [permissions, setPermissions] = useState(() => {
    // Get default permissions for user's role
    return rolePermissions[userRole] || {};
  });
  
  const [hasCustomPermissions, setHasCustomPermissions] = useState(false);
  
  const handlePermissionChange = (permissionKey: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [permissionKey]: value
    }));
    setHasCustomPermissions(true);
  };
  
  const permissionGroups = {
    "Jobs & Dispatching": ["viewJobs", "createJobs", "editJobs", "deleteJobs", "assignJobs"],
    "Customers": ["viewCustomers", "createCustomers", "editCustomers", "deleteCustomers"],
    "Carriers": ["viewCarriers", "createCarriers", "editCarriers", "deleteCarriers"],
    "Finance": ["viewInvoices", "createInvoices", "approvePayments", "viewReports"],
    "System": ["manageUsers", "viewSettings", "editSettings", "viewLogs"]
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Permissions</CardTitle>
          <CardDescription>
            Permissions for this user based on their role ({userRole})
            {hasCustomPermissions && " - Custom permissions applied"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(permissionGroups).map(([groupName, permissionKeys]) => (
              <div key={groupName}>
                <h3 className="text-md font-medium mb-4">{groupName}</h3>
                <div className="space-y-4">
                  {permissionKeys.map(key => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">{formatPermissionName(key)}</div>
                        <div className="text-sm text-tms-gray-500">
                          {getPermissionDescription(key)}
                        </div>
                      </div>
                      <Switch 
                        checked={permissions[key] || false}
                        onCheckedChange={(checked) => handlePermissionChange(key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-6 space-x-2">
            <Button variant="outline">Reset to Role Defaults</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatPermissionName(key: string): string {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

function getPermissionDescription(key: string): string {
  const descriptions: Record<string, string> = {
    "viewJobs": "Can view all job details and history",
    "createJobs": "Can create new job entries",
    "editJobs": "Can modify existing jobs",
    "deleteJobs": "Can remove jobs from the system",
    "assignJobs": "Can assign jobs to carriers",
    "viewCustomers": "Can view customer information",
    "createCustomers": "Can add new customers",
    "editCustomers": "Can update customer details",
    "deleteCustomers": "Can remove customers from the system",
    "viewCarriers": "Can view carrier information",
    "createCarriers": "Can add new carriers",
    "editCarriers": "Can update carrier details",
    "deleteCarriers": "Can remove carriers from the system",
    "viewInvoices": "Can view all invoice details",
    "createInvoices": "Can generate new invoices",
    "approvePayments": "Can approve payment transactions",
    "viewReports": "Can access financial reports",
    "manageUsers": "Can add, edit, and remove users",
    "viewSettings": "Can view system settings",
    "editSettings": "Can modify system settings",
    "viewLogs": "Can access system and user logs"
  };
  
  return descriptions[key] || "No description available";
}
