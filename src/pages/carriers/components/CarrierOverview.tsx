
import { Truck, FileCheck, AlertTriangle, Building, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function CarrierOverview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-aximo-border bg-aximo-card shadow-aximo">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-aximo-text">Carrier Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {/* Active Carriers */}
            <div className="rounded-lg p-3 bg-aximo-darker border border-aximo-border/50">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-600 mr-3">
                  <Building className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-aximo-text">124</p>
                  <p className="text-xs text-aximo-text-secondary">Total Carriers</p>
                </div>
              </div>
            </div>

            {/* Compliant Carriers */}
            <div className="rounded-lg p-3 bg-aximo-darker border border-aximo-border/50">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-500 mr-3">
                  <FileCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-aximo-text">98</p>
                  <p className="text-xs text-aximo-text-secondary">Fully Compliant</p>
                </div>
              </div>
            </div>

            {/* Issues */}
            <div className="rounded-lg p-3 bg-aximo-darker border border-aximo-border/50">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 mr-3">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-aximo-text">16</p>
                  <p className="text-xs text-aximo-text-secondary">Action Required</p>
                </div>
              </div>
            </div>

            {/* Non-compliant */}
            <div className="rounded-lg p-3 bg-aximo-darker border border-aximo-border/50">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-500 mr-3">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-aximo-text">8</p>
                  <p className="text-xs text-aximo-text-secondary">Non-compliant</p>
                </div>
              </div>
            </div>

            {/* Total Capabilities */}
            <div className="rounded-lg p-3 bg-aximo-darker border border-aximo-border/50">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 mr-3">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-aximo-text">63</p>
                  <p className="text-xs text-aximo-text-secondary">Capabilities</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* KPI Track */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3 text-aximo-text-secondary">Carrier Performance</h3>
            <div className="space-y-3">
              {/* On-time Delivery */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-aximo-text-secondary">On-time Delivery</span>
                  <span className="text-xs font-medium text-indigo-500">92.3%</span>
                </div>
                <div className="h-1.5 w-full bg-aximo-darker rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600" style={{ width: '92.3%' }}></div>
                </div>
              </div>
              
              {/* Documentation Compliance */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-aximo-text-secondary">Documentation Compliance</span>
                  <span className="text-xs font-medium text-indigo-500">89.7%</span>
                </div>
                <div className="h-1.5 w-full bg-aximo-darker rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600" style={{ width: '89.7%' }}></div>
                </div>
              </div>
              
              {/* Customer Satisfaction */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-aximo-text-secondary">Customer Satisfaction</span>
                  <span className="text-xs font-medium text-indigo-500">94.5%</span>
                </div>
                <div className="h-1.5 w-full bg-aximo-darker rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600" style={{ width: '94.5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
