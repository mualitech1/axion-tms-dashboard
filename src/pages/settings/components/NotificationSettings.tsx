
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

export default function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-tms-gray-800">Notification Channels</h3>
        <p className="text-sm text-tms-gray-600">Choose how you want to receive notifications</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-tms-gray-500" />
            <div>
              <Label htmlFor="email-notifications" className="mb-1 block">Email Notifications</Label>
              <p className="text-sm text-tms-gray-500">Receive notifications via email</p>
            </div>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-tms-gray-500" />
            <div>
              <Label htmlFor="app-notifications" className="mb-1 block">In-App Notifications</Label>
              <p className="text-sm text-tms-gray-500">Show notifications within the application</p>
            </div>
          </div>
          <Switch id="app-notifications" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-tms-gray-500" />
            <div>
              <Label htmlFor="sms-notifications" className="mb-1 block">SMS Notifications</Label>
              <p className="text-sm text-tms-gray-500">Receive critical alerts via SMS</p>
            </div>
          </div>
          <Switch id="sms-notifications" />
        </div>
      </div>
      
      <div className="pt-4 border-t border-tms-gray-200">
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-medium text-tms-gray-800">Notification Preferences</h3>
          <p className="text-sm text-tms-gray-600">Choose which events trigger notifications</p>
        </div>
        
        <Tabs defaultValue="shipments" className="w-full">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="shipments" className="data-[state=active]:bg-tms-blue-light data-[state=active]:text-tms-blue">Shipments</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-tms-blue-light data-[state=active]:text-tms-blue">Users</TabsTrigger>
            <TabsTrigger value="finance" className="data-[state=active]:bg-tms-blue-light data-[state=active]:text-tms-blue">Finance</TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-tms-blue-light data-[state=active]:text-tms-blue">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shipments" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shipment-created" className="mb-1 block">Shipment Created</Label>
                <p className="text-sm text-tms-gray-500">When a new shipment is created</p>
              </div>
              <Switch id="shipment-created" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shipment-status" className="mb-1 block">Status Changes</Label>
                <p className="text-sm text-tms-gray-500">When a shipment status changes</p>
              </div>
              <Switch id="shipment-status" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delivery-exceptions" className="mb-1 block">Delivery Exceptions</Label>
                <p className="text-sm text-tms-gray-500">When there's a problem with delivery</p>
              </div>
              <Switch id="delivery-exceptions" defaultChecked />
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="user-added" className="mb-1 block">User Added</Label>
                <p className="text-sm text-tms-gray-500">When a new user is added to the system</p>
              </div>
              <Switch id="user-added" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="user-permissions" className="mb-1 block">Permission Changes</Label>
                <p className="text-sm text-tms-gray-500">When a user's permissions are modified</p>
              </div>
              <Switch id="user-permissions" defaultChecked />
            </div>
          </TabsContent>
          
          <TabsContent value="finance" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="invoice-issued" className="mb-1 block">Invoice Issued</Label>
                <p className="text-sm text-tms-gray-500">When a new invoice is generated</p>
              </div>
              <Switch id="invoice-issued" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="payment-received" className="mb-1 block">Payment Received</Label>
                <p className="text-sm text-tms-gray-500">When a payment is processed</p>
              </div>
              <Switch id="payment-received" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="payment-overdue" className="mb-1 block">Payment Overdue</Label>
                <p className="text-sm text-tms-gray-500">When an invoice becomes overdue</p>
              </div>
              <Switch id="payment-overdue" defaultChecked />
            </div>
          </TabsContent>
          
          <TabsContent value="system" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="system-updates" className="mb-1 block">System Updates</Label>
                <p className="text-sm text-tms-gray-500">When system updates are available</p>
              </div>
              <Switch id="system-updates" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="security-alerts" className="mb-1 block">Security Alerts</Label>
                <p className="text-sm text-tms-gray-500">Important security notifications</p>
              </div>
              <Switch id="security-alerts" defaultChecked />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
