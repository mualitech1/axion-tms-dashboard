
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function ComplianceAndAlertSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Carrier Compliance Card */}
      <Card className="bg-gradient-to-br from-amber-50/10 to-amber-100/10 backdrop-blur-sm border border-amber-200/20 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-amber-200/10">
        <CardHeader className="bg-gradient-to-r from-amber-50/20 to-transparent border-b border-amber-200/20 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-amber-100 p-2 rounded-lg mr-3">
                <ShieldAlert className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-amber-900">Carrier Compliance</h3>
                <p className="text-sm text-amber-700/70">Monitoring and Alerts</p>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 transition-colors"
            >
              8 Carriers
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50/20 backdrop-blur-sm hover:bg-amber-50/30 transition-colors">
              <span className="text-amber-900">Insurance expiring within 14 days</span>
              <Badge variant="outline" className="bg-amber-100 border-amber-300 text-amber-700">5</Badge>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50/20 backdrop-blur-sm hover:bg-amber-50/30 transition-colors">
              <span className="text-amber-900">License/Certification expired</span>
              <Badge variant="outline" className="bg-amber-100 border-amber-300 text-amber-700">2</Badge>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50/20 backdrop-blur-sm hover:bg-amber-50/30 transition-colors">
              <span className="text-amber-900">Missing required documents</span>
              <Badge variant="outline" className="bg-amber-100 border-amber-300 text-amber-700">1</Badge>
            </div>
          </div>
          
          <Link to="/carriers/compliance" className="block mt-6">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full bg-gradient-to-r from-amber-50 to-amber-100/80 text-amber-900 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:from-amber-100 hover:to-amber-200/80 transition-all duration-300 shadow-sm hover:shadow group"
            >
              <span className="flex items-center justify-center">
                View Compliance Issues
                <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
        </CardContent>
      </Card>
      
      {/* Financial Alerts Card */}
      <Card className="border-red-200 overflow-hidden">
        <CardHeader className="bg-red-50 border-b border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <CardTitle className="text-base font-medium text-red-900">Financial Alerts</CardTitle>
            </div>
            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">Attention Needed</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Overdue Invoices (30+ days)</span>
              <span className="font-medium">12 (£24,850)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>High Priority Disputes</span>
              <span className="font-medium">3 (£8,290)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Credit Limit Warnings</span>
              <span className="font-medium">2 customers</span>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full border-red-300 hover:bg-red-50" asChild>
                <Link to="/finance" className="flex items-center justify-center">
                  View Financial Alerts
                  <ArrowRightIcon className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
