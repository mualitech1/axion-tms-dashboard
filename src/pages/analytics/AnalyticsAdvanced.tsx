
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ReportingHeader } from './components/ReportingHeader';
import { PerformanceMetricsSection } from './components/PerformanceMetricsSection';
import { BusinessIntelligenceTables } from './components/BusinessIntelligenceTables';
import { TrendAnalysis } from './components/TrendAnalysis';

const mockPerformanceData = {
  revenue: { value: 245680, change: 18.5, target: 300000, progress: 82 },
  invoices: { value: 152, change: 12.3 },
  shipments: { value: 324, progress: 87, change: 5.2 },
  onTimeDelivery: { value: 94.7, change: 2.1 }
};

const mockTrendData = [
  { name: 'Jan', revenue: 18500, shipments: 86, onTimeRate: 94.2, costPerShipment: 243 },
  { name: 'Feb', revenue: 22400, shipments: 92, onTimeRate: 93.5, costPerShipment: 235 },
  { name: 'Mar', revenue: 21300, shipments: 104, onTimeRate: 95.1, costPerShipment: 228 },
  { name: 'Apr', revenue: 24200, shipments: 98, onTimeRate: 96.0, costPerShipment: 230 },
  { name: 'May', revenue: 27800, shipments: 112, onTimeRate: 94.8, costPerShipment: 222 },
  { name: 'Jun', revenue: 32400, shipments: 128, onTimeRate: 93.2, costPerShipment: 218 }
];

const mockBusinessData = {
  'Shipments': [
    { id: '1', date: '2023-04-02', route: 'London - Manchester', carrier: 'Fast Logistics', status: 'Delivered', revenue: '$1,450', cost: '$980' },
    { id: '2', date: '2023-04-05', route: 'Birmingham - Glasgow', carrier: 'Speedy Transport', status: 'In Transit', revenue: '$2,200', cost: '$1,450' },
    { id: '3', date: '2023-04-08', route: 'Leeds - Bristol', carrier: 'Reliable Shipping', status: 'Delivered', revenue: '$1,820', cost: '$1,240' },
    { id: '4', date: '2023-04-12', route: 'Newcastle - Cardiff', carrier: 'Fast Logistics', status: 'Delayed', revenue: '$1,650', cost: '$1,100' },
    { id: '5', date: '2023-04-15', route: 'Edinburgh - London', carrier: 'Premium Carriers', status: 'Delivered', revenue: '$3,100', cost: '$2,200' }
  ],
  'Carriers': [
    { id: '1', name: 'Fast Logistics', jobsCompleted: 42, onTimeRate: '94.2%', avgCost: '$1,120', satisfaction: '4.7/5' },
    { id: '2', name: 'Speedy Transport', jobsCompleted: 38, onTimeRate: '96.8%', avgCost: '$1,350', satisfaction: '4.5/5' },
    { id: '3', name: 'Reliable Shipping', jobsCompleted: 51, onTimeRate: '92.1%', avgCost: '$980', satisfaction: '4.8/5' },
    { id: '4', name: 'Premium Carriers', jobsCompleted: 29, onTimeRate: '97.5%', avgCost: '$1,680', satisfaction: '4.9/5' },
    { id: '5', name: 'City Deliveries', jobsCompleted: 36, onTimeRate: '91.7%', avgCost: '$890', satisfaction: '4.3/5' }
  ],
  'Customers': [
    { id: '1', name: 'Global Goods Ltd', jobsBooked: 28, totalSpend: '$34,250', lastOrder: '2023-04-10', status: 'Active' },
    { id: '2', name: 'Prime Products Inc', jobsBooked: 42, totalSpend: '$51,120', lastOrder: '2023-04-15', status: 'Active' },
    { id: '3', name: 'Megacorp Supplies', jobsBooked: 15, totalSpend: '$22,850', lastOrder: '2023-03-28', status: 'Inactive' },
    { id: '4', name: 'Bright Ideas Co', jobsBooked: 31, totalSpend: '$41,700', lastOrder: '2023-04-12', status: 'Active' },
    { id: '5', name: 'Swift Solutions', jobsBooked: 19, totalSpend: '$26,400', lastOrder: '2023-04-08', status: 'Active' }
  ]
};

