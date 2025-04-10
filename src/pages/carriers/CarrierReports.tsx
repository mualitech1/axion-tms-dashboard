
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  FileText, 
  LineChart, 
  PieChart, 
  Download, 
  FileSearch,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    console.log("Applied filters:", filters);
    
    // Simulate filtered data
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
        {/* Back button header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="mb-2 flex items-center"
            >
              <Link to="/carriers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Carriers
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Performance & Compliance Reports</h1>
            <p className="text-muted-foreground mt-1">
              Track carrier performance metrics and compliance status
            </p>
          </div>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
        
        {/* Filter card */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileSearch className="h-5 w-5 mr-2 text-muted-foreground" />
              Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceFilters onFilterChange={handleFilterChange} />
          </CardContent>
        </Card>

        {/* Main content in modern dashboard layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Key metrics summary cards - Column 1 */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-muted-foreground" />
                  Key Metrics Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Compliant Carriers</p>
                    <p className="text-2xl font-semibold text-green-600">{complianceStatusData[0].count}</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Non-Compliant</p>
                    <p className="text-2xl font-semibold text-red-600">{complianceStatusData[1].count}</p>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Average Performance Score</p>
                  <p className="text-2xl font-semibold text-blue-600">
                    {Math.round(filteredPerformanceData.reduce((sum, item) => sum + item.onTimeDeliveryRate, 0) / filteredPerformanceData.length)}%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status chart */}
            <ComplianceStatusChart data={complianceStatusData} />
          </div>
          
          {/* Main charts - Column 2 & 3 */}
          <div className="col-span-2 space-y-6">
            {/* Performance trends chart */}
            <PerformanceOverTimeChart data={performanceOverTimeData} />
            
            {/* Top performers */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-muted-foreground" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredPerformanceData.slice(0, 3).map(metric => (
                    <PerformanceMetricsCard key={metric.carrierId} metrics={metric} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Compliance details table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  Compliance Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ComplianceReportTable data={filteredComplianceData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
