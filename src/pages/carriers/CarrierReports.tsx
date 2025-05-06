
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  FileText, 
  LineChart, 
  PieChart, 
  Download, 
  FileSearch,
  TrendingUp,
  CalendarRange
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
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function CarrierReports() {
  const [activeFilters, setActiveFilters] = useState<CarrierPerformanceFilters>({
    timeframe: "last30"
  });
  
  const [filteredPerformanceData, setFilteredPerformanceData] = useState(performanceData);
  const [filteredComplianceData, setFilteredComplianceData] = useState(complianceReportData);
  const [activeTab, setActiveTab] = useState("performance");
  
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
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
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
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Performance & Compliance Reports
            </h1>
            <p className="text-muted-foreground mt-1">
              Track carrier performance metrics and compliance status over time
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarRange className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>
        
        {/* Filter card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="mb-4 border-aximo-border bg-aximo-card shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileSearch className="h-5 w-5 mr-2 text-indigo-400" />
                Report Filters
                {Object.keys(activeFilters).length > 1 && (
                  <Badge variant="outline" className="ml-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
                    {Object.keys(activeFilters).length - 1} active
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceFilters onFilterChange={handleFilterChange} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs for different report types */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-aximo-darker mb-4">
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-6">
              {/* Main content in modern dashboard layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Key metrics summary cards - Column 1 */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Card className="border-aximo-border bg-aximo-card shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-indigo-400" />
                          Key Metrics Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-indigo-500/5 p-4 rounded-lg text-center border border-indigo-500/10">
                            <p className="text-sm text-muted-foreground mb-1">Compliant Carriers</p>
                            <p className="text-2xl font-semibold text-green-500">{complianceStatusData[0].count}</p>
                          </div>
                          <div className="bg-indigo-500/5 p-4 rounded-lg text-center border border-indigo-500/10">
                            <p className="text-sm text-muted-foreground mb-1">Non-Compliant</p>
                            <p className="text-2xl font-semibold text-red-500">{complianceStatusData[1].count}</p>
                          </div>
                        </div>
                        <div className="bg-indigo-500/5 p-4 rounded-lg text-center border border-indigo-500/10">
                          <p className="text-sm text-muted-foreground mb-1">Average Performance Score</p>
                          <p className="text-2xl font-semibold text-indigo-500">
                            {Math.round(filteredPerformanceData.reduce((sum, item) => sum + item.onTimeDeliveryRate, 0) / filteredPerformanceData.length)}%
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Compliance Status chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <ComplianceStatusChart data={complianceStatusData} />
                  </motion.div>
                </div>
                
                {/* Main charts - Column 2 & 3 */}
                <div className="col-span-2 space-y-6">
                  {/* Performance trends chart */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <PerformanceOverTimeChart data={performanceOverTimeData} />
                  </motion.div>
                  
                  {/* Top performers */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <Card className="border-aximo-border bg-aximo-card shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <LineChart className="h-5 w-5 mr-2 text-indigo-400" />
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
                  </motion.div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="compliance" className="space-y-6">
              {/* Compliance details table */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card className="border-aximo-border bg-aximo-card shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-indigo-400" />
                      Compliance Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ComplianceReportTable data={filteredComplianceData} />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="costs" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card className="border-aximo-border bg-aximo-card shadow-md p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <PieChart className="h-12 w-12 text-indigo-300/40 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Cost Analysis Reporting</h3>
                  <p className="text-center text-muted-foreground max-w-md">
                    Cost analysis reporting will be available in the next update. This will include carrier cost comparisons, trend analysis, and ROI metrics.
                  </p>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </MainLayout>
  );
}
