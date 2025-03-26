
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Truck, FileText, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { carrierData } from './data/carrierData';

export default function CarrierDetails() {
  const { id } = useParams();
  const carrierId = id ? parseInt(id) : undefined;
  
  // Find the carrier by ID, or use the first carrier as a fallback
  const carrier = carrierId 
    ? carrierData.find(c => c.id === carrierId) 
    : carrierData[0];
  
  if (!carrier) {
    return (
      <MainLayout title="Carrier Not Found">
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-semibold text-tms-gray-800 mb-4">Carrier Not Found</h1>
          <p className="text-tms-gray-600 mb-6">The carrier you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/carriers">Back to Carriers</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Carrier: ${carrier.name}`}>
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/carriers">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">{carrier.name}</h1>
            <p className="text-tms-gray-600">Carrier ID: {carrier.id}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-tms-blue-light p-2 rounded-full mr-3">
                <Truck className="h-5 w-5 text-tms-blue" />
              </div>
              <h2 className="text-lg font-medium">Company Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-tms-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-tms-gray-800">123 Transport Lane</p>
                  <p className="text-sm text-tms-gray-800">{carrier.region}, UK</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-tms-gray-500 mr-2" />
                <p className="text-sm text-tms-gray-800">+44 20 7123 4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-tms-gray-500 mr-2" />
                <p className="text-sm text-tms-gray-800">contact@{carrier.name.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-tms-gray-500 mr-2" />
                <p className="text-sm text-tms-gray-800">Partner since Jan 2022</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-tms-green-light p-2 rounded-full mr-3">
                <FileText className="h-5 w-5 text-tms-green" />
              </div>
              <h2 className="text-lg font-medium">Fleet Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-tms-gray-600">Fleet Type:</span>
                <span className="text-sm text-tms-gray-800 font-medium">{carrier.fleet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-tms-gray-600">Vehicle Count:</span>
                <span className="text-sm text-tms-gray-800 font-medium">{10 + Math.floor(Math.random() * 30)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-tms-gray-600">Average Age:</span>
                <span className="text-sm text-tms-gray-800 font-medium">{1 + Math.floor(Math.random() * 4)} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-tms-gray-600">Service Area:</span>
                <span className="text-sm text-tms-gray-800 font-medium">{carrier.region} + 100mi</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
                <FileText className="h-5 w-5 text-tms-yellow" />
              </div>
              <h2 className="text-lg font-medium">Compliance Status</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-tms-gray-600">Insurance:</span>
                <span className="text-sm text-tms-green font-medium">Valid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-tms-gray-600">Licenses:</span>
                <span className="text-sm text-tms-green font-medium">Valid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-tms-gray-600">Safety Rating:</span>
                <span className="text-sm text-tms-gray-800 font-medium">4.7/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-tms-gray-600">Last Audit:</span>
                <span className="text-sm text-tms-gray-800 font-medium">3 months ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="jobs">Recent Jobs</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Recent Jobs</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((job) => (
                  <div key={job} className="border-b border-tms-gray-200 pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-tms-gray-800">Job #{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-xs text-tms-gray-600">Completed on {new Date().toLocaleDateString()}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-tms-gray-600">London to Birmingham</span>
                      <span className="text-xs text-tms-green">On time</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="documents" className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Documents</h3>
              <div className="space-y-4">
                <div className="border-b border-tms-gray-200 pb-4">
                  <p className="text-sm font-medium text-tms-gray-800">Insurance Certificate</p>
                  <p className="text-xs text-tms-gray-600">Expires: June 15, 2024</p>
                  <Button variant="outline" size="sm" className="mt-2">View Document</Button>
                </div>
                <div className="border-b border-tms-gray-200 pb-4">
                  <p className="text-sm font-medium text-tms-gray-800">Operating License</p>
                  <p className="text-xs text-tms-gray-600">Expires: December 22, 2024</p>
                  <Button variant="outline" size="sm" className="mt-2">View Document</Button>
                </div>
                <div>
                  <p className="text-sm font-medium text-tms-gray-800">Safety Audit Report</p>
                  <p className="text-xs text-tms-gray-600">Completed: February 03, 2023</p>
                  <Button variant="outline" size="sm" className="mt-2">View Document</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notes" className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Notes</h3>
              <div className="space-y-4">
                <div className="border-b border-tms-gray-200 pb-4">
                  <p className="text-sm font-medium text-tms-gray-800">Contract Renewal</p>
                  <p className="text-xs text-tms-gray-600">Added by John Doe on March 12, 2023</p>
                  <p className="text-sm text-tms-gray-700 mt-2">Discussing new rates for Q3 contract renewal.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-tms-gray-800">Fleet Expansion</p>
                  <p className="text-xs text-tms-gray-600">Added by Jane Smith on January 05, 2023</p>
                  <p className="text-sm text-tms-gray-700 mt-2">Carrier is expanding fleet by 5 vehicles in next quarter.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
