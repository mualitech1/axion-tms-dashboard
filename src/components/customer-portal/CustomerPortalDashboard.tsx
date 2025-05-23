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
          <Card className="relative bg-black/40 backdrop-blur-md border-0 overflow-hidden shadow-[0_0_15px_rgba(129,140,248,0.2)] neon-border">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
            
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-indigo-300 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-indigo-400" style={{ filter: 'drop-shadow(0 0 2px rgba(129,140,248,0.7))' }} />
                Credit Limit
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white neon-text">£{customer.creditLimit.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="relative bg-black/40 backdrop-blur-md border-0 overflow-hidden shadow-[0_0_15px_rgba(129,140,248,0.2)] neon-border">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
            
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-indigo-300 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-indigo-400" style={{ filter: 'drop-shadow(0 0 2px rgba(129,140,248,0.7))' }} />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between relative z-10">
              <div className="text-2xl font-bold text-white neon-text">{documentsCount}</div>
              {hasExpiringDocuments && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-3 py-1 rounded-full text-xs flex items-center shadow-[0_0_10px_rgba(249,115,115,0.3)]">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Expiring Soon
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="relative bg-black/40 backdrop-blur-md border-0 overflow-hidden shadow-[0_0_15px_rgba(129,140,248,0.2)] neon-border">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
            
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-indigo-300 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-indigo-400" style={{ filter: 'drop-shadow(0 0 2px rgba(129,140,248,0.7))' }} />
                Last Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white neon-text">{customer.lastOrder || 'None'}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="relative bg-black/40 backdrop-blur-md border-0 overflow-hidden shadow-[0_0_15px_rgba(129,140,248,0.2)] neon-border">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center text-indigo-100">
              <Clock className="h-5 w-5 mr-2 text-indigo-300" style={{ filter: 'drop-shadow(0 0 3px rgba(129,140,248,0.7))' }} />
              Recent Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            {recentJobs.length > 0 ? (
              <div className="space-y-4">
                {recentJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 border-indigo-500/20 hover:bg-indigo-500/5 p-2 rounded-md transition-colors">
                    <div>
                      <div className="font-medium text-indigo-200">{job.reference}</div>
                      <div className="text-sm text-indigo-300/70">
                        {job.from} to {job.to}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-indigo-200">£{job.value.toLocaleString()}</div>
                      <div className="text-sm text-indigo-300/70">{job.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-indigo-400/60">
                No recent deliveries
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Subtle animated stars */}
      <div className="fixed pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 3px rgba(255, 255, 255, 0.5)',
              animation: `pulse ${2 + Math.random() * 4}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CustomerPortalDashboard;
