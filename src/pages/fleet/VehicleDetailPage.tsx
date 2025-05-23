import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Orbit, Calendar, FileText, Zap, AlertTriangle, Network } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // This would normally fetch vehicle data based on ID
  const vessel = {
    id,
    registration: `QV-${id}`,
    make: 'Quantum',
    model: 'Sprinter',
    year: '2021',
    status: 'active',
    lastServiceDate: '2023-10-15',
    nextServiceDate: '2024-04-15',
    motExpiryDate: '2024-05-20',
    taxExpiryDate: '2024-06-10',
    assignedDriverId: 'OPR-1234',
    assignedDriverName: 'John Smith',
    mileage: '45,628'
  };
  
  const handleServiceSchedule = () => {
    toast({
      title: "Calibration Scheduled",
      description: `Quantum vessel ${vessel.registration} has been scheduled for calibration.`,
    });
  };
  
  return (
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
            <ArrowLeft className="h-5 w-5 text-aximo-primary" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
              {vessel.registration} • {vessel.make} {vessel.model}
            </h1>
            <p className="text-aximo-text-secondary">{vessel.year} • Quantum State: 
              <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-950/30 text-green-400">
                Stabilized
              </span>
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Vessel Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-sm border-aximo-border bg-aximo-card">
          <CardContent className="p-5 flex items-center">
            <div className="bg-aximo-primary/20 p-3 rounded-full mr-4">
              <Orbit className="h-5 w-5 text-aximo-primary" />
            </div>
            <div>
              <p className="text-sm text-aximo-text-secondary">Quantum Particles</p>
              <p className="text-xl font-bold text-aximo-text">{vessel.mileage}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-aximo-border bg-aximo-card">
          <CardContent className="p-5 flex items-center">
            <div className="bg-amber-950/30 p-3 rounded-full mr-4">
              <Calendar className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-aximo-text-secondary">Certification Expiry</p>
              <p className="text-xl font-bold text-aximo-text">{new Date(vessel.motExpiryDate).toLocaleDateString('en-GB')}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-aximo-border bg-aximo-card">
          <CardContent className="p-5 flex items-center">
            <div className="bg-green-950/30 p-3 rounded-full mr-4">
              <Zap className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-aximo-text-secondary">Next Calibration</p>
              <p className="text-xl font-bold text-aximo-text">{new Date(vessel.nextServiceDate).toLocaleDateString('en-GB')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabbed content */}
      <Card className="shadow-sm border-aximo-border bg-aximo-card">
        <CardHeader className="bg-aximo-darker border-b border-aximo-border">
          <CardTitle className="text-aximo-text">Quantum Vessel Information</CardTitle>
          <CardDescription className="text-aximo-text-secondary">Complete details and entanglement history</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-aximo-darker">
              <TabsTrigger value="details" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Details</TabsTrigger>
              <TabsTrigger value="service" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Calibration History</TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Quantum Records</TabsTrigger>
              <TabsTrigger value="costs" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Energy Matrix</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-aximo-primary mb-3">Vessel Information</h3>
                  <DetailRow label="Registration" value={vessel.registration} />
                  <DetailRow label="Make" value={vessel.make} />
                  <DetailRow label="Model" value={vessel.model} />
                  <DetailRow label="Year" value={vessel.year} />
                  <DetailRow label="Quantum Particles" value={vessel.mileage} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-aximo-primary mb-3">Quantum Stability & Dates</h3>
                  <DetailRow label="Certification Expiry" value={new Date(vessel.motExpiryDate).toLocaleDateString('en-GB')} />
                  <DetailRow label="Spatial License" value={new Date(vessel.taxExpiryDate).toLocaleDateString('en-GB')} />
                  <DetailRow label="Last Calibration" value={new Date(vessel.lastServiceDate).toLocaleDateString('en-GB')} />
                  <DetailRow label="Next Calibration" value={new Date(vessel.nextServiceDate).toLocaleDateString('en-GB')} />
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-aximo-border">
                <h3 className="font-medium text-aximo-primary mb-3">Quantum Operator Assignment</h3>
                <div className="flex items-center p-4 bg-aximo-darker/30 rounded-md">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-12 w-12 bg-aximo-primary/20 rounded-full flex items-center justify-center">
                      <span className="font-medium text-aximo-primary">JS</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-aximo-text">{vessel.assignedDriverName}</h4>
                    <p className="text-sm text-aximo-text-secondary">Operator ID: {vessel.assignedDriverId}</p>
                  </div>
                  <Button className="ml-auto" variant="outline" size="sm">
                    Reassign Operator
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="service" className="mt-0">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-aximo-primary">Quantum Calibration History</h3>
                  <Button size="sm" onClick={handleServiceSchedule} className="bg-gradient-to-r from-aximo-primary to-aximo-light text-white hover:opacity-90">
                    <Zap className="mr-2 h-4 w-4" />
                    Schedule Calibration
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-l-2 border-aximo-primary pl-4 py-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-aximo-text">Quantum Realignment</h4>
                        <span className="text-sm text-aximo-text-secondary">{new Date(2023, 10-i, 15).toLocaleDateString('en-GB')}</span>
                      </div>
                      <p className="text-sm text-aximo-text-secondary mt-1">
                        {i === 1 ? 'Quantum fluid rebalancing, field stabilization' : 
                         i === 2 ? 'Annual entanglement verification and calibration' : 
                         'Particle alignment and phase correction'}
                      </p>
                      <p className="text-sm text-aximo-text-secondary mt-2">Particles: {45000 - (i * 5000)}</p>
                      <p className="text-sm text-aximo-text-secondary">Quantum Technician: {['Mike Johnson', 'Sarah Williams', 'Robert Brown'][i-1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-aximo-primary">Quantum Documentation</h3>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Upload Quantum Record
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'Quantum Registration Certificate', date: '2021-06-15' },
                    { name: 'Spatial Insurance Policy', date: '2024-01-10' },
                    { name: 'Certification Document', date: '2023-05-20' },
                    { name: 'Calibration History Matrix', date: '2023-10-15' }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-aximo-border rounded-md hover:bg-aximo-darker/30 transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-aximo-primary mr-3" />
                        <div>
                          <h4 className="font-medium text-aximo-text">{doc.name}</h4>
                          <p className="text-xs text-aximo-text-secondary">Added: {new Date(doc.date).toLocaleDateString('en-GB')}</p>
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
                <h3 className="font-medium text-aximo-primary">Quantum Energy Matrix</h3>
                
                <div className="bg-aximo-darker/30 p-12 rounded-md text-center border-2 border-dashed border-aximo-border">
                  <Network className="h-12 w-12 mx-auto text-aximo-text-secondary mb-3" />
                  <h3 className="font-medium text-lg text-aximo-text mb-1">Energy Matrix Initializing</h3>
                  <p className="text-aximo-text-secondary">The quantum energy tracking matrix is currently synchronizing</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between py-2 border-b border-aximo-border">
      <span className="text-aximo-text-secondary">{label}</span>
      <span className="font-medium text-aximo-text">{value}</span>
    </div>
  );
};
