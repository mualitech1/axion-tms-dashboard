import { Users, Building, User, Phone, Mail, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Customer } from '@/types/customer';

interface CustomerOverviewProps {
  customer?: Customer;
}

const CustomerOverview = ({ customer }: CustomerOverviewProps) => {
  return (
    <Card className="shadow-sm border-indigo-100/70 dark:border-indigo-800/30 h-full bg-white dark:bg-indigo-950/20 rounded-xl overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-indigo-900/30 border-b border-slate-100 dark:border-indigo-800/30">
        <CardTitle className="text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
          <Users className="h-5 w-5" /> 
          {customer ? `${customer.name} Overview` : 'Customer Overview'}
        </CardTitle>
        <CardDescription className="text-indigo-500 dark:text-indigo-400">
          Analytics and insights about your customer base
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <div className="px-4 pt-4 border-b border-slate-100 dark:border-indigo-800/30">
            <TabsList className="grid grid-cols-3 w-full bg-slate-50/70 dark:bg-indigo-900/50 rounded-lg">
              <TabsTrigger 
                value="overview" 
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800/80 data-[state=active]:shadow-sm"
              >
                Customer Overview
              </TabsTrigger>
              <TabsTrigger 
                value="metrics" 
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800/80 data-[state=active]:shadow-sm"
              >
                Contact Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800/80 data-[state=active]:shadow-sm"
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
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mr-4">
                  <Users className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">158</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Customers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-full mr-4">
                  <Building className="h-8 w-8 text-green-500 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-700 dark:text-green-400">142</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Active Customers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-full mr-4">
                  <User className="h-8 w-8 text-amber-500 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-700 dark:text-amber-400">24</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
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
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">68</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Calls This Week</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">173</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Emails This Week</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">12</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Meetings Scheduled</div>
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
              <div className="border-l-2 border-blue-500 pl-4 py-2 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors rounded-r-md">
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">New customer added: Oscorp Industries</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Today, 10:30 AM</p>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4 py-2 hover:bg-green-50/30 dark:hover:bg-green-900/20 transition-colors rounded-r-md">
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">Credit limit updated: Wayne Enterprises</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday, 3:15 PM</p>
              </div>
              
              <div className="border-l-2 border-amber-500 pl-4 py-2 hover:bg-amber-50/30 dark:hover:bg-amber-900/20 transition-colors rounded-r-md">
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">Customer status changed: Daily Planet</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday, 11:45 AM</p>
              </div>
              
              <div className="border-l-2 border-gray-400 pl-4 py-2 hover:bg-gray-50/30 dark:hover:bg-gray-900/20 transition-colors rounded-r-md">
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">Contact details updated: Stark Industries</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Jun 14, 2023, 2:30 PM</p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerOverview;
