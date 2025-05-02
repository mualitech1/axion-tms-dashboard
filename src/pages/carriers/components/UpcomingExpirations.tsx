
import { Calendar, Clock, CheckCircle } from 'lucide-react';
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
      <Card className="bg-[#1a1e2b] border-none shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500/40 to-purple-500/40"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <svg className="absolute top-0 right-0 opacity-10" width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,400 Q200,100 400,400 Q600,700 750,400" stroke="#9b87f5" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Clock className="mr-2 h-5 w-5 text-indigo-400" />
            Upcoming Expirations
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4 pt-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-900/50 hover:bg-red-900/30 transition-colors duration-200"
            >
              <div>
                <p className="font-medium text-red-300">City Distribution Ltd</p>
                <p className="text-xs text-red-400">Insurance #INS-2025-0124</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-400" />
                <span className="text-sm text-red-300 font-medium">Expired 2 days ago</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-3 bg-amber-900/20 rounded-lg border border-amber-900/50 hover:bg-amber-900/30 transition-colors duration-200"
            >
              <div>
                <p className="font-medium text-amber-300">Global Freight Services</p>
                <p className="text-xs text-amber-400">Insurance #INS-2025-0187</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-amber-300 font-medium">7 days left</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-900/50 hover:bg-blue-900/30 transition-colors duration-200"
            >
              <div>
                <p className="font-medium text-blue-300">Swift Transport</p>
                <p className="text-xs text-blue-400">License #LIC-2025-2043</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">24 days left</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-900/50 hover:bg-green-900/30 transition-colors duration-200"
            >
              <div>
                <p className="font-medium text-green-300">Express Logistics</p>
                <p className="text-xs text-green-400">License #LIC-2025-2061</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-300 font-medium">28 days left</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 flex justify-center"
          >
            <Badge className="bg-indigo-600 hover:bg-indigo-700 border-none text-white cursor-pointer px-4 py-1 shadow-md shadow-indigo-700/50">
              View All Expirations
            </Badge>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
