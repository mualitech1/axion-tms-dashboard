import { Users, Building, User, Phone, Mail, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const CustomerOverview = () => {
  return (
    <Card className="shadow-sm border-gray-100 h-full bg-white">
      <CardHeader className="bg-slate-50">
        <CardTitle className="text-indigo-700">Customer Overview</CardTitle>
        <CardDescription>
          Analytics and insights about your customer base
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <div className="px-4 pt-4 border-b">
            <TabsList className="grid grid-cols-3 w-full bg-transparent gap-2">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none border-b-2 border-transparent"
              >
                Customer Overview
              </TabsTrigger>
              <TabsTrigger 
                value="metrics" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none border-b-2 border-transparent"
              >
                Contact Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none border-b-2 border-transparent"
              >
                Recent Activity
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="p-6 space-y-6 focus-visible:outline-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-semibold text-blue-600">158</div>
                  <div className="text-sm text-gray-500">Total Customers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-semibold text-green-600">142</div>
                  <div className="text-sm text-gray-500">Active Customers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <User className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-3xl font-semibold text-amber-600">24</div>
                  <div className="text-sm text-gray-500">
                    New <span className="text-xs">(Last 30 Days)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="metrics" className="p-6 space-y-6 focus-visible:outline-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-semibold text-blue-700">68</div>
                  <div className="text-sm text-muted-foreground">Calls This Week</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-3xl font-semibold text-indigo-700">173</div>
                  <div className="text-sm text-muted-foreground">Emails This Week</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-3xl font-semibold text-purple-700">12</div>
                  <div className="text-sm text-muted-foreground">Meetings Scheduled</div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="activity" className="p-6 space-y-4 focus-visible:outline-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <p className="text-sm font-medium">New customer added: Oscorp Industries</p>
                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4 py-1">
                <p className="text-sm font-medium">Credit limit updated: Wayne Enterprises</p>
                <p className="text-xs text-gray-500">Yesterday, 3:15 PM</p>
              </div>
              
              <div className="border-l-2 border-amber-500 pl-4 py-1">
                <p className="text-sm font-medium">Customer status changed: Daily Planet</p>
                <p className="text-xs text-gray-500">Yesterday, 11:45 AM</p>
              </div>
              
              <div className="border-l-2 border-gray-400 pl-4 py-1">
                <p className="text-sm font-medium">Contact details updated: Stark Industries</p>
                <p className="text-xs text-gray-500">Jun 14, 2023, 2:30 PM</p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerOverview;
