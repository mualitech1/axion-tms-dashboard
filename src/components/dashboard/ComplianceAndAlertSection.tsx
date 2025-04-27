
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function ComplianceAndAlertSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Carrier Compliance Card */}
      <Card className="bg-gradient-to-br from-indigo-900/90 to-indigo-800/90 border-indigo-700/30 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-indigo-700/30 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
                <ShieldAlert className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-indigo-100">Carrier Compliance</h3>
                <p className="text-sm text-indigo-300/90">Monitoring and Alerts</p>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className="bg-indigo-500/10 text-indigo-200 border-indigo-400/30 hover:bg-indigo-500/20"
            >
              8 Carriers
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors">
              <span className="text-indigo-100">Insurance expiring within 14 days</span>
              <Badge variant="outline" className="bg-indigo-500/20 border-indigo-400/30 text-indigo-200">5</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors">
              <span className="text-indigo-100">License/Certification expired</span>
              <Badge variant="outline" className="bg-indigo-500/20 border-indigo-400/30 text-indigo-200">2</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors">
              <span className="text-indigo-100">Missing required documents</span>
              <Badge variant="outline" className="bg-indigo-500/20 border-indigo-400/30 text-indigo-200">1</Badge>
            </div>
          </div>
          
          <Link to="/carriers/compliance" className="block mt-6">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-100 border-indigo-400/30 
                         transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                View Compliance Issues
                <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 
                            group-hover:from-indigo-500/10 group-hover:via-indigo-500/20 group-hover:to-indigo-500/10 
                            transition-opacity opacity-0 group-hover:opacity-100" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      
      {/* Financial Alerts Card */}
      <Card className="bg-gradient-to-br from-red-900/90 to-red-800/90 border-red-700/30 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-red-700/30 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-red-500/20 p-2 rounded-lg mr-3">
                <AlertTriangle className="h-5 w-5 text-red-300" />
              </div>
              <CardTitle className="text-base font-medium text-red-100">Financial Alerts</CardTitle>
            </div>
            <Badge variant="outline" className="bg-red-500/10 text-red-200 border-red-400/30 hover:bg-red-500/20">
              Attention Needed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
              <span className="text-red-100">Overdue Invoices (30+ days)</span>
              <span className="text-red-200 font-medium">12 (£24,850)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
              <span className="text-red-100">High Priority Disputes</span>
              <span className="text-red-200 font-medium">3 (£8,290)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
              <span className="text-red-100">Credit Limit Warnings</span>
              <span className="text-red-200 font-medium">2 customers</span>
            </div>
            <Link to="/finance" className="block mt-4">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-100 border-red-400/30 
                           transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  View Financial Alerts
                  <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 
                              group-hover:from-red-500/10 group-hover:via-red-500/20 group-hover:to-red-500/10 
                              transition-opacity opacity-0 group-hover:opacity-100" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
