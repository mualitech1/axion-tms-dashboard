
import { Calendar, FileText, Clock, AlertTriangle } from 'lucide-react';
import { Customer } from '@/types/customer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomerPortalDashboardProps {
  customer: Customer;
}

const CustomerPortalDashboard = ({ customer }: CustomerPortalDashboardProps) => {
  // Calculate metrics
  const documentsCount = customer.documents?.length || 0;
  const recentJobs = customer.jobs?.slice(0, 3) || [];
  const hasExpiringDocuments = customer.documents?.some(
    doc => doc.expiryDate && new Date(doc.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ) || false;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Credit Limit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{customer.creditLimit.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-2xl font-bold">{documentsCount}</div>
            {hasExpiringDocuments && (
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Expiring Soon
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.lastOrder || 'None'}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-tms-blue" />
            Recent Deliveries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentJobs.length > 0 ? (
            <div className="space-y-4">
              {recentJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{job.reference}</div>
                    <div className="text-sm text-muted-foreground">
                      {job.from} to {job.to}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">£{job.value.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{job.date}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No recent deliveries
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPortalDashboard;
