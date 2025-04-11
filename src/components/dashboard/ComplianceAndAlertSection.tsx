
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ComplianceAndAlertSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Carrier Compliance Card */}
      <Card className="border-amber-200 overflow-hidden">
        <CardHeader className="bg-amber-50 border-b border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShieldAlert className="h-5 w-5 text-amber-600 mr-2" />
              <CardTitle className="text-base font-medium text-amber-900">Carrier Compliance</CardTitle>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">8 Carriers</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Insurance expiring within 14 days</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>License/Certification expired</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Missing required documents</span>
              <span className="font-medium">1</span>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full border-amber-300 hover:bg-amber-50" asChild>
                <Link to="/carriers/compliance" className="flex items-center justify-center">
                  View Compliance Issues
                  <ArrowRightIcon className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
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
