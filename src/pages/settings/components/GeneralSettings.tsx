
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Globe, LayoutGrid } from 'lucide-react';

export default function GeneralSettings() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SettingsSection 
        icon={Building}
        title="Company Information" 
        description="Update your company details"
        className="bg-gradient-to-br from-white to-tms-blue/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <Label htmlFor="company-name" className="text-muted-foreground">Company Name</Label>
            <Input id="company-name" defaultValue="IKB Transport" className="border-tms-gray-300 focus:border-tms-blue transition-colors" />
          </div>
          
          <div className="space-y-2.5">
            <Label htmlFor="phone" className="text-muted-foreground">Phone Number</Label>
            <Input id="phone" defaultValue="+44 20 1234 5678" className="border-tms-gray-300 focus:border-tms-blue transition-colors" />
          </div>
          
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
            <Input id="email" defaultValue="info@ikbtransport.com" className="border-tms-gray-300 focus:border-tms-blue transition-colors" />
          </div>
          
          <div className="space-y-2.5">
            <Label htmlFor="website" className="text-muted-foreground">Website</Label>
            <Input id="website" defaultValue="https://ikbtransport.com" className="border-tms-gray-300 focus:border-tms-blue transition-colors" />
          </div>
        </div>
      </SettingsSection>
      
      <SettingsSection 
        icon={Globe}
        title="Regional Settings" 
        description="Configure location preferences"
        className="bg-gradient-to-br from-white to-tms-green-light/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <Label htmlFor="timezone" className="text-muted-foreground">Timezone</Label>
            <Select defaultValue="europe-london">
              <SelectTrigger id="timezone" className="bg-white border-tms-gray-300 focus:border-tms-blue transition-colors">
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
          
          <div className="space-y-2.5">
            <Label htmlFor="currency" className="text-muted-foreground">Currency</Label>
            <Select defaultValue="gbp">
              <SelectTrigger id="currency" className="bg-white border-tms-gray-300 focus:border-tms-blue transition-colors">
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
      </SettingsSection>
      
      <SettingsSection 
        icon={LayoutGrid}
        title="System Preferences" 
        description="Adjust system behavior"
        className="bg-gradient-to-br from-white to-tms-yellow-light/30"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-tms-gray-200 shadow-sm hover:border-tms-gray-300 transition-colors">
            <div>
              <Label htmlFor="auto-refresh" className="text-sm font-medium mb-1 block">Automatic Data Refresh</Label>
              <p className="text-sm text-muted-foreground">Automatically refresh data every 5 minutes</p>
            </div>
            <Switch id="auto-refresh" className="data-[state=checked]:bg-tms-blue data-[state=checked]:border-tms-blue" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-tms-gray-200 shadow-sm hover:border-tms-gray-300 transition-colors">
            <div>
              <Label htmlFor="show-notifications" className="text-sm font-medium mb-1 block">Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">Show desktop notifications for important events</p>
            </div>
            <Switch id="show-notifications" className="data-[state=checked]:bg-tms-blue data-[state=checked]:border-tms-blue" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-tms-gray-200 shadow-sm hover:border-tms-gray-300 transition-colors">
            <div>
              <Label htmlFor="compact-view" className="text-sm font-medium mb-1 block">Compact View</Label>
              <p className="text-sm text-muted-foreground">Display more information in a compact layout</p>
            </div>
            <Switch id="compact-view" className="data-[state=checked]:bg-tms-blue data-[state=checked]:border-tms-blue" />
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ 
  title, 
  description, 
  children, 
  icon: Icon,
  className = ""
}) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${className}`}>
      <div className="px-6 py-4 flex gap-3 items-center border-b border-tms-gray-200">
        <div className="p-2 rounded-full bg-white shadow-sm">
          {Icon && <Icon className="w-5 h-5 text-tms-blue" />}
        </div>
        <div>
          <h3 className="text-lg font-medium text-tms-gray-800">{title}</h3>
          <p className="text-sm text-tms-gray-600">{description}</p>
        </div>
      </div>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}
