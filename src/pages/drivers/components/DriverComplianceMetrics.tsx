
import { Driver } from '../types/driverTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, XCircle, AlertTriangle, Calendar } from 'lucide-react';

interface DriverComplianceMetricsProps {
  drivers: Driver[];
}

export default function DriverComplianceMetrics({ drivers }: DriverComplianceMetricsProps) {
  // Current date for comparisons
  const today = new Date();
  
  // Compliance metrics calculations
  const activeDrivers = drivers.filter(d => d.status === 'Active').length;
  
  const compliantLicenses = drivers.filter(driver => {
    const expiryDate = new Date(driver.license.expiryDate);
    return expiryDate > today;
  }).length;
  
  const compliantCPC = drivers.filter(driver => {
    const expiryDate = new Date(driver.cpc.expiryDate);
    return expiryDate > today && driver.cpc.completedHours >= driver.cpc.requiredHours;
  }).length;
  
  const licenseComplianceRate = (compliantLicenses / drivers.length) * 100;
  const cpcComplianceRate = (compliantCPC / drivers.length) * 100;
  const overallComplianceRate = ((compliantLicenses + compliantCPC) / (drivers.length * 2)) * 100;
  
  // Get upcoming expiries within next 30 days
  const upcomingExpiries = drivers.filter(driver => {
    const licenseExpiry = new Date(driver.license.expiryDate);
    const cpcExpiry = new Date(driver.cpc.expiryDate);
    
    const daysToLicenseExpiry = Math.ceil((licenseExpiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const daysToCpcExpiry = Math.ceil((cpcExpiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return (daysToLicenseExpiry > 0 && daysToLicenseExpiry <= 30) || 
           (daysToCpcExpiry > 0 && daysToCpcExpiry <= 30);
  });
  
  const getComplianceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-500';
    if (rate >= 75) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const getComplianceBg = (rate: number) => {
    if (rate >= 90) return 'bg-green-500/10 border-green-500/20';
    if (rate >= 75) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };
  
  return (
    <Card className="border border-aximo-border bg-aximo-card shadow-aximo">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-aximo-text flex items-center gap-2">
          <Shield className="h-5 w-5 text-aximo-primary" />
          <span>Compliance Dashboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Overall Compliance */}
          <div className={`p-4 rounded-lg border ${getComplianceBg(overallComplianceRate)}`}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-aximo-text">Overall Compliance</p>
              <span className={`text-2xl font-bold ${getComplianceColor(overallComplianceRate)}`}>{overallComplianceRate.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  overallComplianceRate >= 90 ? 'bg-green-500' : 
                  overallComplianceRate >= 75 ? 'bg-amber-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${overallComplianceRate}%` }}
              ></div>
            </div>
          </div>
          
          {/* License Compliance */}
          <div className={`p-4 rounded-lg border ${getComplianceBg(licenseComplianceRate)}`}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-aximo-text">License Compliance</p>
              <span className={`text-2xl font-bold ${getComplianceColor(licenseComplianceRate)}`}>{licenseComplianceRate.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  licenseComplianceRate >= 90 ? 'bg-green-500' : 
                  licenseComplianceRate >= 75 ? 'bg-amber-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${licenseComplianceRate}%` }}
              ></div>
            </div>
          </div>
          
          {/* CPC Compliance */}
          <div className={`p-4 rounded-lg border ${getComplianceBg(cpcComplianceRate)}`}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-aximo-text">CPC Compliance</p>
              <span className={`text-2xl font-bold ${getComplianceColor(cpcComplianceRate)}`}>{cpcComplianceRate.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  cpcComplianceRate >= 90 ? 'bg-green-500' : 
                  cpcComplianceRate >= 75 ? 'bg-amber-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${cpcComplianceRate}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Risk Assessment */}
        <div className="p-4 bg-aximo-darker rounded-lg border border-aximo-border/50">
          <h3 className="text-sm font-medium mb-3 text-aximo-text">Compliance Status Overview</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-2 bg-green-500/5 border border-green-500/10 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-aximo-text-secondary">Fully Compliant</p>
                <p className="text-lg font-semibold text-green-500">{compliantCPC}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-amber-500/5 border border-amber-500/10 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs text-aximo-text-secondary">At Risk</p>
                <p className="text-lg font-semibold text-amber-500">{upcomingExpiries.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-red-500/5 border border-red-500/10 rounded-md">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-xs text-aximo-text-secondary">Non-Compliant</p>
                <p className="text-lg font-semibold text-red-500">{drivers.length - compliantLicenses}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-aximo-primary/5 border border-aximo-primary/10 rounded-md">
              <Calendar className="h-5 w-5 text-aximo-primary" />
              <div>
                <p className="text-xs text-aximo-text-secondary">Records Updated</p>
                <p className="text-lg font-semibold text-aximo-primary">{today.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
