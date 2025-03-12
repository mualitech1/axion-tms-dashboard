
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowUpRight, 
  Database, 
  CreditCard, 
  Truck, 
  RefreshCw, 
  Globe, 
  FileSpreadsheet, 
  LineChart, 
  ShieldCheck,
  AlertCircle,
  Users,
  PackageOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function IntegrationSettings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [connectedSystems, setConnectedSystems] = useState(3);
  const [dataSync, setDataSync] = useState(78);
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-tms-gray-800">Connected Systems</h3>
          <p className="text-sm text-tms-gray-600">Integration with external services and customer platforms</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{connectedSystems}/8 systems connected</span>
          <Progress value={connectedSystems * 12.5} className="w-24" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-medium">Payment Gateway</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                    Active
                  </Badge>
                </div>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="stripe-key">API Key</Label>
                <button 
                  className="text-xs text-blue-600 hover:underline"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </button>
              </div>
              <Input 
                id="stripe-key" 
                type={showApiKey ? "text" : "password"} 
                value={showApiKey ? "sk_test_51KjXa2CjY76I42Nk2ImV" : "••••••••••••••••••••••"} 
                readOnly 
              />
            </div>
            
            <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>Saves 3-4 hours of manual payment reconciliation per day and reduces errors by 95%.</p>
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
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-medium">ERP System</CardTitle>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">
                    Setup Required
                  </Badge>
                </div>
                <CardDescription>Connect with customer ERP platforms</CardDescription>
              </div>
              <div className="p-2 bg-tms-green-light rounded-full">
                <Database className="h-5 w-5 text-tms-green" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="erp-enabled">Enable Connection</Label>
              <Switch id="erp-enabled" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="erp-connection">Connection URL</Label>
              <Input id="erp-connection" placeholder="https://erp.customer-domain.com/api/v1" />
            </div>
            
            <div className="mt-4 bg-green-50 p-3 rounded-md text-sm text-green-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>Reduces order processing time by 65% and eliminates duplicate data entry across systems.</p>
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
        
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-medium">Tracking API</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                    Active
                  </Badge>
                </div>
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
            
            <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>Provides real-time visibility into shipments, reducing customer service inquiries by 40%.</p>
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
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-medium">Data Analytics</CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                    Beta
                  </Badge>
                </div>
                <CardDescription>Advanced reporting and business intelligence</CardDescription>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <LineChart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="analytics-enabled">Enable Integration</Label>
              <Switch id="analytics-enabled" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="analytics-connection">BI Platform</Label>
              <select 
                id="analytics-connection" 
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="tableau">Tableau</option>
                <option value="powerbi">Power BI</option>
                <option value="looker">Looker</option>
                <option value="metabase">Metabase</option>
              </select>
            </div>
            
            <div className="mt-4 bg-amber-50 p-3 rounded-md text-sm text-amber-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>Enables data-driven decisions with automated insights, saving 15+ hours of manual analysis weekly.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm">
              Preview Reports
            </Button>
            <Button size="sm" className="bg-tms-blue hover:bg-tms-blue/90">
              Configure
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-base font-medium mb-4">Additional Integrations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Email Service (SMTP)", icon: <Globe className="h-4 w-4" /> },
            { name: "Document Storage", icon: <FileSpreadsheet className="h-4 w-4" /> },
            { name: "Route Optimization", icon: <Truck className="h-4 w-4" /> },
            { name: "Customer CRM", icon: <Users className="h-4 w-4" /> },
            { name: "Security Suite", icon: <ShieldCheck className="h-4 w-4" /> },
            { name: "Inventory Management", icon: <PackageOpen className="h-4 w-4" /> },
          ].map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                {integration.icon}
                <span className="font-medium text-sm">{integration.name}</span>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-base font-medium text-blue-800 mb-2">Integration ROI Summary</h3>
        <p className="text-sm text-blue-700 mb-4">
          Our current integrations are providing an estimated annual savings of $48,500 
          and 720 hours in manual processing time.
        </p>
        <Button variant="outline" className="bg-white hover:bg-gray-50 border-blue-200 text-blue-700">
          View Detailed ROI Report
        </Button>
      </div>
    </div>
  );
}
