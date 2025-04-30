
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Truck, Calendar, FileText, Wrench, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // This would normally fetch vehicle data based on ID
  const vehicle = {
    id,
    registration: `VH-${id}`,
    make: 'Mercedes',
    model: 'Sprinter',
    year: '2021',
    status: 'active',
    lastServiceDate: '2023-10-15',
    nextServiceDate: '2024-04-15',
    motExpiryDate: '2024-05-20',
    taxExpiryDate: '2024-06-10',
    assignedDriverId: 'DRV-1234',
    assignedDriverName: 'John Smith',
    mileage: '45,628'
  };
  
  const handleServiceSchedule = () => {
    toast({
      title: "Service Scheduled",
      description: `Vehicle ${vehicle.registration} has been scheduled for service.`,
    });
  };
  
  return (
    <MainLayout title={`Vehicle ${vehicle.registration}`}>
      <div className="space-y-6">
        {/* Header with back button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              className="p-0 h-auto"
              onClick={() => navigate('/fleet')}
            >
              <ArrowLeft className="h-5 w-5 text-indigo-600" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold mb-1 text-indigo-700">
                {vehicle.registration} • {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-slate-500">{vehicle.year} • Status: 
                <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Vehicle Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-5 flex items-center">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Current Mileage</p>
                <p className="text-xl font-bold text-slate-800">{vehicle.mileage}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-5 flex items-center">
              <div className="bg-amber-50 p-3 rounded-full mr-4">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">MOT Expiry</p>
                <p className="text-xl font-bold text-slate-800">{new Date(vehicle.motExpiryDate).toLocaleDateString('en-GB')}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-5 flex items-center">
              <div className="bg-green-50 p-3 rounded-full mr-4">
                <Wrench className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Next Service</p>
                <p className="text-xl font-bold text-slate-800">{new Date(vehicle.nextServiceDate).toLocaleDateString('en-GB')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabbed content */}
        <Card className="shadow-sm border-slate-100">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-indigo-700">Vehicle Information</CardTitle>
            <CardDescription>Complete details and history</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="service">Service History</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="costs">Running Costs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-indigo-700 mb-3">Vehicle Information</h3>
                    <DetailRow label="Registration" value={vehicle.registration} />
                    <DetailRow label="Make" value={vehicle.make} />
                    <DetailRow label="Model" value={vehicle.model} />
                    <DetailRow label="Year" value={vehicle.year} />
                    <DetailRow label="Current Mileage" value={vehicle.mileage} />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-indigo-700 mb-3">Compliance & Dates</h3>
                    <DetailRow label="MOT Expiry" value={new Date(vehicle.motExpiryDate).toLocaleDateString('en-GB')} />
                    <DetailRow label="Tax Expiry" value={new Date(vehicle.taxExpiryDate).toLocaleDateString('en-GB')} />
                    <DetailRow label="Last Service" value={new Date(vehicle.lastServiceDate).toLocaleDateString('en-GB')} />
                    <DetailRow label="Next Service" value={new Date(vehicle.nextServiceDate).toLocaleDateString('en-GB')} />
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="font-medium text-indigo-700 mb-3">Assignment</h3>
                  <div className="flex items-center p-4 bg-slate-50 rounded-md">
                    <div className="mr-4 flex-shrink-0">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-indigo-700">JS</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{vehicle.assignedDriverName}</h4>
                      <p className="text-sm text-slate-500">Driver ID: {vehicle.assignedDriverId}</p>
                    </div>
                    <Button className="ml-auto" variant="outline" size="sm">
                      Change Driver
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="service" className="mt-0">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-indigo-700">Maintenance History</h3>
                    <Button size="sm" onClick={handleServiceSchedule}>
                      Schedule Service
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-l-2 border-indigo-300 pl-4 py-2">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Full Service</h4>
                          <span className="text-sm text-slate-500">{new Date(2023, 10-i, 15).toLocaleDateString('en-GB')}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {i === 1 ? 'Oil and filter change, brake inspection' : 
                           i === 2 ? 'Annual maintenance and safety check' : 
                           'Tire replacement and alignment'}
                        </p>
                        <p className="text-sm text-slate-500 mt-2">Mileage: {45000 - (i * 5000)}</p>
                        <p className="text-sm text-slate-500">Technician: {['Mike Johnson', 'Sarah Williams', 'Robert Brown'][i-1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-0">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-indigo-700">Vehicle Documents</h3>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Upload Document
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Vehicle Registration Certificate', date: '2021-06-15' },
                      { name: 'Insurance Policy', date: '2024-01-10' },
                      { name: 'MOT Certificate', date: '2023-05-20' },
                      { name: 'Service History Booklet', date: '2023-10-15' }
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-md hover:bg-slate-50 transition-colors">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-indigo-500 mr-3" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-xs text-slate-500">Added: {new Date(doc.date).toLocaleDateString('en-GB')}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">View</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="costs" className="mt-0">
                <div className="space-y-6">
                  <h3 className="font-medium text-indigo-700">Running Costs</h3>
                  
                  <div className="bg-slate-50 p-12 rounded-md text-center border-2 border-dashed border-slate-200">
                    <AlertTriangle className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                    <h3 className="font-medium text-lg text-slate-600 mb-1">Cost Tracking Coming Soon</h3>
                    <p className="text-slate-500">The cost tracking module is currently under development</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="flex border-b border-slate-100 py-2">
      <span className="w-1/3 text-slate-500">{label}:</span>
      <span className="w-2/3 font-medium text-slate-800">{value}</span>
    </div>
  );
};
