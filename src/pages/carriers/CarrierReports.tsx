
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, LineChart, PieChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import PerformanceFilters from "./components/reports/PerformanceFilters";
import PerformanceMetricsCard from "./components/reports/PerformanceMetricsCard";
import ComplianceReportTable from "./components/reports/ComplianceReportTable";
import { 
  PerformanceOverTimeChart,
  CarrierScoresChart,
  ComplianceStatusChart
} from "./components/reports/PerformanceCharts";
import { 
  performanceData, 
  complianceReportData, 
  performanceOverTimeData,
  carrierScoresData,
  complianceStatusData
} from "./data/performanceData";
import { CarrierPerformanceFilters } from "./data/types/performanceTypes";

export default function CarrierReports() {
  const [activeFilters, setActiveFilters] = useState<CarrierPerformanceFilters>({
    timeframe: "last30"
  });
  
  const [filteredPerformanceData, setFilteredPerformanceData] = useState(performanceData);
  const [filteredComplianceData, setFilteredComplianceData] = useState(complianceReportData);
  
  const handleFilterChange = (filters: CarrierPerformanceFilters) => {
    setActiveFilters(filters);
    
    // In a real app, we would filter the data based on the selected filters
    // For this demo, we'll just simulate that behavior
    console.log("Applied filters:", filters);
    
    // Simulate filtered data (in a real app, this would be actual filtering)
    if (filters.complianceStatus && filters.complianceStatus !== "All") {
      setFilteredComplianceData(
        complianceReportData.filter(item => item.status === filters.complianceStatus)
      );
    } else {
      setFilteredComplianceData(complianceReportData);
    }
  };
  
  return (
    <MainLayout title="Carrier Reports">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="mb-2"
            >
              <Link to="/carriers">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Carriers
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Performance & Compliance Reports</h1>
            <p className="text-muted-foreground">
              Track carrier performance metrics and compliance status
            </p>
          </div>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <PerformanceFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="dashboard">
              <TabsList className="mb-4">
                <TabsTrigger value="dashboard">
                  <FileText className="h-4 w-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="performance">
                  <LineChart className="h-4 w-4 mr-2" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="compliance">
                  <PieChart className="h-4 w-4 mr-2" />
                  Compliance
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <PerformanceOverTimeChart data={performanceOverTimeData} />
                  <ComplianceStatusChart data={complianceStatusData} />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Top Performers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPerformanceData.slice(0, 3).map(metric => (
                      <PerformanceMetricsCard key={metric.carrierId} metrics={metric} />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <PerformanceOverTimeChart data={performanceOverTimeData} />
                  <CarrierScoresChart data={carrierScoresData} />
                </div>
                
                <h3 className="text-lg font-medium mb-4">Carrier Performance Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPerformanceData.map(metric => (
                    <PerformanceMetricsCard key={metric.carrierId} metrics={metric} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="compliance">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                      <p className="text-sm text-tms-gray-600 mb-1">Compliant Carriers</p>
                      <p className="text-2xl font-semibold text-tms-green">{complianceStatusData[0].count}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                      <p className="text-sm text-tms-gray-600 mb-1">Non-Compliant Carriers</p>
                      <p className="text-2xl font-semibold text-tms-red">{complianceStatusData[1].count}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                      <p className="text-sm text-tms-gray-600 mb-1">Action Required</p>
                      <p className="text-2xl font-semibold text-tms-yellow">{complianceStatusData[2].count}</p>
                    </div>
                  </div>
                  
                  <ComplianceStatusChart data={complianceStatusData} />
                  
                  <h3 className="text-lg font-medium mt-6 mb-4">Compliance Details</h3>
                  <ComplianceReportTable data={filteredComplianceData} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
