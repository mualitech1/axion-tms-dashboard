
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Truck, MapPin, Clock, FileText, Mail, X } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockJobs } from "./components/jobs-list/mockJobData";
import { Separator } from "@/components/ui/separator";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const jobId = parseInt(id || "0");
  
  // Find the job from mock data - in a real app, this would be an API call
  const job = mockJobs.find(j => j.id === jobId) || mockJobs[0]; // Fallback to first job if not found
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("details");
  
  return (
    <MainLayout title="Job Details">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/jobs" className="flex items-center gap-1 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">{job.title}</h1>
            <p className="text-tms-gray-600">Job #{jobId} • {job.client}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email Job
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              <X className="mr-2 h-4 w-4" />
              Cancel Job
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Job status card */}
        <Card className="p-5 md:col-span-3 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-muted/50 p-3 rounded-full">
                <Truck className="h-6 w-6 text-tms-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      job.status === "in-progress" ? "default" :
                      job.status === "scheduled" ? "secondary" : "outline"
                    }
                    className="capitalize text-sm"
                  >
                    {job.status}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-sm
                      ${job.priority === "high" ? "bg-red-50 text-red-700 border-red-200" : 
                        job.priority === "medium" ? "bg-orange-50 text-orange-700 border-orange-200" : 
                        "bg-blue-50 text-blue-700 border-blue-200"}
                    `}
                  >
                    {job.priority} priority
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="border-r pr-3">
                <p className="text-xs text-muted-foreground">Scheduled for</p>
                <p className="flex items-center text-sm font-medium">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-tms-blue" />
                  {job.time}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reference</p>
                <p className="flex items-center text-sm font-medium">
                  <FileText className="h-3.5 w-3.5 mr-1 text-tms-blue" />
                  IKB-{jobId}-{new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Main content area */}
        <div className="md:col-span-2">
          <Card className="p-5 bg-white h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="backoffice">Backoffice</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-tms-blue" /> 
                      Collection Details
                    </h3>
                    <div className="bg-muted/30 p-3 rounded-md space-y-1">
                      <p className="font-medium">ABC Warehousing Ltd</p>
                      <p className="text-sm text-muted-foreground">John Smith</p>
                      <p className="text-sm">123 Industrial Estate</p>
                      <p className="text-sm">Manchester</p>
                      <p className="text-sm">M12 4WD</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Collection time: 09:00 - 11:00</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-tms-blue" /> 
                      Delivery Details
                    </h3>
                    <div className="bg-muted/30 p-3 rounded-md space-y-1">
                      <p className="font-medium">XYZ Distribution Center</p>
                      <p className="text-sm text-muted-foreground">Sarah Johnson</p>
                      <p className="text-sm">456 Logistics Park</p>
                      <p className="text-sm">Birmingham</p>
                      <p className="text-sm">B2 5TY</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Delivery time: 14:00 - 16:00</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Job Notes</h3>
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                    2 pallets of electronic equipment. Requires tail lift for delivery.
                    Customer requested notification 1 hour before arrival.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="backoffice">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Internal Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    This section will contain internal notes and updates for the backoffice team.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    This section will contain PODs, CMRs, and other documents related to this job.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-5 bg-white h-full">
            <h3 className="text-sm font-medium mb-3">Assignment Information</h3>
            <div className="space-y-3">
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-xs text-muted-foreground">Assigned Carrier</p>
                <p className="font-medium">FastTrucks Ltd</p>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-xs text-muted-foreground">Driver</p>
                <p className="font-medium">Mike Johnson</p>
                <p className="text-sm text-muted-foreground">+44 7700 900123</p>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-xs text-muted-foreground">Vehicle</p>
                <p className="font-medium">18t Box Truck</p>
                <p className="text-sm text-muted-foreground">Reg: AB12 CDE</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
