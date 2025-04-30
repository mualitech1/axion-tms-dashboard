
import { Users, Building, User, Phone, Mail, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const CustomerOverview = () => {
  return (
    <Card className="shadow-sm border-gray-100 h-full bg-white rounded-xl overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100">
        <CardTitle className="text-indigo-700 flex items-center gap-2">
          <Users className="h-5 w-5" /> 
          Customer Overview
        </CardTitle>
        <CardDescription>
          Analytics and insights about your customer base
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <div className="px-4 pt-4 border-b border-slate-100">
            <TabsList className="grid grid-cols-3 w-full bg-slate-50/70 rounded-lg">
              <TabsTrigger 
                value="overview" 
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Customer Overview
              </TabsTrigger>
              <TabsTrigger 
                value="metrics" 
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Contact Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
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
                <div className="bg-blue-50 p-4 rounded-full mr-4">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700">158</div>
                  <div className="text-sm text-gray-500">Total Customers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-50 p-4 rounded-full mr-4">
                  <Building className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-700">142</div>
                  <div className="text-sm text-gray-500">Active Customers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-amber-50 p-4 rounded-full mr-4">
                  <User className="h-8 w-8 text-amber-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-700">24</div>
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
                <div className="bg-blue-50 p-4 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700">68</div>
                  <div className="text-sm text-gray-500">Calls This Week</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-indigo-50 p-4 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-700">173</div>
                  <div className="text-sm text-gray-500">Emails This Week</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-purple-50 p-4 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-700">12</div>
                  <div className="text-sm text-gray-500">Meetings Scheduled</div>
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
              <div className="border-l-2 border-blue-500 pl-4 py-2 hover:bg-blue-50/30 transition-colors rounded-r-md">
                <p className="text-sm font-medium">New customer added: Oscorp Industries</p>
                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4 py-2 hover:bg-green-50/30 transition-colors rounded-r-md">
                <p className="text-sm font-medium">Credit limit updated: Wayne Enterprises</p>
                <p className="text-xs text-gray-500">Yesterday, 3:15 PM</p>
              </div>
              
              <div className="border-l-2 border-amber-500 pl-4 py-2 hover:bg-amber-50/30 transition-colors rounded-r-md">
                <p className="text-sm font-medium">Customer status changed: Daily Planet</p>
                <p className="text-xs text-gray-500">Yesterday, 11:45 AM</p>
              </div>
              
              <div className="border-l-2 border-gray-400 pl-4 py-2 hover:bg-gray-50/30 transition-colors rounded-r-md">
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
