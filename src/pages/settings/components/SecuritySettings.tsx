
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Key, Lock } from 'lucide-react';
import TwoFactorSetup from '@/pages/users/components/TwoFactorSetup';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SecuritySettings() {
  const [require2FA, setRequire2FA] = useState(false);
  const { toast } = useToast();
  
  const handleRequire2FAChange = (checked: boolean) => {
    setRequire2FA(checked);
    
    toast({
      title: checked ? "2FA Requirement Enabled" : "2FA Requirement Disabled",
      description: checked 
        ? "Two-factor authentication is now required for all users." 
        : "Two-factor authentication requirement has been disabled.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-tms-gray-800">Password Security</h3>
        <p className="text-sm text-tms-gray-600">Update your password settings</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="password-expiry" className="mb-1 block">Password Expiry</Label>
            <p className="text-sm text-tms-gray-500">Force password change every 90 days</p>
          </div>
          <Switch id="password-expiry" defaultChecked />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password-policy">Password Policy</Label>
          <Select defaultValue="strong">
            <SelectTrigger id="password-policy">
              <SelectValue placeholder="Select policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (8+ characters)</SelectItem>
              <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
              <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="mt-2">
          <Key className="mr-2 h-4 w-4" />
          Reset All Passwords
        </Button>
      </div>
      
      {/* Two-Factor Authentication Section */}
      <div className="pt-4 border-t border-tms-gray-200">
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-medium text-tms-gray-800">Two-Factor Authentication</h3>
          <p className="text-sm text-tms-gray-600">Enhanced account security</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="require-2fa" className="mb-1 block">Require 2FA</Label>
              <p className="text-sm text-tms-gray-500">Require two-factor authentication for all users</p>
            </div>
            <Switch 
              id="require-2fa" 
              checked={require2FA}
              onCheckedChange={handleRequire2FAChange}
            />
          </div>
          
          {/* Setup or manage your own 2FA */}
          <TwoFactorSetup />
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="2fa-method">Default 2FA Method</Label>
            <Select defaultValue="app">
              <SelectTrigger id="2fa-method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">Authenticator App</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-tms-gray-200">
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-medium text-tms-gray-800">Session Management</h3>
          <p className="text-sm text-tms-gray-600">Control user sessions</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="session-timeout" className="mb-1 block">Session Timeout</Label>
              <p className="text-sm text-tms-gray-500">Automatically log out inactive users</p>
            </div>
            <Switch id="session-timeout" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeout-duration">Timeout Duration</Label>
            <Select defaultValue="30">
              <SelectTrigger id="timeout-duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="mt-2 text-tms-red border-tms-red hover:bg-tms-red-light">
            <Lock className="mr-2 h-4 w-4" />
            Terminate All Sessions
          </Button>
        </div>
      </div>
    </div>
  );
}
