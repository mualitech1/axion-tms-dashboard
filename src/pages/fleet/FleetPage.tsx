
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, Truck, AlertCircle, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FleetPage() {
  return (
    <MainLayout title="Fleet Management">
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1 text-indigo-700">Fleet Management</h1>
              <p className="text-slate-500">Manage and monitor your fleet vehicles</p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
              <Button variant="outline" className="border-indigo-200 text-indigo-700">
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FleetMetricCard 
            icon={<Truck />}
            title="Total Vehicles" 
            value="48" 
            subtitle="Active in fleet"
            color="blue"
          />
          <FleetMetricCard 
            icon={<AlertCircle />}
            title="Maintenance Due" 
            value="12" 
            subtitle="Next 30 days"
            color="amber"
            percentage="25%"
          />
          <FleetMetricCard 
            icon={<Calendar />}
            title="MOT Expiry" 
            value="8" 
            subtitle="Within 30 days"
            color="red"
            percentage="17%"
          />
          <FleetMetricCard 
            icon={<Truck />}
            title="Utilization" 
            value="76%" 
            subtitle="Fleet efficiency"
            color="green"
            trend="up"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-slate-100 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-indigo-700">Fleet Overview</CardTitle>
                <CardDescription>Vehicle type distribution and status</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="all">All Vehicles</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="maintenance">In Maintenance</TabsTrigger>
                    <TabsTrigger value="idle">Idle</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-0">
                    <div className="bg-slate-50 p-12 rounded-md text-center border-2 border-dashed border-slate-200">
                      <Truck className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                      <h3 className="font-medium text-lg text-slate-600 mb-1">Vehicle List Coming Soon</h3>
                      <p className="text-slate-500">The detailed vehicle management system is under development</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="active" className="mt-0">
                    <div className="bg-slate-50 p-12 rounded-md text-center border-2 border-dashed border-slate-200">
                      <Truck className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                      <h3 className="font-medium text-lg text-slate-600 mb-1">Active Vehicles</h3>
                      <p className="text-slate-500">Detailed list of active vehicles coming soon</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="maintenance" className="mt-0">
                    <div className="bg-slate-50 p-12 rounded-md text-center border-2 border-dashed border-slate-200">
                      <AlertCircle className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                      <h3 className="font-medium text-lg text-slate-600 mb-1">Vehicles In Maintenance</h3>
                      <p className="text-slate-500">Maintenance schedule and details coming soon</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="idle" className="mt-0">
                    <div className="bg-slate-50 p-12 rounded-md text-center border-2 border-dashed border-slate-200">
                      <Truck className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                      <h3 className="font-medium text-lg text-slate-600 mb-1">Idle Vehicles</h3>
                      <p className="text-slate-500">List of idle vehicles and availability coming soon</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-sm border-slate-100 h-full">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-indigo-700">Maintenance Alerts</CardTitle>
                <CardDescription>Upcoming vehicle maintenance</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-md">
                      <h4 className="font-medium text-amber-800">Service Due: VH-{1000 + i}</h4>
                      <p className="text-sm text-amber-700 mt-1">Mercedes Sprinter • {i * 5} days remaining</p>
                      <div className="mt-2 flex justify-between">
                        <span className="text-xs text-amber-600">Service Type: Full Service</span>
                        <Button size="sm" variant="outline" className="h-7 text-xs border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm border-slate-100">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-indigo-700">Upcoming MOT & Tax Renewals</CardTitle>
              <CardDescription>Next 30 days</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-md hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-medium">VH-{2000 + i}</h4>
                      <p className="text-sm text-slate-500">Ford Transit • {i * 3 + 5} days remaining</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs ${i % 2 === 0 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {i % 2 === 0 ? 'MOT' : 'Road Tax'}
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-slate-100">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-indigo-700">Recent Activity</CardTitle>
              <CardDescription>Latest fleet updates</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { type: 'maintenance', vehicle: 'VH-1234', desc: 'Completed scheduled maintenance' },
                  { type: 'assignment', vehicle: 'VH-5678', desc: 'Assigned to driver John Doe' },
                  { type: 'issue', vehicle: 'VH-9012', desc: 'Reported brake issue' },
                  { type: 'service', vehicle: 'VH-3456', desc: 'Booked for annual service' }
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-indigo-300 pl-4 py-1">
                    <h4 className="font-medium">{item.vehicle}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                    <p className="text-xs text-slate-400 mt-1">{i + 1} hour{i !== 0 ? 's' : ''} ago</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

interface FleetMetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'amber';
  percentage?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const FleetMetricCard = ({ title, value, subtitle, icon, color = 'blue', percentage, trend }: FleetMetricCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
    >
      <div className="flex items-center">
        <div className={`${colorClasses[color]} p-3 rounded-full mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-slate-800">{value}</div>
        {percentage && (
          <div className="flex items-center mt-1">
            <div className={`text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-amber-600'}`}>
              {percentage} {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
