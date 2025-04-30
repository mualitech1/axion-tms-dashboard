
import { Phone, Mail, Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        variants={item}
        className="bg-white rounded-xl shadow-sm border-blue-50 border p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center">
          <div className="bg-blue-50 h-12 w-12 rounded-full flex items-center justify-center mr-3">
            <Phone className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-700">{totalCalls}</p>
            <p className="text-sm text-gray-500">Calls This Week</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xs text-blue-400 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Last activity: {activityTimestamp}
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-xl shadow-sm border-indigo-50 border p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center">
          <div className="bg-indigo-50 h-12 w-12 rounded-full flex items-center justify-center mr-3">
            <Mail className="h-6 w-6 text-indigo-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-700">{totalEmails}</p>
            <p className="text-sm text-gray-500">Emails This Week</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
            <p className="text-xs text-indigo-500 mt-1">+12% from last week</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-xl shadow-sm border-green-50 border p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center">
          <div className="bg-green-50 h-12 w-12 rounded-full flex items-center justify-center mr-3">
            <User className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">{newCustomers}</p>
            <p className="text-sm text-gray-500">New Customers</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xs text-green-500">Last 30 days</p>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-xl shadow-sm border-amber-50 border p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center">
          <div className="bg-amber-50 h-12 w-12 rounded-full flex items-center justify-center mr-3">
            <Calendar className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-700">{scheduledMeetings}</p>
            <p className="text-sm text-gray-500">Meetings</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xs text-amber-500">Scheduled this week</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerMetrics;
