
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileCheck, Filter, Search, AlertTriangle, SlidersHorizontal } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { carrierData } from './data/carrierData';

export default function CarrierCompliance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [complianceFilter, setComplianceFilter] = useState<'all' | 'compliant' | 'issues'>('all');
  
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
    
    return filtered;
  }, [complianceData, searchTerm, complianceFilter]);
  
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
      return <span className="text-tms-red font-medium">{formattedDate} (Expired)</span>;
    } else if (daysUntilExpiry < 30) {
      return <span className="text-tms-red font-medium">{formattedDate} ({daysUntilExpiry} days)</span>;
    } else if (daysUntilExpiry < 60) {
      return <span className="text-tms-yellow font-medium">{formattedDate} ({daysUntilExpiry} days)</span>;
    } else {
      return <span>{formattedDate}</span>;
    }
  };
  
  return (
    <MainLayout title="Carrier Compliance">
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">Carrier Compliance</h1>
            <p className="text-tms-gray-600">Monitor and manage carrier compliance requirements</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Audits
            </Button>
            <Button className="bg-tms-blue hover:bg-tms-blue/90">
              <FileCheck className="h-4 w-4 mr-2" />
              Run Compliance Report
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-tms-gray-500" />
              <Input
                placeholder="Search carriers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={complianceFilter === 'all' ? 'default' : 'outline'} 
                size="sm"
                className={complianceFilter === 'all' ? 'bg-tms-blue hover:bg-tms-blue/90' : ''}
                onClick={() => setComplianceFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={complianceFilter === 'compliant' ? 'default' : 'outline'} 
                size="sm"
                className={complianceFilter === 'compliant' ? 'bg-tms-green hover:bg-tms-green/90' : ''}
                onClick={() => setComplianceFilter('compliant')}
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Compliant
              </Button>
              <Button 
                variant={complianceFilter === 'issues' ? 'default' : 'outline'} 
                size="sm"
                className={complianceFilter === 'issues' ? 'bg-tms-red hover:bg-tms-red/90' : ''}
                onClick={() => setComplianceFilter('issues')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Issues
              </Button>
            </div>
            
            <Button variant="outline" size="icon" className="ml-auto">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
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
                {filteredData.map((carrier) => (
                  <TableRow key={carrier.id}>
                    <TableCell className="font-medium">{carrier.name}</TableCell>
                    <TableCell>{carrier.region}</TableCell>
                    <TableCell>{carrier.fleet}</TableCell>
                    <TableCell>{formatExpiryDate(carrier.insuranceExpiry)}</TableCell>
                    <TableCell>{formatExpiryDate(carrier.licenseExpiry)}</TableCell>
                    <TableCell>{carrier.lastAudit.toLocaleDateString('en-GB')}</TableCell>
                    <TableCell>
                      {carrier.hasComplianceIssue ? (
                        <Badge variant="outline" className="border-tms-red text-tms-red">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Issues
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-tms-green text-tms-green">
                          <FileCheck className="h-3 w-3 mr-1" />
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
