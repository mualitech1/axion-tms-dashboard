
import { Card } from '@/components/ui/card';
import { drivers } from '../data/driverData';
import { ArrowUpIcon, ArrowDownIcon, Activity, Fuel, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DriverKPIOverview() {
  // Calculate average KPIs
  const activeDrivers = drivers.filter(d => d.status === 'Active');
  
  const averageKPIs = {
    onTimeDeliveries: activeDrivers.reduce((sum, driver) => sum + driver.kpi.onTimeDeliveries, 0) / activeDrivers.length,
    fuelEfficiency: activeDrivers.reduce((sum, driver) => sum + driver.kpi.fuelEfficiency, 0) / activeDrivers.length,
    safetyScore: activeDrivers.reduce((sum, driver) => sum + driver.kpi.safetyScore, 0) / activeDrivers.length,
    customerSatisfaction: activeDrivers.reduce((sum, driver) => sum + driver.kpi.customerSatisfaction, 0) / activeDrivers.length
  };
  
  // Best performing driver
  const bestDriver = [...activeDrivers].sort((a, b) => 
    (b.kpi.onTimeDeliveries + b.kpi.fuelEfficiency + b.kpi.safetyScore + b.kpi.customerSatisfaction) - 
    (a.kpi.onTimeDeliveries + a.kpi.fuelEfficiency + a.kpi.safetyScore + a.kpi.customerSatisfaction)
  )[0];

  const kpiItems = [
    {
      label: "On-time Delivery",
      value: averageKPIs.onTimeDeliveries,
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      change: 2,
      positive: true
    },
    {
      label: "Fuel Efficiency",
      value: averageKPIs.fuelEfficiency,
      icon: Fuel,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      change: 1,
      positive: true
    },
    {
      label: "Safety Score",
      value: averageKPIs.safetyScore,
      icon: Shield,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      change: 0.5,
      positive: false
    },
    {
      label: "Customer Rating",
      value: averageKPIs.customerSatisfaction,
      icon: Star,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      change: 3,
      positive: true
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo p-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-full bg-aximo-primary/20 text-aximo-primary">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-aximo-text">Driver Performance Overview</h3>
          <p className="text-sm text-aximo-text-secondary">{activeDrivers.length} active drivers</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiItems.map((item, index) => (
          <motion.div
            key={item.label}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className={`p-4 rounded-lg border ${item.borderColor} ${item.bgColor} hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full bg-aximo-darker ${item.color}`}>
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <span className={`text-xs font-medium ${item.color}`}>{item.label}</span>
              </div>
              <span className={`flex items-center text-xs ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
                {item.positive ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                )}
                {item.change}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <p className="text-2xl font-bold text-aximo-text">{item.value.toFixed(1)}</p>
              <span className="text-xs text-aximo-text-secondary">%</span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-aximo-darker rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  item.value > 90 ? 'bg-green-500' : 
                  item.value > 80 ? 'bg-amber-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {bestDriver && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 rounded-lg p-5 border border-aximo-primary/20 backdrop-blur-sm shadow-aximo"
        >
          <h4 className="text-sm font-medium mb-3 text-aximo-text">Top Performing Driver</h4>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-aximo-primary/30 flex items-center justify-center">
              <Star className="h-7 w-7 text-aximo-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-aximo-text">{bestDriver.name}</p>
                <div className="px-2.5 py-1 rounded-full bg-aximo-primary/20 text-aximo-primary text-xs font-medium">
                  Star Driver
                </div>
              </div>
              <div className="mt-1 grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-aximo-text-secondary">On-time:</span>
                  <span className="font-medium text-aximo-text">{bestDriver.kpi.onTimeDeliveries.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-aximo-text-secondary">Safety:</span>
                  <span className="font-medium text-aximo-text">{bestDriver.kpi.safetyScore.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-aximo-text-secondary">Fuel:</span>
                  <span className="font-medium text-aximo-text">{bestDriver.kpi.fuelEfficiency.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-aximo-text-secondary">Rating:</span>
                  <span className="font-medium text-aximo-text">{bestDriver.kpi.customerSatisfaction.toFixed(1)}%</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-aximo-text-secondary">Overall Performance</span>
                  <span className="font-medium text-aximo-text">{((bestDriver.kpi.onTimeDeliveries + 
                    bestDriver.kpi.fuelEfficiency + bestDriver.kpi.safetyScore + 
                    bestDriver.kpi.customerSatisfaction) / 4).toFixed(1)}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full bg-aximo-darker rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-aximo-primary to-aximo-light"
                    style={{ width: `${((bestDriver.kpi.onTimeDeliveries + bestDriver.kpi.fuelEfficiency + 
                      bestDriver.kpi.safetyScore + bestDriver.kpi.customerSatisfaction) / 4)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
