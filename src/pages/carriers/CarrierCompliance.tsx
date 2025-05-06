
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  FileCheck, 
  Filter, 
  Search, 
  AlertTriangle, 
  SlidersHorizontal, 
  ArrowLeft,
  Download,
  Bell
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { carrierData } from './data/carrierData';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CarrierCompliance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [complianceFilter, setComplianceFilter] = useState<'all' | 'compliant' | 'issues'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  
  // Generate random expiration dates for carriers
  const complianceData = useMemo(() => {
    return carrierData.map(carrier => {
      // Random date within next 120 days for insurance
      const insuranceDays = Math.floor(Math.random() * 120);
      const insuranceDate = new Date();
      insuranceDate.setDate(insuranceDate.getDate() + insuranceDays);
      
      // Random date within next 365 days for license
      const licenseDays = Math.floor(Math.random() * 365);
      const licenseDate = new Date();
      licenseDate.setDate(licenseDate.getDate() + licenseDays);
      
      const hasIssue = insuranceDays < 30 || licenseDays < 30;
      
      return {
        ...carrier,
        insuranceExpiry: insuranceDate,
        licenseExpiry: licenseDate,
        hasComplianceIssue: hasIssue,
        lastAudit: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      };
    });
  }, []);
  
  // Filter compliance data
  const filteredData = useMemo(() => {
    let filtered = complianceData.filter(carrier => 
      carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carrier.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (complianceFilter === 'compliant') {
      filtered = filtered.filter(carrier => !carrier.hasComplianceIssue);
    } else if (complianceFilter === 'issues') {
      filtered = filtered.filter(carrier => carrier.hasComplianceIssue);
    }
    
    if (regionFilter !== 'all') {
      filtered = filtered.filter(carrier => carrier.region === regionFilter);
    }
    
    return filtered;
  }, [complianceData, searchTerm, complianceFilter, regionFilter]);
  
  // Format date with warning colors based on expiry
  const formatExpiryDate = (date: Date) => {
    const today = new Date();
    const daysUntilExpiry = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const formattedDate = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    
    if (daysUntilExpiry < 0) {
      return <span className="text-red-500 font-medium">{formattedDate} (Expired)</span>;
    } else if (daysUntilExpiry < 30) {
      return <span className="text-red-500 font-medium">{formattedDate} ({daysUntilExpiry} days)</span>;
    } else if (daysUntilExpiry < 60) {
      return <span className="text-amber-500 font-medium">{formattedDate} ({daysUntilExpiry} days)</span>;
    } else {
      return <span>{formattedDate}</span>;
    }
  };

  // Calculate compliance statistics
  const complianceStats = useMemo(() => {
    const expired = complianceData.filter(c => 
      new Date(c.insuranceExpiry) < new Date() || 
      new Date(c.licenseExpiry) < new Date()
    ).length;
    
    const expiringSoon = complianceData.filter(c => {
      const today = new Date();
      const insuranceDays = Math.floor((new Date(c.insuranceExpiry).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const licenseDays = Math.floor((new Date(c.licenseExpiry).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return (insuranceDays >= 0 && insuranceDays < 30) || (licenseDays >= 0 && licenseDays < 30);
    }).length - expired;
    
    const compliant = complianceData.length - expired - expiringSoon;
    
    return { expired, expiringSoon, compliant };
  }, [complianceData]);
  
  const regions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(complianceData.map(carrier => carrier.region)));
    return ['all', ...uniqueRegions];
  }, [complianceData]);
  
  return (
    <MainLayout title="Carrier Compliance">
      <div className="space-y-6">
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
              Carrier Compliance
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage carrier compliance requirements
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Audits
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Set Alerts
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <FileCheck className="h-4 w-4 mr-2" />
              Run Compliance Report
            </Button>
          </div>
        </motion.div>
        
        {/* Statistics Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="border-green-500/20 bg-green-900/10">
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full w-12 h-12 bg-green-500/20 flex items-center justify-center mr-4">
                <FileCheck className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Compliant Carriers</p>
                <p className="text-2xl font-bold text-green-500">{complianceStats.compliant}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-amber-500/20 bg-amber-900/10">
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full w-12 h-12 bg-amber-500/20 flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold text-amber-500">{complianceStats.expiringSoon}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-red-500/20 bg-red-900/10">
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full w-12 h-12 bg-red-500/20 flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expired Documents</p>
                <p className="text-2xl font-bold text-red-500">{complianceStats.expired}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-aximo-border bg-aximo-card shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Filter className="h-5 w-5 mr-2 text-indigo-400" />
                Compliance Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search carriers..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Button 
                    variant={complianceFilter === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    className={complianceFilter === 'all' ? 'bg-indigo-600 hover:bg-indigo-700 w-full' : 'w-full'}
                    onClick={() => setComplianceFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={complianceFilter === 'compliant' ? 'default' : 'outline'} 
                    size="sm"
                    className={complianceFilter === 'compliant' ? 'bg-green-600 hover:bg-green-700 w-full' : 'w-full'}
                    onClick={() => setComplianceFilter('compliant')}
                  >
                    <FileCheck className="h-4 w-4 mr-2" />
                    Compliant
                  </Button>
                  <Button 
                    variant={complianceFilter === 'issues' ? 'default' : 'outline'} 
                    size="sm"
                    className={complianceFilter === 'issues' ? 'bg-red-600 hover:bg-red-700 w-full' : 'w-full'}
                    onClick={() => setComplianceFilter('issues')}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Issues
                  </Button>
                </div>
                
                <div className="w-full md:w-64">
                  <Select value={regionFilter} onValueChange={setRegionFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>
                          {region === 'all' ? 'All Regions' : region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-aximo-border bg-aximo-card shadow-md">
            <CardContent className="p-0">
              <div className="p-4 border-b border-aximo-border flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-lg font-medium">Carrier Compliance Status</h3>
                  <p className="text-sm text-muted-foreground">Showing {filteredData.length} carriers</p>
                </div>
                <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-aximo-darker">
                      <TableHead>Carrier Name</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Fleet Type</TableHead>
                      <TableHead>Insurance Expiry</TableHead>
                      <TableHead>License Expiry</TableHead>
                      <TableHead>Last Audit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center">
                            <FileCheck className="h-12 w-12 text-muted-foreground/40 mb-2" />
                            <p className="text-muted-foreground">No carriers match your filters</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((carrier) => (
                        <TableRow key={carrier.id} className="hover:bg-aximo-card/40">
                          <TableCell className="font-medium">{carrier.name}</TableCell>
                          <TableCell>{carrier.region}</TableCell>
                          <TableCell>{carrier.fleet}</TableCell>
                          <TableCell>{formatExpiryDate(carrier.insuranceExpiry)}</TableCell>
                          <TableCell>{formatExpiryDate(carrier.licenseExpiry)}</TableCell>
                          <TableCell>{carrier.lastAudit.toLocaleDateString('en-GB')}</TableCell>
                          <TableCell>
                            {carrier.hasComplianceIssue ? (
                              <Badge variant="outline" className="border-red-500/50 text-red-500 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                Issues
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-green-500/50 text-green-500 flex items-center gap-1">
                                <FileCheck className="h-3 w-3" />
                                Compliant
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/carriers/details/${carrier.id}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