const tableHeaders = {
  'Shipments': [
    { id: 'date', label: 'Date', sortable: true },
    { id: 'route', label: 'Route', sortable: true },
    { id: 'carrier', label: 'Carrier', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'revenue', label: 'Revenue', sortable: true },
    { id: 'cost', label: 'Cost', sortable: true }
  ],
  'Carriers': [
    { id: 'name', label: 'Name', sortable: true },
    { id: 'jobsCompleted', label: 'Jobs Completed', sortable: true },
    { id: 'onTimeRate', label: 'On-Time Rate', sortable: true },
    { id: 'avgCost', label: 'Avg. Cost', sortable: true },
    { id: 'satisfaction', label: 'Satisfaction', sortable: true }
  ],
  'Customers': [
    { id: 'name', label: 'Name', sortable: true },
    { id: 'jobsBooked', label: 'Jobs Booked', sortable: true },
    { id: 'totalSpend', label: 'Total Spend', sortable: true },
    { id: 'lastOrder', label: 'Last Order', sortable: true },
    { id: 'status', label: 'Status', sortable: true }
  ]
};

export default function AnalyticsAdvanced() {
  const [dateRange, setDateRange] = useState('30days');
  
  return (
    <MainLayout title="Analytics & Reporting">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <ReportingHeader 
          title="Advanced Analytics"
          description="Comprehensive business intelligence and performance metrics"
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
            <TabsTrigger value="intelligence">Business Intelligence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-6">
            <PerformanceMetricsSection data={mockPerformanceData} />
            
            <TrendAnalysis
              title="Revenue & Shipment Volume Trends"
              description="Historical performance metrics for key business indicators"
              data={mockTrendData}
              metrics={[
                { id: 'revenue', label: 'Revenue ($)', color: '#3b82f6' },
                { id: 'shipments', label: 'Shipments', color: '#10b981' },
                { id: 'onTimeRate', label: 'On-Time Rate (%)', color: '#f59e0b' },
                { id: 'costPerShipment', label: 'Cost per Shipment ($)', color: '#ef4444' }
              ]}
            />
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrendAnalysis
                title="Financial Metrics"
                description="Revenue and cost trends over time"
                data={mockTrendData}
                metrics={[
                  { id: 'revenue', label: 'Revenue ($)', color: '#3b82f6' },
                  { id: 'costPerShipment', label: 'Cost per Shipment ($)', color: '#ef4444' }
                ]}
              />
              
              <TrendAnalysis
                title="Operational Metrics"
                description="Shipment volume and on-time performance"
                data={mockTrendData}
                metrics={[
                  { id: 'shipments', label: 'Shipments', color: '#10b981' },
                  { id: 'onTimeRate', label: 'On-Time Rate (%)', color: '#f59e0b' }
                ]}
              />
            </div>
            
            <TrendAnalysis
              title="Comprehensive Performance Analysis"
              description="All key metrics visualized for trend analysis and forecasting"
              data={mockTrendData}
              metrics={[
                { id: 'revenue', label: 'Revenue ($)', color: '#3b82f6' },
                { id: 'shipments', label: 'Shipments', color: '#10b981' },
                { id: 'onTimeRate', label: 'On-Time Rate (%)', color: '#f59e0b' },
                { id: 'costPerShipment', label: 'Cost per Shipment ($)', color: '#ef4444' }
              ]}
            />
          </TabsContent>
          
          <TabsContent value="intelligence" className="space-y-6">
            <BusinessIntelligenceTables
              title="Business Intelligence Tables"
              description="Detailed data tables for shipments, carriers, and customers"
              categories={['Shipments', 'Carriers', 'Customers']}
              data={mockBusinessData}
              headers={tableHeaders}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
}
