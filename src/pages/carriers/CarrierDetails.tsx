import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, FileText, MapPin, Phone, Mail, Calendar, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { carrierData } from './data/carrierData';
import { supabase } from '@/integrations/supabase/client';

// Define carrier display interface with optional fields to accommodate both DB and mock data
interface CarrierDisplay {
  id: string;
  name: string;
  region: string;
  fleet: string;
  status: string;
  favorite: boolean;
  complianceStatus: string;
  insuranceExpiry: string;
  licenseExpiry: string;
  capabilities: string[];
  operatingRegions?: string[];
  address?: string;
  email?: string;
  phone?: string;
  country?: string;
  partnerSince?: string;
}

export default function CarrierDetails() {
  const { id } = useParams();
  const [carrier, setCarrier] = useState<CarrierDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCarrierDetails = async () => {
      try {
        setLoading(true);
        
        // Try to fetch the carrier from the database first
        if (id) {
          const { data, error } = await supabase
            .from('companies')
            .select('*')
            .eq('id', id)
            .eq('type', 'carrier')
            .single();
          
          if (error) {
            console.error("Error fetching carrier from database:", error);
            throw error;
          }
          
          if (data) {
            // Use a safe function to get values with proper type checking
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const safeGet = (obj: any, path: string, defaultValue: any) => {
              try {
                const parts = path.split('.');
                let current = obj;
                
                for (let i = 0; i < parts.length; i++) {
                  if (current === undefined || current === null) return defaultValue;
                  current = current[parts[i]];
                }
                
                return current !== undefined && current !== null ? current : defaultValue;
              } catch (err) {
                return defaultValue;
              }
            };
            
            // Create a carrier object with proper types using type assertions where needed
            const newCarrier: CarrierDisplay = {
              id: data.id,
              name: data.name,
              status: data.status === 'active' ? 'Active' : 
                     data.status === 'inactive' ? 'Inactive' : 'Issue',
              region: safeGet(data, 'city', 'Unknown'),
              fleet: safeGet(data, 'fleet_type', 'Mixed Fleet'),
              favorite: false,
              complianceStatus: safeGet(data, 'compliance_status', 'Compliant'),
              insuranceExpiry: safeGet(data, 'metadata.insuranceExpiry', 
                            new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
              licenseExpiry: safeGet(data, 'metadata.licenseExpiry', 
                            new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
              capabilities: safeGet(data, 'metadata.capabilities', ['general']),
              operatingRegions: safeGet(data, 'metadata.operatingRegions', ['local']),
              address: safeGet(data, 'address', ''),
              email: data.email,
              phone: data.phone,
              partnerSince: data.created_at 
                ? new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'Jan 2022'
            };
            
            setCarrier(newCarrier);
            setLoading(false);
            return;
          }
        }
        
        // Fall back to mock data if needed
        if (id && !isNaN(Number(id))) {
          const carrierId = parseInt(id);
          const mockCarrier = carrierData.find(c => c.id === carrierId);
          
          if (mockCarrier) {
            setCarrier({
              ...mockCarrier,
              id: mockCarrier.id.toString(),
              partnerSince: 'Jan 2022'
            });
            setLoading(false);
            return;
          }
        }
        
        // Last resort fallback to the first carrier in mock data
        if (carrierData.length > 0) {
          console.warn(`Carrier with ID ${id} not found, using first mock carrier as fallback`);
          setCarrier({
            ...carrierData[0],
            id: carrierData[0].id.toString(),
            partnerSince: 'Jan 2022'
          });
        } else {
          setError("No carrier data available");
        }
        
      } catch (error) {
        console.error("Error in carrier details:", error);
        setError("Failed to load carrier details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarrierDetails();
  }, [id]);
  
  if (loading) {
    return (
      <MainLayout title="Loading Carrier Details">
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-aximo-primary mb-4" />
          <p className="text-aximo-text">Loading carrier details...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !carrier) {
    return (
      <MainLayout title="Carrier Not Found">
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-semibold text-aximo-text mb-4">Carrier Not Found</h1>
          <p className="text-aximo-text-secondary mb-6">{error || "The carrier you are looking for does not exist."}</p>
          <Button asChild>
            <Link to="/carriers">Back to Carriers</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const getComplianceStatus = (type: string) => {
    // This is a mock function - in a real app this would check actual compliance data
    const random = Math.random();
    if (random > 0.8) return "expired";
    if (random > 0.6) return "expiring-soon";
    return "valid";
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "valid":
        return "text-green-500";
      case "expiring-soon":
        return "text-amber-500";
      case "expired":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "expiring-soon":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "expired":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <MainLayout title={`Carrier: ${carrier.name}`}>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 space-y-6"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 shadow-lg text-white">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-white/20">
              <Link to="/carriers">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">{carrier.name}</h1>
              <p className="text-white/80">Carrier ID: {carrier.id}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
              {carrier.status}
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
              {carrier.fleet}
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
              {carrier.region}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-aximo-card rounded-lg shadow p-6 border border-aximo-border"
          >
            <div className="flex items-center mb-4">
              <div className="bg-aximo-primary/20 p-2 rounded-full mr-3">
                <Truck className="h-5 w-5 text-aximo-primary" />
              </div>
              <h2 className="text-lg font-medium text-aximo-text">Company Information</h2>
            </div>
            <div className="space-y-3 text-aximo-text">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-aximo-text-secondary mt-0.5 mr-2" />
                <div>
                  <p className="text-sm">{carrier.address || "123 Transport Lane"}</p>
                  <p className="text-sm">{carrier.region}, {carrier.country || "UK"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-aximo-text-secondary mr-2" />
                <p className="text-sm">{carrier.phone || "+44 20 7123 4567"}</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-aximo-text-secondary mr-2" />
                <p className="text-sm">{carrier.email || `contact@${carrier.name.toLowerCase().replace(/\s+/g, '')}.com`}</p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-aximo-text-secondary mr-2" />
                <p className="text-sm">Partner since {carrier.partnerSince || "Jan 2022"}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-aximo-card rounded-lg shadow p-6 border border-aximo-border"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-500/20 p-2 rounded-full mr-3">
                <FileText className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-lg font-medium text-aximo-text">Fleet Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-aximo-text-secondary">Fleet Type:</span>
                <span className="text-sm text-aximo-text font-medium">{carrier.fleet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-aximo-text-secondary">Vehicle Count:</span>
                <span className="text-sm text-aximo-text font-medium">{10 + Math.floor(Math.random() * 30)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-aximo-text-secondary">Average Age:</span>
                <span className="text-sm text-aximo-text font-medium">{1 + Math.floor(Math.random() * 4)} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-aximo-text-secondary">Service Area:</span>
                <span className="text-sm text-aximo-text font-medium">{carrier.region} + 100mi</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-aximo-card rounded-lg shadow p-6 border border-aximo-border"
          >
            <div className="flex items-center mb-4">
              <div className="bg-amber-500/20 p-2 rounded-full mr-3">
                <Shield className="h-5 w-5 text-amber-500" />
              </div>
              <h2 className="text-lg font-medium text-aximo-text">Compliance Status</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-aximo-text-secondary">Insurance:</span>
                <div className="flex items-center gap-1">
                  {getStatusIcon(getComplianceStatus("insurance"))}
                  <span className={`text-sm font-medium ${getStatusColor(getComplianceStatus("insurance"))}`}>
                    {getComplianceStatus("insurance") === "valid" ? "Valid" : 
                     getComplianceStatus("insurance") === "expiring-soon" ? "Expiring soon" : "Expired"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-aximo-text-secondary">Licenses:</span>
                <div className="flex items-center gap-1">
                  {getStatusIcon(getComplianceStatus("licenses"))}
                  <span className={`text-sm font-medium ${getStatusColor(getComplianceStatus("licenses"))}`}>
                    {getComplianceStatus("licenses") === "valid" ? "Valid" : 
                     getComplianceStatus("licenses") === "expiring-soon" ? "Expiring soon" : "Expired"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-aximo-text-secondary">Safety Rating:</span>
                <span className="text-sm text-aximo-text font-medium">4.7/5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-aximo-text-secondary">Last Audit:</span>
                <span className="text-sm text-aximo-text font-medium">3 months ago</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="bg-aximo-darker">
            <TabsTrigger value="jobs" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Recent Jobs</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Documents</TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Notes</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="mt-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-aximo-card rounded-lg shadow p-6 border border-aximo-border"
            >
              <h3 className="text-lg font-medium mb-4 text-aximo-text">Recent Jobs</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((job) => (
                  <div key={job} className="border-b border-aximo-border pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-aximo-text">Job #{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-xs text-aximo-text-secondary">Completed on {new Date().toLocaleDateString()}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-aximo-text-secondary">London to Birmingham</span>
                      <span className="text-xs text-green-500">On time</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="documents" className="mt-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-aximo-card rounded-lg shadow p-6 border border-aximo-border"
            >
              <h3 className="text-lg font-medium mb-4 text-aximo-text">Documents</h3>
              <div className="space-y-4">
                <div className="border-b border-aximo-border pb-4">
                  <p className="text-sm font-medium text-aximo-text">Insurance Certificate</p>
                  <p className="text-xs text-aximo-text-secondary">Expires: June 15, 2024</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-aximo-dark border-aximo-border text-aximo-text">View Document</Button>
                </div>
                <div className="border-b border-aximo-border pb-4">
                  <p className="text-sm font-medium text-aximo-text">Operating License</p>
                  <p className="text-xs text-aximo-text-secondary">Expires: December 22, 2024</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-aximo-dark border-aximo-border text-aximo-text">View Document</Button>
                </div>
                <div>
                  <p className="text-sm font-medium text-aximo-text">Safety Audit Report</p>
                  <p className="text-xs text-aximo-text-secondary">Completed: February 03, 2023</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-aximo-dark border-aximo-border text-aximo-text">View Document</Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="notes" className="mt-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-aximo-card rounded-lg shadow p-6 border border-aximo-border"
            >
              <h3 className="text-lg font-medium mb-4 text-aximo-text">Notes</h3>
              <div className="space-y-4">
                <div className="border-b border-aximo-border pb-4">
                  <p className="text-sm font-medium text-aximo-text">Contract Renewal</p>
                  <p className="text-xs text-aximo-text-secondary">Added by John Doe on March 12, 2023</p>
                  <p className="text-sm text-aximo-text mt-2">Discussing new rates for Q3 contract renewal.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-aximo-text">Fleet Expansion</p>
                  <p className="text-xs text-aximo-text-secondary">Added by Jane Smith on January 05, 2023</p>
                  <p className="text-sm text-aximo-text mt-2">Carrier is expanding fleet by 5 vehicles in next quarter.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="performance" className="mt-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-aximo-card rounded-lg shadow p-6 border border-aximo-border"
            >
              <h3 className="text-lg font-medium mb-4 text-aximo-text">Performance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-aximo-text-secondary">On-Time Delivery</span>
                    <span className="text-sm text-aximo-text">{85 + Math.floor(Math.random() * 10)}%</span>
                  </div>
                  <div className="h-2 w-full bg-aximo-darker rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${85 + Math.floor(Math.random() * 10)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-aximo-text-secondary">Customer Satisfaction</span>
                    <span className="text-sm text-aximo-text">{75 + Math.floor(Math.random() * 20)}%</span>
                  </div>
                  <div className="h-2 w-full bg-aximo-darker rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${75 + Math.floor(Math.random() * 20)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-aximo-text-secondary">Issue Resolution</span>
                    <span className="text-sm text-aximo-text">{70 + Math.floor(Math.random() * 25)}%</span>
                  </div>
                  <div className="h-2 w-full bg-aximo-darker rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${70 + Math.floor(Math.random() * 25)}%` }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
}
