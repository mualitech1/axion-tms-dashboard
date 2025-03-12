
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Database, CreditCard, Truck, RefreshCw } from 'lucide-react';

export default function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-tms-gray-800">Third-Party Integrations</h3>
        <p className="text-sm text-tms-gray-600">Connect with external services</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base font-medium">Payment Gateway</CardTitle>
                <CardDescription>Connect with Stripe for payment processing</CardDescription>
              </div>
              <div className="p-2 bg-tms-blue-light rounded-full">
                <CreditCard className="h-5 w-5 text-tms-blue" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="stripe-enabled">Enable Stripe</Label>
              <Switch id="stripe-enabled" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripe-key">API Key</Label>
              <Input id="stripe-key" type="password" value="••••••••••••••••••••••" readOnly />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-3 w-3" />
              Refresh Key
            </Button>
            <Button size="sm" className="bg-tms-blue hover:bg-tms-blue/90">
              Configure
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base font-medium">Database</CardTitle>
                <CardDescription>Connect with external databases</CardDescription>
              </div>
              <div className="p-2 bg-tms-green-light rounded-full">
                <Database className="h-5 w-5 text-tms-green" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="db-enabled">Enable Connection</Label>
              <Switch id="db-enabled" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-connection">Connection String</Label>
              <Input id="db-connection" placeholder="Enter connection string" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm">
              Test Connection
            </Button>
            <Button size="sm" className="bg-tms-blue hover:bg-tms-blue/90">
              Configure
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base font-medium">Tracking API</CardTitle>
                <CardDescription>Connect with shipment tracking services</CardDescription>
              </div>
              <div className="p-2 bg-tms-yellow-light rounded-full">
                <Truck className="h-5 w-5 text-tms-yellow" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="tracking-enabled">Enable API</Label>
              <Switch id="tracking-enabled" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tracking-key">API Key</Label>
              <Input id="tracking-key" type="password" value="••••••••••••••••••••••" readOnly />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-3 w-3" />
              Refresh Key
            </Button>
            <Button size="sm" className="bg-tms-blue hover:bg-tms-blue/90">
              Configure
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-base font-medium">Available Integrations</CardTitle>
            <CardDescription>Other services you can connect</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="font-medium text-sm">Email Service (SMTP)</span>
                <Button variant="outline" size="sm">Connect</Button>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-sm">Document Storage</span>
                <Button variant="outline" size="sm">Connect</Button>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-sm">Route Optimization</span>
                <Button variant="outline" size="sm">Connect</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
