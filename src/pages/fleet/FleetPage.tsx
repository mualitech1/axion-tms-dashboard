import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Orbit, AlertCircle, FileText, Calendar, Zap, Network, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FleetPage() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">Quantum Fleet Matrix</h1>
            <p className="text-aximo-text-secondary">Calibrate and monitor your quantum particle vessels</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-gradient-to-r from-aximo-primary to-aximo-light text-white hover:opacity-90">
              <Zap className="h-4 w-4 mr-2" />
              Add Quantum Vessel
            </Button>
            <Button variant="outline" className="border-aximo-border text-aximo-text">
              <Network className="h-4 w-4 mr-2" />
              Export Quantum Data
            </Button>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FleetMetricCard 
          icon={<Orbit />}
          title="Total Vessels" 
          value="48" 
          subtitle="Active in fleet"
          color="primary"
        />
        <FleetMetricCard 
          icon={<AlertCircle />}
          title="Calibration Due" 
          value="12" 
          subtitle="Next 30 cycles"
          color="amber"
          percentage="25%"
        />
        <FleetMetricCard 
          icon={<Calendar />}
          title="Certification Expiry" 
          value="8" 
          subtitle="Within 30 cycles"
          color="red"
          percentage="17%"
        />
        <FleetMetricCard 
          icon={<Sparkles />}
          title="Quantum Efficiency" 
          value="76%" 
          subtitle="Entanglement ratio"
          color="green"
          trend="up"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-aximo-border overflow-hidden bg-aximo-card">
            <CardHeader className="bg-aximo-darker border-b border-aximo-border">
              <CardTitle className="text-aximo-text">Quantum Fleet Overview</CardTitle>
              <CardDescription className="text-aximo-text-secondary">Vessel type distribution and quantum state</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6 bg-aximo-darker">
                  <TabsTrigger value="all" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">All Vessels</TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Stabilized</TabsTrigger>
                  <TabsTrigger value="maintenance" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Calibrating</TabsTrigger>
                  <TabsTrigger value="idle" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Dormant</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-0">
                  <div className="bg-aximo-darker/30 p-12 rounded-md text-center border-2 border-dashed border-aximo-border">
                    <Orbit className="h-12 w-12 mx-auto text-aximo-text-secondary mb-3" />
                    <h3 className="font-medium text-lg text-aximo-text mb-1">Quantum Vessel Matrix Loading</h3>
                    <p className="text-aximo-text-secondary">The detailed quantum vessel management system is initializing</p>
                  </div>
                </TabsContent>
                <TabsContent value="active" className="mt-0">
                  <div className="bg-aximo-darker/30 p-12 rounded-md text-center border-2 border-dashed border-aximo-border">
                    <Orbit className="h-12 w-12 mx-auto text-aximo-text-secondary mb-3" />
                    <h3 className="font-medium text-lg text-aximo-text mb-1">Stabilized Vessels</h3>
                    <p className="text-aximo-text-secondary">Coherent vessel matrix loading...</p>
                  </div>
                </TabsContent>
                <TabsContent value="maintenance" className="mt-0">
                  <div className="bg-aximo-darker/30 p-12 rounded-md text-center border-2 border-dashed border-aximo-border">
                    <AlertCircle className="h-12 w-12 mx-auto text-aximo-text-secondary mb-3" />
                    <h3 className="font-medium text-lg text-aximo-text mb-1">Vessels In Calibration</h3>
                    <p className="text-aximo-text-secondary">Quantum calibration data loading...</p>
                  </div>
                </TabsContent>
                <TabsContent value="idle" className="mt-0">
                  <div className="bg-aximo-darker/30 p-12 rounded-md text-center border-2 border-dashed border-aximo-border">
                    <Orbit className="h-12 w-12 mx-auto text-aximo-text-secondary mb-3" />
                    <h3 className="font-medium text-lg text-aximo-text mb-1">Dormant Vessels</h3>
                    <p className="text-aximo-text-secondary">Dormant vessel availability matrix loading...</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="shadow-sm border-aximo-border h-full bg-aximo-card">
            <CardHeader className="bg-aximo-darker border-b border-aximo-border">
              <CardTitle className="text-aximo-text">Calibration Alerts</CardTitle>
              <CardDescription className="text-aximo-text-secondary">Upcoming vessel calibration</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-l-4 border-amber-500 bg-aximo-darker/30 p-4 rounded-r-md">
                    <h4 className="font-medium text-amber-400">Calibration Due: QV-{1000 + i}</h4>
                    <p className="text-sm text-amber-300/90 mt-1">Quantum Sprinter • {i * 5} cycles remaining</p>
                    <div className="mt-2 flex justify-between">
                      <span className="text-xs text-amber-300/80">Type: Full Quantum Realignment</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs border-amber-500/30 bg-aximo-darker text-amber-400 hover:bg-amber-950/30">
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
        <Card className="shadow-sm border-aximo-border bg-aximo-card">
          <CardHeader className="bg-aximo-darker border-b border-aximo-border">
            <CardTitle className="text-aximo-text">Upcoming Certification Renewals</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Next 30 cycles</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-aximo-border rounded-md hover:bg-aximo-darker/30 transition-colors">
                  <div>
                    <h4 className="font-medium text-aximo-text">QV-{2000 + i}</h4>
                    <p className="text-sm text-aximo-text-secondary">Quantum Transit • {i * 3 + 5} cycles remaining</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-xs ${i % 2 === 0 ? 'bg-aximo-primary/20 text-aximo-primary' : 'bg-aximo-light/20 text-aximo-light'}`}>
                      {i % 2 === 0 ? 'Quantum Certificate' : 'Spatial License'}
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
        
        <Card className="shadow-sm border-aximo-border bg-aximo-card">
          <CardHeader className="bg-aximo-darker border-b border-aximo-border">
            <CardTitle className="text-aximo-text">Recent Activity</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Latest fleet updates</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { type: 'maintenance', vehicle: 'QV-1234', desc: 'Completed quantum realignment' },
                { type: 'assignment', vehicle: 'QV-5678', desc: 'Assigned to operator John Doe' },
                { type: 'issue', vehicle: 'QV-9012', desc: 'Reported quantum fluctuation' },
                { type: 'service', vehicle: 'QV-3456', desc: 'Scheduled for annual recalibration' }
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-aximo-primary pl-4 py-1">
                  <h4 className="font-medium text-aximo-text">{item.vehicle}</h4>
                  <p className="text-sm text-aximo-text-secondary">{item.desc}</p>
                  <p className="text-xs text-aximo-text-secondary/70 mt-1">{i + 1} cycle{i !== 0 ? 's' : ''} ago</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface FleetMetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color?: 'primary' | 'green' | 'red' | 'amber';
  percentage?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const FleetMetricCard = ({ title, value, subtitle, icon, color = 'primary', percentage, trend }: FleetMetricCardProps) => {
  const colorClasses = {
    primary: 'bg-aximo-primary/20 text-aximo-primary',
    green: 'bg-green-950/30 text-green-400',
    red: 'bg-red-950/30 text-red-400',
    amber: 'bg-amber-950/30 text-amber-400',
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-aximo-card p-6 rounded-xl shadow-sm border border-aximo-border"
    >
      <div className="flex items-center">
        <div className={`${colorClasses[color]} p-3 rounded-full mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-aximo-text">{title}</h3>
          <p className="text-sm text-aximo-text-secondary">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-aximo-text">{value}</div>
        {percentage && (
          <div className="flex items-center mt-1">
            <div className={`text-sm ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-amber-400'}`}>
              {percentage} {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
