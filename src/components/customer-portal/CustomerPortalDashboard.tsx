
import { Calendar, FileText, Clock, AlertTriangle } from 'lucide-react';
import { Customer } from '@/types/customer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Card className="border-indigo-100 shadow-md hover:shadow-lg transition-all dark:bg-indigo-950/20 dark:border-indigo-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                Credit Limit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">£{customer.creditLimit.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-indigo-100 shadow-md hover:shadow-lg transition-all dark:bg-indigo-950/20 dark:border-indigo-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <FileText className="h-4 w-4 mr-2 text-indigo-500" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">{documentsCount}</div>
              {hasExpiringDocuments && (
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs flex items-center dark:bg-amber-900/40 dark:text-amber-300">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Expiring Soon
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-indigo-100 shadow-md hover:shadow-lg transition-all dark:bg-indigo-950/20 dark:border-indigo-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                Last Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">{customer.lastOrder || 'None'}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-indigo-100 shadow-md hover:shadow-lg transition-all dark:bg-indigo-950/20 dark:border-indigo-800/30">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-800 dark:text-indigo-300">
              <Clock className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Recent Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentJobs.length > 0 ? (
              <div className="space-y-4">
                {recentJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 border-indigo-100/50 dark:border-indigo-800/30">
                    <div>
                      <div className="font-medium text-indigo-800 dark:text-indigo-300">{job.reference}</div>
                      <div className="text-sm text-muted-foreground dark:text-indigo-400/70">
                        {job.from} to {job.to}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-indigo-800 dark:text-indigo-300">£{job.value.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground dark:text-indigo-400/70">{job.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground dark:text-indigo-400/60">
                No recent deliveries
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CustomerPortalDashboard;
