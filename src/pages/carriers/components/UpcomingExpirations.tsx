
import { AlertTriangle, Calendar, Shield, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function UpcomingExpirations() {
  // Animation variants for list items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-indigo-200 shadow-md bg-white">
        <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="text-lg font-semibold text-indigo-800 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-indigo-600" />
            Upcoming Expirations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200 hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <p className="font-medium text-red-900">City Distribution Ltd</p>
                <p className="text-xs text-red-700">Insurance #INS-2025-0124</p>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600 font-medium">Expired 2 days ago</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200 hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <p className="font-medium text-amber-900">Global Freight Services</p>
                <p className="text-xs text-amber-700">Insurance #INS-2025-0187</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-amber-600 font-medium">7 days left</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <p className="font-medium text-blue-900">Swift Transport</p>
                <p className="text-xs text-blue-700">License #LIC-2025-2043</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-blue-600 font-medium">24 days left</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <p className="font-medium text-green-900">Express Logistics</p>
                <p className="text-xs text-green-700">License #LIC-2025-2061</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">28 days left</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 flex justify-center"
          >
            <Badge className="bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer px-4 py-1">
              View All Expirations
            </Badge>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
