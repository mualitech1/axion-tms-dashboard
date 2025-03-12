
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-tms-gray-800">Company Information</h3>
        <p className="text-sm text-tms-gray-600">Update your company details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name</Label>
          <Input id="company-name" defaultValue="IKB Transport" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" defaultValue="+44 20 1234 5678" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" defaultValue="info@ikbtransport.com" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" defaultValue="https://ikbtransport.com" />
        </div>
      </div>
      
      <div className="pt-4 border-t border-tms-gray-200">
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-medium text-tms-gray-800">Regional Settings</h3>
          <p className="text-sm text-tms-gray-600">Configure location preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="europe-london">
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe-london">Europe/London (GMT+00:00)</SelectItem>
                <SelectItem value="europe-paris">Europe/Paris (GMT+01:00)</SelectItem>
                <SelectItem value="america-newyork">America/New York (GMT-05:00)</SelectItem>
                <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+09:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select defaultValue="gbp">
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gbp">British Pound (£)</SelectItem>
                <SelectItem value="eur">Euro (€)</SelectItem>
                <SelectItem value="usd">US Dollar ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-tms-gray-200">
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-medium text-tms-gray-800">System Preferences</h3>
          <p className="text-sm text-tms-gray-600">Adjust system behavior</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-refresh" className="mb-1 block">Automatic Data Refresh</Label>
              <p className="text-sm text-tms-gray-500">Automatically refresh data every 5 minutes</p>
            </div>
            <Switch id="auto-refresh" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-notifications" className="mb-1 block">Desktop Notifications</Label>
              <p className="text-sm text-tms-gray-500">Show desktop notifications for important events</p>
            </div>
            <Switch id="show-notifications" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
