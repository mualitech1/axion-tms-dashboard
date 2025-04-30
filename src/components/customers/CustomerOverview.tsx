
import { Users, Building, Plus, Phone, Mail, Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CustomerOverview = () => {
  return (
    <Card className="shadow-md border-indigo-100 h-full">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardTitle className="text-indigo-700">Customer Overview</CardTitle>
        <CardDescription>
          Analytics and insights about your customer base
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 w-full rounded-none bg-muted/50">
            <TabsTrigger value="overview" className="rounded-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent">
              Customer Overview
            </TabsTrigger>
            <TabsTrigger value="metrics" className="rounded-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent">
              Contact Metrics
            </TabsTrigger>
            <TabsTrigger value="activity" className="rounded-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent">
              Recent Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-4 space-y-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-semibold text-blue-700">158</div>
                <div className="text-sm text-muted-foreground">Total Customers</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-3">
                <Building className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-semibold text-green-700">142</div>
                <div className="text-sm text-muted-foreground">Active Customers</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-3">
                <User className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-3xl font-semibold text-amber-700">24</div>
                <div className="text-sm text-muted-foreground">
                  New <span className="text-xs">(Last 30 Days)</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="p-4 space-y-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-semibold text-blue-700">68</div>
                <div className="text-sm text-muted-foreground">Calls This Week</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-full mr-3">
                <Mail className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-3xl font-semibold text-indigo-700">173</div>
                <div className="text-sm text-muted-foreground">Emails This Week</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl font-semibold text-purple-700">12</div>
                <div className="text-sm text-muted-foreground">Meetings Scheduled</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="p-4 space-y-4">
            <div className="border-l-2 border-blue-500 pl-4 py-1">
              <p className="text-sm font-medium">New customer added: Oscorp Industries</p>
              <p className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1 inline" /> Today, 10:30 AM
              </p>
            </div>
            
            <div className="border-l-2 border-green-500 pl-4 py-1">
              <p className="text-sm font-medium">Credit limit updated: Wayne Enterprises</p>
              <p className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1 inline" /> Yesterday, 3:15 PM
              </p>
            </div>
            
            <div className="border-l-2 border-amber-500 pl-4 py-1">
              <p className="text-sm font-medium">Customer status changed: Daily Planet</p>
              <p className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1 inline" /> Yesterday, 11:45 AM
              </p>
            </div>
            
            <div className="border-l-2 border-gray-400 pl-4 py-1">
              <p className="text-sm font-medium">Contact details updated: Stark Industries</p>
              <p className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1 inline" /> Jun 14, 2023, 2:30 PM
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerOverview;
