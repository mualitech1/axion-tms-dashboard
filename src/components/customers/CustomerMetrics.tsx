
import { Phone, Mail, Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface CustomerMetricsProps {
  totalCalls: number;
  totalEmails: number;
  newCustomers: number;
  scheduledMeetings: number;
  activityTimestamp?: string;
}

const CustomerMetrics = ({
  totalCalls = 68,
  totalEmails = 173,
  newCustomers = 24,
  scheduledMeetings = 12,
  activityTimestamp = 'Today, 10:30 AM'
}: CustomerMetricsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        variants={item}
        className="bg-white rounded-lg shadow-sm border border-blue-100 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center mb-2">
          <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
            <Phone className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-blue-700">{totalCalls}</p>
            <p className="text-sm text-muted-foreground">Calls This Week</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-blue-500 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Last activity: {activityTimestamp}
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-lg shadow-sm border border-indigo-100 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center mb-2">
          <div className="bg-indigo-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
            <Mail className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-indigo-700">{totalEmails}</p>
            <p className="text-sm text-muted-foreground">Emails This Week</p>
          </div>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
          <p className="text-xs text-indigo-600 mt-1">+12% from last week</p>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-lg shadow-sm border border-green-100 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center mb-2">
          <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-green-700">{newCustomers}</p>
            <p className="text-sm text-muted-foreground">New Customers</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-green-600">Last 30 days</p>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center mb-2">
          <div className="bg-amber-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
            <Calendar className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-amber-700">{scheduledMeetings}</p>
            <p className="text-sm text-muted-foreground">Meetings</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-amber-600">Scheduled this week</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerMetrics;
