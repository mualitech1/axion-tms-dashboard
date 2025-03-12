
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IntegrationSettings from '../settings/components/IntegrationSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, DollarSign, Clock, LineChart } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <MainLayout title="Integrations">
      <DashboardHeader
        title="Integrations Hub"
        subtitle="Connect with your customers' systems to save time and resources"
      />
      
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-tms-blue" />
              <span className="text-2xl font-bold">40h</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Monthly automation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cost Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">15%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Processing costs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-tms-blue" />
              <span className="text-2xl font-bold">99.8%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Improved precision</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Client Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">+28%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Improved ratings</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Integration Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Real-time Synchronization</h3>
              <p className="text-sm text-muted-foreground">
                Maintain up-to-date data across all connected systems with 
                automatic bidirectional syncing, eliminating manual updates.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Advanced Workflow Automation</h3>
              <p className="text-sm text-muted-foreground">
                Streamline complex business processes with customizable 
                triggers and actions that work across multiple platforms.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Unified Customer View</h3>
              <p className="text-sm text-muted-foreground">
                Get a comprehensive picture of customer interactions and 
                history from all integrated systems in one consolidated dashboard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Integrations</TabsTrigger>
          <TabsTrigger value="available">Available Connectors</TabsTrigger>
          <TabsTrigger value="custom">Custom Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="bg-white rounded-lg border shadow-sm">
          <IntegrationSettings />
        </TabsContent>
        
        <TabsContent value="available" className="bg-white rounded-lg border shadow-sm p-6">
          <div className="grid gap-6">
            <h3 className="text-lg font-medium">Enterprise Connectors</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "SAP ERP", description: "Connect with SAP's Enterprise Resource Planning system", status: "Popular" },
                { name: "Oracle SCM", description: "Oracle Supply Chain Management integration", status: "New" },
                { name: "Microsoft Dynamics", description: "Business applications and ERP systems", status: "Popular" },
                { name: "Salesforce", description: "CRM and customer data platform", status: "Popular" },
                { name: "Shopify", description: "E-commerce platform integration", status: "Popular" },
                { name: "NetSuite", description: "Cloud business management suite", status: "New" },
              ].map((item) => (
                <Card key={item.name} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium">{item.name}</CardTitle>
                      {item.status && (
                        <span className={`text-xs font-medium py-1 px-2 rounded-full ${
                          item.status === 'Popular' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <button className="mt-4 text-sm font-medium text-blue-600 hover:underline">
                      Connect
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="bg-white rounded-lg border shadow-sm p-6">
          <div className="max-w-3xl">
            <h3 className="text-lg font-medium mb-4">Custom API Integration</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Don't see the integration you need? Our platform supports custom API connections 
              to virtually any system, allowing you to extend functionality according to your specific requirements.
            </p>
            
            <div className="space-y-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">API Endpoint URL</label>
                <input 
                  type="text" 
                  placeholder="https://api.example.com/v1/" 
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Authentication Method</label>
                <select className="w-full p-2 border rounded-md">
                  <option>API Key</option>
                  <option>OAuth 2.0</option>
                  <option>Bearer Token</option>
                  <option>Basic Auth</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Data Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="format" className="mr-2" defaultChecked />
                    <span>JSON</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="format" className="mr-2" />
                    <span>XML</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="format" className="mr-2" />
                    <span>CSV</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-tms-blue text-white rounded-md hover:bg-blue-600">
                  Set Up Custom Integration
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
